import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TemplateUI from "./Pages/TempUI/TemplateUI";
import ProjectManagement from "./Pages/ProjectManagement";
import CreateProject from "./Pages/CreateProject";
import UserManagement from "./Pages/UserManagement";
import ProjectDetail from "./Pages/ProjectDetail";
import TestCreateTask from "./Pages/TestCreateTask";
import Page404 from "./Pages/Page404";
import UpdateTask from "./Pages/Modals/TaskDrawer/UpdateTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="" element={<Login />}></Route>
            <Route path="*" element={<Page404 />}></Route>
            <Route path="home" element={<TemplateUI></TemplateUI>}>
              <Route path="up" element={<UpdateTask></UpdateTask>}></Route>

              <Route
                path="project"
                element={<ProjectManagement></ProjectManagement>}
              ></Route>
              <Route
                path="projectdetail/:id"
                element={<ProjectDetail></ProjectDetail>}
              ></Route>
              <Route
                path="create-project"
                element={<CreateProject></CreateProject>}
              ></Route>
              <Route
                path="test-create-task"
                element={<TestCreateTask></TestCreateTask>}
              ></Route>
              <Route
                path=""
                element={<UserManagement></UserManagement>}
              ></Route>
            </Route>
            <Route path="register" element={<Register></Register>}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
