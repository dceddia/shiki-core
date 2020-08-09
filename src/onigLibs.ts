/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict'

import { IOnigLib } from 'vscode-textmate'

let onigasmLib: Promise<IOnigLib> = null
let onigurumaLib: Promise<IOnigLib> | null = null

export function getOnigasm(): Promise<IOnigLib> {
  if (!onigasmLib) {
    const onigasmModule = require('onigasm')
    const onigasmIndexpath = require.resolve('onigasm')

    const fs = require('fs')
    const path = require('path')
    const wasmBin = fs.readFileSync(path.join(onigasmIndexpath, '../onigasm.wasm')).buffer
    onigasmLib = onigasmModule.loadWASM(wasmBin).then((_: any) => {
      return {
        createOnigScanner(patterns: string[]) {
          return new onigasmModule.OnigScanner(patterns)
        },
        createOnigString(s: string) {
          return new onigasmModule.OnigString(s)
        }
      }
    })
  }
  return onigasmLib
}

export function getOniguruma(): Promise<IOnigLib> {
  if (!onigurumaLib) {
    let getOnigModule: any = (function () {
      let onigurumaModule: any = null
      return function () {
        if (!onigurumaModule) {
          onigurumaModule = require('oniguruma')
        }
        return onigurumaModule
      }
    })()
    onigurumaLib = Promise.resolve({
      createOnigScanner(patterns: string[]) {
        let onigurumaModule = getOnigModule()
        return new onigurumaModule.OnigScanner(patterns)
      },
      createOnigString(s: string) {
        let onigurumaModule = getOnigModule()
        let string = new onigurumaModule.OnigString(s)
        string.content = s
        return string
      }
    })
  }
  return onigurumaLib
}
