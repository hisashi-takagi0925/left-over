import { writable } from 'svelte/store';
import type { User } from '@auth0/auth0-spa-js';

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);
export const isLoading = writable(true);
