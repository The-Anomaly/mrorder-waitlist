import React from "react";
import { Home, Waitlist } from "./features";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/waitlist"} element={<Waitlist />} />
      </Routes>
    </>
  );
}

export default App;
