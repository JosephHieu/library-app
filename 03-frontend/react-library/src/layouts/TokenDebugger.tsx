import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const TokenDebugger = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          console.log("JWT Token:", accessToken);
          setToken(accessToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };
    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please login to see your token</p>;
  }

  return (
    <div
      style={{ padding: "1rem", background: "#eee", wordBreak: "break-all" }}
    >
      <h4>JWT Token:</h4>
      <p>{token || "Loading..."}</p>
    </div>
  );
};
