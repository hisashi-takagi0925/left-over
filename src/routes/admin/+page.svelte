<script lang="ts">
	import { onMount } from 'svelte';

	// モックデータ
	let users = [
		{
			id: '1',
			nickname: '田中太郎',
			email: 'tanaka@example.com',
			trustScore: 95,
			status: 'active',
			joinDate: '2024/01/15',
			totalDonated: 45000,
			totalReceived: 32000,
			reportCount: 0
		},
		{
			id: '2',
			nickname: '佐藤花子',
			email: 'sato@example.com',
			trustScore: 88,
			status: 'active',
			joinDate: '2024/02/20',
			totalDonated: 28000,
			totalReceived: 15000,
			reportCount: 1
		},
		{
			id: '3',
			nickname: '山田次郎',
			email: 'yamada@example.com',
			trustScore: 45,
			status: 'suspended',
			joinDate: '2024/03/10',
			totalDonated: 5000,
			totalReceived: 50000,
			reportCount: 3
		}
	];

	let posts = [
		{
			id: '1',
			title: '医療費のご支援をお願いします',
			category: '医療',
			amount: 500000,
			status: 'active',
			authorName: '田中太郎',
			createdAt: '2024/11/15',
			reportCount: 0,
			totalDonated: 35000
		},
		{
			id: '2',
			title: '災害復旧支援',
			category: '災害',
			amount: 1000000,
			status: 'active',
			authorName: '佐藤花子',
			createdAt: '2024/11/10',
			reportCount: 0,
			totalDonated: 80000
		},
		{
			id: '3',
			title: '怪しい投稿です',
			category: 'その他',
			amount: 100000,
			status: 'reported',
			authorName: '山田次郎',
			createdAt: '2024/11/20',
			reportCount: 5,
			totalDonated: 0
		}
	];

	let reports = [
		{
			id: '1',
			type: 'post',
			targetId: '3',
			targetTitle: '怪しい投稿です',
			reporterName: '通報者A',
			reason: '詐欺の疑いがあります',
			status: 'pending',
			createdAt: '2024/11/21 10:30'
		},
		{
			id: '2',
			type: 'user',
			targetId: '3',
			targetTitle: '山田次郎',
			reporterName: '通報者B',
			reason: '不適切な行動が見られます',
			status: 'pending',
			createdAt: '2024/11/21 09:15'
		},
		{
			id: '3',
			type: 'post',
			targetId: '1',
			targetTitle: '医療費のご支援をお願いします',
			reporterName: '通報者C',
			reason: '虚偽の内容の可能性',
			status: 'resolved',
			createdAt: '2024/11/20 14:20'
		}
	];

	let adminLogs = [
		{
			id: '1',
			adminName: '管理者A',
			action: 'ユーザー停止',
			details: 'ユーザー「山田次郎」を停止しました',
			createdAt: '2024/11/21 11:00'
		},
		{
			id: '2',
			adminName: '管理者B',
			action: '投稿削除',
			details: '投稿「怪しい投稿です」を削除しました',
			createdAt: '2024/11/21 10:45'
		},
		{
			id: '3',
			adminName: '管理者A',
			action: '信頼スコア調整',
			details: 'ユーザー「佐藤花子」の信頼スコアを88に調整',
			createdAt: '2024/11/20 16:30'
		}
	];

	let activeTab = 'users';
	let selectedUser = null;
	let selectedPost = null;
	let selectedReport = null;
	let showUserModal = false;
	let showPostModal = false;
	let showReportModal = false;

	function formatAmount(amount: number): string {
		return new Intl.NumberFormat('ja-JP').format(amount);
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString('ja-JP');
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'suspended':
				return 'bg-red-100 text-red-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'reported':
				return 'bg-orange-100 text-orange-800';
			case 'resolved':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function getStatusLabel(status: string): string {
		switch (status) {
			case 'active':
				return 'アクティブ';
			case 'suspended':
				return '停止中';
			case 'pending':
				return '対応待ち';
			case 'reported':
				return '通報済み';
			case 'resolved':
				return '解決済み';
			default:
				return '不明';
		}
	}

	function openUserModal(user: any) {
		selectedUser = user;
		showUserModal = true;
	}

	function openPostModal(post: any) {
		selectedPost = post;
		showPostModal = true;
	}

	function openReportModal(report: any) {
		selectedReport = report;
		showReportModal = true;
	}

	function suspendUser(userId: string) {
		if (confirm('このユーザーを停止しますか？')) {
			const user = users.find((u) => u.id === userId);
			if (user) {
				user.status = 'suspended';
				users = [...users];
				// TODO: API呼び出し
				alert('ユーザーを停止しました');
			}
		}
	}

	function activateUser(userId: string) {
		if (confirm('このユーザーを有効化しますか？')) {
			const user = users.find((u) => u.id === userId);
			if (user) {
				user.status = 'active';
				users = [...users];
				// TODO: API呼び出し
				alert('ユーザーを有効化しました');
			}
		}
	}

	function deletePost(postId: string) {
		if (confirm('この投稿を削除しますか？')) {
			posts = posts.filter((p) => p.id !== postId);
			// TODO: API呼び出し
			alert('投稿を削除しました');
		}
	}

	function resolveReport(reportId: string) {
		if (confirm('この通報を解決済みにしますか？')) {
			const report = reports.find((r) => r.id === reportId);
			if (report) {
				report.status = 'resolved';
				reports = [...reports];
				// TODO: API呼び出し
				alert('通報を解決済みにしました');
			}
		}
	}

	function adjustTrustScore(userId: string, newScore: number) {
		const user = users.find((u) => u.id === userId);
		if (user) {
			user.trustScore = newScore;
			users = [...users];
			// TODO: API呼び出し
			alert(`信頼スコアを${newScore}に調整しました`);
		}
	}
</script>

<svelte:head>
	<title>管理者画面 - 困ったときはお互い様</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
	<div class="container mx-auto px-4 py-8">
		<!-- ヘッダー -->
		<div class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-red-600">🛡️ 管理者画面</h1>
			<p class="text-gray-600">プラットフォームの健全性を維持します</p>
		</div>

		<!-- 統計情報 -->
		<div class="mb-8 grid gap-4 md:grid-cols-4">
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-blue-600">{users.length}</div>
					<div class="text-sm text-gray-600">総ユーザー数</div>
				</div>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-green-600">{posts.length}</div>
					<div class="text-sm text-gray-600">総投稿数</div>
				</div>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-orange-600">
						{reports.filter((r) => r.status === 'pending').length}
					</div>
					<div class="text-sm text-gray-600">未対応通報</div>
				</div>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="text-center">
					<div class="text-2xl font-bold text-red-600">
						{users.filter((u) => u.status === 'suspended').length}
					</div>
					<div class="text-sm text-gray-600">停止ユーザー</div>
				</div>
			</div>
		</div>

		<!-- タブ -->
		<div class="mb-6 flex space-x-1 rounded-lg bg-white p-1 shadow-lg">
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'users'
					? 'bg-red-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'users')}
			>
				ユーザー管理
			</button>
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'posts'
					? 'bg-red-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'posts')}
			>
				投稿管理
			</button>
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'reports'
					? 'bg-red-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'reports')}
			>
				通報管理
			</button>
			<button
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTab ===
				'logs'
					? 'bg-red-600 text-white'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeTab = 'logs')}
			>
				操作ログ
			</button>
		</div>

		<!-- ユーザー管理 -->
		{#if activeTab === 'users'}
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-6 text-lg font-semibold text-gray-900">👥 ユーザー管理</h3>
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="pb-3 text-left text-sm font-medium text-gray-600">ユーザー</th>
								<th class="pb-3 text-left text-sm font-medium text-gray-600">信頼スコア</th>
								<th class="pb-3 text-left text-sm font-medium text-gray-600">ステータス</th>
								<th class="pb-3 text-left text-sm font-medium text-gray-600">寄付額</th>
								<th class="pb-3 text-left text-sm font-medium text-gray-600">通報数</th>
								<th class="pb-3 text-left text-sm font-medium text-gray-600">操作</th>
							</tr>
						</thead>
						<tbody>
							{#each users as user}
								<tr class="border-b border-gray-100">
									<td class="py-4">
										<div>
											<div class="font-medium text-gray-900">{user.nickname}</div>
											<div class="text-sm text-gray-500">{user.email}</div>
										</div>
									</td>
									<td class="py-4">
										<div class="text-sm font-medium text-gray-900">{user.trustScore}</div>
									</td>
									<td class="py-4">
										<span class="rounded-full px-2 py-1 text-xs {getStatusColor(user.status)}">
											{getStatusLabel(user.status)}
										</span>
									</td>
									<td class="py-4">
										<div class="text-sm text-gray-900">¥{formatAmount(user.totalDonated)}</div>
									</td>
									<td class="py-4">
										<div class="text-sm text-gray-900">{user.reportCount}</div>
									</td>
									<td class="py-4">
										<div class="flex space-x-2">
											<button
												class="text-xs text-blue-600 hover:text-blue-700"
												on:click={() => openUserModal(user)}
											>
												詳細
											</button>
											{#if user.status === 'active'}
												<button
													class="text-xs text-red-600 hover:text-red-700"
													on:click={() => suspendUser(user.id)}
												>
													停止
												</button>
											{:else}
												<button
													class="text-xs text-green-600 hover:text-green-700"
													on:click={() => activateUser(user.id)}
												>
													有効化
												</button>
											{/if}
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}

		<!-- 投稿管理 -->
		{#if activeTab === 'posts'}
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-6 text-lg font-semibold text-gray-900">📝 投稿管理</h3>
				<div class="space-y-4">
					{#each posts as post}
						<div class="rounded-lg border border-gray-200 p-4">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-2">
										<h4 class="font-medium text-gray-900">{post.title}</h4>
										<span class="rounded-full px-2 py-1 text-xs {getStatusColor(post.status)}">
											{getStatusLabel(post.status)}
										</span>
										{#if post.reportCount > 0}
											<span class="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
												通報{post.reportCount}件
											</span>
										{/if}
									</div>
									<div class="mt-1 text-sm text-gray-600">
										{post.category} | {post.authorName} | 目標: ¥{formatAmount(post.amount)}
									</div>
									<div class="text-xs text-gray-500">
										{formatDate(post.createdAt)} | 集まった金額: ¥{formatAmount(post.totalDonated)}
									</div>
								</div>
								<div class="flex space-x-2">
									<button
										class="text-xs text-blue-600 hover:text-blue-700"
										on:click={() => openPostModal(post)}
									>
										詳細
									</button>
									<button
										class="text-xs text-red-600 hover:text-red-700"
										on:click={() => deletePost(post.id)}
									>
										削除
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- 通報管理 -->
		{#if activeTab === 'reports'}
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-6 text-lg font-semibold text-gray-900">🚨 通報管理</h3>
				<div class="space-y-4">
					{#each reports as report}
						<div class="rounded-lg border border-gray-200 p-4">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-2">
										<h4 class="font-medium text-gray-900">
											{report.type === 'post' ? '投稿' : 'ユーザー'}: {report.targetTitle}
										</h4>
										<span class="rounded-full px-2 py-1 text-xs {getStatusColor(report.status)}">
											{getStatusLabel(report.status)}
										</span>
									</div>
									<div class="mt-1 text-sm text-gray-600">
										通報者: {report.reporterName}
									</div>
									<div class="mt-1 text-sm text-gray-700">
										理由: {report.reason}
									</div>
									<div class="text-xs text-gray-500">
										{formatDate(report.createdAt)}
									</div>
								</div>
								<div class="flex space-x-2">
									<button
										class="text-xs text-blue-600 hover:text-blue-700"
										on:click={() => openReportModal(report)}
									>
										詳細
									</button>
									{#if report.status === 'pending'}
										<button
											class="text-xs text-green-600 hover:text-green-700"
											on:click={() => resolveReport(report.id)}
										>
											解決
										</button>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- 操作ログ -->
		{#if activeTab === 'logs'}
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<h3 class="mb-6 text-lg font-semibold text-gray-900">📋 操作ログ</h3>
				<div class="space-y-4">
					{#each adminLogs as log}
						<div class="rounded-lg border border-gray-200 p-4">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center space-x-2">
										<h4 class="font-medium text-gray-900">{log.action}</h4>
										<span class="text-sm text-gray-600">by {log.adminName}</span>
									</div>
									<div class="mt-1 text-sm text-gray-700">{log.details}</div>
									<div class="text-xs text-gray-500">{formatDate(log.createdAt)}</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- ユーザー詳細モーダル -->
{#if showUserModal && selectedUser}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-xl font-bold text-gray-900">👤 ユーザー詳細</h3>
			<div class="space-y-3">
				<div>
					<label class="text-sm font-medium text-gray-700">ニックネーム</label>
					<div class="text-gray-900">{selectedUser.nickname}</div>
				</div>
				<div>
					<label class="text-sm font-medium text-gray-700">メールアドレス</label>
					<div class="text-gray-900">{selectedUser.email}</div>
				</div>
				<div>
					<label class="text-sm font-medium text-gray-700">信頼スコア</label>
					<input
						type="number"
						value={selectedUser.trustScore}
						min="0"
						max="100"
						class="w-full rounded-lg border border-gray-300 px-3 py-2"
						on:change={(e) => adjustTrustScore(selectedUser.id, parseInt(e.target.value))}
					/>
				</div>
				<div>
					<label class="text-sm font-medium text-gray-700">参加日</label>
					<div class="text-gray-900">{selectedUser.joinDate}</div>
				</div>
				<div>
					<label class="text-sm font-medium text-gray-700">寄付総額</label>
					<div class="text-gray-900">¥{formatAmount(selectedUser.totalDonated)}</div>
				</div>
				<div>
					<label class="text-sm font-medium text-gray-700">受益総額</label>
					<div class="text-gray-900">¥{formatAmount(selectedUser.totalReceived)}</div>
				</div>
			</div>
			<div class="mt-6 flex space-x-3">
				<button
					class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					on:click={() => (showUserModal = false)}
				>
					閉じる
				</button>
			</div>
		</div>
	</div>
{/if}
