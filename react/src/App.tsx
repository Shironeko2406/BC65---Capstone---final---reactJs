import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Template from "./Pages/Template";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register></Register>}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
