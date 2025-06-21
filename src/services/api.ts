import { useAuth } from "@clerk/clerk-expo";

// Local development API URL

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.EXPO_PUBLIC_API_URL}/api`
    : "http://localhost:3001/api";

export interface UserProfilePayload {
  gender?: string;
  targetGender?: string;
  tones?: string[];
  interests?: string[];
  specificLove?: string;
}

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
  private getToken: () => Promise<string | null>;

  constructor(getToken: () => Promise<string | null>) {
    this.getToken = getToken;
  }

  private async makeAuthenticatedRequest(
    url: string,
    options: RequestInit = {}
  ) {
    const token = await this.getToken();
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
      const errorBody = await response.text();
      console.error("HTTP error response:", errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      // Handle non-JSON responses gracefully
      console.warn("Received non-JSON response from server.");
      return response.text();
    }
  }

  // =============================================
  // AI-Powered Prompt Generation
  // =============================================

  // Feature 1: Get 3 AI-generated prompt suggestions
  getPromptSuggestions = (userProfile: UserProfilePayload) =>
    this.makeAuthenticatedRequest("/prompts/generate-suggestions", {
      method: "POST",
      body: JSON.stringify({ userProfile }),
    });

  // Feature 1.1: Revise an AI-generated suggestion
  revisePromptSuggestion = (
    prompt: string,
    response: string,
    evaluation: any,
    feedback: string
  ) =>
    this.makeAuthenticatedRequest("/prompts/revise-suggestion", {
      method: "POST",
      body: JSON.stringify({ prompt, response, evaluation, feedback }),
    });

  // =============================================
  // AI-Powered Prompt Evaluation
  // =============================================

  // Feature 2: Evaluate a user's custom prompt
  evaluateCustomPrompt = (prompt: string, response: string) =>
    this.makeAuthenticatedRequest("/prompts/evaluate-custom", {
      method: "POST",
      body: JSON.stringify({ prompt, response }),
    });

  // Feature 2.1: Revise a user's custom prompt after evaluation
  reviseCustomPrompt = (
    prompt: string,
    response: string,
    evaluation: any,
    suggestions: string[]
  ) =>
    this.makeAuthenticatedRequest("/prompts/revise-custom", {
      method: "POST",
      body: JSON.stringify({ prompt, response, evaluation, suggestions }),
    });

  // =============================================
  // Existing Database Routes
  // =============================================

  // Get user profile
  getUserProfile = () =>
    this.makeAuthenticatedRequest("/users/profile", { method: "GET" });

  // Update user profile
  updateUserProfile = (data: UserProfileData) =>
    this.makeAuthenticatedRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });

  // Generate/save prompt
  savePrompt = (
    category: string,
    responseText: string,
    promptType = "GENERATED"
  ) =>
    this.makeAuthenticatedRequest("/prompts/generate", {
      method: "POST",
      body: JSON.stringify({ category, responseText, promptType }),
    });

  // Get user's prompts
  getUserPrompts = () =>
    this.makeAuthenticatedRequest("/prompts/user", { method: "GET" });

  savePromptUsageRecord = (promptId: string) =>
    this.makeAuthenticatedRequest("/prompts/usage_record", {
      method: "POST",
      body: JSON.stringify({ promptId }),
    });
}

// Hook for using API client with auth
export const useApiClient = () => {
  const { getToken } = useAuth();
  // Pass the getToken function to the ApiClient
  return new ApiClient(getToken);
};
