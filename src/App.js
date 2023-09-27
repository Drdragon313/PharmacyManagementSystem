import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";
import SchemaDetail from "./Components/AvailableSchema/SchemaDetail";
import CustomSchema from "./Pages/CustomSchema/CustomSchema";
import Iframe from "./Iframes/Iframe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Schema from "./Pages/Schema_Definition/Schema";
import File from "./Pages/File Import/File";
import ValidationOptions from "./Pages/ValidationOptions/ValidationOptions";
import UploadSuccess from "./Pages/UploadSuccess/UploadSuccess";
import AutoPopulate from "./Pages/AutoPopulate/AutoPopulate";
const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />

        <Content className="MainContent">
          <Topnav />
          <Routes>
            <Route path="/" element={<Iframe />} />
            <Route path="schema" element={<Schema />} />

            <Route path="file" element={<ValidationOptions />} />
            <Route path="file/fileUpload" element={<File />} />
            <Route
              path="file/fileUpload/UploadSuccess"
              element={<UploadSuccess />}
            />
            <Route path="/schema/:schemaId" element={<SchemaDetail />} />
            {/* <Route path="/services" element={<Services />} /> */}
            <Route path="/customschema" element={<CustomSchema />} />
            <Route path="schema/autopopulate" element={<AutoPopulate />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
