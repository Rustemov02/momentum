import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Notes from "@/pages/Notes";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import Header from "@/components/Header/Header";
import CreateNoteButton from "@/components/CreateNoteButton/CreateNoteButton";
import Tags from "@/pages/Tags";
import { toast } from "react-toastify";

const Layout = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
          autoClose: false, // Offline qalana qədər göstər
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

  const getTabTitle = () => {
    const item = SIDEBAR_ITEMS.find((i) => i.id === activeTab);

    return item ? item?.label : "notes";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notes":
        return (
          <Notes
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
          />
        );
      case "tags":
        return <Tags />;
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // User məlumatını yoxla
    fetch("https://momentum02.onrender.com/api/me", {
      credentials: "include", // ÇOX VACİB - cookie göndərmək üçün
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
           console.log("AUTHED User:", data.user);
        }
      })
      .catch((err) => {
        console.error("AUTH ERROR : " , err);
      });
  }, []);

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tabTitle={getTabTitle()}
        />
        {user ? (
          <button>Log out</button>
        ) : (
          <button
            onClick={() => {
              window.location.href =
                "https://momentum02.onrender.com/auth/google";
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Google ilə daxil ol
          </button>
        )}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </main>

      <CreateNoteButton onClick={setIsCreateDialogOpen} />

      {children}
    </div>
  );
};

export default Layout;
