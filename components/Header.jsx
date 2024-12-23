import { useAuth0 } from "@auth0/auth0-react";
import { React, useContext } from "react";
import Client1 from "./Client1";
import { UserContext } from "../src/App";

const Header = () => {
  const { isChat, setIsChat, isMap, setIsMap, server } = useContext(UserContext);
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  return (
    <div className="lg:h-[15%] w-full h-[10%] bg-gray-800 text-white p-4 shadow-lg lg:mb-0 flex lg:justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-green-400">
          <img src={user.picture} alt="profile" />
        </div>
        <h1 className="lg:text-lg text-sm font-semibold">{user?.name}</h1>
      </div>
      <Client1 />
      <div className="btns flex gap-4">
        <button
          onClick={() => setIsChat((prev) => !prev)} // Correct usage with prev
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 lg:py-2 lg:px-4 rounded-md transition-all text-sm lg:text-base"
        >
          {isChat ? "Hide Chat" : "Show Chat"}
        </button>

        <button
          onClick={() => setIsMap((prev) => !prev)} // Correct usage with prev
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 lg:py-2 lg:px-4 rounded-md transition-all text-sm lg:text-base"
        >
          {isMap ? "Hide Map" : "Show Map"}
        </button>

        <button
          className={`${
            server.length > 0 ? "bg-green-700" : "bg-yellow-700"
          } text-white py-1 px-3 lg:py-2 lg:px-4 rounded-md transition-all text-sm lg:text-base disabled`}
        >
          {server.length === 0 ? "NO SERVER CONNECTED" : server}
        </button>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 lg:py-2 lg:px-4 rounded-md transition-all text-sm lg:text-base"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
