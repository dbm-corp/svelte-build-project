<script lang="ts">
	import Pagination from '$lib/components/commons/pagination/Pagination.svelte'
	import RightSideBar from '$lib/components/commons/right-sidebar/RightSideBar.svelte'
	import { onMount } from 'svelte'
	import { loading } from '$lib/store/index'
	import type { PageData } from './$types'
	import { formatDate } from '$lib/utils/utils'
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
			'pagination[page]': currentPage,
			'filters[categories][slug][$eq]': 'travel'
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
	<title>Travel</title>
	<meta name="description" content="Travel this app" />
</svelte:head>

{#if !$loading}
	<section class="ftco-section ftco-no-pt ftco-no-pb" data-aos="fade-in">
		<div class="container">
			<div class="row d-flex">
				<div class="col-xl-8 px-md-5 py-5">
					<div class="row pt-md-4">
						{#each postData || [] as post}
							<div class="col-md-12" data-aos="fade-up">
								<div class="blog-entry-2">
									<!-- svelte-ignore a11y-missing-content -->
									<a
										href="/travel/{post?.attributes?.Slug}"
										class="img"
										style="background-image:url(http://localhost:1337{post?.attributes?.Thumbnail
											?.data?.attributes?.url || ''})"
									/>
									<div class="text pt-4">
										<h3 class="mb-4">
											<!-- svelte-ignore a11y-invalid-attribute -->
											<a href="/travel/{post?.attributes?.Slug}">{post?.attributes?.Title}</a>
										</h3>
										<p class="mb-4">
											{post?.attributes?.Description}
										</p>
										<div class="author mb-4 d-flex align-items-center">
											<!-- svelte-ignore a11y-missing-content -->
											<!-- svelte-ignore a11y-invalid-attribute -->
											<a
												href="/travel/hello-world"
												class="img"
												style="background-image:url(/images/xperson_1.jpg.pagespeed.ic.P4pHl6glbj.jpg)"
											/>
											<div class="ml-3 info">
												<span>Written by</span>
												<!-- svelte-ignore a11y-invalid-attribute -->
												<h3>
													<!-- svelte-ignore a11y-invalid-attribute -->
													<a href="#">Dave Lewis</a>,
													<span>{formatDate(post?.attributes?.publishedAt, 'YYYY-MM-DD')}</span>
												</h3>
											</div>
										</div>
										<div class="meta-wrap d-md-flex align-items-center">
											<div class="half order-md-last text-md-right">
												<p class="meta">
													<span><i class="icon-heart" />3</span>
													<span><i class="icon-eye" />100</span>
													<span
														><i class="icon-comment" />{post?.attributes?.comments?.data
															?.length}</span
													>
												</p>
											</div>
											<div class="half">
												<p>
													<!-- svelte-ignore a11y-invalid-attribute -->
													<a
														href="/travel/{post?.attributes?.Slug}"
														class="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a
													>
												</p>
											</div>
										</div>
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
				>
					<RightSideBar sideBarData={data} />
				</div>
			</div>
		</div>
	</section>
{/if}
