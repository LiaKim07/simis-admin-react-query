import React from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import { queryClient } from "../../../plugins/react-query";
import InvoicePrintContent from "./InvoicePrintContent";
import { invoiceStore } from "../../../store/invoice.store";

export default function PrintSummary({
  setShow,
  testdata,
  invoiceId,
  isUpdating = false,
  isShow = false,
  setPrintShow,
  handleSuccess,
  ...props
}: any) {
  const { mutateAsync } = invoiceStore.sendEmail();

  const closeModal = () => {
    setPrintShow(false);
    setShow(false);
  };

  const handleSubmit = () => {
    const toastId = toast.loading("Sending ....");
    mutateAsync(invoiceId, {
      async onSuccess(_data) {
        toast.success("Sended successfully", { id: toastId });
        queryClient.invalidateQueries(["invoice"]);
      },
      onError(error: any) {
        toast.error(
          error.response.data.message || "error occurred please try again",
          {
            id: toastId,
          }
        );
      },
    });
  };

  return (
    <div className="side-modal">
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <InvoicePrintContent
            invoiceId={invoiceId || ""}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
