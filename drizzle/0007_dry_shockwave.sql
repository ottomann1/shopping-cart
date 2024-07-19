ALTER TABLE "cart" RENAME TO "carte";--> statement-breakpoint
ALTER TABLE "cartproducts" DROP CONSTRAINT "cartproducts_cart_id_cart_cart_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartproducts" ADD CONSTRAINT "cartproducts_cart_id_carte_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carte"("cart_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
