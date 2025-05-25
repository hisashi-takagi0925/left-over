<script lang="ts">
	import { onMount } from 'svelte';

	// モックデータ
	let balance = 25000;
	let chargeAmount = '';
	let withdrawAmount = '';

	let transactions = [
		{
			id: '1',
			type: 'charge',
			amount: 10000,
			date: '2024/11/20 14:30',
			status: 'completed',
			description: 'クレジットカードからチャージ'
		},
		{
			id: '2',
			type: 'donation',
			amount: -5000,
			date: '2024/11/19 10:15',
			status: 'completed',
			description: '医療費支援への寄付'
		},
		{
			id: '3',
			type: 'charge',
			amount: 20000,
			date: '2024/11/18 16:45',
			status: 'completed',
			description: '銀行振込からチャージ'
		},
		{
			id: '4',
			type: 'withdraw',
			amount: -3000,
			date: '2024/11/17 09:20',
			status: 'pending',
			description: '銀行口座への払い戻し'
		}
	];

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(Math.abs(amount));
	}

	function getTransactionIcon(type: string): string {
		switch (type) {
			case 'charge':
				return '💳';
			case 'donation':
				return '💝';
			case 'withdraw':
				return '🏦';
			default:
				return '📄';
		}
	}

	function getTransactionLabel(type: string): string {
		switch (type) {
			case 'charge':
				return 'チャージ';
			case 'donation':
				return '寄付';
			case 'withdraw':
				return '払い戻し';
			default:
				return '取引';
		}
	}

	function getAmountColor(amount: number): string {
		return amount > 0 ? 'text-green-600' : 'text-red-600';
	}

	function getStatusLabel(status: string): string {
		switch (status) {
			case 'completed':
				return '完了';
			case 'pending':
				return '処理中';
			case 'failed':
				return '失敗';
			default:
				return '不明';
		}
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'failed':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function handleCharge() {
		// TODO: Stripe決済処理
		alert(`¥${formatAmount(parseInt(chargeAmount))}をチャージします（実装予定）`);
		chargeAmount = '';
	}

	function handleWithdraw() {
		// TODO: 払い戻し処理
		alert(`¥${formatAmount(parseInt(withdrawAmount))}を払い戻します（実装予定）`);
		withdrawAmount = '';
	}
</script>

<svelte:head>
	<title>デポジット管理 - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
	<div class="container mx-auto px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-orange-600">💳 デポジット管理</h1>
			<p class="text-gray-600">残高確認、チャージ、払い戻しを行えます</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- 残高表示 -->
			<div class="lg:col-span-1">
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="text-center">
						<div class="mb-4 text-sm text-gray-600">現在の残高</div>
						<div class="mb-6 text-4xl font-bold text-orange-600">
							¥{formatAmount(balance)}
						</div>
						<div class="space-y-4">
							<button
								class="w-full rounded-lg bg-orange-600 px-4 py-3 text-white transition-colors hover:bg-orange-700"
								on:click={() => document.getElementById('charge-modal')?.showModal()}
							>
								💳 チャージする
							</button>
							<button
								class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
								on:click={() => document.getElementById('withdraw-modal')?.showModal()}
							>
								🏦 払い戻し
							</button>
						</div>
					</div>
				</div>

				<!-- クイック操作 -->
				<div class="mt-6 rounded-2xl bg-white p-6 shadow-lg">
					<h3 class="mb-4 text-lg font-semibold text-gray-900">⚡ クイック操作</h3>
					<div class="space-y-3">
						<button
							class="w-full rounded-lg bg-blue-50 p-3 text-left text-blue-700 hover:bg-blue-100"
						>
							<div class="font-medium">自動チャージ設定</div>
							<div class="text-sm">残高が少なくなったら自動でチャージ</div>
						</button>
						<button
							class="w-full rounded-lg bg-green-50 p-3 text-left text-green-700 hover:bg-green-100"
						>
							<div class="font-medium">定期寄付設定</div>
							<div class="text-sm">毎月決まった金額を自動寄付</div>
						</button>
					</div>
				</div>
			</div>

			<!-- 取引履歴 -->
			<div class="lg:col-span-2">
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="mb-6 flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900">📋 取引履歴</h3>
						<div class="flex space-x-2">
							<button class="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
								すべて
							</button>
							<button class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
								チャージ
							</button>
							<button class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600"> 寄付 </button>
							<button class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
								払い戻し
							</button>
						</div>
					</div>

					<div class="space-y-4">
						{#each transactions as transaction}
							<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
								<div class="flex items-center space-x-4">
									<div class="text-2xl">{getTransactionIcon(transaction.type)}</div>
									<div>
										<div class="flex items-center space-x-2">
											<span class="font-medium text-gray-900">
												{getTransactionLabel(transaction.type)}
											</span>
											<span
												class="rounded-full px-2 py-1 text-xs {getStatusColor(transaction.status)}"
											>
												{getStatusLabel(transaction.status)}
											</span>
										</div>
										<div class="text-sm text-gray-600">{transaction.description}</div>
										<div class="text-xs text-gray-500">{transaction.date}</div>
									</div>
								</div>
								<div class="text-right">
									<div class="font-bold {getAmountColor(transaction.amount)}">
										{transaction.amount > 0 ? '+' : ''}¥{formatAmount(transaction.amount)}
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

<!-- チャージモーダル -->
<dialog id="charge-modal" class="rounded-2xl p-6 shadow-xl">
	<div class="w-96">
		<h3 class="mb-4 text-xl font-bold text-gray-900">💳 チャージ</h3>
		<div class="mb-4">
			<label for="charge-amount" class="mb-2 block text-sm font-medium text-gray-700">
				チャージ金額
			</label>
			<input
				id="charge-amount"
				type="number"
				bind:value={chargeAmount}
				placeholder="金額を入力"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
			/>
		</div>
		<div class="mb-6">
			<label class="mb-2 block text-sm font-medium text-gray-700">支払い方法</label>
			<select
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
			>
				<option>クレジットカード</option>
				<option>銀行振込</option>
				<option>コンビニ決済</option>
			</select>
		</div>
		<div class="flex space-x-3">
			<button
				class="flex-1 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
				on:click={handleCharge}
			>
				チャージする
			</button>
			<button
				class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
				on:click={() => document.getElementById('charge-modal')?.close()}
			>
				キャンセル
			</button>
		</div>
	</div>
</dialog>

<!-- 払い戻しモーダル -->
<dialog id="withdraw-modal" class="rounded-2xl p-6 shadow-xl">
	<div class="w-96">
		<h3 class="mb-4 text-xl font-bold text-gray-900">🏦 払い戻し</h3>
		<div class="mb-4">
			<label for="withdraw-amount" class="mb-2 block text-sm font-medium text-gray-700">
				払い戻し金額
			</label>
			<input
				id="withdraw-amount"
				type="number"
				bind:value={withdrawAmount}
				placeholder="金額を入力"
				max={balance}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
			/>
			<div class="mt-1 text-sm text-gray-500">
				最大払い戻し可能額: ¥{formatAmount(balance)}
			</div>
		</div>
		<div class="mb-6">
			<label class="mb-2 block text-sm font-medium text-gray-700">払い戻し先</label>
			<select
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
			>
				<option>登録済み銀行口座</option>
				<option>新しい銀行口座を追加</option>
			</select>
		</div>
		<div class="flex space-x-3">
			<button
				class="flex-1 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
				on:click={handleWithdraw}
			>
				払い戻し申請
			</button>
			<button
				class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
				on:click={() => document.getElementById('withdraw-modal')?.close()}
			>
				キャンセル
			</button>
		</div>
	</div>
</dialog>
