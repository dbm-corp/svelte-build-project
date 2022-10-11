<script lang="ts">
	import Pagination from '$lib/components/commons/pagination/Pagination.svelte'
	import RightSideBar from '$lib/components/commons/right-sidebar/RightSideBar.svelte'
	import { formatDate } from '$lib/utils/utils'
	import { loading } from '$lib/store/index'
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import Service from '$lib/services'

	export let data: PageData
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
			'pagination[page]': currentPage
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
	<title>Home</title>
	<meta name="description" content="Home app" />
</svelte:head>
{#if !$loading}
	<section class="ftco-section ftco-no-pt ftco-no-pb">
		<div class="container">
			<div class="row d-flex">
				<div class="col-xl-8 py-5 px-md-5" data-aos="fade-in">
					<div class="row pt-md-4">
						{#each postData || [] as post}
							<div class="col-md-12">
								<div class="blog-entry d-md-flex" data-aos="fade-up">
									<!-- svelte-ignore a11y-missing-content -->
									<a
										href="/travel/{post?.attributes?.Slug}"
										class="img img-2"
										style="background-image:url(http://localhost:1337{post?.attributes?.Thumbnail
											?.data?.attributes?.url || ''})"
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
													><a href="/travel/hello-world"
														><i class="icon-folder-o mr-2" />{post?.attributes?.categories?.data[0]
															?.attributes?.Name || ''}</a
													></span
												>
												<span
													><i class="icon-comment2 mr-2" />{post?.attributes?.comments?.data
														?.length} Comment</span
												>
											</p>
										</div>
										<p class="mb-4">
											{post?.attributes?.Description || ''}
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
				<div
					class="col-xl-4 sidebar bg-light pt-5"
					data-aos="fade-up"
					data-aos-offset="200"
					data-aos-delay="100"
					id="right-sidebar"
				>
					<RightSideBar sideBarData={data} />
				</div>
			</div>
		</div>
	</section>
{/if}
