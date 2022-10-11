<script lang="ts">
	import RightSideBar from '$lib/components/commons/right-sidebar/RightSideBar.svelte'
	import { onMount } from 'svelte'
	import { loading } from '$lib/store/index'
	import type { PageData } from './$types'
	import { formatDate } from '$lib/utils/utils'
	import { page } from '$app/stores'
	import Service from '$lib/services'

	type FormContent = {
		CommenterInfos: {
			Name: string
			Email: string
		}
		Website: string
		Content: string
		post: any
	}

	type DetailPost = {
		attributes: {
			Content: string
			Description: string
			Slug: string
			Thumbnail: any
			Title: string
			createdAt: string
			categories: any
			locale: string
			publishedAt: string
			updatedAt: string
			updatedBy: any
			comments: any
		}
		id: number
	}

	export let data: PageData
	let detailPost: DetailPost

	let formContent: FormContent = {
		CommenterInfos: {
			Name: '',
			Email: ''
		},
		Website: '',
		Content: '',
		post: null
	}

	onMount(async () => {
		loading.set(true)
		await fetchData()
		loading.set(false)
	})

	const fetchData: Function = async () => {
		const response = await Service.post.detailPost($page.params.slug, { populate: 'deep' })
		detailPost = (response?.data || {}) as DetailPost
		formContent.post = detailPost.id || null
	}

	const submitHandler: Function = async () => {
		Service.comment
			.postComment({
				data: formContent
			})
			.then(() => {
				fetchData()
			})
	}
</script>

<svelte:head>
	<title>Travel Detail</title>
	<meta name="description" content="Travel detail this app" />
</svelte:head>

{#if !$loading}
	<section class="ftco-section ftco-no-pt ftco-no-pb">
		<div class="container">
			<div class="row d-flex">
				<div class="col-lg-8 px-md-5 py-5" data-aos="fade-up">
					<div class="row pt-md-4">
						{@html detailPost?.attributes?.Content || ''}
						<div class="tag-widget post-tag-container mb-5 mt-5">
							<div class="tagcloud">
								{#each detailPost?.attributes?.categories?.data || [] as category}
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a href="#" class="tag-cloud-link">{category?.attributes?.Name || ''}</a>
								{/each}
							</div>
						</div>
						<div class="about-author d-flex p-4 bg-light">
							<div class="bio mr-5">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img src="/images/person_1.jpg" alt="Image placeholder" class="img-fluid mb-4" />
							</div>
							<div class="desc">
								<h3>
									{detailPost?.attributes?.updatedBy?.data?.attributes?.firstname || ''}
									{detailPost?.attributes?.updatedBy?.data?.attributes?.lastname || ''}
								</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem
									necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa
									sapiente consectetur similique, inventore eos fugit cupiditate numquam!
								</p>
							</div>
						</div>
						<div class="pt-5 mt-5 w-100">
							<h3 class="mb-5 font-weight-bold">
								{detailPost?.attributes?.comments?.data?.length || 0} Comments
							</h3>
							<ul class="comment-list">
								{#each detailPost?.attributes?.comments?.data || [] as comment}
									<li class="comment">
										<div class="vcard bio">
											<!-- svelte-ignore a11y-img-redundant-alt -->
											<img src="/images/person_1.jpg" alt="Image placeholder" />
										</div>
										<div class="comment-body">
											<h3>{comment?.attributes?.CommenterInfos?.Name}</h3>
											<div class="meta">
												{formatDate(comment?.attributes?.createdAt, 'YYYY-MM-DD')}
											</div>
											<p>
												{comment?.attributes?.Content}
											</p>
										</div>
									</li>
								{/each}
								<!-- <li class="comment">
									<div class="vcard bio">
										<img src="/images/person_1.jpg" alt="Image placeholder" />
									</div>
									<div class="comment-body">
										<h3>John Doe</h3>
										<div class="meta">October 03, 2018 at 2:21pm</div>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem
											laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe
											enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?
										</p>
										<p>
											<a href="#" class="reply">Reply</a>
										</p>
									</div>
									<ul class="children">
										<li class="comment">
											<div class="vcard bio">
												<img src="/images/person_1.jpg" alt="Image placeholder" />
											</div>
											<div class="comment-body">
												<h3>John Doe</h3>
												<div class="meta">October 03, 2018 at 2:21pm</div>
												<p>
													Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem
													laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat
													saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus,
													nihil?
												</p>
												<p>
													<a href="#" class="reply">Reply</a>
												</p>
											</div>
											<ul class="children">
												<li class="comment">
													<div class="vcard bio">
														<img src="/images/person_1.jpg" alt="Image placeholder" />
													</div>
													<div class="comment-body">
														<h3>John Doe</h3>
														<div class="meta">October 03, 2018 at 2:21pm</div>
														<p>
															Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
															quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia,
															fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit
															necessitatibus, nihil?
														</p>
														<p>
															<a href="#" class="reply">Reply</a>
														</p>
													</div>
													<ul class="children">
														<li class="comment">
															<div class="vcard bio">
																<img src="/images/person_1.jpg" alt="Image placeholder" />
															</div>
															<div class="comment-body">
																<h3>John Doe</h3>
																<div class="meta">October 03, 2018 at 2:21pm</div>
																<p>
																	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
																	quidem laborum necessitatibus, ipsam impedit vitae autem, eum
																	officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
																	impedit necessitatibus, nihil?
																</p>
																<p>
																	<a href="#" class="reply">Reply</a>
																</p>
															</div>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li> -->
							</ul>

							<div class="comment-form-wrap pt-5">
								<h3 class="mb-5">Leave a comment</h3>
								<form
									method="post"
									on:submit|preventDefault={() => submitHandler()}
									class="p-3 p-md-5 bg-light"
								>
									<div class="form-group">
										<label for="name">Name *</label>
										<input
											type="text"
											class="form-control"
											id="name"
											name="name"
											bind:value={formContent.CommenterInfos.Name}
										/>
									</div>
									<div class="form-group">
										<label for="email">Email *</label>
										<input
											type="email"
											class="form-control"
											id="email"
											name="email"
											bind:value={formContent.CommenterInfos.Email}
										/>
									</div>
									<div class="form-group">
										<label for="website">Website</label>
										<input
											type="url"
											class="form-control"
											id="website"
											name="website"
											bind:value={formContent.Website}
										/>
									</div>
									<div class="form-group">
										<label for="message">Message</label>
										<textarea
											name="message"
											id="message"
											cols="30"
											rows="10"
											class="form-control"
											bind:value={formContent.Content}
										/>
									</div>
									<div class="form-group">
										<input type="submit" value="Post Comment" class="btn py-3 px-4 btn-primary" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-lg-4 sidebar ftco-animate bg-light pt-5"
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
