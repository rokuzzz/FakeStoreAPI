import { CustomError } from "../models/CustomError";
import Category, { CategoryDocument } from "../models/Categories";
import Product, { ProductDocument } from "../models/Products";

const getProducts = async () => {
  return await Product.find();
};

const getProductById = async (productId: string) => {
  const foundProduct = await Product.findById(productId);
  if (!foundProduct) {
    throw new CustomError(404, "Product does not exist");
  }
  return foundProduct;
};

const createProduct = async (product: ProductDocument) => {
  const categoryId = await Category.findOne({ name: product.category });
  if (categoryId) {
    await product.save();
    return await Product.findByIdAndUpdate(
      product._id,
      {
        categoryId: categoryId,
      },
      { new: true }
    );
  } else {
    throw new CustomError(404, "Category does not exist");
  }
};

const updateProduct = async (productId: string, updateProduct: any) => {
  const { name, description, variant, size, image } = updateProduct;
  const foundProduct = await Product.findById(productId);
  if (foundProduct) {
    return await Product.findByIdAndUpdate(
      productId,
      {
        name: name,
        description: description,
        variant: variant,
        size: size,
        image: image,
      },
      { new: true }
    );
  } else {
    throw new CustomError(404, "Product not found");
  }
};

const deleteProduct = async (productId: string) => {
  const foundProduct = await Product.findById(productId);
  if (foundProduct) {
    return await Product.findByIdAndDelete(productId);
  } else {
    throw new CustomError(404, "Product not found");
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
