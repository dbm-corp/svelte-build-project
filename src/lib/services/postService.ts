import API from '$lib/api'

export const getPosts: Function = async (query: any) => {
	const results = await API.get(`posts`, query)
	return results
}

export const detailPost: Function = async (slug: string, query: any) => {
	const results = await API.get(`posts/${slug}`, query)
	return results
}

const postService = {
	getPosts,
	detailPost
}
export default postService
