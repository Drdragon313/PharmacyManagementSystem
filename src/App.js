import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";

import Iframe from "./Iframes/Iframe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Schema from "./Pages/Schema_Definition/Schema";
import File from "./Pages/File Import/File";
const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
   
    
      

      <Layout>
        <Navbar />
        
        <Content style={{ height:"71vh"}}>
        <Topnav />
        <Routes>
          <Route path="/" element={ <Iframe />} />
          <Route path="schema" element={ <Schema />} />
          <Route path="file" element={ <File />} />
         
        </Routes>
        </Content>
      </Layout>
      

     
    </BrowserRouter>
  );
}

export default App;
