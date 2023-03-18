import React from "react";
import './ErrorPage.scss'
const ErrorPage: React.FC = () => {
  return (
    <div className="error404">
      <div className="name404">
        <span>404</span>
      </div>
      <div className="description">
        <span> Page is not found</span>
      </div>
    </div>
  );
};

export default ErrorPage;
