<script lang="ts">
	import { goto } from '$app/navigation';

	let title = '';
	let content = '';
	let category = '';
	let amountRequested = '';
	let isPrivate = false;
	let loading = false;
	let error = '';

	const categories = [
		{ value: '生活費', label: '🍚 生活費・食費' },
		{ value: '医療費', label: '🏥 医療費・治療費' },
		{ value: '育児・教育', label: '👶 育児・教育費' },
		{ value: '娯楽・イベント', label: '🎉 娯楽・イベント' },
		{ value: '災害・緊急', label: '🚨 災害・緊急事態' },
		{ value: 'その他', label: '💭 その他' }
	];

	async function handleSubmit() {
		if (!validateForm()) return;

		try {
			loading = true;
			error = '';

			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					content,
					category,
					amountRequested: parseInt(amountRequested),
					isPrivate
				})
			});

			const data = await response.json();

			if (response.ok) {
				// 投稿成功後、詳細ページにリダイレクト
				goto(`/post/${data.id}`);
			} else {
				error = data.error || '投稿の作成に失敗しました';
			}
		} catch (err) {
			error = '投稿の作成に失敗しました';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	function validateForm(): boolean {
		if (!title.trim()) {
			error = 'タイトルを入力してください';
			return false;
		}
		if (title.length > 100) {
			error = 'タイトルは100文字以内で入力してください';
			return false;
		}
		if (!category) {
			error = 'カテゴリを選択してください';
			return false;
		}
		if (!amountRequested || parseInt(amountRequested) <= 0) {
			error = '希望金額は1円以上で入力してください';
			return false;
		}
		return true;
	}

	function formatAmount(value: string): string {
		const num = parseInt(value.replace(/[^\d]/g, ''));
		return isNaN(num) ? '' : new Intl.NumberFormat('ja-JP').format(num);
	}

	function handleAmountInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value.replace(/[^\d]/g, '');
		amountRequested = value;
		target.value = formatAmount(value);
	}
</script>

<svelte:head>
	<title>支援を募集する - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
	<div class="container mx-auto max-w-2xl px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-3xl font-bold text-orange-600">💝 支援を募集する</h1>
			<div class="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
				<p class="mb-2 text-lg font-medium text-orange-800">困ったときはお互い様</p>
				<p class="text-orange-700">
					あなたの困りごとを、匿名で安心して相談できます。<br />
					<span class="font-medium">遠慮は要りません。きっと誰かが支えてくれます。</span>
				</p>
			</div>
		</div>

		<!-- 安心メッセージ -->
		<div class="mb-8 rounded-2xl bg-green-50 p-6 shadow-sm">
			<div class="flex items-start space-x-3">
				<div class="flex-shrink-0">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
						<svg
							class="h-5 w-5 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</div>
				</div>
				<div>
					<h3 class="text-sm font-medium text-green-800">プライバシーは完全に保護されます</h3>
					<p class="mt-1 text-sm text-green-700">
						あなたの本名や住所は公開されません。ニックネームで安心してご利用いただけます。
					</p>
				</div>
			</div>
		</div>

		<!-- エラー表示 -->
		{#if error}
			<div class="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
				<p class="text-red-800">{error}</p>
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<!-- カテゴリ -->
			<div class="rounded-2xl bg-white p-6 shadow-sm">
				<label for="category" class="mb-3 block text-lg font-medium text-gray-800">
					どのような困りごとですか？ <span class="text-red-500">*</span>
				</label>
				<div class="grid gap-3 sm:grid-cols-2">
					{#each categories as cat}
						<label
							class="flex cursor-pointer items-center rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
						>
							<input type="radio" bind:group={category} value={cat.value} class="sr-only" />
							<div class="flex w-full items-center justify-between">
								<span class="text-sm font-medium text-gray-700">{cat.label}</span>
								<div
									class="h-4 w-4 rounded-full border-2 border-gray-300 {category === cat.value
										? 'border-blue-500 bg-blue-500'
										: ''}"
								></div>
							</div>
						</label>
					{/each}
				</div>
			</div>

			<!-- 希望金額 -->
			<div class="rounded-2xl bg-white p-6 shadow-sm">
				<label for="amount" class="mb-3 block text-lg font-medium text-gray-800">
					どのくらいの支援が必要ですか？ <span class="text-red-500">*</span>
				</label>
				<div class="relative">
					<span class="absolute top-3 left-4 text-xl text-gray-500">¥</span>
					<input
						type="text"
						id="amount"
						on:input={handleAmountInput}
						placeholder="10,000"
						class="block w-full rounded-lg border-2 border-gray-200 py-3 pr-4 pl-12 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>
				<p class="mt-2 text-sm text-gray-600">
					💡 少額でも大丈夫です。必要な分だけお書きください。
				</p>
			</div>

			<!-- タイトル -->
			<div class="rounded-2xl bg-white p-6 shadow-sm">
				<label for="title" class="mb-3 block text-lg font-medium text-gray-800">
					一言で状況を教えてください <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="title"
					bind:value={title}
					maxlength="100"
					placeholder="例: 明日のご飯代がありません"
					class="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					required
				/>
				<p class="mt-2 text-sm text-gray-500">{title.length}/100文字</p>
			</div>

			<!-- 詳細内容（任意） -->
			<div class="rounded-2xl bg-white p-6 shadow-sm">
				<label for="content" class="mb-3 block text-lg font-medium text-gray-800">
					詳しい事情（任意）
				</label>
				<textarea
					id="content"
					bind:value={content}
					rows="6"
					maxlength="2000"
					placeholder="詳しく書きたい場合はこちらに。書かなくても大丈夫です。"
					class="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
				></textarea>
				<p class="mt-2 text-sm text-gray-500">{content.length}/2000文字</p>
				<p class="mt-1 text-sm text-blue-600">
					💡 詳しく書くほど、支援者の方に理解していただきやすくなります。
				</p>
			</div>

			<!-- プライベート設定 -->
			<div class="rounded-2xl bg-white p-6 shadow-sm">
				<div class="flex items-start space-x-3">
					<input
						type="checkbox"
						id="private"
						bind:checked={isPrivate}
						class="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					<div>
						<label for="private" class="block text-lg font-medium text-gray-800">
							🔒 非公開で投稿する
						</label>
						<p class="mt-1 text-sm text-gray-600">
							一覧には表示されず、URLを直接共有した人のみが閲覧できます。<br />
							より慎重に支援者を選びたい場合におすすめです。
						</p>
					</div>
				</div>
			</div>

			<!-- 励ましメッセージ -->
			<div class="rounded-2xl bg-yellow-50 p-6 shadow-sm">
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
							<span class="text-yellow-600">💛</span>
						</div>
					</div>
					<div>
						<h3 class="text-sm font-medium text-yellow-800">投稿後のこと</h3>
						<p class="mt-1 text-sm text-yellow-700">
							投稿が完了すると、温かい支援者の方々に届きます。<br />
							支援を受けた後は、お礼のメッセージを送ることができます。<br />
							<span class="font-medium">あなたの困りごとは、きっと誰かに届きます。</span>
						</p>
					</div>
				</div>
			</div>

			<!-- ボタン -->
			<div class="flex gap-4">
				<button
					type="button"
					on:click={() => goto('/top')}
					class="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					戻る
				</button>
				<button
					type="submit"
					disabled={loading}
					class="flex-1 rounded-lg border-2 border-transparent bg-orange-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? '投稿中...' : '💝 支援を募集する'}
				</button>
			</div>
		</form>
	</div>
</div>
