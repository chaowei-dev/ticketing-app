import buildClient from "../api/build-client";
import React from "react";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get("/api/users/currentuser").catch((err) => {
  //   console.log(err.message);
  // });

  console.log(currentUser);

  return <div>Landing Page</div>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
