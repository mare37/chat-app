import { useEffect } from "react";
import { useGetLoginStatus } from "../../Hooks/Users";

function Home() {
  const { getLogin } = useGetLoginStatus();

  useEffect(() => {
    getLogin();
  }, []);

  return <div>Home</div>;
}

export default Home;
