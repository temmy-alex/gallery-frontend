import { Outlet } from "react-router-dom";

const BlankLayout = () => (
  <div className="mx-auto bg-gradient-to-tl from-[#fcb502] to-[#06384a] min-h-screen text-white">
    <Outlet />
  </div>
);

export default BlankLayout;
