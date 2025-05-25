import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// 認証が必要なパスのリスト
	const protectedPaths = ['/dashboard', '/profile', '/settings'];

	// 現在のパスが保護されたパスかどうかを確認
	const isProtectedPath = protectedPaths.some((path) => event.url.pathname.startsWith(path));

	// セッションクッキーから認証状態を確認
	const session = event.cookies.get('session');

	if (isProtectedPath && !session) {
		// 認証が必要なページにアクセスしようとしているが、セッションがない場合
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/login'
			}
		});
	}

	return resolve(event);
};
