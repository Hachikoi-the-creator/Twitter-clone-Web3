import "../styles/home.css";
import TweetInFeed from "../components/TweetInFeed";
import { Icon, TextArea } from "web3uikit";
import { useState, useRef } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
import { CONTRACT_ADX, ADD_TWEET_FUNC_ABI } from "../utils/contractData";

const Home = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState("");

  // connection to moralis DB
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  // contract interaction
  const contractProcessor = useWeb3ExecuteFunction();

  // DB data
  const profilePicImg = user.attributes.pfp
    ? user.attributes.pfp
    : defaultImgs[0];

  /**@dev sav tweet to the blockchain */
  const saveMaticTweet = async () => {
    if (!tweet.length) return;

    // if there is an image in the tweet upload ot ipfs
    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);

      await file.saveIPFS();

      img = file.ipfs();
    } else {
      img = "No Img";
    }

    // All data needed to run the function "createTweet"
    let options = {
      contractAddress: CONTRACT_ADX,
      functionName: "createTweet",
      abi: ADD_TWEET_FUNC_ABI,
      params: {
        _tweetTxt: tweet,
        _tweetImg: img,
      },
      // send eth
      msgValue: Moralis.Units.ETH(0.1),
    };

    // run the function & await to the function to finish
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Tweet saved in the blockchain successfully");
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message);
      },
    });
  };

  /**@dev save tweet to DB */
  const saveTweet = async () => {
    // revoke if there's no text to tweet
    if (!tweet.length) return;

    // creates new attr if doesn't exist already
    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      // if there's a selected image upload it to IPFS
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    // update the Tweets attr in the DB
    await newTweet.save();
    window.location.reload();
  };

  const onImageClick = () => {
    // triggers the click in the input tag O:
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    // triggered by the click made to the Icon O:
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
    console.log("something");
  };

  return (
    <>
      <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img
            src={profilePicImg}
            alt="user Profile image"
            className="profilePic"
          />

          <div className="tweetBox">
            <TextArea
              label=""
              name="tweet box"
              placeholder="Ohayou sekai good morning world!"
              width="95%"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} alt="tweet img" className="tweetImg" />
            )}

            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                  type="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none" }}
                />
                <Icon fill="#1da1f2" size={20} svg="image"></Icon>
              </div>

              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>
                  Tweet
                </div>
                <div
                  className="tweet"
                  onClick={saveMaticTweet}
                  style={{ backgroundColor: "#8247e5" }}
                >
                  <Icon fill="#fff" size={20} svg="matic"></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end profile tweet section */}
        <TweetInFeed profile={false}></TweetInFeed>
      </div>
    </>
  );
};

export default Home;
