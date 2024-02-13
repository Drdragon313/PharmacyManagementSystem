import React, { useEffect, useState } from "react";
import "./Topnav.css";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, Drawer, Image } from "antd";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import ProfileSettings from "../../Assets/ProfileSettings.svg";
import ProfileSecurity from "../../Assets/ProfileSecurity.svg";
import ProfileLogout from "../../Assets/ProfileLogout.svg";
import { useNavigate } from "react-router-dom";
import SideMenuBar from "../Navbar/SideMenuBar";
import CustomButton from "../CustomButton/CustomButton";
import Helplogo from "../../Assets/helplogo.svg";
import logo from "../../Assets/logo_for_nav.svg";
const { Header, Footer } = Layout;

const Topnav = () => {
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const [userData, setUserData] = useState({
    FName: "",
    LName: "",
    Role: "",
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("AuthorizationToken");

      if (!authToken) {
        console.error("Auth token not found");
        return;
      }
      const loadingMessageKey = message.loading("Logging out...", 0.3);
      const response = await axios.post(
        `${baseURL}/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      localStorage.removeItem("AuthorizationToken");
      console.log(response.data);
      message.success({ content: "Logout successful", key: loadingMessageKey });

      navigate("/");
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };
  const items = [
    {
      label: (
        <Link to="/Profile/Settings" className="ProfileNavlink">
          Account Settings
        </Link>
      ),
      key: "0",
      icon: <img src={ProfileSettings} alt="Account Settings" />,
    },
    {
      label: (
        <Link to="/Profile/Security" className="ProfileNavlink">
          Security
        </Link>
      ),
      key: "1",
      icon: <img src={ProfileSecurity} alt="Account Security" />,
    },
    {
      label: (
        <span className="ProfileNavlink" onClick={handleLogout}>
          <div>Logout</div>
        </span>
      ),
      key: "2",
      icon: <img src={ProfileLogout} alt="Account Logout" />,
    },
  ];

  useEffect(() => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .get(`${baseURL}/get-profile`, { headers })
      .then((response) => {
        const apiUserData = response.data.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          Role: apiUserData.role[0],
          FName: apiUserData.FName,
          LName: apiUserData.LName,
        }));
      })
      .catch(() => {
        message.error("Some Error has Occured in Loading Information!", 2);
      });
    const handleToggleMobileDrawer = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 680) {
        setShowMobileDrawer(!showMobileDrawer);
      }
    };
    handleToggleMobileDrawer();
  }, []);

  return (
    <Layout>
      <Header className="TopnavHeader">
        <div>
          <Image
            className="top-nav-logo-container"
            src={logo}
            preview={false}
          ></Image>
        </div>

        <div className="ProfileDropdown">
          <MenuOutlined
            className="mobileButton"
            onClick={setShowMobileDrawer}
          />
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            arrow
            rootClassName="nav-drop-down"
          >
            <div size={10} className="nav-itmes-contianer">
              <Avatar size="large" icon={<UserOutlined />} />

              <span></span>
              <div className="TopnavUser">
                <span className="TopnavUserName">
                  {userData.FName} {userData.LName}
                </span>

                <span className="TopnavJobTitle">{userData.Role}</span>
              </div>
              <span></span>
            </div>
          </Dropdown>
        </div>
      </Header>
      {showMobileDrawer && (
        <Drawer
          placement="left"
          onClose={() => setShowMobileDrawer(false)}
          open={showMobileDrawer}
          className="mobile-drawer-nav"
        >
          <SideMenuBar
            collapsed={true}
            toggleMobileDrawer={() => setShowMobileDrawer(false)}
          />
          <Footer
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
          </Footer>
        </Drawer>
      )}
    </Layout>
  );
};

export default Topnav;
