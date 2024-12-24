import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGlobalState } from "~~/services/store/store";

const enablePolling = false;

export const useUserRegistered = () => {
  const { address } = useAccount();
  const setIsRegistered = useGlobalState(state => state.setIsUserRegistered);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!address) {
        setIsRegistered(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${address}`);
        setIsRegistered(response.ok);
      } catch (error) {
        console.error("Error checking user registration:", error);
        setIsRegistered(false);
      }
    };

    void checkRegistration();
  }, [address, setIsRegistered]);
};
