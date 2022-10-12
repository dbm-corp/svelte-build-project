<script lang="ts">
	import { onMount } from 'svelte'
	import AOS from 'aos'
	import LeftSideBar from '$lib/components/commons/left-sidebar/LeftSideBar.svelte'
	import { loading } from '$lib/store/index'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import '../app.scss'
	import 'aos/dist/aos.css'
	import 'carbon-components-svelte/css/white.css'

	onMount(() => {
		AOS.init({
			// Global settings:
			// disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
			startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
			initClassName: 'aos-init', // class applied after initialization
			animatedClassName: 'aos-animate', // class applied on animation
			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
			disableMutationObserver: false, // disables automatic mutations' detections (advanced)
			debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
			throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 0, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 400, // values from 0 to 3000, with step 50ms
			easing: 'ease-in-out', // default easing for AOS animations
			once: true, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
		})
	})
</script>

<div id="colorlib-page">
	<LeftSideBar />
	<div id="colorlib-main">
		<slot />
	</div>
</div>
{#if $loading}
	<div id="ftco-loader" class="show fullscreen">
		<svg class="circular" width="48px" height="48px">
			<circle
				class="path-bg"
				cx="24"
				cy="24"
				r="22"
				fill="none"
				stroke-width="4"
				stroke="#eeeeee"
			/>
			<circle
				class="path"
				cx="24"
				cy="24"
				r="22"
				fill="none"
				stroke-width="4"
				stroke-miterlimit="10"
				stroke="#F96D00"
			/>
		</svg>
	</div>
{/if}
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&amp;display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css?family=Abril+Fatface&amp;display=swap"
		rel="stylesheet"
	/>
</svelte:head>
