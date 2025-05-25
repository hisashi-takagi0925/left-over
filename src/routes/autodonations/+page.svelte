<script lang="ts">
	import { onMount } from 'svelte';

	// モックデータ
	let autodonations = [
		{
			id: '1',
			category: '医療',
			amount: 3000,
			schedule: 'monthly',
			isActive: true,
			nextExecution: '2024/12/01',
			totalDonated: 15000,
			createdAt: '2024/06/01'
		},
		{
			id: '2',
			category: '災害',
			amount: 5000,
			schedule: 'monthly',
			isActive: false,
			nextExecution: '2024/12/01',
			totalDonated: 25000,
			createdAt: '2024/03/15'
		},
		{
			id: '3',
			category: '教育',
			amount: 2000,
			schedule: 'weekly',
			isActive: true,
			nextExecution: '2024/11/25',
			totalDonated: 8000,
			createdAt: '2024/10/01'
		}
	];

	let newAutoDonation = {
		category: '',
		amount: '',
		schedule: 'monthly'
	};

	let showAddForm = false;

	const categories = [
		{ value: '医療', label: '医療' },
		{ value: '災害', label: '災害' },
		{ value: '教育', label: '教育' },
		{ value: '動物', label: '動物' },
		{ value: 'その他', label: 'その他' }
	];

	const schedules = [
		{ value: 'weekly', label: '毎週' },
		{ value: 'monthly', label: '毎月' },
		{ value: 'quarterly', label: '四半期ごと' }
	];

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(amount);
	}

	function getScheduleLabel(schedule: string): string {
		const scheduleMap = {
			weekly: '毎週',
			monthly: '毎月',
			quarterly: '四半期ごと'
		};
		return scheduleMap[schedule] || schedule;
	}

	function getCategoryIcon(category: string): string {
		const iconMap = {
			医療: '🏥',
			災害: '🆘',
			教育: '📚',
			動物: '🐾',
			その他: '💝'
		};
		return iconMap[category] || '💝';
	}

	function toggleAutoDonation(id: string) {
		const donation = autodonations.find((d) => d.id === id);
		if (donation) {
			donation.isActive = !donation.isActive;
			// TODO: APIで状態を更新
			alert(`自動寄付を${donation.isActive ? '有効' : '無効'}にしました`);
		}
	}

	function deleteAutoDonation(id: string) {
		if (confirm('この自動寄付設定を削除しますか？')) {
			autodonations = autodonations.filter((d) => d.id !== id);
			// TODO: APIで削除
			alert('自動寄付設定を削除しました');
		}
	}

	function addAutoDonation() {
		if (!newAutoDonation.category || !newAutoDonation.amount) {
			alert('カテゴリと金額を入力してください');
			return;
		}

		const newDonation = {
			id: Date.now().toString(),
			category: newAutoDonation.category,
			amount: parseInt(newAutoDonation.amount),
			schedule: newAutoDonation.schedule,
			isActive: true,
			nextExecution: getNextExecutionDate(newAutoDonation.schedule),
			totalDonated: 0,
			createdAt: new Date().toISOString().split('T')[0]
		};

		autodonations = [...autodonations, newDonation];

		// フォームをリセット
		newAutoDonation = {
			category: '',
			amount: '',
			schedule: 'monthly'
		};
		showAddForm = false;

		// TODO: APIで追加
		alert('自動寄付設定を追加しました');
	}

	function getNextExecutionDate(schedule: string): string {
		const now = new Date();
		switch (schedule) {
			case 'weekly':
				now.setDate(now.getDate() + 7);
				break;
			case 'monthly':
				now.setMonth(now.getMonth() + 1);
				break;
			case 'quarterly':
				now.setMonth(now.getMonth() + 3);
				break;
		}
		return now.toISOString().split('T')[0];
	}
</script>

<svelte:head>
	<title>自動寄付設定 - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
	<div class="container mx-auto px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-orange-600">⚡ 自動寄付設定</h1>
			<p class="text-gray-600">継続的な支援を手軽に実現できます</p>
		</div>

		<!-- 統計情報 -->
		<div class="mb-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-orange-600">{autodonations.length}</div>
					<div class="text-sm text-gray-600">設定数</div>
				</div>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-green-600">
						{autodonations.filter((d) => d.isActive).length}
					</div>
					<div class="text-sm text-gray-600">有効な設定</div>
				</div>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-blue-600">
						¥{formatAmount(autodonations.reduce((sum, d) => sum + d.totalDonated, 0))}
					</div>
					<div class="text-sm text-gray-600">累計寄付額</div>
				</div>
			</div>
		</div>

		<!-- 新規追加ボタン -->
		<div class="mb-6">
			<button
				class="rounded-lg bg-orange-600 px-6 py-3 text-white transition-colors hover:bg-orange-700"
				on:click={() => (showAddForm = !showAddForm)}
			>
				+ 新しい自動寄付を追加
			</button>
		</div>

		<!-- 新規追加フォーム -->
		{#if showAddForm}
			<div class="mb-8 rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">新しい自動寄付設定</h3>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<label class="mb-2 block text-sm font-medium text-gray-700">カテゴリ</label>
						<select
							bind:value={newAutoDonation.category}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
						>
							<option value="">選択してください</option>
							{#each categories as category}
								<option value={category.value}>{category.label}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-gray-700">金額</label>
						<input
							type="number"
							bind:value={newAutoDonation.amount}
							placeholder="金額を入力"
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
						/>
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-gray-700">頻度</label>
						<select
							bind:value={newAutoDonation.schedule}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
						>
							{#each schedules as schedule}
								<option value={schedule.value}>{schedule.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="mt-4 flex space-x-3">
					<button
						class="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
						on:click={addAutoDonation}
					>
						追加
					</button>
					<button
						class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
						on:click={() => (showAddForm = false)}
					>
						キャンセル
					</button>
				</div>
			</div>
		{/if}

		<!-- 自動寄付一覧 -->
		<div class="space-y-4">
			{#each autodonations as donation}
				<div class="rounded-2xl bg-white p-6 shadow-lg">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-4">
							<div class="text-3xl">{getCategoryIcon(donation.category)}</div>
							<div>
								<div class="flex items-center space-x-2">
									<h3 class="text-lg font-semibold text-gray-900">{donation.category}</h3>
									<span
										class="rounded-full px-2 py-1 text-xs {donation.isActive
											? 'bg-green-100 text-green-800'
											: 'bg-gray-100 text-gray-800'}"
									>
										{donation.isActive ? '有効' : '無効'}
									</span>
								</div>
								<div class="text-sm text-gray-600">
									{getScheduleLabel(donation.schedule)} ¥{formatAmount(donation.amount)}
								</div>
								<div class="text-xs text-gray-500">
									次回実行: {donation.nextExecution} | 累計: ¥{formatAmount(donation.totalDonated)}
								</div>
							</div>
						</div>
						<div class="flex items-center space-x-2">
							<button
								class="rounded-lg px-3 py-1 text-sm {donation.isActive
									? 'bg-red-100 text-red-700 hover:bg-red-200'
									: 'bg-green-100 text-green-700 hover:bg-green-200'}"
								on:click={() => toggleAutoDonation(donation.id)}
							>
								{donation.isActive ? '無効化' : '有効化'}
							</button>
							<button
								class="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
								on:click={() => deleteAutoDonation(donation.id)}
							>
								削除
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- 設定がない場合 -->
		{#if autodonations.length === 0}
			<div class="rounded-2xl bg-white p-12 text-center shadow-lg">
				<div class="mb-4 text-6xl">⚡</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">自動寄付設定がありません</h3>
				<p class="mb-6 text-gray-600">継続的な支援を始めるために、自動寄付を設定しましょう</p>
				<button
					class="rounded-lg bg-orange-600 px-6 py-3 text-white hover:bg-orange-700"
					on:click={() => (showAddForm = true)}
				>
					最初の自動寄付を設定
				</button>
			</div>
		{/if}

		<!-- 注意事項 -->
		<div class="mt-8 rounded-2xl bg-blue-50 p-6">
			<h3 class="mb-3 text-lg font-semibold text-blue-900">📋 自動寄付について</h3>
			<ul class="space-y-2 text-sm text-blue-800">
				<li>• 自動寄付は設定した頻度で自動的に実行されます</li>
				<li>• デポジット残高が不足している場合、自動寄付は実行されません</li>
				<li>• いつでも設定の変更や停止が可能です</li>
				<li>• 寄付先は各カテゴリで最も支援が必要な案件に自動で振り分けられます</li>
			</ul>
		</div>
	</div>
</div>
