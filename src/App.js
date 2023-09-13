import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";

import Iframe from "./Iframes/Iframe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Schema from "./Pages/Schema_Definition/Schema";
import Services from "./Pages/Services/Services";
const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Topnav />

      <Layout>
        <Navbar />
        <Content>
        <Routes>
          <Route path="/" element={ <Iframe />} />
          <Route path="schema" element={ <Schema />} />
          <Route path="services" element={ <Services />} />
         
        </Routes>
        </Content>
      </Layout>

      {/* <div >
        <Iframe />
      </div> */}
    </BrowserRouter>
  );
}

export default App;
