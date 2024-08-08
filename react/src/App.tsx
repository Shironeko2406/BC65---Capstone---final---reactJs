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
import UserProfile from "./Pages/UserProfile";
import Page404 from "./Pages/Page404";
import ProtectedRoute from "./Util/ProtectedRoute";
import { Spin } from "antd";
import { LoadingProvider, useLoading } from "./Contexts/LoadingContext";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();
  return isLoading ? (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  ) : null;
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LoadingProvider>
          <LoadingOverlay />
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
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </LoadingProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
