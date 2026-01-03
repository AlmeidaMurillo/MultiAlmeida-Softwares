import { createElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function safeJson(res) {
	try {
		return await res.json();
	} catch {
		return null;
	}
}

export async function login({ email, password }) {
	const res = await fetch(`${API_BASE}/api/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({ email, password }),
	});
	const data = await safeJson(res);
	if (!res.ok) throw new Error(data?.error || data?.message || 'Não foi possível entrar.');
	return data;
}

export async function logout() {
	const res = await fetch(`${API_BASE}/api/auth/logout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({}),
	});
	const data = await safeJson(res);
	if (!res.ok) throw new Error(data?.error || data?.message || 'Não foi possível sair.');
	return data;
}

export async function refreshSession() {
	const res = await fetch(`${API_BASE}/api/auth/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({}),
	});
	const data = await safeJson(res);
	if (!res.ok) return null;
	return data;
}

export async function getMe() {
	const res = await fetch(`${API_BASE}/api/auth/me`, {
		method: 'GET',
		credentials: 'include',
	});
	const data = await safeJson(res);
	if (!res.ok) return null;
	return data;
}

export async function apiFetch(pathOrUrl, options = {}) {
	const url = String(pathOrUrl).startsWith('http') ? String(pathOrUrl) : `${API_BASE}${pathOrUrl}`;
	const first = await fetch(url, { ...options, credentials: 'include' });
	if (first.status !== 401) return first;

	// tenta 1 refresh e refaz
	const refreshed = await refreshSession();
	if (!refreshed) return first;
	return fetch(url, { ...options, credentials: 'include' });
}

export function RequireAdmin({ children }) {
	const [checking, setChecking] = useState(true);
	const [ok, setOk] = useState(false);

	useEffect(() => {
		let alive = true;
		async function check() {
			const me = await getMe();
			if (!alive) return;
			setOk(Boolean(me?.user));
			setChecking(false);
		}
		check();
		return () => {
			alive = false;
		};
	}, []);

	if (checking) return createElement(Spinner, { loading: true });
	if (!ok) return createElement(Navigate, { to: '/admin/login', replace: true });
	return children;
}

export { API_BASE };
