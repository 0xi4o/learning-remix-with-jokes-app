import type { ActionFunction } from "remix";
import { redirect, Form } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const name = body.get('name');
	const content = body.get('content');

	if (
		typeof name !== "string" ||
		typeof content !== "string"
	) {
		throw new Error(`Form not submitted correctly.`);
	}

	const fields = { name, content }
	const joke = await db.joke.create({
		data: fields
	})

	return redirect(`/jokes/${joke.id}`);
}

export default function NewJokeRoute() {
	return (
		<div>
			<p>Add your own hilarious joke</p>
			<Form method="post">
				<div>
					<label>
						Name: <input type="text" name="name" />
					</label>
				</div>
				<div>
					<label>
						Content: <textarea name="content" />
					</label>
				</div>
				<div>
					<button type="submit" className="button">
						Add
					</button>
				</div>
			</Form>
		</div>
	);
}