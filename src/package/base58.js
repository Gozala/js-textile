// @flow strict

/*::
import type {Result} from "./result.flow.js"
*/

export class DecodeError extends Error {
  constructor(message /*:string*/) {
    super(message)
  }
}

export const encode = (buffer /*:ArrayBuffer*/) /*:string*/ => {
  throw Error("base58 encode is not implemented")
}

export const decode = (
  source /*:string*/
) /*:Result<DecodeError, ArrayBuffer>*/ => {
  return {
    ok: false,
    error: new DecodeError("base58 decode is not implemented")
  }
}
