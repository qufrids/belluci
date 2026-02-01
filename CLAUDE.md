# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

This is the **wallets** repository. It is currently in early development.

## Development Guidelines

### Security Considerations

Since this project deals with wallets (potentially financial/crypto wallets), security is paramount:

- Never log or expose sensitive data (private keys, seeds, passwords)
- Validate all user inputs
- Use secure cryptographic libraries rather than implementing crypto from scratch
- Follow the principle of least privilege
- Be cautious with dependencies - audit for known vulnerabilities

### Code Style

- Write clear, readable code with meaningful variable names
- Include appropriate error handling
- Add comments for complex logic
- Keep functions focused and single-purpose

### Testing

- Write tests for all new functionality
- Ensure security-critical paths have thorough test coverage
- Test edge cases and error conditions

## Commands

No build or test commands are configured yet for this project.
