import Product, { ProductDocument } from "../models/Products";

const getProducts = async () => {
  return await Product.find();
};

const getProductById = async (productId: number) => {
  return await Product.findOne({ id: productId });
};

const updateProduct = async (productId: number, updateProduct: any) => {
  const { name, description, variant, size, image } = updateProduct;
  return await Product.findOneAndUpdate(
    { id: productId },
    {
      name: name,
      description: description,
      variant: variant,
      size: size,
      image: image,
    }
  );
};

const deleteProduct = async (productId: number) => {
  return await Product.findOneAndDelete({ id: productId });
};

export default { getProducts, getProductById, updateProduct, deleteProduct };
