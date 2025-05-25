<script lang="ts">
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
		donations: { amount: number }[];
		totalDonated: number;
	}

	let posts: Post[] = [];
	let loading = true;
	let selectedCategory = '';
	let error = '';

	const categories = [
		{ value: '', label: 'すべて' },
		{ value: '医療', label: '医療' },
		{ value: '災害', label: '災害' },
		{ value: '教育', label: '教育' },
		{ value: '動物', label: '動物' },
		{ value: 'その他', label: 'その他' }
	];

	onMount(async () => {
		await loadPosts();
	});

	async function loadPosts() {
		try {
			loading = true;
			const params = new URLSearchParams();
			if (selectedCategory) {
				params.append('category', selectedCategory);
			}

			const response = await fetch(`/api/posts?${params}`);
			const data = await response.json();

			if (response.ok) {
				posts = data.posts;
			} else {
				error = data.error || '投稿の取得に失敗しました';
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
		return new Date(date).toLocaleDateString('ja-JP');
	}

	function getProgressPercentage(donated: number, requested: number): number {
		return Math.min((donated / requested) * 100, 100);
	}

	function handleCategoryChange() {
		loadPosts();
	}

	function viewPost(postId: string) {
		goto(`/post/${postId}`);
	}
</script>

<svelte:head>
	<title>支援案件一覧 - 寄付プラットフォーム</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="mb-4 text-3xl font-bold text-gray-900">支援案件一覧</h1>
		<p class="text-gray-600">困っている方々への支援をお願いします</p>
	</div>

	<!-- カテゴリフィルター -->
	<div class="mb-6">
		<label for="category" class="mb-2 block text-sm font-medium text-gray-700">
			カテゴリで絞り込み
		</label>
		<select
			id="category"
			bind:value={selectedCategory}
			on:change={handleCategoryChange}
			class="block w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
		>
			{#each categories as category}
				<option value={category.value}>{category.label}</option>
			{/each}
		</select>
	</div>

	<!-- エラー表示 -->
	{#if error}
		<div class="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
			<p class="text-red-800">{error}</p>
		</div>
	{/if}

	<!-- ローディング -->
	{#if loading}
		<div class="flex items-center justify-center py-12">
			<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
		</div>
	{:else}
		<!-- 投稿一覧 -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<div
					class="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg"
					on:click={() => viewPost(post.id)}
					on:keydown={(e) => e.key === 'Enter' && viewPost(post.id)}
					role="button"
					tabindex="0"
				>
					<div class="p-6">
						<!-- カテゴリバッジ -->
						<div class="mb-3">
							<span
								class="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
							>
								{post.category}
							</span>
						</div>

						<!-- タイトル -->
						<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
							{post.title}
						</h3>

						<!-- 内容 -->
						<p class="mb-4 line-clamp-3 text-sm text-gray-600">
							{post.content}
						</p>

						<!-- 進捗バー -->
						<div class="mb-4">
							<div class="mb-1 flex justify-between text-sm text-gray-600">
								<span>進捗</span>
								<span
									>{getProgressPercentage(post.totalDonated, post.amountRequested).toFixed(
										1
									)}%</span
								>
							</div>
							<div class="h-2 w-full rounded-full bg-gray-200">
								<div
									class="h-2 rounded-full bg-blue-600"
									style="width: {getProgressPercentage(post.totalDonated, post.amountRequested)}%"
								></div>
							</div>
						</div>

						<!-- 金額情報 -->
						<div class="mb-4">
							<div class="text-sm text-gray-600">
								<span>集まった金額: </span>
								<span class="font-semibold text-green-600">¥{formatAmount(post.totalDonated)}</span>
							</div>
							<div class="text-sm text-gray-600">
								<span>目標金額: </span>
								<span class="font-semibold">¥{formatAmount(post.amountRequested)}</span>
							</div>
						</div>

						<!-- ユーザー情報 -->
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
									{#if post.user.avatar}
										<img src={post.user.avatar} alt="" class="h-8 w-8 rounded-full" />
									{:else}
										<span class="text-xs text-gray-600">{post.user.nickname.charAt(0)}</span>
									{/if}
								</div>
								<div class="ml-2">
									<p class="text-sm font-medium text-gray-900">{post.user.nickname}</p>
									<p class="text-xs text-gray-500">信頼度: {post.user.trustScore}</p>
								</div>
							</div>
							<div class="text-xs text-gray-500">
								{formatDate(post.createdAt)}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- 投稿がない場合 -->
		{#if posts.length === 0}
			<div class="py-12 text-center">
				<p class="text-gray-500">該当する投稿がありません</p>
			</div>
		{/if}
	{/if}

	<!-- 新規投稿ボタン -->
	<div class="fixed right-6 bottom-6">
		<button
			on:click={() => goto('/new')}
			class="rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-700"
		>
			+ 支援を募集
		</button>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
