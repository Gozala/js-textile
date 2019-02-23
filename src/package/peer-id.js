import { publicKey } from "../textile/keypair/full"

// @flow strict

export type PrivateKey = string
export type PublicKey = string
export type ID = string

export const createFromPubKey = (publicKey /*:PublicKey*/) /*:ID*/ => {
  throw Error("Not implemented")
}
