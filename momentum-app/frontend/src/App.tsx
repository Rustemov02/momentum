import Layout from "./layouts/Layout";
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
