import { AddCircleOutline } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import { useRef, useState } from "react";
import styled from "styled-components";
import { db, storage } from "../../../firebase";
import StoryCard from "./StoryCard";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Stories = () => {
  const statusRef = useRef();
  const [session] = useSession();
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [storiesList] = useCollection(
    db.collection("status").orderBy("timestamp", "desc")
  );

  const addStatus = async (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (rE) => {
        if (
          e.target.files[0].name.match(/\.(jpg|jpeg|png|ico|PNG|JPG|JPEG|)$/)
        ) {
          setStatusType("photo");
        } else if (e.target.files[0].name.match(/\.(mp4|gif|GIF)$/)) {
          setStatusType("video");
        } else {
          alert("Please enter a valid image or video");
          return;
        }
        setStatus(rE.target.result);
      };
      if (status) {
        await db
          .collection("status")
          .add({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            type: statusType,
          })
          .then((doc) => {
            const uploadTask = storage
              .ref(`status/${doc.id}`)
              .putString(status, "data_url");
            removeStatus();
            uploadTask.on(
              "state_change",
              null,
              (error) => {
                console.error(error);
              },
              () => {
                storage
                  .ref("status")
                  .child(doc.id)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection("status").doc(doc.id).set(
                      {
                        status: url,
                      },
                      { merge: true }
                    );
                  });
              }
            );
          });
      }
    }
  };

  const removeStatus = () => {
    setStatus(null);
    setStatusType(null);
  };
  return (
    <Container>
      <AddStatus
        onClick={() => {
          statusRef.current.click();
        }}
      >
        <AddCircleOutline />
        <My>My Status</My>
        <input ref={statusRef} onChange={addStatus} type="file" hidden />
      </AddStatus>
      {storiesList &&
        storiesList.docs.map((story, index) => (
          <StoryCard data={story} key={index} />
        ))}
    </Container>
  );
};

export default Stories;

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  padding-bottom: 5px;
`;

const AddStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3fb497;
  color: white;
  opacity: 0.5;
  height: 30vh;
  width: 10vw;
  flex-shrink: 0;
  position: relative;
  padding: 5px;
  margin: 0 0.3rem;
  cursor: pointer;
  z-index: 101;
  transition-duration: 0.3s;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 12vw;
    width: 12vw;
    border-radius: 50%;
  }
  :hover {
    transform: scale(1.025);
  }
`;
const My = styled.span`
  font-size: 17px;
  @media (max-width: 768px) {
    display: none;
  }
`;
