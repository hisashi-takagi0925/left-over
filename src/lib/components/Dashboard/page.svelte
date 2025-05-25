<script lang="ts">
	import { user } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>ダッシュボード - 困ったときはお互い様</title>
	<meta name="description" content="困ったときはお互い様 ダッシュボード" />
</svelte:head>

<!-- ウェルカムセクション -->
<section class="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-8 text-4xl font-bold text-gray-900">
				ようこそ、<span class="text-orange-500">困ったときはお互い様</span>へ
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
				<!-- 支援案件を見る -->
				<a
					href="/top"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-200"
					>
						<span class="text-3xl">💝</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">支援案件を見る</h3>
					<p class="text-center leading-relaxed text-gray-600">
						困っている人に温かい支援の気持ちを届けましょう
					</p>
				</a>

				<!-- 支援を募集する -->
				<a
					href="/new"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200"
					>
						<span class="text-3xl">📝</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">支援を募集する</h3>
					<p class="text-center leading-relaxed text-gray-600">
						困りごとを投稿して温かい支援を受け取りましょう
					</p>
				</a>

				<!-- プロフィール -->
				<a
					href="/profile"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200"
					>
						<span class="text-3xl">👤</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">プロフィール</h3>
					<p class="text-center leading-relaxed text-gray-600">
						寄付履歴や信頼スコアを確認できます
					</p>
				</a>

				<!-- デポジット管理 -->
				<a
					href="/deposits"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200"
					>
						<span class="text-3xl">💳</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">デポジット管理</h3>
					<p class="text-center leading-relaxed text-gray-600">
						残高確認、チャージ、払い戻しを行えます
					</p>
				</a>

				<!-- 自動寄付設定 -->
				<a
					href="/autodonations"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200"
					>
						<span class="text-3xl">⚡</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">自動寄付設定</h3>
					<p class="text-center leading-relaxed text-gray-600">継続的な支援を手軽に実現できます</p>
				</a>

				<!-- お礼メッセージ -->
				<a
					href="/thanks"
					class="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 group-hover:bg-pink-200"
					>
						<span class="text-3xl">💌</span>
					</div>
					<h3 class="mb-4 text-center text-xl font-semibold text-gray-900">お礼メッセージ</h3>
					<p class="text-center leading-relaxed text-gray-600">
						寄付後の温かいコミュニケーションを大切に
					</p>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- 統計情報セクション -->
<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-900">プラットフォーム統計</h2>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
					<div class="text-3xl font-bold text-orange-600">1,234</div>
					<div class="text-sm text-gray-600">総支援案件数</div>
				</div>
				<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
					<div class="text-3xl font-bold text-green-600">¥5,678,900</div>
					<div class="text-sm text-gray-600">総寄付金額</div>
				</div>
				<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
					<div class="text-3xl font-bold text-blue-600">2,345</div>
					<div class="text-sm text-gray-600">アクティブユーザー</div>
				</div>
				<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
					<div class="text-3xl font-bold text-purple-600">987</div>
					<div class="text-sm text-gray-600">解決済み案件</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 最近の支援案件セクション -->
<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 flex items-center justify-between">
				<h2 class="text-3xl font-bold text-gray-900">最近の支援案件</h2>
				<a href="/top" class="text-orange-600 hover:text-orange-700">すべて見る →</a>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- サンプル案件1 -->
				<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
					<div class="mb-4 flex items-center space-x-2">
						<span class="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">医療</span>
						<span class="text-xs text-gray-500">2時間前</span>
					</div>
					<h3 class="mb-2 font-semibold text-gray-900">手術費用のご支援をお願いします</h3>
					<p class="mb-4 text-sm text-gray-600">
						突然の病気で手術が必要になりました。医療費の一部をご支援いただけると助かります。
					</p>
					<div class="mb-4">
						<div class="mb-2 flex justify-between text-sm">
							<span>進捗</span>
							<span>¥150,000 / ¥500,000</span>
						</div>
						<div class="h-2 rounded-full bg-gray-200">
							<div class="h-2 w-1/3 rounded-full bg-orange-500"></div>
						</div>
					</div>
					<a href="/post/1" class="text-sm text-orange-600 hover:text-orange-700">詳細を見る →</a>
				</div>

				<!-- サンプル案件2 -->
				<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
					<div class="mb-4 flex items-center space-x-2">
						<span class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">教育</span>
						<span class="text-xs text-gray-500">5時間前</span>
					</div>
					<h3 class="mb-2 font-semibold text-gray-900">子どもの学習環境整備</h3>
					<p class="mb-4 text-sm text-gray-600">
						家庭の事情で学習環境が整わない子どもたちのために、教材や設備の支援をお願いします。
					</p>
					<div class="mb-4">
						<div class="mb-2 flex justify-between text-sm">
							<span>進捗</span>
							<span>¥80,000 / ¥200,000</span>
						</div>
						<div class="h-2 rounded-full bg-gray-200">
							<div class="h-2 w-2/5 rounded-full bg-blue-500"></div>
						</div>
					</div>
					<a href="/post/2" class="text-sm text-orange-600 hover:text-orange-700">詳細を見る →</a>
				</div>

				<!-- サンプル案件3 -->
				<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
					<div class="mb-4 flex items-center space-x-2">
						<span class="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">災害</span>
						<span class="text-xs text-gray-500">1日前</span>
					</div>
					<h3 class="mb-2 font-semibold text-gray-900">災害復旧支援</h3>
					<p class="mb-4 text-sm text-gray-600">
						自然災害により住居が被害を受けました。生活再建のためのご支援をお願いします。
					</p>
					<div class="mb-4">
						<div class="mb-2 flex justify-between text-sm">
							<span>進捗</span>
							<span>¥300,000 / ¥1,000,000</span>
						</div>
						<div class="h-2 rounded-full bg-gray-200">
							<div class="h-2 w-1/3 rounded-full bg-yellow-500"></div>
						</div>
					</div>
					<a href="/post/3" class="text-sm text-orange-600 hover:text-orange-700">詳細を見る →</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- お知らせセクション -->
<section class="bg-orange-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-900">お知らせ</h2>

			<div class="space-y-4">
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="flex items-start space-x-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
							<span class="text-orange-600">📢</span>
						</div>
						<div class="flex-1">
							<h3 class="font-semibold text-gray-900">新機能：自動寄付設定が追加されました</h3>
							<p class="mt-1 text-sm text-gray-600">
								継続的な支援をより簡単に行えるよう、自動寄付機能を追加しました。
							</p>
							<div class="mt-2 text-xs text-gray-500">2024年11月20日</div>
						</div>
					</div>
				</div>

				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="flex items-start space-x-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
							<span class="text-blue-600">🔒</span>
						</div>
						<div class="flex-1">
							<h3 class="font-semibold text-gray-900">セキュリティ強化のお知らせ</h3>
							<p class="mt-1 text-sm text-gray-600">
								より安全にご利用いただくため、セキュリティ機能を強化いたしました。
							</p>
							<div class="mt-2 text-xs text-gray-500">2024年11月15日</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
