import API from '$lib/api'

export const getTags: Function = async (query: any) => {
	const results = await API.get(`tags`, query)
	return results
}

export const detailTag: Function = async (slug: string, query: any) => {
	const results = await API.get(`tags/${slug}`, query)
	return results
}

const tagService = {
	getTags,
	detailTag
}
export default tagService
