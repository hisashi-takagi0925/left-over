<script lang="ts">
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { login, logout } from '$lib/auth/authUtils';
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- ロゴ -->
			<div class="flex items-center">
				<a href="/" class="text-2xl font-bold text-blue-600 transition-colors hover:text-blue-700">
					寄付プラットフォーム
				</a>
			</div>

			<!-- ナビゲーション -->
			<nav class="hidden items-center space-x-8 md:flex">
				<a
					href="/top"
					class="font-medium text-gray-700 transition-colors hover:text-blue-600 {$page.url
						.pathname === '/top'
						? 'text-blue-600'
						: ''}"
				>
					支援案件
				</a>
				<a
					href="/new"
					class="font-medium text-gray-700 transition-colors hover:text-blue-600 {$page.url
						.pathname === '/new'
						? 'text-blue-600'
						: ''}"
				>
					支援募集
				</a>
				{#if $isAuthenticated}
					<a
						href="/profile"
						class="font-medium text-gray-700 transition-colors hover:text-blue-600 {$page.url
							.pathname === '/profile'
							? 'text-blue-600'
							: ''}"
					>
						プロフィール
					</a>
					<a
						href="/deposits"
						class="font-medium text-gray-700 transition-colors hover:text-blue-600 {$page.url
							.pathname === '/deposits'
							? 'text-blue-600'
							: ''}"
					>
						デポジット
					</a>
				{/if}
			</nav>

			<!-- ユーザーメニュー -->
			<div class="flex items-center space-x-4">
				{#if $isAuthenticated && $user}
					<div class="hidden items-center space-x-3 md:flex">
						{#if $user.picture}
							<img src={$user.picture} alt="User avatar" class="h-8 w-8 rounded-full" />
						{:else}
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
								<span class="text-sm text-gray-600"
									>{($user.name || $user.email || '').charAt(0).toUpperCase()}</span
								>
							</div>
						{/if}
						<span class="text-sm text-gray-700">
							{$user.name || $user.email}
						</span>
					</div>
					<button
						on:click={logout}
						class="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
					>
						ログアウト
					</button>
				{:else}
					<button
						on:click={login}
						class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						ログイン
					</button>
				{/if}

				<!-- モバイルメニューボタン -->
				<button
					class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- モバイルナビゲーション -->
		<div class="border-t border-gray-200 py-4 md:hidden">
			<div class="space-y-2">
				<a
					href="/top"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 {$page
						.url.pathname === '/top'
						? 'bg-blue-50 text-blue-600'
						: ''}"
				>
					支援案件
				</a>
				<a
					href="/new"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 {$page
						.url.pathname === '/new'
						? 'bg-blue-50 text-blue-600'
						: ''}"
				>
					支援募集
				</a>
				{#if $isAuthenticated}
					<a
						href="/profile"
						class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 {$page
							.url.pathname === '/profile'
							? 'bg-blue-50 text-blue-600'
							: ''}"
					>
						プロフィール
					</a>
					<a
						href="/deposits"
						class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 {$page
							.url.pathname === '/deposits'
							? 'bg-blue-50 text-blue-600'
							: ''}"
					>
						デポジット
					</a>
					<div class="mt-2 border-t border-gray-200 px-3 py-2 pt-4">
						<div class="mb-3 flex items-center space-x-3">
							{#if $user.picture}
								<img src={$user.picture} alt="User avatar" class="h-8 w-8 rounded-full" />
							{:else}
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
									<span class="text-sm text-gray-600"
										>{($user.name || $user.email || '').charAt(0).toUpperCase()}</span
									>
								</div>
							{/if}
							<span class="text-sm text-gray-700">
								{$user.name || $user.email}
							</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
