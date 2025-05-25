<script lang="ts">
	import { browser } from '$app/environment';
	import { login } from '$lib/auth/authUtils';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	// すでにログインしている場合はホームページにリダイレクト
	$: if (browser && $isAuthenticated) {
		goto('/');
	}
</script>

<div class="login-container">
	<div class="login-box">
		<h1>ログイン</h1>
		<p class="description">
			Left Overへようこそ。<br />
			アカウントにログインして、サービスをご利用ください。
		</p>
		<button class="login-button" on:click={login}>
			<img src="/auth0-logo.svg" alt="Auth0" class="auth0-logo" />
			Auth0でログイン
		</button>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.login-box {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		text-align: center;
		max-width: 400px;
		width: 90%;
	}

	h1 {
		color: #333;
		margin-bottom: 1rem;
		font-size: 1.8rem;
	}

	.description {
		color: #666;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.login-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background-color: #eb5424;
		color: white;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
		width: 100%;
	}

	.login-button:hover {
		background-color: #d44a1f;
	}

	.auth0-logo {
		height: 20px;
		width: auto;
	}
</style>
