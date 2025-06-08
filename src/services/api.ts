import { useAuth } from "@clerk/clerk-expo";

// Local development API URL

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.EXPO_PUBLIC_API_URL}/api`
    : "http://localhost:3001/api";

export interface UserProfileData {
  name?: string;
  age?: number;
  gender?: string;
  orientation?: string[];
  selectedVibes?: string[];
  interests?: string[];
  uniqueInterest?: string;
  profileCompleted?: boolean;
}

interface ApiResponse<T> {
  message: string;
  userId: string;
  data: T;
}

class ApiClient {
  private getAuthHeaders = async (): Promise<{ [key: string]: string }> => {
    const { getToken } = useAuth();
    const token = await getToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Get user profile
  getUserProfile = async () => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<UserProfileData> = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  // Update user profile
  updateUserProfile = async (profileData: UserProfileData) => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<UserProfileData> = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  // Generate/save prompt
  savePrompt = async (
    category: string,
    responseText: string,
    promptType: "GENERATED" | "USER_WRITTEN" | "EDITED" = "GENERATED"
  ) => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/prompts/generate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          category,
          responseText,
          promptType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving prompt:", error);
      throw error;
    }
  };

  // Get user's prompts
  getUserPrompts = async () => {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/prompts/user`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user prompts:", error);
      throw error;
    }
  };
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Hook for using API client with auth
export const useApiClient = () => {
  const { getToken } = useAuth();

  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ) => {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    console.log(
      "%c [ `${API_BASE_URL}${url}` ]-148",
      "font-size:13px; background:pink; color:#bf2c9f;",
      `${API_BASE_URL}${url}`,
      JSON.stringify(options.body)
    );
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(
      "%c [ response ]-162",
      "font-size:13px; background:pink; color:#bf2c9f;",
      response
    );
    return response.json();
  };

  return {
    updateUserProfile: (data: UserProfileData) =>
      makeAuthenticatedRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    getUserProfile: () => makeAuthenticatedRequest("/users/profile"),

    savePrompt: (
      category: string,
      responseText: string,
      promptType = "GENERATED"
    ) =>
      makeAuthenticatedRequest("/prompts/generate", {
        method: "POST",
        body: JSON.stringify({ category, responseText, promptType }),
      }),

    getUserPrompts: () => makeAuthenticatedRequest("/prompts/user"),

    savePromptUsageRecord: (promptId: string) =>
      makeAuthenticatedRequest("/prompts/usage_record", {
        method: "POST",
        body: JSON.stringify({ promptId }),
      }),
  };
};
