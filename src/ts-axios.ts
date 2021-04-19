// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

import {AxiosRequestConfig} from './types/index'
import xhr from './xhr'
import {buildURL} from './helpers/url'

function transformUrl(config: AxiosRequestConfig): string{
  const {url, params} = config
  return buildURL(url, params)
}

function processConfig(config: AxiosRequestConfig): void{
  config.url = transformUrl(config)
}



function axios(config: AxiosRequestConfig): void{
  processConfig(config)
  xhr(config)
}

export default axios
