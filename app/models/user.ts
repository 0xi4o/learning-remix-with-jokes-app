import { AuthorizationError } from "remix-auth";

export interface User {
	email: string;
}

export async function login(email: string, password: string): Promise<User> {
	if (password === 'password') return { email };
	throw new AuthorizationError();
}