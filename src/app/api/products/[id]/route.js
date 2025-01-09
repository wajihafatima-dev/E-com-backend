import connectDb from "@/utils/db";
import productModel from "@/model/productModel";
import { NextResponse } from "next/server";
import Product from "@/model/productModel";

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
      { products: null, message: "not found" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDb();
    const payload = await req.json(); // Parsing the request body
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...payload }, // Replace the entire document with the new payload
      { new: true, runValidators: true } // Return updated product & validate input
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { isSuccessful: true, data: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDb();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { isSuccessful: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { isSuccessful: true, message: "Product deleted successfully" },
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
