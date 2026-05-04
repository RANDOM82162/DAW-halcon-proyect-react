import api from "./api";

/**
 * Get current user profile
 * @returns {Promise}
 */
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

/**
 * Update user profile (name, password)
 * @param {Object} data - { name?, current_password?, new_password?, new_password_confirmation? }
 * @returns {Promise}
 */
export const updateProfile = async (data) => {
  try {
    const response = await api.put("/auth/profile", data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Upload profile photo
 * @param {File} photoFile
 * @returns {Promise}
 */
export const uploadProfilePhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append("photo", photoFile);

    const response = await api.post("/auth/profile/photo", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    throw error;
  }
};
