import API from '$lib/api'

interface postQuery {
	populate?: string
	'pagination[page]'?: number
	'filters[categories][slug][$eq]'?: string
}

class PostService {
	public async getPosts(query: postQuery) {
		const results: any = await API.get(`posts`, query)
		return results
	}

	public async detailPost(slug: string, query: postQuery) {
		const results: any = await API.get(`posts/${slug}`, query)
		return results
	}
}

export const postService = new PostService()
