<script lang="ts">
	import { isAuthenticated } from '$lib/stores/auth';
	import LandingPage from '$lib/components/LandingPage/page.svelte';
	import Dashboard from '$lib/components/Dashboard/page.svelte';
</script>

{#if !$isAuthenticated}
	<LandingPage />
{:else}
	<Dashboard />
{/if}
