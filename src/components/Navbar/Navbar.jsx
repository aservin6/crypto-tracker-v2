import { useEffect } from "react";
import { useContext } from "react";
import { VscRocket } from "react-icons/vsc";
import { Link } from "react-router-dom";
import UserContext from "../../store/auth-context";

const Navbar = ({ onShowSignup, onShowLogin }) => {
  const { onLogout } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    onLogout();
    window.location.reload();
  };

  useEffect(() => {}, [user]);

  return (
    <nav className="mt-2 border-black md:mt-0 md:pt-5 whitespace-nowrap border-opacity-10 dark:border-white dark:border-opacity-20 md:border-t md:order-none">
      <div className="flex justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <VscRocket className="text-3xl text-rose-500" />
            <span className="hidden text-base font-semibold sm:text-xl xs:block">
              Crypto Tracker
            </span>
          </div>
        </Link>
        <ul className="flex items-center gap-4 text-xs sm:text-sm">
          {!user ? (
            <>
              <li>
                <Link to={"/portfolio"} className="hover:text-rose-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onShowLogin(true)}
                  className="hover:text-rose-500"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowSignup(true)}
                  className="bg-rose-500 text-white rounded-md px-2 py-1.5 hover:bg-rose-400"
                >
                  Signup
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/portfolio"} className="hover:text-rose-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-rose-500 text-white rounded-md px-2 py-1.5 hover:opacity-70"
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
