import config from "@/config";
import { getSession } from "@/lib/session";

export const getProfile = async () => {
  const session = await getSession();

  try {
    const response = await fetch(`${config.API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return {
      error: "Error fetching profile",
    };
  }
};
