export interface UserProfile {
  name: string;
  profile_url: string;
  // Add other profile properties as needed
}

export async function getUserProfile(): Promise<UserProfile> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      'API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL environment variable.',
    );
  }

  const endpoint = `${apiBaseUrl}/api/user/profile`; // Or your specific profile endpoint

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // You might want to handle different status codes differently
      const errorData = await response.json().catch(() => ({
        message:
          'Failed to fetch user profile and could not parse error response.',
      }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    const data: UserProfile = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Re-throw the error or handle it as per your application's error handling strategy
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred while fetching user profile.');
  }
}
