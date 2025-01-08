import connectDb from "@/lib/db";
import productModel from "@/model/productModel";
import { NextResponse } from "next/server";

// GET all products
export async function GET(req) {
  try {
    await connectDb();
    const products = await productModel.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { products: null, message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const newProduct = await productModel.create(body);
    return NextResponse.json({ products: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { products: null, message: "Error creating product" },
      { status: 500 }
    );
  }
}



export async function PUT(req, { params }) {
  try {
    const { id } = params; // Get the ID from URL params
    const updateData = await req.json(); // Get the data to update the product with

    await connectDb();

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json(
        { products: null, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { products: updatedProduct, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { products: null, message: "Error updating product" },
      { status: 500 }
    );
  }
}
// DELETE a product by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDb();
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { products: null, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products: deletedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { products: null, message: "Error deleting product" },
      { status: 500 }
    );
  }
}
