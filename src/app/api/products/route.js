import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

/* =======================
   GET PRODUCTS
======================= */
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const martId = searchParams.get("martId");

    if (!martId) {
      return NextResponse.json(
        { error: "martId is required" },
        { status: 400 }
      );
    }

    const products = await Product.find({ martId });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* =======================
   ADD PRODUCT
======================= */
export async function POST(req) {
  try {
    await connectDB();

    const { name, price, stock, image, martId } = await req.json();

    if (!martId) {
      return NextResponse.json(
        { error: "martId missing" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price,
      stock,
      image,
      martId,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

/* =======================
   DELETE PRODUCT
======================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

/* =======================
   UPDATE PRODUCT
======================= */
export async function PUT(req) {
  try {
   await connectDB();

  const { id, name, price, stock, image } = await req.json();

  const updated = await Product.findByIdAndUpdate(
    id,
    { name, price, stock, image },
    { new: true }
  );


    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
