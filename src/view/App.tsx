import { Outlet, useNavigate } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { listenToAuth } from "../controllers/db/authCont";
import { useSelector } from "react-redux";
import { selectUser } from "../controllers/slices/userSlice";

function App() {
  const user = useSelector(selectUser);
const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = listenToAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/doc/e357bf6e-9654-4431-af20-486035a094ff");
    }
  }, [user]);

  return (
    <>

  
        <Outlet />
    
    </>
  );
}

export default App;
