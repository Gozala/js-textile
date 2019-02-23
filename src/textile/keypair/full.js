// @flow strict

import * as strkey from "../strkey.js"
import * as ed25519 from "../../package/ed25519.js"
import * as peer from "../../package/peer-id.js"
import * as crypto from "../../package/libp2p-crypto.js"

/*::
import type {Result} from "../../package/result.flow.js"
import type {ID} from "../../package/peer-id.js"


export type Full = {
  seed:string;
}

type byte = number
type Address = (Full) => string;
type Hint = (Full) => [byte, byte, byte, byte];
type Seed = (Full) => Result<Error, ID>;
*/

export const address = async (kp /*:Full*/) => {
  strkey.decode(strkey.VersionByteAccountID, await publicKey(kp))
}

export const publicKey = async (
  kp /*:Full*/
) /*:Promise<ed25519.PublicKey>*/ => {
  const [publicKey, _] = await keys(kp)
  return publicKey
}

export const keys = async (
  kp /*:Full*/
) /*:Promise<[ed25519.PublicKey, ed25519.PrivateKey]>*/ => {
  const encoder = new TextEncoder()
  const seed = encoder.encode(kp.seed)
  return ed25519.generateKey(seed)
}

export const id = async (kp /*:Full*/) => {
  const publicKey = await libP2PPubKey(kp)
  return peer.createFromPubKey(publicKey)
}

export const libP2PPubKey = async (kp /*:Full*/) => {
  const key = await publicKey(kp)
  crypto.keys.unmarshalPublicKey(key)
}
