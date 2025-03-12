import { users } from "@/db";
import { Link, Outlet, useParams } from "react-router";

const User = () => {
  const { userId } = useParams();
  const userName = users.find((user) => user.id === Number(userId))?.name ?? "";
  return (
    <div>
      <h1>
        Users with it {userId} is named: {userName}
      </h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet context={{ nameOfMyUser: userName }} />
    </div>
  );
};

export default User;
