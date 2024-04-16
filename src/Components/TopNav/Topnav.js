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
import cross from "../../Assets/cross.svg";
const { Header, Footer } = Layout;

const Topnav = () => {
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState({
    FName: "",
    LName: "",
    Role: "",
  });
  const navigate = useNavigate();
  const getInitials = () => {
    const firstNameInitial = userData.FName ? userData.FName.charAt(0) : "";
    const lastNameInitial = userData.LName ? userData.LName.charAt(0) : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };
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
      icon: (
        <img onClick={handleLogout} src={ProfileLogout} alt="Account Logout" />
      ),
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
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 770 && showMobileDrawer) {
      setShowMobileDrawer(false);
    }
  }, [windowWidth, showMobileDrawer]);

  const handleToggleMobileDrawer = () => {
    setWindowWidth(window.innerWidth);

    if (window.innerWidth <= 770) {
      setShowMobileDrawer(!showMobileDrawer);
    }
  };
  return (
    <Layout
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 999,
      }}
    >
      <Header className="TopnavHeader">
        <div>
          <MenuOutlined
            className="mobileButton"
            onClick={() => handleToggleMobileDrawer()}
          />
        </div>

        <div className="ProfileDropdown">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            arrow
            rootClassName="nav-drop-down"
          >
            <div size={10} className="nav-itmes-contianer">
              {userData.FName && userData.LName ? (
                <Avatar size="large" icon={getInitials()} />
              ) : (
                <Avatar size="large" icon={<UserOutlined />} />
              )}

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
          autoFocus={true}
          maskStyle={{
            width: "100%",
            zIndex: "1000",
            opacity: "100%",
          }}
          mask={true}
          placement="left"
          onClose={() => setShowMobileDrawer(false)}
          open={showMobileDrawer}
          className="ant-drawer-body"
          title={false}
          closeIcon={false}
          width={1200}
        >
          <div className="top-nav-logo-container">
            <div className="responsive-nav-logo">
              <Image src={logo} preview={false}></Image>
            </div>
            <div>
              <p className="responsive-nav-txt">Pharmlytics</p>
            </div>

            <div className="cross-btn">
              <Image
                src={cross}
                preview={false}
                onClick={() => setShowMobileDrawer(false)}
              ></Image>
            </div>
          </div>
          <SideMenuBar
            className="side-menu-bar-items"
            toggleMobileDrawer={handleToggleMobileDrawer}
          />
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "transparent",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/faqpage">
              <CustomButton className="help-btn">
                <Image
                  style={{ width: "1rem" }}
                  preview={false}
                  src={Helplogo}
                />
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
