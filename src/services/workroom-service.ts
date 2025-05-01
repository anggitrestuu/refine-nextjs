import { API_URLS } from "@config-global";
import { axiosInstance } from "@providers/rest-data-provider/utils";
import { IWorkroom } from "@/sections/home/workroom/type";

/**
 * Creates a new workroom
 * @param workroomData The workroom data to create
 * @returns A promise that resolves to the created workroom
 */
export const createWorkroom = async (workroomData: Omit<IWorkroom, "slug">): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${API_URLS.meridianUrl}/api/workroom/create`,
      workroomData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating workroom:", error);
    throw error;
  }
};

/**
 * Updates an existing workroom
 * @param slug The slug of the workroom to update
 * @param workroomData The updated workroom data
 * @returns A promise that resolves to the updated workroom
 */
export const updateWorkroom = async (
  slug: string,
  workroomData: Omit<IWorkroom, "slug">
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${API_URLS.meridianUrl}/api/workroom/edit/${slug}`,
      workroomData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating workroom:", error);
    throw error;
  }
};

/**
 * Deletes a workroom
 * @param slug The slug of the workroom to delete
 * @returns A promise that resolves when the workroom is deleted
 */
export const deleteWorkroom = async (slug: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `${API_URLS.meridianUrl}/api/workroom/delete/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting workroom:", error);
    throw error;
  }
};

/**
 * Initiates a chat with a workroom
 * @param slug The workroom slug
 * @param message The message to send
 * @returns A promise that resolves to the chat response
 */
export const initiateWorkroomChat = async (
  slug: string,
  message: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${API_URLS.meridianUrl}/api/chat/workroom/${slug}/`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating workroom chat:", error);
    throw error;
  }
};
