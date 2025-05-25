<script lang="ts">
	import { onMount } from 'svelte';

	// モックデータ
	let receivedMessages = [
		{
			id: '1',
			donationId: 'don_001',
			message:
				'ご支援いただき、本当にありがとうございました。おかげで医療費の負担が軽くなりました。心から感謝しています。',
			senderName: '佐藤花子',
			senderAvatar: null,
			amount: 5000,
			postTitle: '医療費のご支援をお願いします',
			createdAt: '2024/11/20 15:30',
			isRead: false
		},
		{
			id: '2',
			donationId: 'don_002',
			message: '温かいご支援をありがとうございます。皆様のおかげで前向きに頑張れます。',
			senderName: '山田次郎',
			senderAvatar: null,
			amount: 3000,
			postTitle: '災害復旧支援',
			createdAt: '2024/11/19 10:15',
			isRead: true
		},
		{
			id: '3',
			donationId: 'don_003',
			message: 'ご支援いただき感謝の気持ちでいっぱいです。必ず立ち直ってみせます。',
			senderName: '鈴木一郎',
			senderAvatar: null,
			amount: 2000,
			postTitle: '教育支援プロジェクト',
			createdAt: '2024/11/18 14:20',
			isRead: true
		}
	];

	let sentMessages = [
		{
			id: '1',
			donationId: 'don_004',
			message: 'お役に立てて嬉しいです。一日も早い回復をお祈りしています。',
			recipientName: '田中美咲',
			recipientAvatar: null,
			amount: 10000,
			postTitle: '手術費用のお願い',
			createdAt: '2024/11/17 16:45'
		},
		{
			id: '2',
			donationId: 'don_005',
			message: '微力ながらお手伝いさせていただきました。頑張ってください！',
			recipientName: '高橋健太',
			recipientAvatar: null,
			amount: 5000,
			postTitle: '被災地復興支援',
			createdAt: '2024/11/16 09:30'
		}
	];

	let activeTab = 'received';
	let newMessage = '';
	let selectedDonation = null;
	let showComposeModal = false;

	// 未読メッセージ数
	$: unreadCount = receivedMessages.filter((msg) => !msg.isRead).length;

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(amount);
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString('ja-JP');
	}

	function markAsRead(messageId: string) {
		const message = receivedMessages.find((msg) => msg.id === messageId);
		if (message) {
			message.isRead = true;
			receivedMessages = [...receivedMessages];
		}
	}

	function sendThankYouMessage() {
		if (!newMessage.trim() || !selectedDonation) {
			alert('メッセージを入力してください');
			return;
		}

		const thankYouMessage = {
			id: Date.now().toString(),
			donationId: selectedDonation.id,
			message: newMessage,
			recipientName: selectedDonation.donorName,
			recipientAvatar: null,
			amount: selectedDonation.amount,
			postTitle: selectedDonation.postTitle,
			createdAt: new Date().toISOString()
		};

		sentMessages = [thankYouMessage, ...sentMessages];
		newMessage = '';
		selectedDonation = null;
		showComposeModal = false;

		// TODO: APIでメッセージを送信
		alert('お礼メッセージを送信しました');
	}

	// モック：寄付を受けた案件（お礼メッセージ未送信）
	let pendingThanks = [
		{
			id: 'don_006',
			donorName: '匿名希望',
			amount: 8000,
			postTitle: '子どもの教育費支援',
			donatedAt: '2024/11/21 12:00'
		},
		{
			id: 'don_007',
			donorName: '支援者A',
			amount: 15000,
			postTitle: '医療費のご支援をお願いします',
			donatedAt: '2024/11/20 18:30'
		}
	];

	function openComposeModal(donation) {
		selectedDonation = donation;
		showComposeModal = true;
	}
</script>

<svelte:head>
	<title>お礼メッセージ - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
	<div class="container mx-auto px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-orange-600">💌 お礼メッセージ</h1>
			<p class="text-gray-600">寄付後の温かいコミュニケーションを大切にしています</p>
		</div>

		<!-- タブ -->
		<div class="mb-6 flex space-x-1 rounded-lg bg-white p-1 shadow-lg">
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'received'
					? 'bg-orange-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'received')}
			>
				受信メッセージ
				{#if unreadCount > 0}
					<span class="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
						{unreadCount}
					</span>
				{/if}
			</button>
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'sent'
					? 'bg-orange-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'sent')}
			>
				送信メッセージ
			</button>
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'compose'
					? 'bg-orange-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'compose')}
			>
				お礼を送る
			</button>
		</div>

		<!-- 受信メッセージ -->
		{#if activeTab === 'received'}
			<div class="space-y-4">
				{#each receivedMessages as message}
					<div
						class="rounded-2xl bg-white p-6 shadow-lg {!message.isRead
							? 'border-l-4 border-orange-500'
							: ''}"
					>
						<div class="flex items-start justify-between">
							<div class="flex items-start space-x-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
									{#if message.senderAvatar}
										<img src={message.senderAvatar} alt="" class="h-12 w-12 rounded-full" />
									{:else}
										<span class="text-orange-600">{message.senderName.charAt(0)}</span>
									{/if}
								</div>
								<div class="flex-1">
									<div class="flex items-center space-x-2">
										<h3 class="font-semibold text-gray-900">{message.senderName}</h3>
										{#if !message.isRead}
											<span class="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800"
												>新着</span
											>
										{/if}
									</div>
									<p class="text-sm text-gray-600">{message.postTitle}</p>
									<p class="text-sm text-gray-500">¥{formatAmount(message.amount)}のご寄付</p>
								</div>
							</div>
							<div class="text-right">
								<div class="text-xs text-gray-500">{formatDate(message.createdAt)}</div>
								{#if !message.isRead}
									<button
										class="mt-2 text-xs text-orange-600 hover:text-orange-700"
										on:click={() => markAsRead(message.id)}
									>
										既読にする
									</button>
								{/if}
							</div>
						</div>
						<div class="mt-4 rounded-lg bg-gray-50 p-4">
							<p class="text-gray-700">{message.message}</p>
						</div>
					</div>
				{/each}

				{#if receivedMessages.length === 0}
					<div class="rounded-2xl bg-white p-12 text-center shadow-lg">
						<div class="mb-4 text-6xl">💌</div>
						<h3 class="mb-2 text-xl font-semibold text-gray-900">受信メッセージがありません</h3>
						<p class="text-gray-600">寄付を受けた方からのお礼メッセージがここに表示されます</p>
					</div>
				{/if}
			</div>
		{/if}

		<!-- 送信メッセージ -->
		{#if activeTab === 'sent'}
			<div class="space-y-4">
				{#each sentMessages as message}
					<div class="rounded-2xl bg-white p-6 shadow-lg">
						<div class="flex items-start justify-between">
							<div class="flex items-start space-x-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									{#if message.recipientAvatar}
										<img src={message.recipientAvatar} alt="" class="h-12 w-12 rounded-full" />
									{:else}
										<span class="text-green-600">{message.recipientName.charAt(0)}</span>
									{/if}
								</div>
								<div class="flex-1">
									<h3 class="font-semibold text-gray-900">→ {message.recipientName}</h3>
									<p class="text-sm text-gray-600">{message.postTitle}</p>
									<p class="text-sm text-gray-500">¥{formatAmount(message.amount)}のご寄付</p>
								</div>
							</div>
							<div class="text-xs text-gray-500">{formatDate(message.createdAt)}</div>
						</div>
						<div class="mt-4 rounded-lg bg-blue-50 p-4">
							<p class="text-gray-700">{message.message}</p>
						</div>
					</div>
				{/each}

				{#if sentMessages.length === 0}
					<div class="rounded-2xl bg-white p-12 text-center shadow-lg">
						<div class="mb-4 text-6xl">📤</div>
						<h3 class="mb-2 text-xl font-semibold text-gray-900">送信メッセージがありません</h3>
						<p class="text-gray-600">あなたが送ったお礼メッセージがここに表示されます</p>
					</div>
				{/if}
			</div>
		{/if}

		<!-- お礼を送る -->
		{#if activeTab === 'compose'}
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-6 text-lg font-semibold text-gray-900">💝 お礼メッセージを送る</h3>

				{#if pendingThanks.length > 0}
					<div class="mb-6">
						<h4 class="text-md mb-4 font-medium text-gray-700">お礼未送信の寄付</h4>
						<div class="space-y-3">
							{#each pendingThanks as donation}
								<div
									class="flex items-center justify-between rounded-lg border border-gray-200 p-4"
								>
									<div>
										<h5 class="font-medium text-gray-900">{donation.postTitle}</h5>
										<p class="text-sm text-gray-600">
											{donation.donorName} さんから ¥{formatAmount(donation.amount)}
										</p>
										<p class="text-xs text-gray-500">{formatDate(donation.donatedAt)}</p>
									</div>
									<button
										class="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
										on:click={() => openComposeModal(donation)}
									>
										お礼を送る
									</button>
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<div class="py-8 text-center">
						<div class="mb-4 text-4xl">✅</div>
						<h4 class="mb-2 text-lg font-semibold text-gray-900">すべてのお礼を送信済みです</h4>
						<p class="text-gray-600">
							新しい寄付を受けた際に、こちらからお礼メッセージを送ることができます
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!-- お礼メッセージ作成モーダル -->
{#if showComposeModal && selectedDonation}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-xl font-bold text-gray-900">💝 お礼メッセージ</h3>
			<div class="mb-4 rounded-lg bg-gray-50 p-4">
				<p class="text-sm text-gray-600">寄付者: {selectedDonation.donorName}</p>
				<p class="text-sm text-gray-600">金額: ¥{formatAmount(selectedDonation.amount)}</p>
				<p class="text-sm text-gray-600">案件: {selectedDonation.postTitle}</p>
			</div>
			<div class="mb-4">
				<label class="mb-2 block text-sm font-medium text-gray-700">メッセージ</label>
				<textarea
					bind:value={newMessage}
					placeholder="感謝の気持ちを込めてメッセージを書いてください..."
					rows="4"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
				></textarea>
			</div>
			<div class="flex space-x-3">
				<button
					class="flex-1 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
					on:click={sendThankYouMessage}
				>
					送信
				</button>
				<button
					class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					on:click={() => (showComposeModal = false)}
				>
					キャンセル
				</button>
			</div>
		</div>
	</div>
{/if}
