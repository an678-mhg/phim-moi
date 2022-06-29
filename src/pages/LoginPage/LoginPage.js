import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";
import Title from "../../utils/Title";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useStore } from "../../stored/store";
import { useSearchParams } from "../../hook/useSearchParams";

const LoginPage = () => {
  const { user, loading } = useStore((state) => state);

  const searchParams = useSearchParams();

  if (user) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="login-page">
      <Title title={"Sign In | Phim Moi"} />
      <LoginForm />

      {loading && <Loading />}
    </div>
  );
};

export default LoginPage;
