import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";

const App = ({ children }: any) => {
  return (
    <Layout>
      {children}
      <ToastContainer />
    </Layout>
  );
};

export default App;
