import {isDate, isObject} from './utils'


//对于字符 @、:、$、,、 、[、]，我们是允许出现在 url 中的，不希望被 encode。
function encode(val: string): string{
  return encodeURIComponent(val).replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string{
  if (!params){
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key)=>{
    let val = params[key]
    if (val === null || typeof val === 'undefined'){
      return 
    }

    let values: string[]

    // 参数值为数组， /base/get?foo[]=bar&foo[]=baz
    if (Array.isArray(val)){
      values = val
      key = key + '[]'

    }
    else {
      values =[val]
    }

    values.forEach((val) =>{
      ///base/get?date=2019-04-01T05:55:39.030Z，date 后面拼接的是 date.toISOString() 的结果。
      if (isDate(val)){
        val = val.toISOString();
      }
      else if (isObject(val)){
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams){

    //丢弃 url 中的哈希标记
    const markIndex = url.indexOf('#')
    if (markIndex !== -1){
      url = url.slice(0, markIndex)
    }

     url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
