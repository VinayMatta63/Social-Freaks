import Image from "next/image";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import {
  ExpandMore,
  FavoriteSharp,
  Flag,
  Home,
  Menu,
  NotificationsRounded,
  People,
  Person,
  PlayArrow,
  ShoppingCart,
  Sms,
} from "@material-ui/icons";
import NavIcon from "./NavIcon";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { signout, useSession } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [session] = useSession();
  const [open, setOpen] = useState(false);
  const [enter, setEnter] = useState();
  const router = useRouter();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Container>
      <Logo>
        <Img
          src="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
          width={60}
          height={60}
          layout="fixed"
        />
        <InputBox>
          <Icon />
          <Input type="text" placeholder="Search..." />
        </InputBox>
      </Logo>

      <NavBox>
        <NavIcon Icon={Home} route="/" />
        <NavIcon Icon={Flag} route="/" />
        <NavIcon Icon={PlayArrow} route="/watch" />
        <NavIcon Icon={ShoppingCart} route="/shop" />
        <NavIcon Icon={People} route="/" />
      </NavBox>

      <Icons>
        <Img src={session.user.image} width={50} height={50} layout="fixed" />
        <User>
          <Name
            onMouseEnter={() => setEnter(true)}
            enter={enter}
            onClick={() => setEnter(!enter)}
          >
            {session.user.name}
          </Name>
          <Signout
            onClick={signout}
            enter={enter}
            onMouseLeave={() => setEnter(false)}
          >
            Signout
          </Signout>
        </User>

        <IconBox>
          <IconButton>
            <Sms style={{ color: "lightgray" }} />
          </IconButton>
          <IconButton>
            <NotificationsRounded style={{ color: "lightgray" }} />
          </IconButton>
          <IconButton>
            <ExpandMore style={{ color: "lightgray" }} />
          </IconButton>
        </IconBox>
      </Icons>
      <Hamburger>
        <IconButton onClick={toggleDrawer}>
          <Menu />
        </IconButton>
      </Hamburger>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer}>
        <DrawerCover
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" onClick={() => router.push("")} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" onClick={() => router.push("")} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Groups" onClick={() => router.push("")} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText
                primary="Shop"
                onClick={() => router.push("shop")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PlayArrow />
              </ListItemIcon>
              <ListItemText
                primary="Watch"
                onClick={() => router.push("watch")}
              />
            </ListItem>
          </List>
        </DrawerCover>
      </Drawer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  background-color: #fafafa;
  padding: 10px;
  height: 10vh;
  position: sticky;
  z-index: 101;
  box-shadow: rgba(0, 0, 0, 0.205) 0px 4px 6px -2px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled(SearchIcon)`
  margin: 0 5px;
  color: gray;
`;

const NavBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const InputBox = styled.div`
  background-color: #fff;
  display: flex;
  margin-left: 15px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 3px;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;
const Name = styled.p`
  font-weight: 500;
  font-size: 18px;
  padding: 0;
  padding-right: 15px;
  margin-left: 5px;
  z-index: 10;
  color: #048604;
  @media (max-width: 500px) {
    padding-right: 5px;
    font-size: 15px;
  }
  transition-duration: 0.3s;
  ${(props) => props.enter && "transform:translateY(-15px);"}
`;

const IconBox = styled.div`
  @media (max-width: 868px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signout = styled.span`
  position: absolute;
  cursor: pointer;
  background-color: #4bdab6;
  padding: 3px 12px;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  transition-duration: 0.3s;
  visibility: hidden;
  ${(props) => props.enter && "transform:translateY(10px);visibility:visible;"};
`;

const Img = styled(Image)`
  border-radius: 50%;
`;

const DrawerCover = styled.div`
  background-color: #3fb497;
  color: #fafafa;
`;

const Hamburger = styled.span`
  @media (min-width: 769px) {
    display: none;
  }
`;
