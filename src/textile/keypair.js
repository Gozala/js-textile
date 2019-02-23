// @flow strict

/*::
import * as PeerID from "../package/peer-id.js"
import type { Full } from "./keypair/full.js"
type byte = number

export type Keypair = {
  address: string,
  hint: [byte, byte, byte, byte],
  id: PeerID.ID,
  libP2PPrivKey: PeerID.PrivateKey,
  libP2PPubKey: PeerID.PublicKey,
  verify(input: ArrayBuffer, signature: ArrayBuffer): Promise<boolean>,
  sign(input: ArrayBuffer): Promise<ArrayBuffer>,
  encrypt(input: ArrayBuffer): Promise<ArrayBuffer>,
  decrypt(input: ArrayBuffer): Promise<ArrayBuffer>
}

export type { Full }
type Random = () => Full
type Parse = (addressOrSeed: string) => Keypair
type FromRawSeed = (rawSeed: ArrayBuffer) => Full
*/
