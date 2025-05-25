<script lang="ts">
	import { login } from '$lib/auth/authUtils';
</script>

<svelte:head>
	<title>Kampa - 支援プラットフォーム</title>
	<meta name="description" content="Kampaで温かい支援の輪を広げましょう" />
</svelte:head>

<!-- ヒーロー画像セクション -->
<section class="relative">
	<img
		src="/randing_top.webp"
		alt="Kampa ヒーロー画像"
		class="h-[800px] w-full object-cover object-top"
	/>
	<!-- 透かしオーバーレイ -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-amber-50/60 to-yellow-50/60"
	></div>
</section>

<!-- 説明文セクション -->
<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<!-- メインタイトル -->
			<div class="mb-12">
				<h1 class="mb-6 text-4xl leading-tight font-bold text-gray-800 md:text-5xl">
					<span class="text-orange-600">Kampa</span>
				</h1>
				<p class="mb-8 text-xl font-light text-gray-700 md:text-2xl">
					日常の小さな困りごとを、<br class="md:hidden" />
					<span class="font-medium text-orange-600">みんなで支え合う</span>プラットフォーム
				</p>
			</div>

			<!-- 特徴説明 -->
			<div class="mb-12">
				<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
					「明日のご飯代がない」「子供の誕生日プレゼントが買えない」<br />
					そんな日常の小さな困りごとを、匿名で気軽に相談できる場所です。<br />
					<span class="font-medium text-green-600">あなたの困りごとは、きっと誰かに届きます。</span>
				</p>
			</div>

			<!-- CTA ボタン -->
			<div class="mb-16 space-y-4">
				<button
					on:click={login}
					class="transform rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-xl"
				>
					安心して相談してみる
				</button>
				<p class="text-sm text-gray-500">※匿名で利用できます。個人情報は保護されます。</p>
			</div>

			<!-- 安心メッセージ -->
			<div class="mb-16 rounded-2xl bg-white p-8 shadow-lg">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">💝 困ったときに遠慮は要りません</h3>
				<p class="leading-relaxed text-gray-600">
					このサービスは、誰もが安心して助けを求められる場所です。<br />
					あなたのプライバシーは守られ、温かい支援が届きます。<br />
					<span class="font-medium text-blue-600"
						>助けを求めることは、恥ずかしいことではありません。</span
					>
				</p>
			</div>

			<!-- 機能紹介カード -->
			<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
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
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">匿名で安心</h3>
					<p class="leading-relaxed text-gray-600">
						ニックネームで利用可能。本名や住所を公開する必要はありません。
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
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">温かい支援</h3>
					<p class="leading-relaxed text-gray-600">
						少額から気軽に。応援メッセージと共に温かい支援が届きます。
					</p>
				</div>

				<div
					class="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100"
					>
						<svg
							class="h-8 w-8 text-yellow-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							></path>
						</svg>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">簡単投稿</h3>
					<p class="leading-relaxed text-gray-600">
						カテゴリ選択と一言で投稿完了。長文を書く必要はありません。
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 利用の流れセクション -->
<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-16 text-3xl font-bold text-gray-900 md:text-4xl">
				<span class="text-blue-600">3ステップ</span>で支援を受けられます
			</h2>

			<div class="grid gap-12 md:grid-cols-3">
				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white"
					>
						1
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">匿名で登録</h3>
					<p class="text-gray-600">ニックネームだけで簡単登録。個人情報は保護されます。</p>
				</div>

				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white"
					>
						2
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">困りごとを投稿</h3>
					<p class="text-gray-600">カテゴリと金額、一言コメントで気軽に投稿。</p>
				</div>

				<div class="text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-white"
					>
						3
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">温かい支援を受け取る</h3>
					<p class="text-gray-600">匿名で安全に支援を受け取れます。</p>
				</div>
			</div>

			<div class="mt-16">
				<button
					on:click={login}
					class="transform rounded-full bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600"
				>
					今すぐ始める
				</button>
			</div>
		</div>
	</div>
</section>

<!-- 安心・安全セクション -->
<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-16 text-3xl font-bold text-gray-900 md:text-4xl">
				<span class="text-green-600">安心・安全</span>への取り組み
			</h2>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="rounded-2xl bg-white p-8 shadow-lg">
					<div class="mb-6">
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
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
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								></path>
							</svg>
						</div>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">プライバシー保護</h3>
					<p class="leading-relaxed text-gray-600">
						あなたの住所・氏名など個人情報は支援者には知られません。<br />
						厳重なデータ管理で第三者提供は一切行いません。
					</p>
				</div>

				<div class="rounded-2xl bg-white p-8 shadow-lg">
					<div class="mb-6">
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
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
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
								></path>
							</svg>
						</div>
					</div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900">安全な決済</h3>
					<p class="leading-relaxed text-gray-600">
						銀行と連携した安全な支払い基盤で、<br />
						安心して支援を受け取ることができます。
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- フッター -->
<footer class="bg-gray-800 py-12 text-white">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-8">
				<h3 class="mb-4 text-2xl font-bold text-orange-400">Kampa</h3>
				<p class="text-gray-300">みんなで支え合う、温かいコミュニティ</p>
			</div>
			<div class="text-sm text-gray-400">© 2024 Kampa. All rights reserved.</div>
		</div>
	</div>
</footer>
