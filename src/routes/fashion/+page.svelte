<script lang="ts">
	import Pagination from '$lib/components/commons/pagination/Pagination.svelte'
	import { onMount } from 'svelte'
	import { loading } from '$lib/store/index'
	import { formatDate } from '$lib/utils/utils'
	import Service from '$lib/services'

	let postData: Post[]
	let postPagination: PostPagination
	let currentPage: number = 1

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

	type PostPagination = {
		page: number
		pageCount: number
		pageSize: number
		total: number
	}

	onMount(() => {
		fetchData()
	})

	const fetchData: Function = async () => {
		loading.set(true)
		const response = await Service.post.getPosts({
			populate: '*',
			'pagination[page]': currentPage,
			'filters[categories][slug][$eq]': 'fashion'
		})
		postData = (response?.data || []) as Post[]
		postPagination = (response?.meta?.pagination || {}) as PostPagination
		loading.set(false)
	}

	function handleChangePage(data) {
		if (!data?.detail?.page) {
			return
		}

		currentPage = data.detail.page
		fetchData()
	}
</script>

<svelte:head>
	<title>Fashion</title>
	<meta name="description" content="Fashion this app" />
</svelte:head>

{#if !$loading}
	<section class="ftco-section" data-aos="fade-in">
		<div class="container">
			<div class="row px-md-4">
				{#each postData || [] as post}
					<div class="col-md-12" data-aos="fade-up">
						<div class="blog-entry ftco-animate d-md-flex">
							<!-- svelte-ignore a11y-missing-content -->
							<a
								href="/travel/hello-world"
								class="img img-2"
								style="background-image:url(http://localhost:1337{post?.attributes?.Thumbnail?.data
									?.attributes?.url || ''})"
							/>
							<div class="text text-2 pl-md-4">
								<h3 class="mb-2">
									<a href="/travel/{post?.attributes?.Slug}">{post?.attributes?.Title}</a>
								</h3>
								<div class="meta-wrap">
									<p class="meta">
										<span
											><i class="icon-calendar mr-2" />{formatDate(
												post?.attributes?.publishedAt,
												'YYYY-MM-DD'
											)}</span
										>
										<span
											><a href="/travel/hello-world"><i class="icon-folder-o mr-2" />Travel</a
											></span
										>
										<span
											><i class="icon-comment2 mr-2" />{post?.attributes?.comments?.data?.length} Comment</span
										>
									</p>
								</div>
								<p class="mb-4">
									{post?.attributes?.Description}
								</p>
								<!-- svelte-ignore a11y-invalid-attribute -->
								<p>
									<a href="/travel/{post?.attributes?.Slug}" class="btn-custom"
										>Read More <span class="ion-ios-arrow-forward" /></a
									>
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
			{#if postPagination?.pageCount > 1}
				<div class="row">
					<div class="col">
						<Pagination paginationData={postPagination} on:changePage={handleChangePage} />
					</div>
				</div>
			{/if}
		</div>
	</section>
{/if}
