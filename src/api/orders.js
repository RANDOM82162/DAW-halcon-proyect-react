import api from "./api";

/**
 * Get all orders
 * @param {Object} params - Query parameters (page, per_page, status, etc.)
 * @returns {Promise}
 */
export const getOrders = async (params = {}) => {
  try {
    const response = await api.get("/orders", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {number} id - Order ID
 * @returns {Promise}
 */
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise}
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Update order
 * @param {number} id - Order ID
 * @param {Object} orderData - Updated order data
 * @returns {Promise}
 */
export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};

/**
 * Delete order
 * @param {number} id - Order ID
 * @returns {Promise}
 */
export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};

/**
 * Restore archived order
 * @param {number} id - Order ID
 * @returns {Promise}
 */
export const restoreOrder = async (id) => {
  try {
    const response = await api.post(`/orders/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error(`Error restoring order ${id}:`, error);
    throw error;
  }
};

/**
 * Permanently delete an order
 * @param {number} id - Order ID
 * @returns {Promise}
 */
export const deleteOrderPermanently = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}/force`);
    return response.data;
  } catch (error) {
    console.error(`Error permanently deleting order ${id}:`, error);
    throw error;
  }
};

/**
 * Update order status
 * @param {number} id - Order ID
 * @param {string} status - New status
 * @returns {Promise}
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.patch(`/orders/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id} status:`, error);
    throw error;
  }
};

/**
 * Get public order by ID or invoice number
 * @param {string} identifier - Order ID or invoice number
 * @returns {Promise}
 */
export const getPublicOrder = async (identifier) => {
  try {
    const response = await api.get(`/public/orders/${identifier}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching public order ${identifier}:`, error);
    throw error;
  }
};

/**
 * Upload delivery photo for an order
 * @param {number} id - Order ID
 * @param {File} photoFile - Image file
 * @returns {Promise}
 */
export const uploadOrderDeliveryPhoto = async (id, photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    // Explicitly use undefined for Content-Type to force Axios to strip the default application/json
    // and let the browser set multipart/form-data with the correct boundary.
    const response = await api.post(`/orders/${id}/upload-photo`, formData, {
      headers: {
        'Content-Type': undefined
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error uploading delivery photo for order ${id}:`, error);
    throw error;
  }
};
