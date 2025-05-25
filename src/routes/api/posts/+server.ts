import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import prisma from '$lib/server/db/prisma';

// 投稿一覧取得
export const GET: RequestHandler = async ({ url }) => {
	try {
		const category = url.searchParams.get('category');
		const limit = parseInt(url.searchParams.get('limit') || '20');
		const offset = parseInt(url.searchParams.get('offset') || '0');

		// TODO: 実際のデータベースクエリ
		// const posts = await prisma.post.findMany({
		//   where: category ? { category } : {},
		//   include: {
		//     user: {
		//       select: { nickname: true, avatar: true, trustScore: true }
		//     },
		//     donations: {
		//       select: { amount: true }
		//     }
		//   },
		//   orderBy: { createdAt: 'desc' },
		//   take: limit,
		//   skip: offset
		// });

		// モックデータ
		const mockPosts = [
			{
				id: '1',
				title: '医療費のご支援をお願いします',
				content: '突然の病気で高額な医療費が必要になりました。皆様のご支援をお願いいたします。',
				category: '医療',
				amountRequested: 500000,
				status: 'active',
				createdAt: new Date('2024-01-15'),
				user: {
					nickname: '田中太郎',
					avatar: null,
					trustScore: 95
				},
				donations: [{ amount: 10000 }, { amount: 5000 }, { amount: 20000 }],
				totalDonated: 35000
			},
			{
				id: '2',
				title: '災害復旧支援',
				content: '台風被害により家屋が損壊しました。復旧のためのご支援をお願いします。',
				category: '災害',
				amountRequested: 1000000,
				status: 'active',
				createdAt: new Date('2024-01-10'),
				user: {
					nickname: '佐藤花子',
					avatar: null,
					trustScore: 88
				},
				donations: [{ amount: 50000 }, { amount: 30000 }],
				totalDonated: 80000
			}
		];

		return json({
			posts: mockPosts,
			total: mockPosts.length,
			hasMore: false
		});
	} catch (error) {
		console.error('投稿一覧取得エラー:', error);
		return json({ error: '投稿一覧の取得に失敗しました' }, { status: 500 });
	}
};

// 新規投稿作成
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { title, content, category, amountRequested, isPrivate } = data;

		// TODO: Auth0からユーザーIDを取得
		const userId = 'mock-user-id';

		// バリデーション
		if (!title || title.length > 100) {
			return json({ error: 'タイトルは1文字以上100文字以内で入力してください' }, { status: 400 });
		}

		if (!content || content.length > 2000) {
			return json({ error: '内容は1文字以上2000文字以内で入力してください' }, { status: 400 });
		}

		if (!category) {
			return json({ error: 'カテゴリを選択してください' }, { status: 400 });
		}

		if (!amountRequested || amountRequested <= 0) {
			return json({ error: '希望金額は1円以上で入力してください' }, { status: 400 });
		}

		// TODO: 実際のデータベース挿入
		// const newPost = await prisma.post.create({
		//   data: {
		//     title,
		//     content,
		//     category,
		//     amountRequested,
		//     isPrivate: isPrivate || false,
		//     userId
		//   }
		// });

		const mockNewPost = {
			id: Date.now().toString(),
			title,
			content,
			category,
			amountRequested,
			isPrivate: isPrivate || false,
			status: 'active',
			userId,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		return json(mockNewPost, { status: 201 });
	} catch (error) {
		console.error('投稿作成エラー:', error);
		return json({ error: '投稿の作成に失敗しました' }, { status: 500 });
	}
};
