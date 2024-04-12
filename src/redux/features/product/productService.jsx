import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Criando novo produto
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Pegando todos os produtos do usuário
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Deletando um produto
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Pegando apenas um produto
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Atualizando o produto
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const updateProductQuantity = async (id, quantity) => {
  const response = await axios.patch(`${API_URL}${id}/quantity`, { quantity });
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity
};

export default productService;
