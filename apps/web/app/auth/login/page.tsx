import React from "react";
import LoginForm from "@/app/auth/login/login-form";

const LoginPage = () => {
  return (
    <div className="flex grow mx-auto w-full items-center justify-center space-y-6 lg:w-[500px]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
