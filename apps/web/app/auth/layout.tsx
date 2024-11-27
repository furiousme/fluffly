import AppHeader from "@/components/app-header";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container relative min-h-[100svh] flex flex-col">
      <AppHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
