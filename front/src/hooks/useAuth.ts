import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    getUserMe();
  }, []);

  const getUserMe = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/userMe", {
        withCredentials: true,
      });

      if (data) {
        setStatus(true);
      }
    } catch (err: unknown) {
      setStatus(false);
    }
  };

  return {
    status,
  };
};
