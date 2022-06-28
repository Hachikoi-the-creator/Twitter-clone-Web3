import React from "react";
import "../styles/sidebar.css";
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";

const Sidebar = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  // DB data
  const profilePicImg = user.attributes.pfp
    ? user.attributes.pfp
    : defaultImgs[0];

  const username =
    user.attributes.username.lenght > 9
      ? user.attributes.username.slice(0, 6) + "..."
      : user.attributes.username;

  const userWalletAdx = `${user.attributes.ethAddress.slice(0, 9)}...
  ${user.attributes.ethAddress.slice(38)}`;

  return (
    <>
      <div className="siderContent">
        <Link to="/" className="link">
          <div className="details">
            <Icon fill="#fff" size={33} svg="twitter" />
          </div>
        </Link>

        <Link to="/" className="link">
          <div className="menuItems">
            <Icon fill="#fff" size={33} svg="list" />
            Home
          </div>
        </Link>

        <Link to="/profile" className="link">
          <div className="menuItems">
            <Icon fill="#fff" size={33} svg="user" />
            Profile
          </div>
        </Link>

        <Link to="/settings" className="link">
          <div className="menuItems">
            <Icon fill="#fff" size={33} svg="cog" />
            Settings
          </div>
        </Link>
      </div>
      <div className="details">
        <img src={profilePicImg} className="profilePic"></img>
        <div className="profile">
          <div className="who">{username}</div>
          <div className="accWhen">{userWalletAdx}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
