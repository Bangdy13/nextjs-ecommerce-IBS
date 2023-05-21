import React from "react";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <SidebarAdmin>{children}</SidebarAdmin>
    </>
  );
};

export default LayoutAdmin;
