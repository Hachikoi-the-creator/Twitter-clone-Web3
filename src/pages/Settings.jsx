import React from "react";
import { Link } from "react-router-dom";
import { Input } from "web3uikit";
import { useState, useRef, useEffect } from "react";
import "../styles/settings.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { defaultImgs } from "../defaultimgs";

const Settings = () => {
  // default imgs, if the user has no nfts
  const [pfps, setPfps] = useState(defaultImgs[2]);
  // FE stuff
  const [selectedPfp, setSelectedPfp] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  // moralis DB
  const [theFile, setTheFile] = useState(); //file to upload to ipfs
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
    setTheFile(img);
    console.log("image selected!");
  };

  const saveEdits = async () => {
    const user = Moralis.Object.extend("_User");
    const query = new Moralis.Query(user);
    // easy since only the user can change it's details
    const myDetails = await query.first();

    if (username) {
      myDetails.set("username", username);
    }
    if (bio) {
      myDetails.set("bio", bio);
    }
    if (selectedPfp) {
      // uses the selectedPfp used for styling as index to pfps array
      myDetails.set("pfp", pfps[selectedPfp]);
    }
    if (theFile) {
      // upload img to ipfs then set banner whit the ipfs link
      const data = theFile;
      // key, value pair args
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    // save data to moralis DB
    await myDetails.save();
    window.location.reload();
  };

  // helper function
  const _resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  // use effect
  useEffect(() => {
    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address: account,
      };

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      // get the URI for te nfts and filter any invalid entry
      const images = mumbaiNFTs.result
        .map((e) => _resolveLink(JSON.parse(e.metadata)?.image))
        .filter((e) => e);

      console.log("check nfts : ", images);

      if (images.length) {
        setPfps(images);
      }
    };

    fetchNFTs();
  }, [isAuthenticated, account]);

  return (
    <>
      <div className="pageIdentify">Settings</div>
      <div className="settingsPage">
        {/* Change name & bio */}
        <Input
          label="Name"
          name="Change name"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Bio"
          name="Change bio"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setBio(e.target.value)}
        />

        {/* Profile pic Selection */}
        <div className="pfp">
          Profile images (your nfts)
          <div className="pfpOptions">
            {pfps.map((item, idx) => {
              // class name changes on click
              return (
                <img
                  key={idx}
                  src={item}
                  onClick={() => setSelectedPfp(idx)}
                  className={
                    selectedPfp === idx ? "pfpOptionSelected" : "pfpOption"
                  }
                  alt="some img"
                />
              );
            })}
          </div>
        </div>
        <div className="save" onClick={() => setPfps(defaultImgs[2])}>
          Defaults
        </div>

        {/* Banner selction */}
        <div className="pfp">
          Profile banner
          <div className="pfpOptions">
            <img
              src={selectedFile}
              alt="default banner"
              onClick={onBannerClick}
              className="banner"
            />
            <input
              type="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="save" onClick={saveEdits}>
          Save
        </div>
      </div>
    </>
  );
};

export default Settings;
