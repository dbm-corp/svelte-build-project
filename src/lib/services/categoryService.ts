import API from '$lib/api'

interface categoryQuery {
	populate?: string
	'pagination[page]'?: number
	'filters[categories][slug][$eq]'?: string
}

class CategoryService {
	public async getCategories(query: categoryQuery) {
		const results: any = await API.get(`categories`, query)
		return results
	}

	public async detailCategory(slug: string, query: categoryQuery) {
		const results: any = await API.get(`categories/${slug}`, query)
		return results
	}
}

export const categoryService = new CategoryService()
