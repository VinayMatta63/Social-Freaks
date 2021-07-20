import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
// import Feed from "../components/Social/Feed";
// import Header from "../components/Header/Header";
import Login from "../components/Login";
// import Sidebar from "../components/Social/Sidebar";
// import Widgets from "../components/Social/Widgets";

import { db } from "../firebase";
import setUser from "../helpers/setUser";
const Widgets = dynamic(() => import("../components/Social/Widgets"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("../components/Social/Sidebar"), {
  ssr: false,
});
const Feed = dynamic(() => import("../components/Social/Feed"), {
  // ssr: false,
});
// const Login = dynamic(() => import("../components/Login"), {
//   ssr: false,
// });
const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false,
});

export default function Home({ session, posts }) {
  if (!session) {
    return <Login />;
  } else {
    setUser(session);
  }

  return (
    <Container>
      <Head>
        <title>Social Freaks</title>
        <meta name="description" content="Social Media platform for Geeks" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
        />
      </Head>
      <Header />
      <Main>
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </Main>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));
  return { props: { session, posts: docs } };
}

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Main = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;
