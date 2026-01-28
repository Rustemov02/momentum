import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { GoogleLoginModal } from "../Dialogs/GoogleLoginModal";
import { BASE_URL } from "@/constants/variables";
import { toast } from "react-toastify";
import { NoInternetModal } from "../Dialogs/NoInternetModal";
import Loader from "../Loader";

const AuthGate = ({ children }: { children: any }) => {
  const [localAuth, setLocalAuth] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLocalAuth(localStorage.getItem("isAuthenticated"));

    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest("/api/me", { method: "GET" });
        if (res && res.user) {
          setUser(res.user);
          console.log("İstifadəçi tapıldı:", res.user);
          localStorage.setItem("isAuthenticated", "true");
          setLocalAuth("true");
        }
      } catch (err) {
        setUser(null);
        console.log("Error : ", err);
        localStorage.setItem("isAuthenticated", "false");
        setLocalAuth("false");
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

  if (localAuth === "false" && !navigator.onLine) {
    return (
      <NoInternetModal
        isOpen={true}
        onRetry={() => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    );
  } else if (localAuth === "false" && navigator.onLine) {
    return (
      <GoogleLoginModal
        isOpen={true}
        onLogin={() => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    );
  }

  return <>{children}</>;
};

export default AuthGate;
