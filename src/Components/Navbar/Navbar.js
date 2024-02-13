import Logo from "../../Assets/logo_for_nav.svg";
import CustomButton from "../CustomButton/CustomButton";
import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";
import { Image, Layout } from "antd";
import Helplogo from "../../Assets/helplogo.svg";
import { Link } from "react-router-dom";
const { Sider, Footer } = Layout;
const Navbar = () => {
  return (
    <Layout>
      <Sider className="navbar-sider" width={200}>
        <div className="NavbarSiderContainer">
          <div className="NavbarTop">
            <img src={Logo} alt={"Logo"} />
          </div>
          <SideMenuBar />
        </div>
        {/* <Footer
          style={{
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          <Link to="/faqpage">
            <CustomButton className="help-btn">
              <Image preview={false} src={Helplogo} />
              <p>Help</p>
            </CustomButton>
          </Link>
        </Footer> */}
      </Sider>
    </Layout>
  );
};
export default Navbar;
