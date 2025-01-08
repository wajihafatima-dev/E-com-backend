import connectDb from "@/lib/db";
import productModel from "@/model/productModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const product = await productModel.findById(id);
    if (!product) {
      return NextResponse.json(
        { products: null, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ products: product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { products: null, message: "Error fetching product" },
      { status: 500 }
    );
  }
}
