import api from "./api";

export const testApi = async () => {
  try {
    const res = await api.get("/test");
    return res.data;
  } catch (error) {
    console.error("Error testing API:", error);
    throw error;
  }
};
