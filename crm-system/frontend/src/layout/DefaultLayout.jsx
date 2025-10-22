import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./partials/Header.comp";
import { Footer } from "./partials/Footer.comp";

export const DefaultLayout = () => {
  return (
    <div className="default-layout">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
