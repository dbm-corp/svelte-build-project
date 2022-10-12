import API from '$lib/api'

interface commentPayload {
	data?: {
		CommenterInfos?: {
			Name?: string
			Email?: string
		}
		Website?: string
		Content?: string
		post?: any
	}
}

class CommentService {
	public async postComment(data: commentPayload) {
		const results: any = await API.post(`comments`, data)
		return results
	}
}

export const commentService = new CommentService()
