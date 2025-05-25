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
		{ value: '医療', label: '医療' },
		{ value: '災害', label: '災害' },
		{ value: '教育', label: '教育' },
		{ value: '動物', label: '動物' },
		{ value: 'その他', label: 'その他' }
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
		if (!content.trim()) {
			error = '内容を入力してください';
			return false;
		}
		if (content.length > 2000) {
			error = '内容は2000文字以内で入力してください';
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
	<title>支援募集投稿 - 寄付プラットフォーム</title>
</svelte:head>

<div class="container mx-auto max-w-2xl px-4 py-8">
	<div class="mb-8">
		<h1 class="mb-4 text-3xl font-bold text-gray-900">支援募集投稿</h1>
		<p class="text-gray-600">困っていることがあれば、遠慮なく支援を募集してください</p>
	</div>

	<!-- エラー表示 -->
	{#if error}
		<div class="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
			<p class="text-red-800">{error}</p>
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<!-- タイトル -->
		<div>
			<label for="title" class="mb-2 block text-sm font-medium text-gray-700">
				タイトル <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="title"
				bind:value={title}
				maxlength="100"
				placeholder="例: 医療費のご支援をお願いします"
				class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
				required
			/>
			<p class="mt-1 text-sm text-gray-500">{title.length}/100文字</p>
		</div>

		<!-- カテゴリ -->
		<div>
			<label for="category" class="mb-2 block text-sm font-medium text-gray-700">
				カテゴリ <span class="text-red-500">*</span>
			</label>
			<select
				id="category"
				bind:value={category}
				class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
				required
			>
				<option value="">カテゴリを選択してください</option>
				{#each categories as cat}
					<option value={cat.value}>{cat.label}</option>
				{/each}
			</select>
		</div>

		<!-- 希望金額 -->
		<div>
			<label for="amount" class="mb-2 block text-sm font-medium text-gray-700">
				希望金額 <span class="text-red-500">*</span>
			</label>
			<div class="relative">
				<span class="absolute top-2 left-3 text-gray-500">¥</span>
				<input
					type="text"
					id="amount"
					on:input={handleAmountInput}
					placeholder="500,000"
					class="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					required
				/>
			</div>
			<p class="mt-1 text-sm text-gray-500">必要な金額を入力してください</p>
		</div>

		<!-- 内容 -->
		<div>
			<label for="content" class="mb-2 block text-sm font-medium text-gray-700">
				詳細内容 <span class="text-red-500">*</span>
			</label>
			<textarea
				id="content"
				bind:value={content}
				rows="8"
				maxlength="2000"
				placeholder="支援が必要な理由や状況を詳しく説明してください。具体的な情報があると、支援者の方により理解していただけます。"
				class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
				required
			></textarea>
			<p class="mt-1 text-sm text-gray-500">{content.length}/2000文字</p>
		</div>

		<!-- プライベート設定 -->
		<div>
			<div class="flex items-center">
				<input
					type="checkbox"
					id="private"
					bind:checked={isPrivate}
					class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
				/>
				<label for="private" class="ml-2 block text-sm text-gray-700">
					非公開投稿（URLを知っている人のみ閲覧可能）
				</label>
			</div>
			<p class="mt-1 text-sm text-gray-500">
				非公開にすると、一覧には表示されず、直接URLを共有した人のみが閲覧できます
			</p>
		</div>

		<!-- 注意事項 -->
		<div class="rounded-md border border-yellow-200 bg-yellow-50 p-4">
			<h3 class="mb-2 text-sm font-medium text-yellow-800">投稿前にご確認ください</h3>
			<ul class="space-y-1 text-sm text-yellow-700">
				<li>• 虚偽の情報での投稿は禁止されています</li>
				<li>• 適切でない内容の投稿は削除される場合があります</li>
				<li>• 個人情報の記載にはご注意ください</li>
				<li>• 支援金の使用目的を明確にしてください</li>
			</ul>
		</div>

		<!-- ボタン -->
		<div class="flex gap-4">
			<button
				type="button"
				on:click={() => goto('/top')}
				class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				キャンセル
			</button>
			<button
				type="submit"
				disabled={loading}
				class="flex-1 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? '投稿中...' : '投稿する'}
			</button>
		</div>
	</form>
</div>
