// @flow strict

import * as base58 from "../package/base58.js"
import * as crc16 from "./crc16.js"

/*::
import type {Result} from "../package/result.flow.js"
export opaque type VersionByte = number
*/

export const VersionByteAccountID /*:VersionByte*/ = 0xdd
export const VersionByteSeed /*:VersionByte*/ = 0xff

class DecodeError extends Error {}
class InvalidVersionByteError extends Error {
  constructor() {
    super("invalid version byte")
  }
}

export const decode = (
  expected /*:VersionByte*/,
  src /*:string*/
) /*:Result<InvalidVersionByteError | DecodeError | crc16.InvalidChecksumError, ArrayBuffer>*/ => {
  const result = checkValidVersionByte(expected)
  if (!result.ok) {
    return result
  }

  const decodeResult = decodeString(src)
  if (!decodeResult.ok) {
    return decodeResult
  }
  const raw = new Uint8Array(decodeResult.value)
  const version /*:VersionByte*/ = raw[0]
  const vp = raw.slice(0, raw.byteLength - 2)
  const payload = raw.slice(1, raw.byteLength - 2)
  const checksum = raw.slice(raw.byteLength - 2)

  if (version != expected) {
    return { ok: false, error: new InvalidVersionByteError() }
  }

  const validate = crc16.validate(toArrayBuffer(vp), toArrayBuffer(checksum))
  if (validate != null) {
    return { ok: false, error: validate }
  }

  return {
    ok: true,
    value: toArrayBuffer(payload)
  }
}

const toArrayBuffer = (
  { buffer, byteOffset, byteLength } /*:Uint8Array*/
) /*:ArrayBuffer*/ => buffer.slice(byteOffset, byteLength)

// checkValidVersionByte returns an error if the provided value
// is not one of the defined valid version byte constants.
const checkValidVersionByte = (
  version /*:VersionByte*/
) /*:Result<InvalidVersionByteError, null>*/ => {
  switch (version) {
    case VersionByteAccountID:
      return { ok: true, value: null }
    case VersionByteSeed:
      return { ok: true, value: null }
    default: {
      return { ok: false, error: new InvalidVersionByteError() }
    }
  }
}

// decodeString decodes a base58 string into the raw bytes, and ensures it could
// potentially be strkey encoded (i.e. it has both a version byte and a
// checksum, neither of which are explicitly checked by this func)
export const decodeString = (
  src /*:string*/
) /*:Result<DecodeError, ArrayBuffer>*/ => {
  const decode = base58.decode(src)
  if (!decode.ok) {
    return {
      ok: false,
      error: new DecodeError(`base58 decode failed: ${decode.error.message}`)
    }
  }

  if (decode.value.byteLength < 3) {
    return {
      ok: false,
      error: new DecodeError(
        `encoded value is ${
          decode.value.byteLength
        } bytes; minimum valid length is 3`
      )
    }
  }

  return { ok: true, value: decode.value }
}
