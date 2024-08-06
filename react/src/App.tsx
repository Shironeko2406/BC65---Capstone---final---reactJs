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
import Page404 from "./Pages/Page404";
import ProtectedRoute from "./Util/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
          <Route
            path="home/*"
            element={<ProtectedRoute element={<TemplateUI />} />}
          >
            <Route path="project" element={<ProjectManagement />} />
            <Route path="projectdetail/:id" element={<ProjectDetail />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="" element={<UserManagement />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
