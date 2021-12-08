import type { ActionFunction } from "remix";
import { Form, json, redirect, useActionData } from "remix";
import { db } from "~/utils/db.server";

function validateJokeName(name: string) {
	if (name.length < 2) {
		return `That joke's name is too short`;
	}
}

function validateJokeContent(content: string) {
	if (content.length < 10) {
		return `That joke is too short`;
	}
}

type ActionData = {
	formError?: string;
	fieldErrors?: {
		name: string | undefined;
		content: string | undefined;
	};
	fields?: {
		name: string;
		content: string;
	};
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const name = body.get('name');
	const content = body.get('content');

	if (
		typeof name !== "string" ||
		typeof content !== "string"
	) {
		return badRequest({
			formError: `Form not submitted correctly`
		});
	}

	const fieldErrors = {
		name: validateJokeName(name),
		content: validateJokeContent(content)
	}

	const fields = { name, content }
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields });
	}

	const joke = await db.joke.create({
		data: fields
	})

	return redirect(`/jokes/${joke.id}`);
}

export default function NewJokeRoute() {
	const actionData = useActionData<ActionData>();

	return (
		<div>
			<p>Add your own hilarious joke</p>
			<Form method="post">
				<div>
					<label>
						Name:
						<input
							aria-describedby={
								actionData?.fieldErrors?.name ? 'name-error' : undefined
							}
							aria-invalid={
								Boolean(actionData?.fieldErrors?.name) || undefined
							}
							defaultValue={actionData?.fields?.name}
							name="name"
							type="text"
						/>
					</label>
					{
						actionData?.fieldErrors?.name ?
							<p
								className='form-validation-error'
								role='alert'
								id='name-error'
							>
								{actionData.fieldErrors.name}
							</p> :
							null
					}
				</div>
				<div>
					<label>
						Content:
						<textarea
							aria-describedby={
								actionData?.fieldErrors?.content ? 'content-error' : undefined
							}
							aria-invalid={
								Boolean(actionData?.fieldErrors?.content) || undefined
							}
							defaultValue={actionData?.fields?.content}
							name="content"
						/>
					</label>
					{
						actionData?.fieldErrors?.content ?
							<p
								className='form-validation-error'
								role='alert'
								id='name-error'
							>
								{actionData.fieldErrors.content}
							</p> :
							null
					}
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