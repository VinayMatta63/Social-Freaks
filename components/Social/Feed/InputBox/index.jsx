import { CameraAlt, EmojiEmotions, Videocam } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { db, storage } from "../../../../firebase";
import { Menu, MenuItem, Tooltip } from "@material-ui/core";
import { activityArray } from "./activity";

const InputBox = () => {
  const [session] = useSession();
  const [imageForPost, setImageforPost] = useState(null);
  const [videoForPost, setVideoforPost] = useState(null);

  const [activity, setActivity] = useState(null);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const vidRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (activity) => {
    setActivity(activity);
    setAnchorEl(null);
  };
  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    await db
      .collection("posts")
      .add({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        message: inputRef.current.value ? inputRef.current.value : "",
        activity: activity ? activity : "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (activity) {
          removeActivity();
        }
        if (imageForPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageForPost, "data_url");

          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => {
              console.error(error);
            },
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
        if (videoForPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(videoForPost, "data_url");

          removeVideo();
          uploadTask.on(
            "state_change",
            null,
            (error) => {
              console.error(error);
            },
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postVideo: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };

  const addImage = (e) => {
    if (
      !e.target.files[0] ||
      !e.target.files[0].name.match(/\.(jpg|jpeg|png|ico|PNG|JPG|JPEG)$/)
    ) {
      alert("Please Enter Valid Image");
      return;
    }
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (rE) => {
      setImageforPost(rE.target.result);
    };
  };

  const addVideo = (e) => {
    if (
      !e.target.files[0] ||
      !e.target.files[0].name.match(/\.(mp4|gif|GIF)$/)
    ) {
      alert("Please Enter Valid Video or GIF");
      return;
    }
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (rE) => {
      setVideoforPost(rE.target.result);
    };
  };
  const removeImage = () => {
    setImageforPost(null);
  };
  const removeVideo = () => {
    setVideoforPost(null);
  };
  const removeActivity = () => {
    setActivity(null);
  };

  return (
    <Container>
      <Status>
        <Img src={session.user.image} height={40} width={40} layout="fixed" />
        <Form>
          <Input
            placeholder={`What's on your mind, ${session.user.name}?`}
            ref={inputRef}
            type="text"
          />
          <Submit onClick={(e) => sendPost(e)}>Submit</Submit>
        </Form>
        {activity && (
          <Tooltip title="Remove" arrow>
            <div onClick={removeActivity}>
              <Activity>{activity}</Activity>
            </div>
          </Tooltip>
        )}
        {imageForPost && (
          <Tooltip title="Remove" arrow>
            <div onClick={removeImage}>
              <PreviewImage src={imageForPost} alt="" />
            </div>
          </Tooltip>
        )}
        {videoForPost && (
          <Tooltip title="Remove" arrow>
            <div onClick={removeVideo}>
              <video style={{ height: "40px", width: "40px" }}>
                <source src={videoForPost} />
              </video>
            </div>
          </Tooltip>
        )}
      </Status>
      <Buttons>
        <Button type="live" onClick={() => vidRef.current.click()}>
          <Videocam />
          <ButtonTitle>Video</ButtonTitle>
          <input ref={vidRef} onChange={addVideo} type="file" hidden />
        </Button>
        <Button onClick={() => imgRef.current.click()} type="upload">
          <CameraAlt />
          <ButtonTitle>Photo</ButtonTitle>
          <input ref={imgRef} onChange={addImage} type="file" hidden />
        </Button>
        <Button type="activity" onClick={handleClick}>
          <EmojiEmotions />
          <ButtonTitle>Feeling / Activity</ButtonTitle>
        </Button>
        <Menu
          anchorEl={anchorEl}
          // keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {activityArray.map((activity, index) => (
            <MenuItem onClick={() => handleClose(activity)} key={index}>
              {activity}
            </MenuItem>
          ))}
        </Menu>
      </Buttons>
      <Button type="post" onClick={(e) => sendPost(e)}>
        Post
      </Button>
    </Container>
  );
};

export default InputBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightgray;
  margin-top: 30px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Status = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid lightgray;
  align-items: center;
`;
const Img = styled(Image)`
  border-radius: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Input = styled.input`
  font-size: 17px;
  flex: 1;
  margin: 0 15px;
  outline: none;
  border: none;
  padding-left: 15px;
  @media (max-width: 768px) {
    font-size: 13px;
    padding-left: 5px;
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex: 1;
`;
const Submit = styled.button`
  visibility: hidden;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  justify-content: center;
  ${(props) => {
    if (props.type === "live") {
      return "color:red;border-radius:0 0 0 15px;";
    } else if (props.type === "upload") {
      return "color:lightgreen;";
    } else if (props.type === "post") {
      return "color:green;border-top:1px solid lightgray;";
    } else {
      return "color:#e7e702;border-radius:0 0 15px 0;";
    }
  }}
  transition-duration: 0.3s;
  :hover {
    ${(props) => {
      if (props.type === "live") {
        return "background-color:red;color:white;";
      } else if (props.type === "upload") {
        return "background-color:lightgreen;color:white;;";
      } else {
        return "background-color:#e7e702;color:white;";
      }
    }}
  }
  @media (min-width: 769px) {
    ${(props) => props.type === "post" && "display:none;"}
  }
`;

const ButtonTitle = styled.span`
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PreviewImage = styled.img`
  height: 40px;
  object-fit: contain;
  cursor: pointer;
`;

const Activity = styled.span`
  cursor: pointer;
  padding: 5px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  margin-right: 5px;
`;
