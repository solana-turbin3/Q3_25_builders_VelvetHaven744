# Gill SPL Token Implementation

This repository contains a simple implementation of Solana SPL tokens using the [Gill](https://github.com/DecalLabs/gill) framework.

## What is Gill?

Gill is a modern Solana JavaScript client that offers a better & customizable developer experience compared to traditional Solana SDKs.

### Key Features

- **Better Developer Experience**: More intuitive and type-safe approach
- **Highly Tree-shakable**: Only includes the code you actually use, reducing bundle size and boilerplate
- **Not Class-based**: Uses functional programming patterns for better composability
- **Non-extractable Keypairs**: Enhanced security with non-extractable keypairs by default
- **Improved Error Handling**: Better error messages and debugging capabilities

## Implementation Details

This implementation follows the official Gill documentation and examples from the [DecalLabs Gill repository](https://github.com/DecalLabs/gill).

### How Gill Simplifies SPL Token Operations

Gill introduces builder functions that simplify complex token operations:

- **`buildCreateTokenTransaction`**: Creates tokens with metadata in a single transaction (no separate metadata creation needed)
- **`buildMintTokensTransaction`**: Handles minting with automatic associated token account creation
- **`buildTransferTokensTransaction`**: Manages transfers with proper account validation

### Files

- **`spl_init.ts`** - Creates SPL tokens with metadata using Gill's `buildCreateTokenTransaction`
- **`spl_mint.ts`** - Mints tokens to a wallet using Gill's `buildMintTokensTransaction`
- **`spl_transfer.ts`** - Transfers tokens between addresses using Gill's `buildTransferTokensTransaction`


## Usage

```bash
# Create a new token with metadata
npm run gill_spl_init

# Mint tokens to your wallet
npm run gill_spl_mint

# Transfer tokens
npm run gill_spl_transfer
```

## Credits

This implementation is based on:
- [Gill Documentation](https://github.com/DecalLabs/gill)
- [DecalLabs Gill Repository](https://github.com/DecalLabs/gill/tree/master/examples/tokens/src)
- Official Gill token examples and patterns


*This is a learning project to understand and implement Solana SPL tokens using the Gill framework.* 