<script lang="ts">
	import { onMount } from 'svelte';

	// モックデータ
	let user = {
		nickname: '田中太郎',
		email: 'tanaka@example.com',
		avatar: null,
		bio: 'みんなで支え合う社会を目指しています。困ったときはお互い様の精神で活動中です。',
		trustScore: 95,
		joinDate: '2024年1月15日',
		badges: ['初回寄付', '継続支援者', '感謝の達人']
	};

	let donationHistory = [
		{
			id: '1',
			type: 'sent',
			title: '医療費のご支援をお願いします',
			amount: 5000,
			date: '2024/11/20',
			recipient: '佐藤花子'
		},
		{
			id: '2',
			type: 'received',
			title: '災害復旧支援',
			amount: 10000,
			date: '2024/11/18',
			sender: '山田次郎'
		},
		{
			id: '3',
			type: 'sent',
			title: '教育支援プロジェクト',
			amount: 3000,
			date: '2024/11/15',
			recipient: '鈴木一郎'
		}
	];

	let depositBalance = 25000;
	let totalDonated = 45000;
	let totalReceived = 32000;

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(amount);
	}

	function getTypeLabel(type: string): string {
		return type === 'sent' ? '寄付' : '受益';
	}

	function getTypeColor(type: string): string {
		return type === 'sent' ? 'text-red-600' : 'text-green-600';
	}
</script>

<svelte:head>
	<title>プロフィール - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
	<div class="container mx-auto px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-orange-600">💝 プロフィール</h1>
			<p class="text-gray-600">あなたの活動履歴と信頼スコアを確認できます</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- プロフィール情報 -->
			<div class="lg:col-span-1">
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="text-center">
						<!-- アバター -->
						<div
							class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100"
						>
							{#if user.avatar}
								<img src={user.avatar} alt="" class="h-24 w-24 rounded-full" />
							{:else}
								<span class="text-2xl text-orange-600">{user.nickname.charAt(0)}</span>
							{/if}
						</div>

						<!-- 基本情報 -->
						<h2 class="mb-2 text-xl font-bold text-gray-900">{user.nickname}</h2>
						<p class="mb-4 text-sm text-gray-600">{user.email}</p>

						<!-- 信頼スコア -->
						<div class="mb-6">
							<div class="mb-2 text-sm text-gray-600">信頼スコア</div>
							<div class="text-3xl font-bold text-orange-600">{user.trustScore}</div>
							<div class="mt-2 h-2 w-full rounded-full bg-gray-200">
								<div class="h-2 rounded-full bg-orange-500" style="width: {user.trustScore}%"></div>
							</div>
						</div>

						<!-- 自己紹介 -->
						<div class="mb-6 text-left">
							<h3 class="mb-2 text-sm font-semibold text-gray-700">自己紹介</h3>
							<p class="text-sm text-gray-600">{user.bio}</p>
						</div>

						<!-- 参加日 -->
						<div class="text-sm text-gray-500">
							参加日: {user.joinDate}
						</div>

						<!-- 編集ボタン -->
						<button
							class="mt-4 w-full rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
						>
							プロフィールを編集
						</button>
					</div>
				</div>

				<!-- バッジ -->
				<div class="mt-6 rounded-2xl bg-white p-6 shadow-lg">
					<h3 class="mb-4 text-lg font-semibold text-gray-900">🏆 獲得バッジ</h3>
					<div class="space-y-2">
						{#each user.badges as badge}
							<div class="flex items-center rounded-lg bg-orange-50 p-3">
								<span class="mr-2 text-orange-500">🎖️</span>
								<span class="text-sm font-medium text-gray-700">{badge}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- メイン情報 -->
			<div class="lg:col-span-2">
				<!-- 統計情報 -->
				<div class="mb-8 grid gap-4 md:grid-cols-3">
					<div class="rounded-2xl bg-white p-6 shadow-lg">
						<div class="text-center">
							<div class="text-2xl font-bold text-green-600">¥{formatAmount(totalReceived)}</div>
							<div class="text-sm text-gray-600">受け取った支援</div>
						</div>
					</div>
					<div class="rounded-2xl bg-white p-6 shadow-lg">
						<div class="text-center">
							<div class="text-2xl font-bold text-red-600">¥{formatAmount(totalDonated)}</div>
							<div class="text-sm text-gray-600">行った支援</div>
						</div>
					</div>
					<div class="rounded-2xl bg-white p-6 shadow-lg">
						<div class="text-center">
							<div class="text-2xl font-bold text-blue-600">¥{formatAmount(depositBalance)}</div>
							<div class="text-sm text-gray-600">デポジット残高</div>
						</div>
					</div>
				</div>

				<!-- 履歴 -->
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="mb-6 flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900">📋 活動履歴</h3>
						<div class="flex space-x-2">
							<button class="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
								すべて
							</button>
							<button class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600"> 寄付 </button>
							<button class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600"> 受益 </button>
						</div>
					</div>

					<div class="space-y-4">
						{#each donationHistory as item}
							<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
								<div class="flex-1">
									<div class="flex items-center space-x-2">
										<span class="text-sm font-medium {getTypeColor(item.type)}">
											{getTypeLabel(item.type)}
										</span>
										<span class="text-xs text-gray-500">{item.date}</span>
									</div>
									<h4 class="mt-1 font-medium text-gray-900">{item.title}</h4>
									<p class="text-sm text-gray-600">
										{item.type === 'sent' ? `→ ${item.recipient}` : `← ${item.sender}`}
									</p>
								</div>
								<div class="text-right">
									<div class="font-bold {getTypeColor(item.type)}">
										{item.type === 'sent' ? '-' : '+'}¥{formatAmount(item.amount)}
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- もっと見るボタン -->
					<div class="mt-6 text-center">
						<button class="text-orange-600 hover:text-orange-700"> もっと見る </button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
