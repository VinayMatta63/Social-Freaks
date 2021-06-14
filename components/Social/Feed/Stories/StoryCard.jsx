import styled from "styled-components";
import Image from "next/image";
import { Close, PlayArrow } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
const StoryCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <OuterContainer>
      <Container onClick={handleOpen}>
        {data.data().image && (
          <Profile
            src={data.data().image}
            height={40}
            width={40}
            layout="fixed"
            objectFit="cover"
          />
        )}

        {data.data().type == "photo" && data.data().status ? (
          <Img outer="true" src={data.data().status} layout="fill" />
        ) : (
          <PlayArrow
            style={{
              fontSize: `${
                window && window.innerWidth > 786 ? "50px" : "25px"
              }`,
              margin: "auto 0",
              color: "white",
            }}
          />
        )}
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalCover>
            <Cover>
              <IconButton onClick={handleClose}>
                <Close style={{ zIndex: "101" }} />
              </IconButton>
            </Cover>
            {data.data().type == "photo" ? (
              <Img src={data.data().status} layout="fill" />
            ) : (
              <video
                style={{ width: "100%", height: "85%" }}
                controls
                autoPlay
                loop
              >
                <source src={data.data().status} />
              </video>
            )}
          </ModalCover>
        </Fade>
      </Modal>
    </OuterContainer>
  );
};

export default StoryCard;

const Container = styled.div`
  display: flex;
  height: 30vh;
  width: 10vw;
  flex-shrink: 0;
  background-color: #3fb497;
  opacity: 0.8;
  position: relative;
  padding: 5px;
  margin: 0 0.3rem;
  cursor: pointer;
  z-index: 101;
  transition-duration: 0.3s;
  @media (max-width: 768px) {
    height: 20vw;
    width: 20vw;
    border-radius: 50%;
  }
  border-radius: 10px;
  :hover {
    transform: scale(1.025);
  }
`;
const Profile = styled(Image)`
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  z-index: 10;
  @media (min-width: 768px) {
    opacity: 1;
  }
`;
const Img = styled(Image)`
  border-radius: 10px;
  @media (max-width: 768px) {
    ${(props) => props.outer && "border-radius: 50%;"}
  }
`;

const OuterContainer = styled.div``;
const ModalCover = styled.div`
  width: 30vw;
  height: 90vh;
  margin: auto;
  margin-top: 5vh;
  border: none;
  outline: none;
  background-color: #3fb497;
  position: relative;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 90vw;
    height: 80vh;
    margin-top: 15vh;
  }
`;

const Cover = styled.div`
  display: flex;
  justify-content: flex-end;
`;
