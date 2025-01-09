import Product from "@/model/productModel";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const products = await Product.find({});
    return NextResponse.json({ isSuccessful: true, data: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  try {
    await connectDb();
    const { title, description, price } = await req.json();

    if (!title || !description || !price) {
      return NextResponse.json(
        { isSuccessful: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product already exists" },
        { status: 400 }
      );
    }

    const newProduct = new Product({ title, description, price });
    await newProduct.save();

    return NextResponse.json(
      { isSuccessful: true, data: newProduct.toObject() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// Handle DELETE request
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectDb();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { isSuccessful: true, data: deletedProduct.toObject() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
