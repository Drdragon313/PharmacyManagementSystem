import Logo from "../../Assets/logo_for_nav.svg";
import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";
import { Layout } from "antd";

const { Sider } = Layout;
const Navbar = () => {
  return (
    <Sider className="navbar-sider" width={200}>
      <div className="NavbarSiderContainer">
        <div className="NavbarTop">
          <img src={Logo} alt={"Logo"} />
        </div>
        <SideMenuBar />
      </div>
    </Sider>
  );
};
export default Navbar;
