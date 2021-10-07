import React from "react";
import Home from "./home";
import About from "./about";
import Howto from "./howTo";
import Header from "./header";

export default function Content() {
  return (
    <main>
      <Header></Header>
      <Home></Home>
      <About></About>
      <Howto></Howto>
    </main>
  );
}
