import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./hooks/hooks";
import { useEffect } from "react";
import { useCheckAuth } from "./api/authApi";
import { setUser } from "./redux/slice/authSlice";
//  import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const dispatch = useAppDispatch();
  const { data: user, isError } = useCheckAuth();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }

    if (isError) {
      dispatch(setUser(null));
    }
  }, [user, dispatch, isError]);
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Outlet />
    </div>
  );
}
