import AuthGate from "./components/Auth/AuthGate";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { setupPushNotification } from "./service/pushNotification";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setupPushNotification();
    }
  }, []);

  return (
    <div className="bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
        <RouterProvider router={router} />
        <ToastContainer />
    </div>
  );
};

export default App;
