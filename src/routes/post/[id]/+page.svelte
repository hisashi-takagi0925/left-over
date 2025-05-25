<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface Post {
		id: string;
		title: string;
		content: string;
		category: string;
		amountRequested: number;
		status: string;
		createdAt: Date;
		user: {
			nickname: string;
			avatar: string | null;
			trustScore: number;
		};
		donations: { amount: number; message?: string; user?: { nickname: string } }[];
		totalDonated: number;
	}

	let post: Post | null = null;
	let loading = true;
	let error = '';
	let showDonationModal = false;
	let donationAmount = '';
	let donationMessage = '';
	let useDeposit = false;
	let donationLoading = false;
	let donationError = '';

	$: postId = $page.params.id;

	onMount(async () => {
		await loadPost();
	});

	async function loadPost() {
		try {
			loading = true;
			// TODO: 実際のAPI呼び出し
			// const response = await fetch(`/api/posts/${postId}`);
			// const data = await response.json();

			// モックデータ
			if (postId === '1') {
				post = {
					id: '1',
					title: '医療費のご支援をお願いします',
					content: `突然の病気で高額な医療費が必要になりました。

手術費用として50万円が必要で、保険適用外の治療も含まれるため、自己負担が大きくなってしまいます。

家族だけでは賄いきれない状況で、皆様のご支援をお願いいたします。

治療が成功すれば、元の生活に戻ることができます。どうか温かいご支援をよろしくお願いいたします。`,
					category: '医療',
					amountRequested: 500000,
					status: 'active',
					createdAt: new Date('2024-01-15'),
					user: {
						nickname: '田中太郎',
						avatar: null,
						trustScore: 95
					},
					donations: [
						{ amount: 10000, message: '応援しています！', user: { nickname: '佐藤' } },
						{ amount: 5000, message: '少額ですが、お役に立てれば', user: { nickname: '山田' } },
						{ amount: 20000, user: { nickname: '匿名' } }
					],
					totalDonated: 35000
				};
			} else {
				error = '投稿が見つかりません';
			}
		} catch (err) {
			error = '投稿の取得に失敗しました';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(amount);
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getProgressPercentage(donated: number, requested: number): number {
		return Math.min((donated / requested) * 100, 100);
	}

	function openDonationModal() {
		showDonationModal = true;
		donationAmount = '';
		donationMessage = '';
		donationError = '';
	}

	function closeDonationModal() {
		showDonationModal = false;
	}

	async function handleDonation() {
		if (!validateDonation()) return;

		try {
			donationLoading = true;
			donationError = '';

			const response = await fetch('/api/donations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					postId,
					amount: parseInt(donationAmount),
					message: donationMessage || null,
					useDeposit
				})
			});

			const data = await response.json();

			if (response.ok) {
				// 寄付成功
				closeDonationModal();
				// ページをリロードして最新の寄付情報を表示
				await loadPost();
				alert('寄付が完了しました。ありがとうございます！');
			} else {
				donationError = data.error || '寄付の処理に失敗しました';
			}
		} catch (err) {
			donationError = '寄付の処理に失敗しました';
			console.error(err);
		} finally {
			donationLoading = false;
		}
	}

	function validateDonation(): boolean {
		if (!donationAmount || parseInt(donationAmount) <= 0) {
			donationError = '寄付金額は1円以上で入力してください';
			return false;
		}
		if (donationMessage && donationMessage.length > 500) {
			donationError = 'メッセージは500文字以内で入力してください';
			return false;
		}
		return true;
	}

	function handleAmountInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value.replace(/[^\d]/g, '');
		donationAmount = value;
		target.value = formatAmount(parseInt(value) || 0);
	}

	function sharePost() {
		if (navigator.share) {
			navigator.share({
				title: post?.title,
				text: `${post?.title} - 寄付プラットフォーム`,
				url: window.location.href
			});
		} else {
			// フォールバック: URLをクリップボードにコピー
			navigator.clipboard.writeText(window.location.href);
			alert('URLをクリップボードにコピーしました');
		}
	}
</script>

<svelte:head>
	<title>{post?.title || '投稿詳細'} - 寄付プラットフォーム</title>
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-8">
	{#if loading}
		<div class="flex items-center justify-center py-12">
			<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
		</div>
	{:else if error}
		<div class="rounded-md border border-red-200 bg-red-50 p-4">
			<p class="text-red-800">{error}</p>
			<button
				on:click={() => goto('/top')}
				class="mt-2 text-blue-600 underline hover:text-blue-800"
			>
				一覧に戻る
			</button>
		</div>
	{:else if post}
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- メインコンテンツ -->
			<div class="lg:col-span-2">
				<!-- カテゴリバッジ -->
				<div class="mb-4">
					<span
						class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
					>
						{post.category}
					</span>
				</div>

				<!-- タイトル -->
				<h1 class="mb-6 text-3xl font-bold text-gray-900">{post.title}</h1>

				<!-- ユーザー情報 -->
				<div class="mb-6 flex items-center">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
						{#if post.user.avatar}
							<img src={post.user.avatar} alt="" class="h-12 w-12 rounded-full" />
						{:else}
							<span class="text-lg text-gray-600">{post.user.nickname.charAt(0)}</span>
						{/if}
					</div>
					<div class="ml-4">
						<p class="font-medium text-gray-900">{post.user.nickname}</p>
						<p class="text-sm text-gray-500">
							信頼度: {post.user.trustScore} • {formatDate(post.createdAt)}
						</p>
					</div>
				</div>

				<!-- 内容 -->
				<div class="mb-8">
					<h2 class="mb-4 text-xl font-semibold text-gray-900">詳細</h2>
					<div class="whitespace-pre-wrap text-gray-700">{post.content}</div>
				</div>

				<!-- 寄付一覧 -->
				<div>
					<h2 class="mb-4 text-xl font-semibold text-gray-900">
						寄付一覧 ({post.donations.length}件)
					</h2>
					{#if post.donations.length > 0}
						<div class="space-y-4">
							{#each post.donations as donation}
								<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
									<div class="flex items-center justify-between">
										<div>
											<p class="font-medium text-gray-900">
												{donation.user?.nickname || '匿名'}
											</p>
											{#if donation.message}
												<p class="mt-1 text-sm text-gray-600">{donation.message}</p>
											{/if}
										</div>
										<div class="text-right">
											<p class="font-semibold text-green-600">¥{formatAmount(donation.amount)}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-gray-500">まだ寄付がありません</p>
					{/if}
				</div>
			</div>

			<!-- サイドバー -->
			<div class="lg:col-span-1">
				<div class="sticky top-8">
					<!-- 進捗カード -->
					<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div class="mb-4">
							<div class="mb-2 flex justify-between text-sm text-gray-600">
								<span>進捗</span>
								<span
									>{getProgressPercentage(post.totalDonated, post.amountRequested).toFixed(
										1
									)}%</span
								>
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-blue-600"
									style="width: {getProgressPercentage(post.totalDonated, post.amountRequested)}%"
								></div>
							</div>
						</div>

						<div class="mb-4 space-y-2">
							<div>
								<p class="text-sm text-gray-600">集まった金額</p>
								<p class="text-2xl font-bold text-green-600">¥{formatAmount(post.totalDonated)}</p>
							</div>
							<div>
								<p class="text-sm text-gray-600">目標金額</p>
								<p class="text-lg font-semibold text-gray-900">
									¥{formatAmount(post.amountRequested)}
								</p>
							</div>
							<div>
								<p class="text-sm text-gray-600">支援者数</p>
								<p class="text-lg font-semibold text-gray-900">{post.donations.length}人</p>
							</div>
						</div>

						<!-- アクションボタン -->
						<div class="space-y-3">
							<button
								on:click={openDonationModal}
								class="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							>
								寄付する
							</button>
							<button
								on:click={sharePost}
								class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							>
								シェア
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- 寄付モーダル -->
{#if showDonationModal}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">寄付する</h3>

			{#if donationError}
				<div class="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
					<p class="text-sm text-red-800">{donationError}</p>
				</div>
			{/if}

			<form on:submit|preventDefault={handleDonation} class="space-y-4">
				<!-- 寄付金額 -->
				<div>
					<label for="donation-amount" class="mb-2 block text-sm font-medium text-gray-700">
						寄付金額 <span class="text-red-500">*</span>
					</label>
					<div class="relative">
						<span class="absolute top-2 left-3 text-gray-500">¥</span>
						<input
							type="text"
							id="donation-amount"
							on:input={handleAmountInput}
							placeholder="1,000"
							class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>
				</div>

				<!-- メッセージ -->
				<div>
					<label for="donation-message" class="mb-2 block text-sm font-medium text-gray-700">
						メッセージ（任意）
					</label>
					<textarea
						id="donation-message"
						bind:value={donationMessage}
						rows="3"
						maxlength="500"
						placeholder="応援メッセージをお書きください"
						class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					></textarea>
					<p class="mt-1 text-sm text-gray-500">{donationMessage.length}/500文字</p>
				</div>

				<!-- デポジット使用 -->
				<div>
					<div class="flex items-center">
						<input
							type="checkbox"
							id="use-deposit"
							bind:checked={useDeposit}
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="use-deposit" class="ml-2 block text-sm text-gray-700">
							デポジット残高から支払う
						</label>
					</div>
					<p class="mt-1 text-sm text-gray-500">
						{#if useDeposit}
							デポジット残高から寄付金額が差し引かれます
						{:else}
							クレジットカードで決済します
						{/if}
					</p>
				</div>

				<!-- ボタン -->
				<div class="flex gap-3">
					<button
						type="button"
						on:click={closeDonationModal}
						class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						キャンセル
					</button>
					<button
						type="submit"
						disabled={donationLoading}
						class="flex-1 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{donationLoading ? '処理中...' : '寄付する'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
