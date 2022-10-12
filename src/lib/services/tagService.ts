import API from '$lib/api'

interface tagQuery {
	populate?: string
	'pagination[page]'?: number
	'filters[categories][slug][$eq]'?: string
}

class TagService {
	public async getTags(query: tagQuery) {
		const results: any = await API.get(`tags`, query)
		return results
	}

	public async detailTag(slug: string, query: tagQuery) {
		const results: any = await API.get(`tags/${slug}`, query)
		return results
	}
}

export const tagService = new TagService()
