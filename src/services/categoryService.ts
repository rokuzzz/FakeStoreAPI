import Category from "../models/Categories";

const getCategories = async () => {
  return await Category.find();
};


export default { getCategories };
