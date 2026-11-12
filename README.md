# Common Room

> **Preview: the full template is being built by the Pinies.** This repository is a small working Astro site: its home page and a member's page are the accepted design, and the rest is a small honest site in the same look. The Pinies' real build lands here later.

A template for a members' club or a small community: a noticeboard where members pin what's on, member profiles, and a sign-in. It renders on the server so a visitor can sign in as a sample member and pin a post that only they can see. Its club, members and posts are made up: Common Room in Northport, Mina, Theo, Ilse and Sam are sample content, and each content file says so.

## Start it

- **In Piny:** pick it in the Templates tab.
- **Outside Piny:** `npm create astro -- --template github:pinylabs/common-room`, then `pnpm install` and `pnpm dev`.

It needs Node 22 or later and pnpm. `pnpm dev` runs the site in Cloudflare's local runtime, with its session kept in Wrangler's local state under `.wrangler/`.

## Its words

The words are Astro content collections in `src/content`, so they change without touching code:

- `club.json`: the club's name, the hero, the membership band and the member count.
- `members/*.md`: one file per member, with their card, profile, the line under their posts, and the draft and suggestion the write box starts with.
- `posts/*.md`: one file per post on the board; `pinned` puts a post on the home page's board, in that order.
- `photos.json`: each photo's photographer and page, for the footer's credits.

## Its look

The pages are styled with Tailwind CSS 4. Every colour, face, size, radius, shadow and measure is a token in `src/styles/theme.css`, so the look changes there: `primary` is the brass, `secondary` the oxblood, `tertiary` the parchment and cork, and `neutral` the room by day and at night. `src/styles/global.css` holds what utilities cannot say cleanly: the pinned notes and how they settle and straighten, the shared buttons, and the page transitions and scroll reveals. Light and dark follow the visitor's system, dark is the club at night, and all motion stops under `prefers-reduced-motion`.

## What it needs on Cloudflare

Astro renders it on the server with the Cloudflare adapter (`output: "server"`). It needs one binding, the session store: a KV namespace bound as `SESSION`, declared in `wrangler.jsonc` as Astro's Cloudflare adapter expects. Wrangler creates it on the first deploy; Piny's hosting attaches it. It uses no database, no storage bucket, no schedule and no secret.

What the demo keeps in a visitor's session, and nowhere else:

- **The sample sign-in.** "Sign in as a sample member" posts the chosen member to `/sign-in`, which keeps that member's id in the session, with no password. The site says so in the bar at the top of every page while you are signed in. "Sign out" clears the session.
- **Drafts.** On your own member page, "Pin it" posts to the Astro action `pin` (`src/actions/index.ts`), which checks the title and the post on the server and keeps the post in your session as a draft. It shows only to you, on your page, marked as your draft. Signing in as a sample member also puts the draft that member left into your session. Nothing is published; up to five drafts are kept for a day.

A real club adds two things this template leaves out: a sign-in provider, so members prove who they are, and a database, so posts reach the board and everyone sees them. Both need hosting beyond what Piny's hosting offers today (it offers the session store and plain variables), so a real club either hosts elsewhere or waits for a later database binding.

## Photos

They are linked from Unsplash and never copied into this repository:

- Home: the hero, the reading room: [Zoshua Colah](https://unsplash.com/@zoshuacolah) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/students-study-in-a-beautiful-old-library-JcPr4irSk34), not copied.
- The board: the drawing class: [Centre for Ageing Better](https://unsplash.com/@ageing_better) on Unsplash, Public Domain and [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/women-talking-at-art-class-table-8NDGA3RepNg), not copied.
- Members: Theo: [Christoph Aigner](https://unsplash.com/@christophaigner) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/man-in-a-dark-suit-jacket-and-shirt-i8tPCHU4hNY), not copied.
- Members: Sam: [Adewale Shobaloju](https://unsplash.com/@ogidan) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/person-in-two-tone-raglan-shirt-XeiMwlsXaUM), not copied.
- Members: Ilse: [Ionela Mat](https://unsplash.com/@ionelaaaaa) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-with-her-arms-crossed-vDQ5OBMOAc4), not copied.
- Members: Mina: [Marina Nazina](https://unsplash.com/@nazinamari) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/young-woman-in-white-shirt-near-purple-flowers-PPpelk38RD0), not copied.

## Licence

MIT, Copyright (c) 2026 pinylabs; see [LICENSE](LICENSE). Made by the Pinies in [Piny Studio](https://piny.studio/home/). The Piny Studio mark in `public/brand` is Piny's and is not covered by this template's MIT licence.
