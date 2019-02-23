// @flow strict

import * as crypto from "./libp2p-crypto.js"

export type PrivateKey = crypto.PrivateKey
export type PublicKey = crypto.PublicKey

export const generateKey = (
  seed: Uint8Array
) /*:Promise<[PublicKey, PrivateKey]>*/ =>
  new Promise((resolve, reject) => {
    crypto.keys.generateKeyPairFromSeed(
      "ed25519",
      seed,
      seed.byteLength,
      (error, key) => {
        if (error) {
          reject(error)
        } else {
          resolve([key.public, key])
        }
      }
    )
  })
