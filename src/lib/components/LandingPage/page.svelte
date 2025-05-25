<script lang="ts">
	import { login } from '$lib/auth/authUtils';
</script>

<svelte:head>
	<title>Left Over - 気軽な投げ銭アプリ</title>
	<meta name="description" content="知らない人にも気軽に投げ銭ができるシンプルなアプリ" />
</svelte:head>

<!-- ヒーローセクション -->
<section class="flex min-h-screen items-center bg-gradient-to-br from-orange-50 to-orange-100">
	<div class="container mx-auto px-4 py-16">
		<div class="mx-auto max-w-4xl text-center">
			<!-- メインタイトル -->
			<div class="mb-8">
				<h1 class="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl">
					<span class="text-orange-500">Left Over</span>
				</h1>
				<p class="mb-8 text-xl font-light text-gray-700 md:text-2xl">
					気軽に、シンプルに、<br class="md:hidden" />
					<span class="font-medium text-orange-600">投げ銭</span>でつながろう
				</p>
			</div>

			<!-- 特徴説明 -->
			<div class="mb-12">
				<p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
					知らない人にも気軽に感謝の気持ちを伝えられる、<br />
					新しい投げ銭プラットフォームです
				</p>
			</div>

			<!-- CTA ボタン -->
			<div class="mb-16">
				<button
					on:click={login}
					class="transform rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-xl"
				>
					今すぐ始める
				</button>
			</div>

			<!-- 機能紹介カード -->
			<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
				<div
					class="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100"
					>
						<svg
							class="h-8 w-8 text-orange-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">簡単投げ銭</h3>
					<p class="leading-relaxed text-gray-600">
						ワンクリックで気軽に投げ銭。複雑な手続きは一切不要です。
					</p>
				</div>

				<div
					class="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-8 w-8 text-blue-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">新しい出会い</h3>
					<p class="leading-relaxed text-gray-600">
						知らない人とも投げ銭を通じて自然なコミュニケーションが生まれます。
					</p>
				</div>

				<div
					class="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
					>
						<svg
							class="h-8 w-8 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">安心・安全</h3>
					<p class="leading-relaxed text-gray-600">
						セキュアな決済システムで、安心してご利用いただけます。
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 使い方セクション -->
<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-16 text-3xl font-bold text-gray-900 md:text-4xl">
				<span class="text-orange-500">3ステップ</span>で始められます
			</h2>

			<div class="grid gap-12 md:grid-cols-3">
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white"
					>
						1
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">アカウント作成</h3>
					<p class="text-gray-600">簡単な登録でアカウントを作成</p>
				</div>

				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white"
					>
						2
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">相手を見つける</h3>
					<p class="text-gray-600">投げ銭したい相手を探す</p>
				</div>

				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white"
					>
						3
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">投げ銭する</h3>
					<p class="text-gray-600">感謝の気持ちを投げ銭で表現</p>
				</div>
			</div>

			<div class="mt-16">
				<button
					on:click={login}
					class="transform rounded-full bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
				>
					無料で始める
				</button>
			</div>
		</div>
	</div>
</section>

<!-- フッター -->
<footer class="bg-gray-50 py-12">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-8">
				<h3 class="mb-4 text-2xl font-bold text-orange-500">Left Over</h3>
				<p class="text-gray-600">気軽な投げ銭で、新しいつながりを</p>
			</div>
			<div class="text-sm text-gray-500">© 2024 Left Over. All rights reserved.</div>
		</div>
	</div>
</footer>
