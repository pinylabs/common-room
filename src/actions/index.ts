// "Pin it": the write box posts here. The server checks the fields, then keeps the post in the visitor's own
// session as a draft of the demo. Nothing is published and nothing leaves the session: a real club adds a database.
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { draftLimit, type Draft } from "../lib/club";

export const server = {
	pin: defineAction({
		accept: "form",
		input: z.object({
			title: z
				.string()
				.trim()
				.min(3, "Give your post a title of at least 3 characters.")
				.max(90, "Keep the title under 90 characters."),
			body: z
				.string()
				.trim()
				.min(3, "Write a line or two for the board.")
				.max(600, "Keep the post under 600 characters."),
		}),
		handler: async ({ title, body }, context) => {
			const member = await context.session?.get("member");
			if (!member) {
				throw new ActionError({
					code: "UNAUTHORIZED",
					message: "Sign in as a sample member to write on the board.",
				});
			}
			const draft: Draft = { id: crypto.randomUUID(), title, body, createdAt: Date.now() };
			const drafts = (await context.session?.get("drafts")) ?? [];
			context.session?.set("drafts", [draft, ...drafts].slice(0, draftLimit));
			return { member };
		},
	}),
};
