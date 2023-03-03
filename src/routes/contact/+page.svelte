<script lang="ts">
	import { onMount } from 'svelte'
	import { loading } from '$lib/store/index'

	let container: any
	let map: any
	let service: any
	let infoWindow: any
	let zoom: number = 15
	let center: any = { lat: 51.5127494, lng: 7.4829757 }

	const googleApis = (time) => {
		return new Promise((resolve) =>
			setTimeout(() => {
				loading.set(false)
				resolve(() => true)
			}, time)
		)
	}

	onMount(async () => {
		loading.set(true)
		await googleApis(500)

		const options = {
			zoom,
			center
		}
		// setup the general Map with the provided options
		map = new google.maps.Map(container, options)

		// query the Google Places API
		const request = {
			query: 'ShipBit',
			fields: ['name', 'geometry']
		}
		service = new google.maps.places.PlacesService(map)

		// create a custom marker at the found place
		service.findPlaceFromQuery(request, (results: any, status: any) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (let i = 0; i < results.length; i++) {
					const place = results[i]
					const marker = new google.maps.Marker({
						map,
						position: place.geometry.location
					})

					marker.addListener('click', () => {
						infoWindow = new google.maps.InfoWindow({
							content: `Add your marker HTML content here`
						})
						infoWindow.open(map, marker)
					})
				}
				map.setCenter(results[0].geometry.location)
			}
		})
	})
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact this app" />
	<script
		defer
		async
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&amp"
	>
	</script>
</svelte:head>

{#if !$loading}
	<section class="ftco-section contact-section px-md-4" data-aos="fade-in">
		<div class="container">
			<div class="row d-flex mb-5 contact-info">
				<div class="col-md-12 mb-4">
					<h2 class="h3">Contact Information</h2>
				</div>
				<div class="w-100" />
				<div class="col-lg-6 col-xl-3 d-flex mb-4">
					<div class="info bg-light p-4">
						<p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
					</div>
				</div>
				<div class="col-lg-6 col-xl-3 d-flex mb-4">
					<div class="info bg-light p-4">
						<p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
					</div>
				</div>
				<div class="col-lg-6 col-xl-3 d-flex mb-4">
					<div class="info bg-light p-4">
						<p>
							<span>Email:</span>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#"
								><span class="__cf_email__" data-cfemail="cba2a5ada48bb2a4beb9b8a2bfaee5a8a4a6"
									>[email&#160;protected]</span
								></a
							>
						</p>
					</div>
				</div>
				<div class="col-lg-6 col-xl-3 d-flex mb-4">
					<div class="info bg-light p-4">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<p><span>Website</span> <a href="#">yoursite.com</a></p>
					</div>
				</div>
			</div>
			<div class="row block-9">
				<div class="col-lg-6 d-flex">
					<form action="#" class="bg-light p-5 contact-form">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Your Name" />
						</div>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Your Email" />
						</div>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Subject" />
						</div>
						<div class="form-group">
							<textarea
								name=""
								id=""
								cols="30"
								rows="7"
								class="form-control"
								placeholder="Message"
							/>
						</div>
						<div class="form-group">
							<input type="submit" value="Send Message" class="btn btn-primary py-3 px-5" />
						</div>
					</form>
				</div>
				<div class="col-lg-6 d-flex">
					<div id="map" class="bg-light map" bind:this={container} />
				</div>
			</div>
		</div>
	</section>
{/if}
