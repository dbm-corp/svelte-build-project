import API from '$lib/api'

export const getCategories: Function = async (query: any) => {
	const results = await API.get(`categories`, query)
	return results
}

export const detailCategory: Function = async (slug: string, query: any) => {
	const results = await API.get(`categories/${slug}`, query)
	return results
}

const categoryService = {
	getCategories,
	detailCategory
}
export default categoryService
