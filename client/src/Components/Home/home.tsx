import { useEffect } from "react";
import { useGetLoginStatus } from "../../Hooks/Users";
import { useState } from "react";
import * as React from "react";
import {FC} from "react"


const Home :FC = ()=> {
  const { getLogin } = useGetLoginStatus();

  useEffect(() => {
    getLogin();
  }, []);

  return <div>Home</div>;
}

export default Home;
