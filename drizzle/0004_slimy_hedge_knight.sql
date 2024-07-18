ALTER TABLE "cart" ALTER COLUMN "total_price" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "total_price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "price" SET DATA TYPE real;