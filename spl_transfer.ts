// Gill SPL Token Transfer
// Transfers tokens between addresses using the specified mint
import {
  address,
  createSolanaClient,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "gill";
import { loadKeypairSignerFromFile } from "gill/node";
import { buildTransferTokensTransaction, TOKEN_2022_PROGRAM_ADDRESS } from "gill/programs/token";

(async () => {
  try {
    // Connect to Solana devnet
    const { rpc, sendAndConfirmTransaction } = createSolanaClient({
      urlOrMoniker: "devnet",
    });

    // Load your wallet
    const signer = await loadKeypairSignerFromFile("turbin3-wallet.json");
    console.log("signer:", signer.address);

    // Get latest blockhash
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    // Set mint address (update this after running spl_init.ts)
    const mint = address("a9UNzsripUYA66VT14fKpmqP7KVHGa9TTXC826jw6Vf");
    console.log("mint:", mint);

    // Build transfer transaction
    const tx = await buildTransferTokensTransaction({
      feePayer: signer,
      version: "legacy",
      latestBlockhash,
      amount: 10_000_000, // 10 tokens with 6 decimals
      authority: signer,
      destination: address("EuUjJYVmtmCnM3uodKyyn2BePDLExjwtwvcDDRzgLTEr"), // Transfer to specific recipient
      mint,
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

    console.log("Tokens transferred successfully!");
    console.log("Amount: 10 tokens");
    console.log("From: ", signer.address);
    console.log("To: ", signer.address);

  } catch (err) {
    console.error("Unable to transfer tokens");
    console.error(err);
  }
})();

// ===== ORIGINAL @solana/web3.js IMPLEMENTATION (COMMENTED OUT) =====
/*
import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BgU2w5QKVjX1Gc4rP4S4sf2hYcYszDssQnHnzYRuxu4e")

// Recipient address
const to = new PublicKey("EuUjJYVmtmCnM3uodKyyn2BePDLExjwtwvcDDRzgLTEr");       

(async () => {try {
    const fromwallet = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    );
    const towallet = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        to, 
    );
    const signature = await transfer (
        connection,
        keypair,
        fromwallet.address,
        towallet.address,
        keypair,
        1,
    );
    console.log(`Transaction signature: ${signature}`);

    
} catch(e) {
    console.error(`Oops, something went wrong: ${e}`)
}
})();
*/