// Gill SPL Token Creation
// Creates a new token with metadata in a single transaction
import {
  createSolanaClient,
  generateKeyPairSigner,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "gill";
import { loadKeypairSignerFromFile } from "gill/node";
import { buildCreateTokenTransaction, TOKEN_2022_PROGRAM_ADDRESS } from "gill/programs/token";

(async () => {
  try {
    // Connect to Solana devnet
    const { rpc, sendAndConfirmTransaction } = createSolanaClient({
      urlOrMoniker: "devnet",
    });

    // Load your wallet (create turbin3-wallet.json first)
    const signer = await loadKeypairSignerFromFile("turbin3-wallet.json");
    console.log("signer:", signer.address);

    // Get latest blockhash for transaction
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    // Generate new mint keypair for the token
    const tokenProgram = TOKEN_2022_PROGRAM_ADDRESS;
    const mint = await generateKeyPairSigner();
    console.log("mint:", mint.address);

    // Build token creation transaction with metadata
    const tx = await buildCreateTokenTransaction({
      feePayer: signer,
      version: "legacy",
      decimals: 6,
      metadata: {
        isMutable: true,
        name: "TiRiLi",
        symbol: "TIRILI",
        uri: "ipfs://bafkreihovxky37tym2qldgkohkdna25kukzjfhtlyd3wudnfkee36w56ve",
      },
      mint,
      latestBlockhash,
      tokenProgram,
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

    console.log("Token created successfully!");
    console.log("Mint address:", mint.address);
    console.log("Token metadata URI:", "ipfs://bafkreihovxky37tym2qldgkohkdna25kukzjfhtlyd3wudnfkee36w56ve");

  } catch (err) {
    console.error("Unable to create token");
    console.error(err);
  }
})();

// ===== ORIGINAL @solana/web3.js IMPLEMENTATION (COMMENTED OUT) =====
/*
import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        const mint = await createMint(
            connection, 
            keypair, 
            keypair.publicKey, 
            null,
            6
        );
        console.log(`Mint created: ${mint.toBase58()}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
*/
