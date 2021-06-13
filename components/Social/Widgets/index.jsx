import { IconButton } from "@material-ui/core";
import { MoreHoriz, Search, Videocam } from "@material-ui/icons";
import styled from "styled-components";
import Contact from "./Contact";
const contacts = [
  { src: "https://links.papareact.com/f0p", name: "Jeff Bozes" },
  { src: "https://links.papareact.com/kxk", name: "Elon Musk" },
  { src: "https://links.papareact.com/zvy", name: "Bill Gates" },
  { src: "https://links.papareact.com/snf", name: "Mark Zuckerberg" },
  { src: "https://links.papareact.com/d0c", name: "Harry Potter" },
  { src: "https://links.papareact.com/6gg", name: "The Queen" },
  { src: "https://links.papareact.com/r57", name: "James Bond" },
];
const Widgets = () => {
  return (
    <Container>
      <WidgetHeader>
        <h2>Contacts</h2>
        <Icons>
          <IconButton>
            <Videocam style={{ color: "#3fb497" }} />
          </IconButton>
          <IconButton>
            <Search style={{ color: "#3fb497" }} />
          </IconButton>
          <IconButton>
            <MoreHoriz style={{ color: "#3fb497" }} />
          </IconButton>
        </Icons>
      </WidgetHeader>
      {contacts.map((contact, index) => (
        <Contact key={index} name={contact.name} src={contact.src} />
      ))}
    </Container>
  );
};

export default Widgets;

const Container = styled.div`
  flex: 0.2;
  @media (max-width: 768px) {
    display: none;
  }
`;
const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3fb497;
`;
const Icons = styled.div`
  display: flex;
  margin-left: 10px;
`;
