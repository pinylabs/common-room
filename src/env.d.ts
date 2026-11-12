// What the visitor's session holds: the sample member they signed in as, and the posts they pinned as drafts.
declare namespace App {
	interface SessionData {
		member: string;
		drafts: import("./lib/club").Draft[];
	}
}
