import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import prisma from '$lib/server/db/prisma';

// 寄付実行
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { postId, amount, message, useDeposit } = data;

		// TODO: Auth0からユーザーIDを取得
		const userId = 'mock-user-id';

		// バリデーション
		if (!postId) {
			return json({ error: '投稿IDが必要です' }, { status: 400 });
		}

		if (!amount || amount <= 0) {
			return json({ error: '寄付金額は1円以上で入力してください' }, { status: 400 });
		}

		if (message && message.length > 500) {
			return json({ error: 'メッセージは500文字以内で入力してください' }, { status: 400 });
		}

		// TODO: 投稿の存在確認
		// const post = await prisma.post.findUnique({
		//   where: { id: postId }
		// });
		// if (!post) {
		//   return json({ error: '投稿が見つかりません' }, { status: 404 });
		// }

		if (useDeposit) {
			// TODO: デポジット残高確認
			// const userDeposit = await prisma.deposit.aggregate({
			//   where: { userId, type: 'charge', status: 'completed' },
			//   _sum: { amount: true }
			// });
			// const userWithdrawals = await prisma.deposit.aggregate({
			//   where: { userId, type: { in: ['withdraw', 'donation'] }, status: 'completed' },
			//   _sum: { amount: true }
			// });
			// const balance = (userDeposit._sum.amount || 0) - (userWithdrawals._sum.amount || 0);
			// if (balance < amount) {
			//   return json({ error: 'デポジット残高が不足しています' }, { status: 400 });
			// }
		} else {
			// TODO: Stripe決済処理
			// const paymentIntent = await stripe.paymentIntents.create({
			//   amount: amount,
			//   currency: 'jpy',
			//   metadata: { postId, userId }
			// });
		}

		// TODO: 寄付記録の作成
		// const donation = await prisma.donation.create({
		//   data: {
		//     postId,
		//     userId,
		//     amount,
		//     message: message || null
		//   }
		// });

		// TODO: デポジット使用の場合、デポジット記録作成
		// if (useDeposit) {
		//   await prisma.deposit.create({
		//     data: {
		//       userId,
		//       amount: -amount,
		//       type: 'donation',
		//       status: 'completed'
		//     }
		//   });
		// }

		const mockDonation = {
			id: Date.now().toString(),
			postId,
			userId,
			amount,
			message: message || null,
			createdAt: new Date()
		};

		return json(
			{
				donation: mockDonation,
				message: '寄付が完了しました。ありがとうございます！'
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('寄付実行エラー:', error);
		return json({ error: '寄付の処理に失敗しました' }, { status: 500 });
	}
};
