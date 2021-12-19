import { createCookieSessionStorage } from "remix";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		sameSite: "lax",
		path: "/",
		httpOnly: true,
		secrets: ["secretpassphrase"],
		secure: process.env.NODE_ENV === "production"
	}
})

export const { getSession, commitSession, destroySession } = sessionStorage;