// The small helpers the pages share: the photos' addresses, the members in order, and who is signed in.
import type { APIContext } from "astro";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

/** A post the visitor pinned, kept in their own session as a draft of the demo. */
export type Draft = { id: string; title: string; body: string; createdAt: number };

/** The most drafts one session keeps; the oldest goes first. */
export const draftLimit = 5;

/** A photo on Unsplash at the width it is shown, linked and never copied. */
export const photoUrl = (id: string, width: number) =>
	`https://images.unsplash.com/${id}?w=${width}&q=75&auto=format&fit=crop`;

export async function members() {
	return (await getCollection("members")).sort((a, b) => a.data.order - b.data.order);
}

export async function posts(filter?: (post: CollectionEntry<"posts">) => boolean) {
	const all = await getCollection("posts", filter);
	return all.sort((a, b) => a.data.order - b.data.order);
}

/** The sample member this visitor signed in as, or nothing. */
export async function signedIn(session: APIContext["session"]) {
	const id = await session?.get("member");
	return id ? getEntry("members", id) : undefined;
}

/** A post's small line: its replies, who is going, and when. */
export function postMeta(post: CollectionEntry<"posts">): string[] {
	const { replies, going, when } = post.data;
	return [
		replies !== undefined ? `${replies} ${replies === 1 ? "reply" : "replies"}` : "",
		going !== undefined ? `${going} going` : "",
		when ?? "",
	].filter(Boolean);
}

/** How long ago a draft was pinned, in the board's words. */
export function ago(createdAt: number, now = Date.now()) {
	const minutes = Math.floor((now - createdAt) / 60_000);
	if (minutes < 1) return "Just now";
	if (minutes < 60) return `${minutes} min ago`;
	const hours = Math.floor(minutes / 60);
	return hours < 24 ? `${hours} h ago` : "Yesterday";
}
