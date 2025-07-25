import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto min-h-[70vh] pb-10 pt-20">
        <Outlet />
      </div>
    </>
  );
}
