<script lang="ts">
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { login, logout } from '$lib/auth/authUtils';
</script>

<header class="header">
	<div class="container">
		<div class="logo">
			<a href="/">Left Over</a>
		</div>

		<nav class="nav">
			{#if $isAuthenticated && $user}
				<div class="user-info">
					{#if $user.picture}
						<img src={$user.picture} alt="User avatar" class="avatar" />
					{/if}
					<span class="username">こんにちは、{$user.name || $user.email}さん</span>
				</div>
				<button class="logout-btn" on:click={logout}> ログアウト </button>
			{:else}
				<button class="login-btn" on:click={login}> ログイン </button>
			{/if}
		</nav>
	</div>
</header>

<style>
	.header {
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		padding: 0.5rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo a {
		font-size: 1.5rem;
		font-weight: bold;
		color: #eb5424;
		text-decoration: none;
		transition: color 0.2s;
	}

	.logo a:hover {
		color: #d44a1f;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background-color: #f8f9fa;
		border-radius: 8px;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.username {
		font-size: 0.9rem;
		color: #333;
		font-weight: 500;
	}

	.login-btn,
	.logout-btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: background-color 0.2s;
		font-weight: 500;
	}

	.login-btn {
		background-color: #eb5424;
		color: white;
	}

	.login-btn:hover {
		background-color: #d44a1f;
	}

	.logout-btn {
		background-color: #6c757d;
		color: white;
	}

	.logout-btn:hover {
		background-color: #5a6268;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 0.5rem;
		}

		.user-info {
			flex-direction: column;
			gap: 0.25rem;
			padding: 0.25rem;
		}

		.username {
			font-size: 0.8rem;
		}

		.login-btn,
		.logout-btn {
			padding: 0.4rem 0.8rem;
			font-size: 0.8rem;
		}
	}
</style>
