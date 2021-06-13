import {
  CalendarToday,
  Computer,
  MoreHoriz,
  People,
  Person,
  ShoppingBasketOutlined,
  TimerOutlined,
} from "@material-ui/icons";
import { useSession } from "next-auth/client";
import styled from "styled-components";
import Row from "./Row";

const Sidebar = () => {
  const [session] = useSession();
  return (
    <Container>
      <Row src={session.user.image} title={session.user.name} />
      <Row Icon={Person} title="Friends" />
      <Row Icon={People} title="Groups" />
      <Row Icon={ShoppingBasketOutlined} title="Mart" />
      <Row Icon={Computer} title="Watch" />
      <Row Icon={TimerOutlined} title="Memories" />
      <Row Icon={CalendarToday} title="Events" />
      <Row Icon={MoreHoriz} title="More" />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.2;
  @media (max-width: 768px) {
    display: none;
  }
`;
