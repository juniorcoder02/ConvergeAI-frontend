import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/user.context";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes />
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      </UserProvider>
    </>
  );
}

export default App;
