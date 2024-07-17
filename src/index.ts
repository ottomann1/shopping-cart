import db from "./db";
import {carts, products, productsInCart} from './schema'
import express from "express";

const app = express()
const port = 3000

app.post("/api/carts/", async (req, res)=>{
  console.log("line 9");
  
  await db
  .insert(carts)
  .values({
    totalPrice: 0,
  })
  .execute();
  res.send("hello world")
})



app.listen(port,() =>{
  console.log(`App listening on ${port}`);
  
})