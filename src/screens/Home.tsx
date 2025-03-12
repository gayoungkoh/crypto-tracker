import { Link, useSearchParams } from "react-router";
import { users } from "@/db";

const Home = () => {
  const [readSearchParams, setSearchParams] = useSearchParams();
  console.log(readSearchParams.has("geo"));
  setTimeout(() => {
    setSearchParams({
      day: "today",
      tomorrow: "123",
    });
  });
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
