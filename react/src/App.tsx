import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TemplateUI from "./Pages/TempUI/TemplateUI";
import ProjectManagement from "./Pages/ProjectManagement";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="" element={<Login />}></Route>
            <Route path="home" element={<TemplateUI></TemplateUI>}>
              <Route path="" element={<ProjectManagement></ProjectManagement>}></Route>
            </Route>
            <Route path="register" element={<Register></Register>}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
