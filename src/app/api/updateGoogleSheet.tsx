// Define the expected structure of the API response
interface ApiResponse {
    response: string;
  }

/** 
 * @param weight
 * @returns 
 */
// Define the function with proper parameter and return types
export const updateGoogleSheet = async (weight: string): Promise<string> => {
    try {
      // Build the URL with query parameters
      const params = { message: weight };
      const url = `http://127.0.0.1:5000/health/google_sheets_service/`;
  
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      // Check if the response is not OK
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
  
      // Parse the response JSON and ensure it matches the ApiResponse interface
      const data: ApiResponse = await res.json();
      return data.response;
    } catch (error) {
      // Log and handle errors with a specific type
      console.error('Error calling external API:', (error as Error).message);
      return 'Error occurred';
    }
  };