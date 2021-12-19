import { Authenticator, LocalStrategy } from "remix-auth";
import { sessionStorage } from "~/session.server";
import { User } from "~/models/user";

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
	new LocalStrategy(
		{ loginURL: '/login' },
		async (username: string, password: string) => {
			console.log(username)
			console.log(password)
			// let user = await findOrCreateUser({ username })
			// await user.validatePassword(password)
			return { username };
		}
	),
	'local'
)