// The club's words live here as content, so a person or the Pinies change them without touching code: the members
// in src/content/members and the posts on the board in src/content/posts. All of it is sample content.
import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

/** A photo on Unsplash, by its id, with its alternative text. It is linked, never copied. */
const photo = z.object({
	id: z.string().regex(/^photo-[\w-]+$/),
	alt: z.string(),
});

const members = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/members" }),
	schema: z.object({
		name: z.string(),
		/** How the signed-in bar speaks of the member: "keeps her in your session". */
		pronoun: z.enum(["her", "him", "them"]),
		photo,
		/** The line on the member's card. */
		line: z.string(),
		/** The line under the name on a post they pinned. */
		byline: z.string(),
		since: z.string(),
		postCount: z.number().int().nonnegative(),
		usuallyIn: z.string(),
		tags: z.array(z.string()).default([]),
		/** The order on the home page and the members' page. */
		order: z.number().int(),
		/** A draft the sample member left unpinned; signing in as them puts it in your session. */
		sampleDraft: z.object({ title: z.string(), body: z.string() }).optional(),
		/** What the write box starts with, as a suggestion. */
		suggestion: z.object({ title: z.string(), body: z.string() }).optional(),
		sample: z.literal(true),
	}),
});

const posts = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		author: reference("members"),
		/** A note on paper, or an event on oxblood. */
		kind: z.enum(["note", "event"]).default("note"),
		photo: photo.optional(),
		replies: z.number().int().nonnegative().optional(),
		going: z.number().int().nonnegative().optional(),
		when: z.string().optional(),
		/** Pinned on the home page's board, in this order; a post without it is on the whole board only. */
		pinned: z.number().int().optional(),
		/** How far the note leans on the cork, in degrees. */
		tilt: z.number().min(-4).max(4).default(-1.5),
		order: z.number().int(),
		sample: z.literal(true),
	}),
});

/** The club's own words on the home page: its name, the hero and the join band. */
const club = defineCollection({
	loader: file("src/content/club.json"),
	schema: z.object({
		name: z.string(),
		monogram: z.string().max(3),
		tagline: z.string(),
		description: z.string(),
		hero: z.object({
			title: z.string(),
			accent: z.string(),
			text: z.string(),
			photo,
			/** The sample member the hero's "Try it" button signs in as. */
			tryMember: reference("members"),
		}),
		memberCount: z.number().int().nonnegative(),
		join: z.object({ title: z.string(), accent: z.string(), text: z.string() }),
		sample: z.literal(true),
	}),
});

/** Every photo the site shows, credited in the footer. Each is linked from Unsplash, never copied. */
const photos = defineCollection({
	loader: file("src/content/photos.json"),
	schema: z.object({
		photographer: z.string(),
		profile: z.url(),
		page: z.url(),
		use: z.string(),
		order: z.number().int(),
	}),
});

export const collections = { club, members, posts, photos };
