import React from "react";
import LoginForm from "../containers/Login/LoginForm"
import Products from "../containers/Products/Products";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Preview from "../containers/Preview/Preview";
import PreviewSingle from "../components/PreviewSingle/PreviewSingle";
import "./App.scss";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path }):any => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Routes>
      <Route path={path} element={<Component />} />
    </Routes>
  ) : (
    navigate ("/" , {replace: true})
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <React.Fragment>
        <ProtectedRoute path="/products" component={Products} />
        <ProtectedRoute path="/preview" component={Preview} />
        <ProtectedRoute path="/preview/:id" component={PreviewSingle} />
      </React.Fragment>
      <Routes>
        <Route path="/" element={<LoginForm  />} />
      </Routes>
    </Router>
  );
};

export default App;
