ALTER TABLE "carts" RENAME TO "cart";--> statement-breakpoint
ALTER TABLE "products" RENAME TO "product";--> statement-breakpoint
ALTER TABLE "cartsToProducts" RENAME TO "productToCart";--> statement-breakpoint
ALTER TABLE "productToCart" RENAME COLUMN "products_id" TO "product_id";--> statement-breakpoint
ALTER TABLE "productToCart" DROP CONSTRAINT "cartsToProducts_cart_id_carts_cart_id_fk";
--> statement-breakpoint
ALTER TABLE "productToCart" DROP CONSTRAINT "cartsToProducts_products_id_products_product_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productToCart" ADD CONSTRAINT "productToCart_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productToCart" ADD CONSTRAINT "productToCart_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
