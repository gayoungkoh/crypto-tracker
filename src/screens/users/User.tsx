import { users } from "@/db";
import { useParams } from "react-router";

const User = () => {
  const { userId } = useParams();
  return (
    <h1>
      Users with it {userId} is named:{" "}
      {users.find((user) => user.id === Number(userId))?.name ?? ""}
    </h1>
  );
};

export default User;
