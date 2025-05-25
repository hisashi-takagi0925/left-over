<script lang="ts">
	import { user } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>ダッシュボード - Left Over</title>
	<meta name="description" content="Left Over ダッシュボード" />
</svelte:head>

<!-- ウェルカムセクション -->
<section class="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-8 text-4xl font-bold text-gray-900">
				ようこそ、<span class="text-orange-500">Left Over</span>へ
			</h1>
			{#if $user}
				<p class="mb-8 text-xl text-gray-600">
					{$user.name || $user.email}さん、支援を始めましょう！
				</p>
			{:else}
				<p class="mb-8 text-xl text-gray-600">支援を始めましょう！</p>
			{/if}
		</div>
	</div>
</section>

<!-- メイン機能セクション -->
<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-900">何をしますか？</h2>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- 支援する -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-200"
					>
						<svg
							class="h-10 w-10 text-orange-500"
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
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">支援する</h3>
					<p class="text-center leading-relaxed text-gray-600">
						困っている人に温かい支援の気持ちを届けましょう
					</p>
				</div>

				<!-- 支援を受け取る -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200"
					>
						<svg
							class="h-10 w-10 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zM3 9a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">支援を受け取る</h3>
					<p class="text-center leading-relaxed text-gray-600">
						困りごとを投稿して温かい支援を受け取りましょう
					</p>
				</div>

				<!-- 履歴を見る -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200"
					>
						<svg
							class="h-10 w-10 text-blue-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">履歴を見る</h3>
					<p class="text-center leading-relaxed text-gray-600">
						これまでの支援の送受信履歴を確認できます
					</p>
				</div>

				<!-- プロフィール設定 -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200"
					>
						<svg
							class="h-10 w-10 text-purple-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">プロフィール設定</h3>
					<p class="text-center leading-relaxed text-gray-600">
						あなたのプロフィール情報を編集・更新できます
					</p>
				</div>

				<!-- 設定 -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200"
					>
						<svg
							class="h-10 w-10 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							></path>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">設定</h3>
					<p class="text-center leading-relaxed text-gray-600">
						アプリの各種設定や通知設定を変更できます
					</p>
				</div>

				<!-- ヘルプ -->
				<div
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 group-hover:bg-yellow-200"
					>
						<svg
							class="h-10 w-10 text-yellow-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">ヘルプ</h3>
					<p class="text-center leading-relaxed text-gray-600">
						使い方やよくある質問を確認できます
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 最近のアクティビティセクション -->
<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-900">最近のアクティビティ</h2>

			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="text-center text-gray-500">
					<svg
						class="mx-auto mb-4 h-16 w-16 text-gray-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						></path>
					</svg>
					<p class="text-lg">まだアクティビティがありません</p>
					<p class="mt-2 text-sm">支援を始めると、ここに履歴が表示されます</p>
				</div>
			</div>
		</div>
	</div>
</section>
