export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//axios 函数返回的是一个 Promise 对象，我们可以定义一个 AxiosPromise 接口，它继承于 Promise<AxiosResponse> 这个泛型接口：
export interface AxiosPromise extends Promise<AxiosResponse> {

}


export type Method = 'get' | 'GET' | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

