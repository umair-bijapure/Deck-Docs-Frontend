import { NextRouter } from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface SessionResponse {
  data: any; // Adjust the type according to your actual response

}

export async function checkIfSessionValid(): Promise<any | void> {
  const cookieData = localStorage.getItem("token");
  if (cookieData != null) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session_valid`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieData}`,
        },
      });
      console.warn(response, "Session validation responseeeeeeeeeeeeeeeeeeee");

      if (!response.ok) {
          console.warn("dsuvhgsdvcsdhcvsdvcvsdhcvsdhgcvsdcghvsdghcvsdcsgdcvsdhgcvsdghcghsdcgh")
        logOutUser();
        return;
      }

      const result: SessionResponse = await response.json();
      return result.data;
    } catch (err) {
      logOutUser();
    }
  } else {
    logOutUser();
  }
}

export async function checkIfSessionValidLogin(router: NextRouter): Promise<void> {
  const cookieData = cookies.get("token");
  if (cookieData != null) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session_valid`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieData}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logOutUser();
        } else if (response.status === 500) {
          throw new Error("500 Error");
        } else {
          throw new Error("Unknown Error");
        }
        return;
      }

      const result: SessionResponse = await response.json();
      router.push(`/${result.data.organisation_id}/dashboard`);
    } catch (err) {
      logOutUser("service-down");
    }
  }
}

export function logOutUser(endpoint: string = "logout"): void {
  cookies.remove("token", { path: "/", sameSite: "lax" });
  window.location.href = `/`;
}
