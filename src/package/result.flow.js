// @flow strict

export type Result<x, a> = Ok<a> | Error<x>

type Ok<a> = {| +ok: true, +value: a |}
type Error<x> = {| +ok: false, +error: x |}
