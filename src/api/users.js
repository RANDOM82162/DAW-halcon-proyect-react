import api from "./api";

/**
 * Get all users
 * @param {Object} params - Query parameters (page, per_page, etc.)
 * @returns {Promise}
 */
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get("/users", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise}
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

/**
 * Create new user
 * @param {Object} userData - User data
 * @returns {Promise}
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise}
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

/**
 * Delete user
 * @param {number} id - User ID
 * @returns {Promise}
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};
