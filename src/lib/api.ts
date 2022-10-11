// Api.js
import axios from 'axios'

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL // it's not recommended to have this info here.
})

// implement a method to execute all the request from here.
const apiRequest: Function = (method: string, url: string, request: string, query: any) => {
	const headers: any = {
		authorization: null
	}
	//using the axios instance to perform the request that received from each http method
	return axiosAPI({
		method,
		url,
		data: request,
		params: query,
		headers
	})
		.then((res: any) => {
			return Promise.resolve(res.data)
		})
		.catch((err: any) => {
			return Promise.reject(err)
		})
}

// function to execute the http get request
const get: Function = (url, query) => apiRequest('get', url, {}, query)

// function to execute the http delete request
const deleteRequest: Function = (url, request) => apiRequest('delete', url, request)

// function to execute the http post request
const post: Function = (url, request) => apiRequest('post', url, request)

// function to execute the http put request
const put: Function = (url, request) => apiRequest('put', url, request)

// function to execute the http path request
const patch: Function = (url, request) => apiRequest('patch', url, request)

// expose your method to other services or actions
const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch
}
export default API
