import API from '$lib/api'

export const postComment: Function = async (data: any) => {
	const results = await API.post(`posts`, data)
	return results
}

const commentService = {
	postComment
}
export default commentService
