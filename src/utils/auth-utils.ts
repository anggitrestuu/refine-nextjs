/**
 * Server-side authentication utilities
 * IMPORTANT: These functions can ONLY be used in Server Components
 */

// This file is meant to be imported only in server components or API routes
// Do not import this in client components

// For server-side authentication check
export const isAuthenticated = async () => {
  // This is a dynamic import to prevent loading next/headers in client components
  // It will only be executed on the server
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = cookieStore.get("meridian_token");
    return !!token;
  } catch (error) {
    console.error(
      "isAuthenticated must only be called from a Server Component",
      error
    );
    return false;
  }
};
