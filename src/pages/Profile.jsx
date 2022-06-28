import "../styles/profile.css";
import { Link } from "react-router-dom";
import { defaultImgs } from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis } from "react-moralis";

const Profile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  // DB data
  const profileBannerImg = user.attributes.banner
    ? user.attributes.banner
    : defaultImgs[1];

  const profilePicImg = user.attributes.pfp
    ? user.attributes.pfp
    : defaultImgs[0];

  const username =
    user.attributes.username.lenght > 7 ? "New user" : user.attributes.username;

  const userWalletAdx = `${user.attributes.ethAddress.slice(0, 5)}...
  ${user.attributes.ethAddress.slice(38)}`;

  const userBio = user.attributes.bio;

  return (
    <>
      <div className="pageIdentify">Profile</div>
      <img className="profileBanner" src={profileBannerImg}></img>
      <div className="pfpContainer">
        <img className="profilePFP" src={profilePicImg}></img>
        <div className="profileName">{username}</div>
        <div className="profileWallet">{userWalletAdx}</div>
        <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
        </Link>
        <div className="profileBio">{userBio}</div>
        <div className="profileTabs">
          <div className="profileTab">Your Tweets</div>
        </div>
      </div>
      <TweetInFeed profile={true}></TweetInFeed>
    </>
  );
};

export default Profile;
