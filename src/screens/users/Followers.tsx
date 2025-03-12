import { useOutletContext } from "react-router";

type IFollowersContext = {
  nameOfMyUser: string;
};

const Followers = () => {
  const { nameOfMyUser } = useOutletContext<IFollowersContext>();
  return <h1>Here are {nameOfMyUser}의 followers</h1>;
};

export default Followers;
