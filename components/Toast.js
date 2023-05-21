import React from "react";

const Toast = ({ msg, bgColor, handleShow }) => {
  return (
    <>
      <div
        className={`position-fixed text-light toast show ${bgColor}`}
        style={{
          top: "75px",
          right: "5px",
          zIndex: 9,
          minWidth: "280px",
        }}
      >
        <div className={`toast-header text-light ${bgColor}`}>
          <strong className="mr-auto text-light">{msg.title}</strong>
          <button
            type="button"
            className="ml-2 mb-1 close text-light"
            data-dismiss="toast"
            style={{ outline: "none" }}
            onClick={handleShow}
          >
            x
          </button>
        </div>
        <div className="toast-body">{msg.msg}</div>
      </div>
    </>
  );
};

export default Toast;
