// Should probably use  https://github.com/libp2p/js-libp2p-crypto#supported-key-types

export interface PublicKey {
  bytes(): Uint8Array;
}

export interface PrivateKey {
  bytes(): Uint8Array;
  public: PublicKey;
}

export interface EphemeralKeyPair {
  key: Uint8Array;
  genSharedKey(thirPublicKey: Uint8Array, (Error, Uint8Array) => mixed): void;
}

export type KeyType = "RSA" | "ed25519"
export type Curve = "P-256" | "P-384" | "P-521"

interface Keys {
  generateKeyPair(
    KeyType,
    bits: number,
    (error: ?Error, PrivateKey) => mixed
  ): void;
  generateKeyPairFromSeed(
    KeyType,
    seed: Uint8Array,
    bits: number,
    (error: ?Error, PrivateKey) => mixed
  ): void;
  generateKeyPairFromSeed(
    KeyType,
    seed: Uint8Array,
    (error: ?Error, PrivateKey) => mixed
  ): void;
  generateEphemeralKeyPair(
    curve: Curve,
    (error: ?Error, EphemeralKeyPair) => mixed
  ): void;
}

declare export var keys: Keys
