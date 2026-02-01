import { Product, ProductVariant, Currency } from './types'

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

export const isShopifyMode = Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN)

interface ShopifyResponse<T> {
  data: T
  errors?: Array<{ message: string }>
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error('Shopify credentials not configured')
  }

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json: ShopifyResponse<T> = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

// Product query
const PRODUCT_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

interface ShopifyProductResponse {
  product: {
    id: string
    title: string
    handle: string
    description: string
    descriptionHtml: string
    images: {
      edges: Array<{
        node: {
          id: string
          url: string
          altText: string | null
        }
      }>
    }
    variants: {
      edges: Array<{
        node: {
          id: string
          title: string
          availableForSale: boolean
          priceV2: {
            amount: string
            currencyCode: string
          }
          selectedOptions: Array<{
            name: string
            value: string
          }>
        }
      }>
    }
  }
}

// Base prices for conversion (approximate rates)
const CONVERSION_RATES: Record<Currency, number> = {
  GBP: 1,
  USD: 1.28,
  AED: 4.7,
}

function convertPrice(baseGBP: number, currency: Currency): number {
  return Math.round(baseGBP * CONVERSION_RATES[currency])
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyMode) {
    return null
  }

  try {
    const data = await shopifyFetch<ShopifyProductResponse>(PRODUCT_QUERY, { handle })

    if (!data.product) {
      return null
    }

    const { product } = data

    // Parse base price from first variant (assuming GBP or convert)
    const basePrice = parseFloat(product.variants.edges[0]?.node.priceV2.amount || '0')

    const variants: ProductVariant[] = product.variants.edges.map(({ node }) => {
      const colorOption = node.selectedOptions.find((opt) => opt.name.toLowerCase() === 'color')
      const color = (colorOption?.value as 'Black' | 'Brown') || 'Black'
      const variantPrice = parseFloat(node.priceV2.amount)

      return {
        id: node.id,
        color,
        available: node.availableForSale,
        prices: {
          GBP: variantPrice,
          USD: convertPrice(variantPrice, 'USD'),
          AED: convertPrice(variantPrice, 'AED'),
        },
      }
    })

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      variants,
      images: product.images.edges.map(({ node }) => ({
        id: node.id,
        src: node.url,
        alt: node.altText || product.title,
      })),
    }
  } catch (error) {
    console.error('Failed to fetch product from Shopify:', error)
    return null
  }
}

// Cart queries
const CREATE_CART_MUTATION = `
  mutation createCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const UPDATE_CART_MUTATION = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

interface ShopifyCartResponse {
  cart: {
    id: string
    checkoutUrl: string
    lines: {
      edges: Array<{
        node: {
          id: string
          quantity: number
          merchandise: {
            id: string
          }
        }
      }>
    }
  }
  userErrors: Array<{ field: string; message: string }>
}

export async function createShopifyCart(variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<{ cartCreate: ShopifyCartResponse }>(CREATE_CART_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  })
  return data.cartCreate.cart
}

export async function addToShopifyCart(cartId: string, variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<{ cartLinesAdd: ShopifyCartResponse }>(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })
  return data.cartLinesAdd.cart
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesUpdate: ShopifyCartResponse }>(UPDATE_CART_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  return data.cartLinesUpdate.cart
}

export async function removeFromShopifyCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{ cartLinesRemove: ShopifyCartResponse }>(REMOVE_FROM_CART_MUTATION, {
    cartId,
    lineIds,
  })
  return data.cartLinesRemove.cart
}
