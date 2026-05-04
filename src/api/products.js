import api from "./api";

/**
 * Get all products
 * @param {Object} params - Query parameters (page, per_page, etc.)
 * @returns {Promise}
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Promise}
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Create new product
 * @param {Object} productData - Product data
 * @returns {Promise}
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Update product
 * @param {number} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise}
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

/**
 * Delete product
 * @param {number} id - Product ID
 * @returns {Promise}
 */
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
