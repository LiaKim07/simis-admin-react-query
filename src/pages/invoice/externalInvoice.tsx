import React from "react";
import { useParams } from "react-router-dom";

import InvoicePrintContent from "../../components/Organisms/invoices/InvoicePrintContent";


export default function ExternalInvoice() {
  const { invoiceId } = useParams();

  return (
    <InvoicePrintContent
      isExternal
      invoiceId={invoiceId || ''}
    />
  );
}
