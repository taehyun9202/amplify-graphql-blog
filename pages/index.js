import Head from "next/head";
import Image from "next/image";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts, getPost } from "../graphql/queries";
import HomeHeader from "../components/layouts/HomeHeader";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const user = useSelector((state) => state.profile.profile);
  const [posts, setPosts] = useState([]);
  // const [post, setPost] = useState({});
  useEffect(() => {
    getData();
    // getSinglePost();
  }, []);

  const getData = async () => {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log(err);
    }
  };

  // const getSinglePost = async () => {
  //   try {
  //     const postData = await API.graphql({
  //       query: getPost,
  //       variables: { id: "05405894-f366-4a58-a5c4-eb06ea673918" },
  //     });
  //     setPost(postData.data.getPost);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log(post);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <HomeHeader />
        <div className="max-w-7xl mx-auto">
          <Link href={`blog/${user.username}`}>
            <a>Hello {user.username}</a>
          </Link>

          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
