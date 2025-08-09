import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

const FormContext = createContext();

function Modal({ children }) {
  const [modalName, setModalName] = useState("");

  const openModal = setModalName;
  const closeModal = () => setModalName("");

  return (
    <FormContext.Provider value={{ openModal, closeModal, modalName }}>
      {children}
    </FormContext.Provider>
  );
}
function Open({ name, children, fn }) {
  const { openModal } = useContext(FormContext);

  return cloneElement(children, {
    onClick: (e) => {
      openModal(name);
      fn?.(e);
    },
  });
}

function View({ name, children, title }) {
  const { closeModal, modalName } = useContext(FormContext);

  if (modalName !== name) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 h-dvh w-full bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-1/2 left-1/2 h-fit -translate-1/2 overflow-hidden rounded-lg bg-white">
        <div className="flex items-center justify-between p-6">
          {title && (
            <h3 className="text-2xl font-semibold text-gray-800 capitalize">
              {title}
            </h3>
          )}
          <button
            onClick={closeModal}
            className="cursor-pointer rounded-md bg-white p-1.5 hover:bg-gray-100"
          >
            <GrClose size={18} />
          </button>
        </div>

        {cloneElement(children, { closeModal })}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

Modal.Open = Open;
Modal.View = View;
