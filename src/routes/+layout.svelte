<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initAuth, handleRedirectCallback } from '$lib/auth/authUtils';
	import { isLoading } from '$lib/stores/auth';

	let { children } = $props();

	onMount(async () => {
		if (window.location.search.includes('code=')) {
			await handleRedirectCallback();
		} else {
			await initAuth();
		}
	});
</script>

{#if $isLoading}
	<div>Loading...</div>
{:else}
	<slot />
{/if}
