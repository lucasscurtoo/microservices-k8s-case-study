CREATE TABLE "urls" (
	"short_code" text PRIMARY KEY NOT NULL,
	"long_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
