import { Outlet } from "react-router-dom";
 import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from "./hooks/hooks";
import { useEffect } from "react";
import { useCheckAuth } from "./api/authApi";
import { setUser } from "./redux/slice/authSlice";
//  import 'react-toastify/dist/ReactToastify.css'; 

export default function App() {
  const dispatch = useAppDispatch();
  const { data: user } = useCheckAuth();

  useEffect(() => {
      dispatch(setUser(user));

      return () => {
        dispatch(setUser(null));
      };
  }, [user, dispatch]);
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
