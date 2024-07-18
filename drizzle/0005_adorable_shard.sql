ALTER TABLE "productToCart" RENAME TO "cartproducts";--> statement-breakpoint
ALTER TABLE "cartproducts" DROP CONSTRAINT "productToCart_cart_id_cart_cart_id_fk";
--> statement-breakpoint
ALTER TABLE "cartproducts" DROP CONSTRAINT "productToCart_product_id_product_product_id_fk";
--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartproducts" ADD CONSTRAINT "cartproducts_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartproducts" ADD CONSTRAINT "cartproducts_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
