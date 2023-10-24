import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props  {
  children: string | JSX.Element | JSX.Element[];
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
