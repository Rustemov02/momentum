import AuthGate from "./components/Auth/AuthGate";
import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";

const App = ({ children }: any) => {
  return (
    <AuthGate>
      <Layout>
        {children}
        <ToastContainer />
      </Layout>
    </AuthGate>
  );
};

export default App;
