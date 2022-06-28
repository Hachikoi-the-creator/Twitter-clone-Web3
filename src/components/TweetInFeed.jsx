import "../styles/tweetInFeed.css";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

const TweetInFeed = ({ profile }) => {
  const [tweetsArr, setTweetsArr] = useState([]);
  // connection to moralis DB
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();

  useEffect(() => {
    /**@dev check if the slot exist, query the data depeding on the boolean prop*/
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);

        // boolean prop
        if (profile) {
          // key - value, to filter tweets
          query.equalTo("tweeterAcc", account);
        }
        // do the query whit all the specifications
        const results = await query.find();

        setTweetsArr(results);
        console.log(results);
      } catch (err) {
        console.error(err);
      }
    }
    getTweets();
  }, [profile]);

  // we reverse the order at the end of the mapping to get most recent first
  return (
    <>
      {tweetsArr.length
        ? tweetsArr
            .map((tweetData, index) => {
              const profilePic = tweetData.attributes.tweeterPfp
                ? tweetData.attributes.tweeterPfp
                : defaultImgs[0];

              const tweeter = tweetData.attributes.tweeterUserName.slice(0, 6);

              const accAndTime = `${tweetData.attributes.tweeterAcc.slice(
                0,
                5
              )}...${tweetData.attributes.tweeterAcc.slice(38)} · 
            ${tweetData.attributes.createdAt.toLocaleString("en-us", {
              month: "short",
            })}  
            ${tweetData.attributes.createdAt.toLocaleString("en-us", {
              day: "numeric",
            })}`;

              const tweetTxt = tweetData.attributes.tweetTxt;
              const tweetImg = tweetData.attributes.tweetImg;

              const randomInt = Math.ceil(Math.random() * (99 - 7) + 7);

              return (
                <div className="feedTweet" key={index}>
                  {/* profile pic */}
                  <img
                    src={profilePic}
                    alt={`${profilePic} IMAGE`}
                    className="profilePic"
                  />

                  {/* tweet content */}
                  <div className="completeTweet">
                    <div className="who">
                      {tweeter}
                      <div className="accWhen">{accAndTime}</div>
                    </div>
                    <div className="tweetContent">
                      {tweetTxt}
                      {/* conditionally render the img if there's one */}
                      {tweetImg && (
                        <img
                          src={tweetImg}
                          className="tweetImg"
                          alt={`${tweetImg} IMAGE`}
                        />
                      )}
                    </div>

                    {/* interactions */}
                    <div className="interactions">
                      <div className="interactionNums">
                        <Icon
                          fill="#3f3f3f"
                          size={20}
                          svg="messageCircle"
                        ></Icon>
                      </div>
                      <div className="interactionNums">
                        <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
                        {randomInt}
                      </div>
                      <div className="interactionNums">
                        <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()
        : ""}
    </>
  );
};

export default TweetInFeed;
