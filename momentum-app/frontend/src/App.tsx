import AuthGate from "./components/Auth/AuthGate";
import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";

const App = ({ children }: any) => {
  return (
    <div className="bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      <AuthGate>
        <Layout>
          {children}
          <ToastContainer />
        </Layout>
      </AuthGate>
    </div>
  );
};

export default App;
