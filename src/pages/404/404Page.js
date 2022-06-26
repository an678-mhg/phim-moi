import React from "react";
import { Link } from "react-router-dom";
import Title from "../../utils/Title";
import "./404.css";

const ErrorPage = () => {
  return (
    <>
      <Title title={"404 Page"} />
      <div className="error">
        <div className="error-body container">
          <h1 className="error-title">Oops!</h1>
          <p className="error-description">404-Page Not Found</p>
          <Link to="/">Go to HomePage</Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
