import { Outlet } from "react-router";
import Header from "@/components/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
