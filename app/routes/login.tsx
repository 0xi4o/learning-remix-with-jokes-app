import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";

export let action: ActionFunction = async ({ request }) => {
	return await authenticator.authenticate('local', request, {
		successRedirect: '/jokes',
		failureRedirect: '/login'
	})
}

export const loader: LoaderFunction = async ({ request }) => {
	return await authenticator.isAuthenticated(request, {
		successRedirect: '/jokes'
	})
}

export default function Login() {
	return (
		<form method='post'>
			<input type="text" name='username' required/>
			<input type="password" name='password' required/>
			<button>Log In</button>
		</form>
	)
}