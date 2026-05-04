import api from "./api";

/**
 * Get all inventory items
 * @param {Object} params - Query parameters (page, per_page, etc.)
 * @returns {Promise}
 */
export const getInventory = async (params = {}) => {
  try {
    const response = await api.get("/inventory", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

/**
 * Get inventory item by ID
 * @param {number} id - Inventory item ID
 * @returns {Promise}
 */
export const getInventoryById = async (id) => {
  try {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory item ${id}:`, error);
    throw error;
  }
};

/**
 * Create new inventory item
 * @param {Object} inventoryData - Inventory data
 * @returns {Promise}
 */
export const createInventoryItem = async (inventoryData) => {
  try {
    const response = await api.post("/inventory", inventoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory item:", error);
    throw error;
  }
};

/**
 * Update inventory item
 * @param {number} id - Inventory item ID
 * @param {Object} inventoryData - Updated inventory data
 * @returns {Promise}
 */
export const updateInventoryItem = async (id, inventoryData) => {
  try {
    const response = await api.put(`/inventory/${id}`, inventoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory item ${id}:`, error);
    throw error;
  }
};

/**
 * Delete inventory item
 * @param {number} id - Inventory item ID
 * @returns {Promise}
 */
export const deleteInventoryItem = async (id) => {
  try {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory item ${id}:`, error);
    throw error;
  }
};
