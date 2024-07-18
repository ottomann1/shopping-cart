ALTER TABLE "products_in_cart" RENAME TO "cartsToProducts";--> statement-breakpoint
ALTER TABLE "cartsToProducts" DROP CONSTRAINT "products_in_cart_cart_id_carts_cart_id_fk";
--> statement-breakpoint
ALTER TABLE "cartsToProducts" DROP CONSTRAINT "products_in_cart_products_id_products_product_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartsToProducts" ADD CONSTRAINT "cartsToProducts_cart_id_carts_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("cart_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartsToProducts" ADD CONSTRAINT "cartsToProducts_products_id_products_product_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
