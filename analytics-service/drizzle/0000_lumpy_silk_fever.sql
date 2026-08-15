CREATE TABLE "visited" (
	"short_code" text PRIMARY KEY NOT NULL,
	"visited_times" integer DEFAULT 0 NOT NULL,
	"first_visited_at" timestamp DEFAULT now() NOT NULL,
	"last_visited_at" timestamp DEFAULT now() NOT NULL
);
