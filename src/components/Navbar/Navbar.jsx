import { useContext } from "react";
import { VscRocket } from "react-icons/vsc";
import { Link } from "react-router-dom";
import UserContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onShowSignup, onShowLogin }) => {
  const { onLogout } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="py-2 mt-2 border-black md:mt-0 md:py-4 whitespace-nowrap border-opacity-10 dark:border-white dark:border-opacity-20 md:border-y md:order-none">
      <div className="flex justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <VscRocket className="text-3xl text-blue-500" />
            <span className="hidden text-lg font-semibold sm:text-xl xs:block">
              Crypto Tracker
            </span>
          </div>
        </Link>
        <ul className="flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <li>
                <Link to={"/portfolio"} className="hover:text-blue-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onShowLogin(true)}
                  className="hover:text-blue-500"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowSignup(true)}
                  className="bg-blue-500 text-white font-semibold rounded-md px-2 py-1.5 hover:bg-blue-400"
                >
                  Signup
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/portfolio"} className="hover:text-blue-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold rounded-md px-2 py-1.5 drop-shadow bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-blue-500"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
