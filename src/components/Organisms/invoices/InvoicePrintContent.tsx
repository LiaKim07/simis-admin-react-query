import React, { useState, useRef } from "react";
import Heading from "../../Atoms/Heading";
import Table from "../../Organisms/tables/Table";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

import Button from "../../Molecules/Button/Button";
import PrintComponentContent from "./PrintCcomponentContent";
import { invoiceStore } from "../../../store/invoice.store";
import { projectsStore } from '../../../store/projects.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';

interface IInvoicePrintContentProps {
  handleSubmit?: () => void;
  closeModal?: () => void;
  isExternal?: boolean;
  invoiceId: string;
}

const getTotalForTable = (array: any[], propertyName = "totalPriceExclVat") =>
  array?.reduce((prev, curr) => prev + curr[propertyName], 0).toFixed(2) || 0;

interface IServiceItem {
  id: string;
  projectOrderNumber: string;
  projectName: string;
  serviceName: string;
  unit: string;
  quantity: number;
  priceExclVat: number;
  startOn: string;
  totalPriceExclVat: string;
}

interface IProductItem {
  id: string;
  projectOrderNumber: string;
  projectName: string;
  productName: string;
  unit: string;
  quantity: number;
  priceExclVat: number;
  startOn: string;
  totalPriceExclVat: string;
}

interface IOrderItem {
  id: string;
  pojectOrderNumber: string;
  projectName: string;
  fromTo: string;
  unit: string;
  rentArea: number;
  rentPriceForOneDayExclVat: number;
  rentDaysCount: number;
  totalRentPriceForOneDayExclVat: number;
}

const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

export default function InvoicePrintContent({
  handleSubmit,
  // onPrint,
  closeModal,
  isExternal,
  invoiceId,
}: IInvoicePrintContentProps) {
  const { id } = useParams();
  const { data } = invoiceStore.getExternalById(invoiceId);
  const { data: projects } = projectsStore.getById(id as string);
  const { data: invoices } = invoiceStore.getById(invoiceId);
  const { data: projectOrder } = projectsOrdersStore.getAll();
  const { result = {} } = data?.data || {};
  const invoiceNumber = result.invoiceNumber;
  const companyProfile = {
    name: result.companyName,
    address: result.companyAddress,
    vatNumber: result.companyVatCode,
    number: result.companyNumber,
    BankAccount: result.companyAccountNumber,
    bankName: result.companyBankName,
    bankCode: result.companyBankCode,
  };
  const invoice = {
    createdOn: result.createdOn,
    totalAmountExclVat: result.totalAmountExclVat,
  };
  const createdByData = result.createdBy;
  const clientName = result.customerName;
  const clientAdd = result.customerAddress;
  const clientNumber = result.customerNumber;
  const clientVatNumber = result.customerVatCode;
  const productsTableTotal = getTotalForTable(result.productsForSale);

  const productSaleTable: any[] =
    result.productsForSale?.map((item: IProductItem) => ({
      id: item.id,
      "Akto Nr.": item.projectOrderNumber,
      Pavadinimas: item.productName,
      Artikulas: "vnt",
      Kiekis: item.quantity,
      "Kaina €": item.priceExclVat,
      "Suma €": item.totalPriceExclVat,
      markUp: result.priceIncreaseSaleProducts,
      discount: result.discountSaleProducts,
      total: productsTableTotal,
    })) || [];

  const serviceTableTotal = getTotalForTable(result.services);

  const tableData: any[] =
    result.services?.map((item: IServiceItem) => ({
      id: item.id,
      "Akto Nr.": item.projectOrderNumber,
      Objektas: item.projectName,
      'Adresas': projects?.data?.result.address + ', ' + projects?.data?.result.postalCode + ', ' + projects?.data?.result.city,
      Paslauga: item.serviceName,
      "Mato vnt.": item.unit,
      Kiekis: item.quantity,
      "Kaina €": item.priceExclVat,
      Pradžia: item.startOn,
      "Suma, € be PVM": item.totalPriceExclVat,
      markUp: result.priceIncreaseServices,
      discount: result.discountServices,
      total: serviceTableTotal,
    })) || [];

  const loanTableTotal = getTotalForTable(
    result.rentOrders,
    "totalRentPriceForOneDayExclVat"
  );

  let projectOrderIdArr: string[] = [];
  if (projectOrder?.data?.result?.length > 0) {
    projectOrder?.data?.result?.map((item: any) => {
      invoices?.data?.result?.selectedProjectOrderIds.map((selectedData: any) => {
        if (item.id === selectedData && item.type === 'loans') {
          projectOrderIdArr.push(selectedData);
        }
      })
    })
  }

  const { data: currentLoan } = warehouseStore.getWarehosueProductOrdersByRentAggregate(projectOrderIdArr);
  const tableDataLoan: any[] = [];
  projectOrder?.data?.result?.map((item: any) => {
    result.rentOrders?.map((order: IOrderItem) => {
      let kiekisData: number = 0;
      currentLoan?.data?.result?.map((currentData: any) => {
        console.log('loan ', currentData)
        if (item.id === currentData.projectOrderId) {
          if (item.isPercentOfValueForOneDay) {
            kiekisData = currentData.totBaseValue;
          } else if (item.isPricePerToneForOneDay) {
            kiekisData = currentData.totWeght;
          } else {
            kiekisData = currentData.currentRentArea;
          }
        }
      })
      // if(item.id === currentLoan?.data?.result)
      if (item.id === order.id) {
        tableDataLoan.push({
          id: order.id,
          "Akto Nr.": order.pojectOrderNumber,
          Objektas: order.projectName,
          'Adresas': projects?.data?.result.address + ', ' + projects?.data?.result.postalCode + ', ' + projects?.data?.result.city,
          Terminas: order.fromTo,
          "Mato vnt.": order.unit,
          // Kiekis: order.rentArea.toFixed(2),
          Kiekis: kiekisData.toFixed(2),
          "Kaina €": order.rentPriceForOneDayExclVat.toFixed(2),
          Laikotarpis: order.rentDaysCount,
          "Suma, € be PVM": order.totalRentPriceForOneDayExclVat.toFixed(2),
          markUp: result.priceIncreaseLoanProducts,
          discount: result.discountLoanProducts,
          total: loanTableTotal,
        })
      }
    })
  })

  const onPrint = async () => {
    setShow(true);
    await sleep(100);
    handlePrint();
    await sleep(100);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div
        style={isExternal ? { maxWidth: "80%", margin: "0 auto" } : undefined}
      >
        <div className="body-header p-4 mb-2 d-flex justify-content-end">
          <Heading fontWeight="bold" fontSize="xl">
            {""}
          </Heading>
          {handleSubmit && (
            <div className="col-3 mr-2">
              <Button
                className="text-capitalize b-radius "
                onClick={() => handleSubmit()}
              >
                <span>&nbsp;Siųsti el. paštu</span>
              </Button>
            </div>
          )}
          <button
            className="close-icon btn w-auto"
            type="button"
            onClick={() => {
              onPrint();
            }}
          >
            <img
              src={"/icons/print-page.svg"}
              className="cursor-pointer"
              width={30}
              alt="close-icon"
            />
          </button>

          {closeModal && (
            <button
              className="close-icon btn w-auto"
              type="button"
              onClick={closeModal}
            >
              <span className="close-txt font-bold text-capitalize tracking-0"></span>
              <img
                src={"/icons/close-icon.svg"}
                className="cursor-pointer"
                width={30}
                alt="close-icon"
              />
            </button>
          )}
        </div>
        <div className="body-content px-4 modal-border">
          <div>
            <div className="col-12 col-md-4">
              <img
                src={"/assets/images/simis-logo.png"}
                width={185}
                alt="Logo"
              />
            </div>
            <div className="text-center">
              <Heading fontWeight="bold" fontSize="xl" className="text-center">
                {"PVM SĄSKAITA FAKTŪRA"}
              </Heading>
              <Heading fontWeight="bold" fontSize="xl" className="text-center">
                {`Serija ${invoiceNumber}`}
              </Heading>
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-between">
              <div className="col-12 col-md-6">
                <p className="m-0 p-0">{"Nuomotojas:"}</p>
                <p className="m-0 p-0">{`Company name: ${companyProfile?.name}`}</p>
                <p className="m-0 p-0">{`Adresas: ${companyProfile?.address}`}</p>
                <p className="m-0 p-0">{`Įm. kodas ${companyProfile?.number}`}</p>
                <p className="m-0 p-0">{`PVM mokėtojo kodas ${companyProfile?.vatNumber}`}</p>
                <p className="m-0 p-0">{`A/S.:  ${companyProfile?.BankAccount}`}</p>
                <p className="m-0 p-0">{`${companyProfile?.bankName}`}</p>
                <p className="m-0 p-0">{`Banko kodas ${companyProfile?.bankCode}`}</p>
              </div>

              <div className="col-12 col-md-6">
                <Heading fontWeight="bold" fontSize="sm">
                  {`Dokumento data: ${invoice?.createdOn}`}
                </Heading>
                <p className="m-0 p-0">{`Client name: ${clientName}`}</p>
                <p className="m-0 p-0">{`Adresas: ${clientAdd}`}</p>
                <p className="m-0 p-0">{`Įm. kodas: ${clientNumber}`}</p>
                <p className="m-0 p-0">{`PVM mokėtojo kodas: ${clientVatNumber}`}</p>
              </div>
            </div>
            <br />
            {productSaleTable.length > 0 && (
              <div>
                <h6>PARDUODAMOS PREKĖS</h6>
                <div className="mb-5">
                  <Table
                    data={productSaleTable || []}
                    uniqueCol="id"
                    hide={["id", "discount", "total", "markUp"]}
                    rowsPerPage={1000}
                    isFilter={false}
                    showAddNewButton={false}
                    isPagenation={false}
                    discountData={true}
                  />
                </div>
              </div>
            )}
            <br />
            {tableDataLoan.length > 0 && (
              <div>
                <h6>Išnuomotos prekės Loan</h6>
                <div className="mb-5">
                  <Table
                    data={tableDataLoan || []}
                    uniqueCol="id"
                    hide={["id", "discount", "total", "markUp"]}
                    rowsPerPage={1000}
                    isFilter={false}
                    showAddNewButton={false}
                    isPagenation={false}
                    discountData={true}
                  />
                </div>
              </div>
            )}
            <br />
            {tableData.length > 0 && (
              <div>
                <h6>SUTEIKTOS PASLAUGOS PAGAL SUTARTĮ</h6>
                <div className="mb-5">
                  <Table
                    data={tableData || []}
                    uniqueCol="id"
                    hide={["id", "discount", "total", "markUp"]}
                    rowsPerPage={1000}
                    isFilter={false}
                    showAddNewButton={false}
                    isPagenation={false}
                    discountData={true}
                  />
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end">
              <div></div>
              <div>
                <p className="m-0 p-0">{`Suma be PVM: ${invoice?.totalAmountExclVat?.toFixed(
                  2
                )}`}</p>
                <p className="m-0 p-0">{`PVM: ${(
                  invoice?.totalAmountExclVat * 0.21
                )?.toFixed(2)}`}</p>
                <p className="m-0 p-0">{`Bendra suma su PVM: ${(
                  invoice?.totalAmountExclVat * 1.21
                )?.toFixed(2)}`}</p>
              </div>
            </div>
            <br />
            <div>
              <p className="m-0 p-0">{`Sąskaitą išrašė: ${createdByData}`}</p>
            </div>
            <br />
            <Heading fontWeight="bold" fontSize="sm">
              {
                "Gavėjas: _______________________________________________________________"
              }
            </Heading>
          </div>
        </div>

        <PrintComponentContent
          show={show}
          ref={componentRef}
          invoiceNumber={invoiceNumber}
          companyProfile={companyProfile}
          invoice={invoice}
          clientName={clientName}
          clientAdd={clientAdd}
          clientNumber={clientNumber}
          clientVatNumber={clientVatNumber}
          productSaleTable={productSaleTable}
          tableDataLoan={tableDataLoan}
          tableData={tableData}
          createdByData={createdByData}
        />
      </div>
    </div>
  );
}
