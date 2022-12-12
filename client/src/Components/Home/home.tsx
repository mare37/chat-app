import { useEffect } from "react";
import { useGetLoginStatus } from "../../Hooks/Users";
import { useState } from "react";
import * as React from "react";
function Home() {
  const { getLogin } = useGetLoginStatus();

  useEffect(() => {
    getLogin();
  }, []);

  return <div>Home</div>;
}

export default Home;
