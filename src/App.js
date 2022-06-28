import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./styles/App.css";
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();

  const logOut = () => {
    Moralis.User.logOut().then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="page">
          <div className="sideBar">
            <Sidebar />
            {/* log out option */}
            <div className="logout" onClick={logOut}>
              Log out
            </div>
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default App;

const LoginPage = () => {
  return (
    <>
      <div className="loginPage">
        <Icon fill="#fff" size={20} svg="twitter" />
        <ConnectButton />
      </div>
    </>
  );
};
