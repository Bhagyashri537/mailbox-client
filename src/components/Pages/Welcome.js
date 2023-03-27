import Mail from "./Mail";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authAction.logOut());
    //localStorage.removeItem('email')
    navigate("/login");
  };
  return (
    <>
      <div className="flex justify-end pr-10 bg-pink-900 text-white font-bold ">
        <Link to="/sentmail">
          {" "}
          <h3 className="p-2 pl-3">Sent Box</h3>{" "}
        </Link>

        <Link to="/inbox">
          <h3 className="p-2 pl-3">Inbox</h3>
        </Link>

        <button className="p-2 pl-3" onClick={logoutHandler}>
          logOut
        </button>
      </div>
      <Mail />
    </>
  );
};
export default Welcome;
