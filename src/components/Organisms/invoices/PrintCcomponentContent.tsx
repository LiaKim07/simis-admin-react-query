import React from "react";

import Heading from "../../Atoms/Heading";
import Table from "../tables/Table";

interface IInvoicePrintContentProps {
  onChangePage?: () => void;
  invoiceNumber: string;
  companyProfile: {
    name: string;
    address: string;
    vatNumber: string;
    number: string;
    BankAccount: string;
    bankName: string;
    bankCode: string;
  };
  invoice: {
    createdOn: string;
    totalAmountExclVat: number;
  };
  clientName: string;
  clientAdd: string;
  clientNumber: string;
  clientVatNumber: string;
  productSaleTable: any[];
  tableDataLoan: any[];
  tableData: any[];
  createdByData: string;
  show: boolean;
}

const PrintComponentContent = React.forwardRef(
  (
    {
      invoiceNumber,
      companyProfile,
      invoice,
      clientName,
      clientAdd,
      clientNumber,
      clientVatNumber,
      productSaleTable,
      tableDataLoan,
      tableData,
      onChangePage = () => { },
      createdByData,
      show,
    }: IInvoicePrintContentProps,
    ref?: any
  ) => {
    return (
      <div
        className="bg-gray-200 p-6 printable"
        ref={ref}
        style={{ paddingTop: "80px" }}
      >
        {show && (
          <div className="body-content px-4 modal-border">
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
                  <Heading
                    fontWeight="bold"
                    fontSize="xl3"
                    className="text-center"
                  >
                    {"PVM SĄSKAITA FAKTŪRA"}
                  </Heading>
                  <Heading
                    fontWeight="bold"
                    fontSize="xl3"
                    className="text-center"
                  >
                    {`Serija ${invoiceNumber}`}
                  </Heading>
                </div>
                <br />
                <div className="d-flex justify-content-between">
                  <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                    <p className="m-0 p-0 text-normal">{"Nuomotojas:"}</p>
                    <p className="m-0 p-0 text-normal">{`Company name: ${companyProfile?.name}`}</p>
                    <p className="m-0 p-0 text-normal">{`Adresas: ${companyProfile?.address}`}</p>
                    <p className="m-0 p-0 text-normal">{`Įm. kodas ${companyProfile?.number}`}</p>
                    <p className="m-0 p-0 text-normal">{`PVM mokėtojo kodas ${companyProfile?.vatNumber}`}</p>
                    <p className="m-0 p-0 text-normal">{`A/S.:  ${companyProfile?.BankAccount}`}</p>
                    <p className="m-0 p-0 text-normal">{`${companyProfile?.bankName}`}</p>
                    <p className="m-0 p-0 text-normal">{`Banko kodas ${companyProfile?.bankCode}`}</p>
                  </div>

                  <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                    <Heading fontWeight="bold" fontSize="sm3">
                      {"Dokumento data: [date]"}
                    </Heading>
                    <p className="m-0 p-0 text-normal">{`Client name: ${clientName}`}</p>
                    <p className="m-0 p-0 text-normal">{`Adresas: ${clientAdd}`}</p>
                    <p className="m-0 p-0 text-normal">{`Įm. kodas: ${clientNumber}`}</p>
                    <p className="m-0 p-0 text-normal">{`PVM mokėtojo kodas: ${clientVatNumber}`}</p>
                  </div>
                </div>
                <br />
                {productSaleTable.length > 0 && (
                  <div>
                    <h6 className=" text-normal">PARDUODAMOS PREKĖS</h6>
                    <div className="mb-5" style={{ fontSize: '8px' }}>
                      <Table
                        data={productSaleTable || []}
                        uniqueCol="id"
                        hide={["id", "discount", "markUp", "total"]}
                        rowsPerPage={1000}
                        isFilter={false}
                        isPrint={true}
                        showAddNewButton={false}
                        isPagenation={false}
                        discountData={true}
                        onChangePage={onChangePage}
                      />
                    </div>
                  </div>
                )}
                {tableDataLoan.length > 0 && (
                  <div>
                    <h6 className=" text-normal">Išnuomotos prekės Loan</h6>
                    <div className="mb-5">
                      <Table
                        data={tableDataLoan || []}
                        uniqueCol="id"
                        hide={["id", "discount", "markUp", "total"]}
                        rowsPerPage={1000}
                        isFilter={false}
                        showAddNewButton={false}
                        isPagenation={false}
                        discountData={true}
                        onChangePage={onChangePage}
                        isPrint={true}
                      />
                    </div>
                  </div>
                )}
                {tableData.length > 0 && (
                  <div>
                    <h6 className=" text-normal">SUTEIKTOS PASLAUGOS PAGAL SUTARTĮ</h6>
                    <div className="mb-5">
                      <Table
                        data={tableData || []}
                        uniqueCol="id"
                        hide={["id", "discount", "markUp", "total"]}
                        rowsPerPage={1000}
                        isFilter={false}
                        isPrint={true}
                        showAddNewButton={false}
                        isPagenation={false}
                        discountData={true}
                        onChangePage={onChangePage}
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-end">
                  <div></div>
                  <div>
                    <p className="m-0 p-0 text-normal">{`Suma be PVM: ${invoice?.totalAmountExclVat?.toFixed(
                      2
                    )}`}</p>
                    <p className="m-0 p-0 text-normal">{`PVM: ${(
                      invoice?.totalAmountExclVat * 0.21
                    )?.toFixed(2)}`}</p>
                    <p className="m-0 p-0 text-normal">{`Bendra suma su PVM: ${(
                      invoice?.totalAmountExclVat * 1.21
                    )?.toFixed(2)}`}</p>
                  </div>
                </div>
                <br />
                <div>
                  <p className="m-0 p-0 text-normal">{`Sąskaitą išrašė: ${createdByData}`}</p>
                </div>
                <br />
                <Heading fontWeight="bold" fontSize="sm3">
                  {
                    "Gavėjas: _______________________________________________________________"
                  }
                </Heading>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default PrintComponentContent;
