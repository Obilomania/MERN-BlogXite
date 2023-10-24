import React from "react";
import MainLayout from "../../components/MainLayout";
import HeroSection from "./HeroSection";
import Post from "./Post";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <Post />
    </MainLayout>
  );
};

export default Home;
