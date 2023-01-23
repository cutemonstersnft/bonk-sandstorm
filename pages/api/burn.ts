import { getAssociatedTokenAddress, getMint, createBurnCheckedInstruction } from "@solana/spl-token"
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { NextApiRequest, NextApiResponse } from "next"
import { bonkAddress } from "../../lib/addresses"
import base58 from 'bs58'
import calculatePrice from "../../lib/calculatePrice"


export type MakeTransactionInputData = {
  account: string,
}

type MakeTransactionGetResponse = {
  label: string,
  icon: string,
}

export type MakeTransactionOutputData = {
  transaction: string,
  message: string,
}

type ErrorOutput = {
  error: string
}

function get(res: NextApiResponse<MakeTransactionGetResponse>) {
  res.status(200).json({
    label: "Burn Bonk!🔥",
    icon: "https://shdw-drive.genesysgo.net/HcnRQ2WJHfJzSgPrs4pPtEkiQjYTu1Bf6DmMns1yEWr8/bonkapi.png",
  })
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse<MakeTransactionOutputData | ErrorOutput>
) {
  try {
    
    // We pass the selected items in the query, calculate the expected cost
    const amount = calculatePrice(req.query)
    if (amount.toNumber() === 0) {
      res.status(400).json({ error: "Can't checkout with charge of 0" })
      return
    }

    const { reference } = req.query
    if (!reference) {
      res.status(400).json({ error: "No reference provided" })
      return
    }

    // We pass the buyer's public key in JSON body
    const { account } = req.body as MakeTransactionInputData
    if (!account) {
      res.status(40).json({ error: "No account provided" })
      return
    }
    const shopPrivateKey = process.env.SHOP_PRIVATE_KEY as string
    if (!shopPrivateKey) {
      res.status(500).json({ error: "Shop private key not available" })
    }
    const shopKeypair = Keypair.fromSecretKey(base58.decode(shopPrivateKey))

    const buyerPublicKey = new PublicKey(account)
    const shopPublicKey = shopKeypair.publicKey
    const apiKey = process.env.HELIUS_API_KEY as string
    const connection = new Connection(`https://rpc.helius.xyz/?api-key=${apiKey}`);

    
    // Get a recent blockhash to include in the transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

  
    const bonkMint = await getMint(connection, bonkAddress)
    const buyerbonkAddress = await getAssociatedTokenAddress(bonkAddress, buyerPublicKey)

    const transaction = new Transaction({
      feePayer: shopPublicKey,
      blockhash,
      lastValidBlockHeight,
    });
    
    const burnInstruction = createBurnCheckedInstruction(
      buyerbonkAddress,
      bonkAddress, 
      buyerPublicKey, 
      amount.toNumber() * (10 ** bonkMint.decimals) * (1000000),
      bonkMint.decimals, 
    )

    burnInstruction.keys.push({
      pubkey: new PublicKey(reference),
      isSigner: false,
      isWritable: false,
    })

    transaction.add(burnInstruction)

    transaction.partialSign(shopKeypair)

    const serializedTransaction = transaction.serialize({
      // We will need the buyer to sign this transaction after it's returned to them
      requireAllSignatures: false
    })
    const base64 = serializedTransaction.toString('base64')


    const message = "Thank you for burning BONK! 🔥"

    // Return the serialized transaction
    res.status(200).json({
      transaction: base64,
      message,
    })
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'error creating transaction', })
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MakeTransactionGetResponse | MakeTransactionOutputData | ErrorOutput>
) {
  if (req.method === "GET") {
    return get(res)
  } else if (req.method === "POST") {
    return await post(req, res)
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}