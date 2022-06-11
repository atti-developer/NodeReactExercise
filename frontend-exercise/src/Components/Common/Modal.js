import React from "react";
import ReactDom from "react-dom";

const MODEL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  borderRadius: "4px",
  border: "1px solid #eee",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

const Modal = ({ open, text, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLE}></div>
      <div style={MODEL_STYLES}>
        <h2 className="model_text">{text}</h2>
        <div className="btn_model">
          <button onClick={onClose} className="ok_btn">
            OK
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
