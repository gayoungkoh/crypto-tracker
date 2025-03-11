import { users } from "@/db";
import { Link, Outlet, useParams } from "react-router";

const User = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>
        Users with it {userId} is named:{" "}
        {users.find((user) => user.id === Number(userId))?.name ?? ""}
      </h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet />
    </div>
  );
};

export default User;
