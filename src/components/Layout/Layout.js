import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./Layout.styled";
import AppBar from "../AppBar/AppBar";

export default function Layout() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={null}>
        {/* замінити на Loading Component*/}
        <Outlet />
      </Suspense>
      {/* <Footer /> */}
    </Container>
  );
}
