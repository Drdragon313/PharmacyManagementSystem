import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";
import Iframe from "./Iframes/Iframe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Schema from "./Pages/Schema_Definition/Schema";
import Services from "./Pages/Services/Services";
import CustomSchema from "./Pages/CustomSchema/CustomSchema";
import SchemaDetail from './Components/AvailableSchema/SchemaDetail';
import File from "./Pages/File Import/File"

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
   
      <Layout>
        <Navbar />
        <Content>
        <Topnav />
          <Routes>
            <Route exact path="/" element={<Iframe />} />
            <Route path="/schema" element={<Schema />}/>
            <Route path="/file" element={<File />}/>
            <Route path="/schema/:schemaId" element={<SchemaDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/customschema" element={<CustomSchema />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
