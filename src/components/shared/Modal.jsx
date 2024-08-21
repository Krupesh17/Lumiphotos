import React, { useCallback, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import ButtonText from "./ButtonText";
import { X } from "@phosphor-icons/react";

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  title = "Modal Title",
  basis = "basis-[650px]",
  className = "",
  modalCloseActionBlock = false,
  closeModalTrigger = false,
  setCloseModalTrigger,
}) => {
  const modalRef = useRef(null);
  const firstFocusableElement = useRef(null);
  const lastFocusableElement = useRef(null);

  const closeModal = useCallback(() => {
    if (!modalCloseActionBlock) {
      setIsOpen(false);
      document.body.classList.remove("overflow-hidden");
    }
  }, [setIsOpen, modalCloseActionBlock]);

  const keyListener = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  const focusTrap = useCallback((e) => {
    if (e.key !== "Tab") return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", keyListener);
      document.addEventListener("keydown", focusTrap);

      setTimeout(() => {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        firstFocusableElement.current = focusableElements[0];
        lastFocusableElement.current =
          focusableElements[focusableElements.length - 1];

        if (firstFocusableElement.current) {
          firstFocusableElement.current.focus();
        }
      }, 0);

      document.body.classList.add("overflow-hidden");

      return () => {
        document.removeEventListener("keydown", keyListener);
        document.removeEventListener("keydown", focusTrap);
      };
    }
  }, [isOpen, keyListener, focusTrap]);

  useEffect(() => {
    if (closeModalTrigger) {
      closeModal();
      setCloseModalTrigger(false);
    }
  }, [closeModalTrigger]);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div
      className="fixed inset-0 flex items-start justify-center bg-black/55 backdrop-blur-sm z-[1000] sm:px-2.5"
      onClick={closeModal}
    >
      <div
        className={`${basis} relative h-full mx-auto sm:mt-10 flex items-start gap-2.5 ${className}`}
        ref={modalRef}
      >
        <div
          className="w-full max-sm:h-full sm:rounded overflow-auto bg-background text-copy"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2.5 sticky left-0 top-0 right-0 flex items-center justify-between gap-2.5 bg-background border-b border-border mb-2.5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <ButtonText onClick={closeModal}>
              <X size={20} strokeWidth={2} />
            </ButtonText>
          </div>
          <div className="px-2.5">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
