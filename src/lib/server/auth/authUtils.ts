import { browser } from '$app/environment';
import { auth0 } from './auth0';
import { user, isAuthenticated, isLoading } from '$lib/stores/auth';

export async function initAuth() {
	if (!browser || !auth0) return;

	try {
		const isAuthenticatedResult = await auth0.isAuthenticated();
		isAuthenticated.set(isAuthenticatedResult);

		if (isAuthenticatedResult) {
			const userResult = await auth0.getUser();
			if (userResult) {
				user.set(userResult);
			}
		}
	} catch (error) {
		console.error('Auth initialization error:', error);
	} finally {
		isLoading.set(false);
	}
}

export async function login() {
	if (!browser || !auth0) return;

	try {
		await auth0.loginWithRedirect();
	} catch (error) {
		console.error('Login error:', error);
	}
}

export async function logout() {
	if (!browser || !auth0) return;

	try {
		await auth0.logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		});
		user.set(null);
		isAuthenticated.set(false);
	} catch (error) {
		console.error('Logout error:', error);
	}
}

export async function handleRedirectCallback() {
	if (!browser || !auth0) return;

	try {
		await auth0.handleRedirectCallback();
		const isAuthenticatedResult = await auth0.isAuthenticated();
		isAuthenticated.set(isAuthenticatedResult);

		if (isAuthenticatedResult) {
			const userResult = await auth0.getUser();
			if (userResult) {
				user.set(userResult);
			}
		}
	} catch (error) {
		console.error('Redirect callback error:', error);
	}
}
