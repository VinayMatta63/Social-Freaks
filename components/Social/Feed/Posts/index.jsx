import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../../../firebase";
import Post from "./Post";

const Posts = ({ posts }) => {
  const [newPosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  return (
    <Container>
      {newPosts
        ? newPosts?.docs.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
              postVideo={post.data().postVideo}
              activity={post.data().activity}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
              postVideo={post.postVideo}
              activity={post.activity}
            />
          ))}
    </Container>
  );
};

export default Posts;

const Container = styled.div``;
