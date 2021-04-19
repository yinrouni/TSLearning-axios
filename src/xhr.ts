import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      //4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      else {
        request.setRequestHeader(name, headers[name])
      }
    })


    request.send(data)

  })
}
