import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NoInternetModal } from "../Dialogs/NoInternetModal";
import { AppLoader } from "../AppLoader";
import LandingPage from "@/pages/LandingPage";

const AuthGate = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cachedUser, setCachedUser] = useState<any | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("cachedUser");

    if (localUser) {
      setCachedUser(JSON.parse(localUser));
    }

    if (!navigator.onLine) {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest("/api/me", { method: "GET" });
        if (res?.user) {
          localStorage.setItem("cachedUser", JSON.stringify(res.user));
          setCachedUser(res.user);
        }
      } catch {
        localStorage.removeItem("cachedUser");
        setCachedUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const handleOnline = () => {
      toast.success("🌐 İnternet bağlantısı bərpa olundu!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    };

    const handleOffline = () => {
      toast.warning(
        "⚠️ İnternet bağlantınız kəsildi. Keşlənmiş məlumatlar göstərilir.",
        {
          position: "bottom-right",
          autoClose: 1000,
        },
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isLoading)
    return (
      <AppLoader isOpen={isLoading} />
    );

  if (!cachedUser && !navigator.onLine) {
    return (
      <NoInternetModal
        isOpen
      />
    );
  }

  if (!cachedUser && navigator.onLine) {
    return (
      <LandingPage />
    );
  }

  return children;
};

export default AuthGate;
