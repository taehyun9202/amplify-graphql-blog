import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";
import { Auth } from "aws-amplify";

const HomeHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (!user?.username) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.attributes.sub })
      );
      dispatch(
        getProfile(
          userData.data.getUser,
          user.signInUserSession.accessToken.jwtToken
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="flex items-center bg-pink-400 h-16 px-2 justify-between text-white">
      <nav className="flex gap-10">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href={`/blog/${user?.username}`}>
          <a>My Blog</a>
        </Link>

        <Link href="/profile">
          <a>Login / Register</a>
        </Link>
      </nav>
      <div>
        <p>{user?.email ? `Hello, ${user?.username}` : "Sign in"}</p>
      </div>
    </header>
  );
};

export default HomeHeader;
