import { Link } from "react-router-dom";
import Logo from "../../Assets/logo_for_nav.svg";
import Helplogo from "../../Assets/helplogo.svg";
import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";
import { Image, Layout } from "antd";
import CustomButton from "../CustomButton/CustomButton";
const { Sider, Footer } = Layout;
const Navbar = () => {
  return (
    // <Layout>
    <Sider
      className="navbar-sider"
      width={200}
      style={{ position: "fixed", zIndex: 1000 }}
    >
      <div className="NavbarSiderContainer">
        <div className="NavbarTop">
          <img src={Logo} alt={"Logo"} />
          <p> Pharmlytics</p>
        </div>

        <SideMenuBar />

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "transparent",
            width: "100%",
          }}
        >
          <Link
            className="link-help"
            style={{ textDecoration: "none" }}
            to="/faqpage"
          >
            <CustomButton className="help-btn">
              <Image preview={false} className="help-image" src={Helplogo} />

              <p>Help</p>
            </CustomButton>
          </Link>
        </Footer>
      </div>
    </Sider>
    // </Layout>
  );
};
export default Navbar;
