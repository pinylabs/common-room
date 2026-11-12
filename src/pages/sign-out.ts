// Signing out clears the visitor's session: the sample member and every draft they pinned.
import type { APIRoute } from "astro";

export const POST: APIRoute = ({ session, redirect }) => {
	session?.destroy();
	return redirect("/", 303);
};

export const GET: APIRoute = ({ redirect }) => redirect("/", 303);
