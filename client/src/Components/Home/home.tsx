import {useSelector, useDispatch } from "react-redux"
import {RootState}  from "../../store"


function Home() {
  const username = useSelector((state: RootState) => state.value)

  console.log(username);
  console.log(0);

  return <div>Home</div>;
}

export default Home;
