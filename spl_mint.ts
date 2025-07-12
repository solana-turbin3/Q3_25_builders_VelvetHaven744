// Gill SPL Token Minting
// Mints tokens to your wallet using the specified mint address
import {
  address,
  createSolanaClient,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "gill";

import { loadKeypairSignerFromFile } from "gill/node";
import { buildMintTokensTransaction, TOKEN_2022_PROGRAM_ADDRESS } from "gill/programs/token";

(async () => {
  try {
    // Connect to Solana devnet
    const { rpc, sendAndConfirmTransaction } = createSolanaClient({
      urlOrMoniker: "devnet",
    });

    // Load your wallet file
    const signer = await loadKeypairSignerFromFile("turbin3-wallet.json");
    console.log("signer:", signer.address);

    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    // Set mint address (update this after running spl_init.ts)
    const mint = address("a9UNzsripUYA66VT14fKpmqP7KVHGa9TTXC826jw6Vf");
    console.log("mint:", mint);

    // Build mint transaction
    const tx = await buildMintTokensTransaction({
      feePayer: signer,
      version: "legacy",
      latestBlockhash,
      amount: 100_000_000, // 100 tokens with 6 decimals
      destination: signer.address,
      mint,
      mintAuthority: signer,
      tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
    });

    // Sign and send transaction
    const signedTransaction = await signTransactionMessageWithSigners(tx);

    console.log(
      "Explorer:",
      getExplorerLink({
        cluster: "devnet",
        transaction: getSignatureFromTransaction(signedTransaction),
      }),
    );

    await sendAndConfirmTransaction(signedTransaction);

    console.log("Tokens minted successfully!");
    console.log("Amount: 100 tokens");
    console.log("To: ", signer.address);

  } catch (err) {
    console.error("Unable to mint tokens");
    console.error(err);
  }
})();

// ===== ORIGINAL @solana/web3.js IMPLEMENTATION (COMMENTED OUT) =====
/*
import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const mint = new PublicKey("BgU2w5QKVjX1Gc4rP4S4sf2hYcYszDssQnHnzYRuxu4e");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const mintTx = await mintTo(
    connection,
    keypair,
    mint,
    tokenAccount.address,
    keypair,
    100000000
);

console.log(`Mint tx: ${mintTx}`);
*/
