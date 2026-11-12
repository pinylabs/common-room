// Common Room renders on the server, so the signed-in member and their draft can live in the visitor's session.
// On Cloudflare the session is a KV namespace bound as `SESSION` (see wrangler.jsonc); `astro dev` keeps it in
// Wrangler's local state. The photos are linked from Unsplash, so no image service or Images binding is needed.
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "server",
	adapter: cloudflare({ imageService: "passthrough" }),
	session: {
		// A sample sign-in and its drafts are kept for a day.
		ttl: 60 * 60 * 24,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	devToolbar: { enabled: false },
});
