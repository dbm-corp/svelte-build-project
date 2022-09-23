// import { error } from '@sveltejs/kit'
import API from '$lib/api'

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

	const response = await API.get('posts?populate=*', {})

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
