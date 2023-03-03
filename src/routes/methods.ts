// import { error } from '@sveltejs/kit'
import API from '$lib/api'
import Service from '$lib/services'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement...
export const csr = true

export const ssr = false

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export const prerender = true

type Post = {
	attributes: {
		Title: string
		Description: string
		Content: string
		Thumbnail: any
		Slug: string
		categories: any
		comments: any
		publishedAt: string
		createdBy: any
	}
	id: number
}

type Category = {
	attributes: {
		Title: string
		posts: any
	}
	id: number
}

type Tag = {
	attributes: {
		Title: string
	}
	id: number
}

export const load = async () => {
	// locals.userid comes from src/hooks.js
	const data = {
		posts: [] as Post[],
		categories: [] as Category[],
		tags: [] as Tag[]
	}

	const response = await Promise.all([
		Service.category.getCategories({ populate: '*' }),
		Service.post.getPosts({ populate: '*' }),
		Service.tag.getTags({})
	])

	if (!response[0].data) {
		data.categories = [] as Category[]
	} else {
		data.categories = response[0].data as Category[]
	}

	if (!response[1].data) {
		data.posts = [] as Post[]
	} else {
		data.posts = response[1].data as Post[]
	}

	if (!response[2].data) {
		data.tags = [] as Tag[]
	} else {
		data.tags = response[2].data as Tag[]
	}

	return data
}

export const POST = async ({ request, locals }) => {
	const form = await request.formData()

	await API.post(`todos/${locals.userid}`, {
		text: form.get('text')
	})
}

export const PATCH = async ({ request, locals }) => {
	const form = await request.formData()

	await API.patch(`todos/${locals.userid}/${form.get('uid')}`, {
		text: form.has('text') ? form.get('text') : undefined,
		done: form.has('done') ? !!form.get('done') : undefined
	})
}

export const DELETE = async ({ request, locals }) => {
	const form = await request.formData()

	await API.delete(`todos/${locals.userid}/${form.get('uid')}`, {})
}
