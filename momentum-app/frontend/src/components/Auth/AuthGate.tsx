import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { GoogleLoginModal } from "../Dialogs/GoogleLoginModal";
import { BASE_URL } from "@/constants/variables";
import { toast } from "react-toastify";
import { NoInternetModal } from "../Dialogs/NoInternetModal";
import Loader from "../Loader";

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
      <div className="h-dvh flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!cachedUser && !navigator.onLine) {
    return (
      <NoInternetModal
        isOpen
        onRetry={() => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    );
  }

  if (!cachedUser && navigator.onLine) {
    return (
      <GoogleLoginModal
        isOpen={true}
        onLogin={() => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    );
  }

  return children;
};

export default AuthGate;
