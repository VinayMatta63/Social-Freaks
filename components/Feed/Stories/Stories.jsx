import styled from "styled-components";
import StoryCard from "./StoryCard";

const storiesList = [
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
  {
    name: "Vinay Matta",
    src: "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
    profile:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GglYmSoFRvkQdR99whzWGyZz7rLEi9adxTgRrZEgg%3Ds96-c&w=64&q=75",
  },
];

const Stories = () => {
  return (
    <Container>
      {storiesList.map((story, index) => (
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
