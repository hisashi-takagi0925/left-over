import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import prisma from '$lib/server/db/prisma';

// ユーザー情報取得
export const GET: RequestHandler = async ({ locals }) => {
	try {
		// TODO: Auth0からユーザー情報を取得する実装
		// 現在はモックデータを返す
		const mockUser = {
			id: '1',
			auth0Id: 'auth0|mock',
			nickname: 'テストユーザー',
			email: 'test@example.com',
			avatar: null,
			bio: null,
			trustScore: 100,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		return json(mockUser);
	} catch (error) {
		console.error('ユーザー情報取得エラー:', error);
		return json({ error: 'ユーザー情報の取得に失敗しました' }, { status: 500 });
	}
};

// ユーザー情報更新
export const PATCH: RequestHandler = async ({ request, locals }) => {
	try {
		const data = await request.json();
		const { nickname, bio, avatar } = data;

		// TODO: Auth0からユーザーIDを取得
		const userId = 'mock-user-id';

		// バリデーション
		if (nickname && nickname.length > 50) {
			return json({ error: 'ニックネームは50文字以内で入力してください' }, { status: 400 });
		}

		if (bio && bio.length > 500) {
			return json({ error: '自己紹介は500文字以内で入力してください' }, { status: 400 });
		}

		// TODO: 実際のデータベース更新
		// const updatedUser = await prisma.user.update({
		//   where: { id: userId },
		//   data: { nickname, bio, avatar }
		// });

		const mockUpdatedUser = {
			id: userId,
			nickname: nickname || 'テストユーザー',
			bio: bio || null,
			avatar: avatar || null,
			updatedAt: new Date()
		};

		return json(mockUpdatedUser);
	} catch (error) {
		console.error('ユーザー情報更新エラー:', error);
		return json({ error: 'ユーザー情報の更新に失敗しました' }, { status: 500 });
	}
};
