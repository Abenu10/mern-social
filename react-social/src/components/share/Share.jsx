import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
// import useeffect from react
import { useEffect } from "react";
import { unstable_createMuiStrictModeTheme } from "@mui/material";

function Share() {
  const { user } = useContext(AuthContext);
  console.log(user.username); // TODO we are using default user make it the logged in user

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  // TODO:
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const newPost = {
  //     userId: user._id,
  //     desc: desc.current.value,
  //   };
  //   console.log(user._id);

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     const res = await axios.post(
  //       "/posts/6441799b9b922c5569b13b85",
  //       newPost,
  //       config
  //     );
  //     // you can create a post context and update your post state also
  //     console.log(res.data); // log the created post to the console
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // TODO:
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("desc", desc.current.value);
    formData.append("postImage", file);

    axios
      .post(`/posts/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's in you mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mkv"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
