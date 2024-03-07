import Logo from "../../Assets/logo_for_nav.svg";

import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";
import { Layout } from "antd";
const { Sider } = Layout;
const Navbar = () => {
  return (
    <Layout>
      <Sider className="navbar-sider" width={200}>
        <div className="NavbarSiderContainer">
          <div className="NavbarTop">
            <img src={Logo} alt={"Logo"} />
            <p> Pharmlytics</p>
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
