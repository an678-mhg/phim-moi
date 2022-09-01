import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Shared/Title";
import "./404.css";

const ErrorPage = () => {
  return (
    <>
      <Title title={"Something went wrong!"} />

      <div className="error">
        <div className="error-body container">
          <h1 className="error-title">404</h1>
          <p className="error-description">Something went wrong!</p>
          <Link to="/">Go to HomePage</Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
