<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initAuth, handleRedirectCallback } from '$lib/auth/authUtils';
	import { isLoading } from '$lib/stores/auth';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	onMount(async () => {
		if ($page.url.searchParams.has('code')) {
			await handleRedirectCallback();
			// コールバック処理後、URLからクエリパラメータを削除
			replaceState('/', {});
		} else {
			await initAuth();
		}
	});
</script>

{#if $isLoading}
	<div class="loading">Loading...</div>
{:else}
	<Header />
	<main class="main-content">
		{@render children()}
	</main>
{/if}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		font-size: 1.2rem;
		color: #666;
	}

	.main-content {
		min-height: calc(100vh - 60px);
	}
</style>
