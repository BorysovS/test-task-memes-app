import axios from "axios";

axios.defaults.baseURL = "https://64f0df2a8a8b66ecf77a32f0.mockapi.io/api";

export const getAllMemes = async () => {
  try {
    const response = await axios.get("/memes");

    return response.data;
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
  }
};

export const updateMemes = async (id, updatedMeme) => {
  try {
    const response = await axios.put(`/memes/${id}`, updatedMeme);

    return response.data;
  } catch (error) {
    console.error(`Error updating meme with id ${id}:`, error);
    throw error;
  }
};
