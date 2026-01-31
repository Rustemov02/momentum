import AuthGate from "./components/Auth/AuthGate";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { RouterProvider } from "react-router";

const App = () => {
  return (
    <div className="bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      <AuthGate>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthGate>
    </div>
  );
};

export default App;
