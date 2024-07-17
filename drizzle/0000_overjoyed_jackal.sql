CREATE TABLE IF NOT EXISTS "carts" (
	"cart_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_number_of_items" integer DEFAULT 0,
	"total_price" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL
);
