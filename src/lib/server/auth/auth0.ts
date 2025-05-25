import { browser } from '$app/environment';
import { Auth0Client } from '@auth0/auth0-spa-js';

let auth0: Auth0Client | null = null;

if (browser) {
	auth0 = new Auth0Client({
		domain: import.meta.env.VITE_AUTH0_DOMAIN,
		clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
		authorizationParams: {
			redirect_uri: window.location.origin,
			audience: import.meta.env.VITE_AUTH0_AUDIENCE
		}
	});
}

export { auth0 };
