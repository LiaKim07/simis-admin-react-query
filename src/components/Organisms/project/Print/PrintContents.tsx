import React, { useRef, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";

import { ValueType } from '../../../../types';
import { ModalProps } from '../../../../types/props';
import Heading from '../../../Atoms/Heading';
import Icon from '../../../Atoms/Icon';
import Button from '../../../Molecules/Button/Button';
import Br from '../../../Atoms/Form/Br';
import TableAttachments from '../../../Organisms/tables/TableProjectAttachments';
import TableTransfer from '../../../Organisms/tables/PrintTableTransferAct';
import SubTable from '../../../Organisms/tables/subTableRentProduct';
import SubTableReturn from '../../../Organisms/tables/SubTableReturn';
import SubTable1 from '../../../Organisms/tables/OrderServiceTable';


import { projectsOrdersStore } from '../../../../store/project-orders.store';
import { projectsStore } from '../../../../store/projects.store';
import { clientsStore } from '../../../../store/clients.store';
import { vehiclesStore } from '../../../../store/vehicles.store';
import { employeeStore } from '../../../../store/employees.store';
import { productStore } from '../../../../store/products.store';
import { warehouseStore } from '../../../../store/warehouse.store';
import { serviceOrder } from '../../../../store/service-order.store';
import { servicesStore } from '../../../../store/services.store';
import { customerContacts } from '../../../../store/customer-contacts.store';
import { customerAgreements } from '../../../../store/cutomer-agreement.store';
import { companyContacts } from '../../../../store/company-contacts.store';
import { userStore } from '../../../../store/user.store';
import { companyStore } from '../../../../store/company.store';
interface IModalProps extends ModalProps {
    show?: boolean;
    projectOrder?: any;
    data?: any;
    subdata?: any;
    isupdate?: boolean;
    handleSuccess?: () => void;
}
const PrintContent = React.forwardRef(({
    setShow,
    show,
    projectOrder,
    subdata,
    data,
    isupdate = false,
    handleSuccess,
    ...props
}: IModalProps,
    ref?: any,) => {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    const { data: projectData } = projectsStore.getById(id as string);
    const { data: projectOrderData } = projectsOrdersStore.getById(projectOrder.id as string);
    const { data: projectOrderReturnData } = projectsOrdersStore.getAllProjectReturn();
    const { data: customerData } = clientsStore.getAll();
    const { data: vehiclesData } = vehiclesStore.getAll();
    const { data: employeeData } = employeeStore.getAll();
    const { data: productData } = productStore.getAll();

    const { data: productOrders } = productStore.getAll();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: warehouseOrderData } = warehouseStore.getAllWarehosueOrders();
    const { data: serviceOrders } = serviceOrder.getAll();
    const { data: service } = servicesStore.getAll();
    const { data: customerContractData } = customerContacts.getAll();
    const { data: customerAgreementData } = customerAgreements.getAll();
    const { data: warehouseOrderByProjectORderIdRent } = warehouseStore.getWarehosueProductOrdersByProjectOrderIdRent(projectOrder.id as string);
    const { data: RentAggregate } = warehouseStore.getWarehosueProductOrdersRentAggregate(projectOrder.id as string);
    const { data: companyContracts } = companyContacts.getAll();
    const { data: companyProfile } = companyStore.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
    const { data: RentCurrentAggregate } = warehouseStore.getWarehosueProductOrdersByRentAggregate([projectOrder.id]);

    let mangerData: string = '';
    let customerName: string = '';
    let vehiclePlateNumber: string = '';
    let vehicleName: string = '';
    let employeeName: string = '';
    let quantity = 0;
    let tableData: any = [];
    let customer: string = '';
    let customerPhone: string = '';
    let tableReturn: any = [];
    let returnData: any = {};
    let employeesName: string = '';
    let transferTableData: any = [];
    let customerNote: string = '';
    let customerPrefix: string = '';
    let customerNumber: string = '';
    let customerPosition: string = '';
    let customerReturnOrderNote: string = '';
    let customerNoteForAgreementAnnex: string = '';
    let customerAgreementDatas: any = {};
    let amountData: number = 0;
    let unit: string = '', text: string = '', totalPrice: number = 0;

    if (projectOrderData?.data?.result.isPricePerToneForOneDay) {
        unit = 'Kg';
        text = 'Procentas nuo vertė per 30 d';
        totalPrice = RentCurrentAggregate?.data?.result[0].totPrice;
    } else if (projectOrderData?.data?.result.isPercentOfValueForOneDay) {
        unit = 'Є';
        text = 'Kaina už toną per 30 d';
        totalPrice = RentCurrentAggregate?.data?.result[0].totWeght;
    } else {
        unit = 'M2';
        text = 'VIENO KVADRATINIO METRO KAINA LAIKOTARPIUI:';
        totalPrice = RentCurrentAggregate?.data?.result[0].currentRentArea;
    }

    projectOrderReturnData?.data?.result.map((item: any) => {
        if (item.id === projectOrder.id && item.projectId === id) {
            returnData = item;
        }
    })

    let createdByData: string = '';
    if (tokenData === "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        createdByData = "Sistemos administratorius";
    } else {
        companyContracts?.data?.result.map((item: any) => {
            if (item.id === userData?.data?.data?.result.companyContactId) {
                createdByData = item.firstName + ' ' + item.lastName;
            }
        })
    }

    customerData?.data?.result.map((item: any) => {
        if (projectData?.data?.result.customerId === item.id && projectOrderData?.data?.result.projectId === id) {
            mangerData = item.managerId;
            customerName = item.name;
            customerNote = item.note;
            customerPrefix = item.companyTypePrefix;
            customerNumber = item.name;
            customerReturnOrderNote = item.noteForReturnOrders;
            customerNoteForAgreementAnnex = item.noteForAgreementAnnex;
        }
    })

    customerContractData?.data?.result.map((item: any) => {
        if (projectData?.data?.result.customerContactId === item.id)
            customer = item.firstName + " " + item.lastName; {
            customerPhone = item.phone;
            customerPosition = item.position;
        }
    })

    customerAgreementData?.data?.result.map((item: any) => {
        if (projectData?.data?.result.customerId === item.customerId) {
            customerAgreementDatas = item;
        }
    })

    vehiclesData?.data?.result.map((item: any) => {
        if (projectOrderData?.data?.result.vehicleId === item.id) {
            employeeData?.data?.result.map((employee: any) => {
                if (item.employeeId === employee.id) {
                    employeesName = employee.firstName + ' ' + employee.lastName;
                }
            })
            vehicleName = item.name;
            vehiclePlateNumber = item.plateNumber;
        }
    })

    employeeData?.data?.result.map((item: any) => {
        if (projectData?.data?.result.employeeId === item.id) {
            employeeName = item.firstName + ' ' + item.lastName;
        }
    })

    warehouseOrderData?.data?.result.map((item: any) => {
        if (projectOrderData?.data?.result.id === item.projectOrderId) {
            warehouseProducts?.data?.result.map((warehouserProduct: any) => {
                if (warehouserProduct.id === item.warehouseProductId) {
                    productData?.data?.result.map((product: any) => {
                        if (product.id === warehouserProduct.productId) {
                            transferTableData.push({
                                'id': product.id,
                                'Kodas': product.number,
                                'Pavadinimas': product.name,
                                'Kiekis': item.quantity,
                                'Svoris kg': product.weight,
                                'Viso kg': product.weight * item.quantity,
                                'Vnt vertė €': warehouserProduct.price,
                                'Viso vertė € be pvm': warehouserProduct.price * item.quantity,
                            })
                        }
                    })
                }
            })
            quantity = item.quantity;
        }
    })

    productData?.data?.result.map((item: any) => {
        tableData.push({
            'id': item.id,
            'Code': item.number,
            'Product name': item.name,
            'Quantity': quantity,
            'Wight (kg)': item.weight,
            'Total (kg)': 1816,
            'Psc value': projectOrderData?.data?.result.rentUnitPrice,
            'Total': projectOrderData?.data?.result.totalRentPriceForOneDay,
        })

        let quantityData = 0;
        warehouseOrderData?.data?.result.map((warehosue: any) => {
            if (warehosue.projectOrderId === projectOrder.id) {
                quantityData = warehosue.quantity;
            }
        })
    })


    let tablemockData: any = [];
    let tablemockDataService: any = [];
    if (warehouseOrderData) {
        warehouseOrderData?.data?.result.map((warehouseOrderData: any) => {
            if (id === warehouseOrderData.projectId && warehouseOrderData.projectOrderId === projectOrder.id) {
                warehouseProducts?.data?.result.map((warehouseProductData: any) => {
                    if (warehouseOrderData.warehouseProductId === warehouseProductData.id) {
                        let orderName = '';
                        let unitData = '';
                        if (projectOrderData?.data?.result.id === warehouseOrderData.projectOrderId) {
                            if (warehouseProductData.id === warehouseOrderData.warehouseProductId) {
                                productData?.data?.result?.map((product: any) => {
                                    if (product.id === warehouseProductData.productId) {
                                        orderName = product.name;
                                    }
                                })
                            }
                        }

                        productOrders?.data?.result.map((item: any) => {
                            if (warehouseProductData.productId === item.id) {
                                if (item.unit) {
                                    unitData = item.unit;
                                } else {
                                    unitData = 'vnt';
                                }
                            }
                        })
                    }
                })
            }
        })
    }

    warehouseOrderByProjectORderIdRent?.data?.result.map((item: any) => {
        tableReturn.push({
            'Kodas': item.productNumber,
            'Pavadinimas': item.productName,
            'Mato Vnt': 'vnt',
            'Kiekis': item.quantity + item.aggregatedQuantity,
            'Priimtas kiekis': item.quantity,
            'Liko Kiekis': item.aggregatedQuantity,
            'Remonto kaina': item.repairCost,
            'Pastaba': item.note,
        })

        tablemockData.push({
            'Kodas': item.productNumber,
            'Pavadinimas': item.productName,
            'Matavimo Vnt': 'vnt',
            'Kiekis': item.aggregatedQuantity,
            '1 psc Rent (Є/d)': Number(item.rentPriceForOneDay).toFixed(2),
            'Visų kaina dienai': Number(item.totRentPriceForOneDay).toFixed(2),
            'Vnt Vertė': item.weight,
        })
        amountData = amountData + item.totRentPriceForOneDay;
    })

    if (serviceOrders) {
        serviceOrders?.data?.result.map((serviceOrderData: any) => {
            if (id === serviceOrderData.projectId) {
                let serviceName: string = '';
                let unitData: string = '';
                let basePrice: number = 0;
                service?.data?.result.map((item: any) => {
                    if (serviceOrderData.serviceId === item.id) {
                        serviceName = item.name;
                        unitData = item.unit;
                        basePrice = item.basePrice;
                    }
                })
                tablemockDataService.push({
                    'Kodas': serviceOrderData.number,
                    'Pavadinimas': serviceName,
                    'Kiekis': serviceOrderData.quantity,
                    'Matavimo Vnt': unitData,
                    'Pradžia': serviceOrderData.startOn,
                    'Vertė 1 produkto': basePrice,
                    'Vertė': serviceOrderData.discountedUnitPrice,
                    'Viso': serviceOrderData.totPrice,
                })

            }
        })
    }

    let spiltName = projectOrderData?.data?.result.number.split("-")
    let returnSplitName = returnData?.number?.split("-")
    // let amountData: number = 0;
    // tablemockData?.map((item: any) => {
    //     amountData = amountData + Number(item['Rental price for all elements']);
    // })
    // amountData = amountData * projectOrderData?.data?.result.rentLengthInDays;

    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="bg-gray-200 p-6" ref={ref}>
            {show &&
                <div className="body-content px-4 modal-border print-page" >
                    {
                        data.includes("Perdavimo aktas") ?
                            <>
                                <div className="row text-center">
                                    <div className="col-sm-12 col-4 col-md-4">
                                        <img
                                            src={"/assets/images/simis-logo.png"}
                                            width={185}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-4 col-md-4 text-start">
                                        <p className='m-0 p-0 text-normal'>{"Nuomotojas: "}<span className='fw-bold'>{` UAB SIMIS`}</span></p>
                                        <p className='m-0 p-0 text-normal'>{"Nuomininkas: "}<span className='fw-bold'>{` ${customerName}`}</span></p>
                                        <p className='m-0 p-0 text-normal'>{"Objektas:"}<span className='fw-bold'>{` ${projectData?.data?.result?.name}, ${projectData?.data?.result?.address}, ${projectData?.data?.result?.city}`}</span></p>
                                        <p className='m-0 p-0 text-normal'>{"Atsakingas asmo"}<span className='fw-bold'>{` ${customer}`}</span></p>
                                        <p className='m-0 p-0 text-normal'>{"Telefono numeris"}<span className='fw-bold'>{` ${customerPhone}`}</span></p>
                                    </div>

                                    <div className="col-sm-12 col-4 col-md-4">
                                        <Heading fontWeight="bold" fontSize="sm3">
                                            {projectOrderData?.data?.result?.createdOn}
                                        </Heading>
                                        <p className='m-0 p-0 text-normal'>{` `}</p>
                                        <p className='m-0 p-0 text-normal'>{` `}</p>
                                        <p className='m-0 p-0 text-normal'>{`Klaipėda`}</p>
                                    </div>
                                </div>
                                <br />
                                <div className='text-center'>
                                    <Heading fontWeight="bold" fontSize="xl3">
                                        {/* {`Transmission Act ${projectData?.data?.result.number}`} */}
                                        {spiltName?.length > 0 && ` Perdavimo Akto Nr. ${spiltName[0]}-${spiltName[1]}-${Number(spiltName[2])}`}
                                    </Heading>
                                </div>
                                <br />
                                {
                                    transferTableData.length !== 0 &&
                                    <TableTransfer
                                        data={transferTableData || []}
                                        uniqueCol="id"
                                        isFilter={false}
                                        rowsPerPage={10000}
                                        isPagenation={false}
                                        showAddNewButton={false}
                                        isPrint={true}
                                        hide={['id', 'imageUrl']}
                                        handleClickRow={() => console.log('')}
                                        onChangePage={onChangePage}
                                    />
                                }
                                <br />
                                <p className=' text-normal'>
                                    {customerNoteForAgreementAnnex}
                                </p>
                                <br />
                                <div className='text-center'>
                                    <Heading fontWeight="bold" fontSize="xl3">
                                        {'ŠALIŲ REKVIZITAI IR PARAŠAI'}
                                    </Heading>
                                </div>
                                <div className='row d-flex justify-content-between'>
                                    <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontWeight="bold" fontSize="sm3">
                                                {'NUOMOTOJAS:(Pardavėjas)'}
                                            </Heading>
                                        </div>
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontWeight="bold" fontSize="sm3">
                                                {'UAB SIMIS'}
                                            </Heading>
                                        </div>
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontSize="sm3">
                                                {`Inžinierius ${createdByData}`}
                                            </Heading>
                                        </div>
                                        <div className='d-flex'>
                                            <Heading fontSize="sm3">
                                                {'A.V.'}
                                            </Heading>
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontWeight="bold" fontSize="sm3">
                                                {'PIrkėjas (Klientas):'}
                                            </Heading>
                                        </div>
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontWeight="bold" fontSize="sm3">
                                                {`${customerPrefix} ${customerNumber}`}
                                            </Heading>
                                        </div>
                                        <div className='d-flex textfield-underline'>
                                            <Heading fontSize="sm3">
                                                {`${customerPosition}, ${customer}`}
                                            </Heading>
                                        </div>
                                        <div className='d-flex'>
                                            <Heading fontSize="sm3">
                                                {'A.V.'}
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </> : data.includes("Sutarties priedas") ?
                                <>
                                    <div className="row text-center">
                                        <div className="col-sm-12 col-4 col-md-4">
                                            <img
                                                src={"/assets/images/simis-logo.png"}
                                                width={185}
                                                alt="Logo"
                                            />
                                        </div>

                                        <div className="col-sm-12 col-4 col-md-4 text-start">
                                            <p className='m-0 p-0 text-normal'>{"Nuomotojas: "}<span className='fw-bold'>{` UAB SIMIS`}</span></p>
                                            <p className='m-0 p-0 text-normal'>{"Nuomininkas: "}<span className='fw-bold'>{` ${customerName}`}</span></p>
                                            <p className='m-0 p-0 text-normal'>{"Objektas:"}<span className='fw-bold'>{` ${projectData?.data?.result?.name}, ${projectData?.data?.result?.address}, ${projectData?.data?.result?.city}`}</span></p>
                                            <p className='m-0 p-0 text-normal'>{"Atsakingas asmo"}<span className='fw-bold'>{` ${customer}`}</span></p>
                                            <p className='m-0 p-0 text-normal'>{"Telefono numeris"}<span className='fw-bold'>{` ${customerPhone}`}</span></p>
                                        </div>

                                        <div className="col-sm-12 col-4 col-md-4">
                                            <Heading fontWeight="bold" fontSize="sm3">
                                                {projectOrderData?.data?.result?.createdOn}
                                            </Heading>
                                            <p className='m-0 p-0 text-normal'>{` `}</p>
                                            <p className='m-0 p-0 text-normal'>{` `}</p>
                                            <p className='m-0 p-0 text-normal'>{`Klaipėda`}</p>
                                        </div>
                                    </div>
                                    <Br />
                                    <div className='text-center'>
                                        <Heading fontWeight="bold" fontSize="xl3">
                                            {/* {`Equipment Rental contract attachment ${projectData?.data?.result.number}`} */}
                                            {`ĮRANGOS NUOMOS SUTARTIES PRIEDAS Nr. ${(projectOrderData?.data?.result.number.split("-")[0]) + '-' + (projectOrderData?.data?.result.number.split("-")[1]) + '-' + (Number(projectOrderData?.data?.result.number.split("-")[2]) + 1)} `}
                                            <span className='fw-normal'>{` prie sutarties Nr. ${customerAgreementDatas.prefix} ${customerAgreementDatas.number}`}</span>
                                        </Heading>
                                    </div>
                                    <Br />
                                    {
                                        tablemockData.length !== 0 &&
                                        <SubTable
                                            data={tablemockData || []}
                                            uniqueCol="id"
                                            isFilter={false}
                                            isPrint={true}
                                            rowsPerPage={10000}
                                            isPagenation={false}
                                            showAddNewButton={false}
                                            hide={['id', 'imageUrl']}
                                            handleClickRow={() => console.log('')}
                                            onChangePage={onChangePage}
                                        />
                                    }
                                    <br />
                                    {
                                        tablemockDataService.length !== 0 &&
                                        <SubTable1
                                            data={tablemockDataService || []}
                                            showAddNewButton={false}
                                            isFilter={false}
                                            isPrint={true}
                                            rowsPerPage={10000}
                                            isPagenation={false}
                                            uniqueCol="id"
                                            hide={['id', 'Vertė 1 produkto']}
                                            handleClickRow={() => console.log('')}
                                            onChangePage={onChangePage}
                                        />
                                    }
                                    <br />
                                    <div className='row pb-0'>
                                        {/* <div className="col-5 col-sm-5 col-md-6 col-lg-5 p-2"> */}
                                        <p className='m-0 ps-2 text-xxs'>{"SUTARTIES OBJEKTAS: "}</p>
                                        {/* </div> */}
                                        <div className="col-5 col-sm-5 col-md-6 col-lg-5 p-2">
                                            <p className='m-0 p-0 text-xxs'>{`BENDRAS NUOMOJAMAS KIEKIS (${unit} ): `}</p>
                                            <p className='m-0 p-0 text-xxs'>{`${text}`}</p>
                                            <p className='m-0 p-0 text-xxs'>{"MINIMALUS KOMPLEKTO NUOMOS LAIKOTARPIS: "}</p>
                                            {
                                                projectOrderData?.data?.result.projectLengthInDays !== 0 &&
                                                <p className='m-0 p-0 text-xxs'>{"Kainos galiojimo terminas: "}</p>
                                            }
                                        </div>

                                        <div className="col-5 col-sm-5 col-md-6 col-lg-5 p-2 pb-0">
                                            <p className='m-0 p-0 text-xxs'>{`${(totalPrice)?.toFixed(2)} ${unit} `}</p>
                                            <p className='m-0 p-0 text-xxs'>{`${amountData.toFixed(2)} € be PVM `}</p>
                                            <p className='m-0 p-0 text-xxs'>{`${(projectOrderData?.data?.result.rentLengthInDays.toFixed(2))} d`}</p>
                                            {
                                                projectOrderData?.data?.result.projectLengthInDays !== 0 &&
                                                <p className='m-0 p-0 text-xxs'>{`${(projectOrderData?.data?.result.projectLengthInDays.toFixed(2))} d`}</p>
                                            }
                                        </div>
                                        {projectOrderData?.data?.result?.vehicleId && (
                                            <>
                                                <div className="col-5 col-md-5 ps-2">
                                                    <p className='m-0 p-0 text-xxs'>{"TRANSPORTAVIMAS: "}</p>
                                                </div>
                                                <div className="col-7 col-md-7 ps-2">
                                                    <p className='m-0 p-0 text-xxs'>{` ${employeesName}, automobiliu: ${vehicleName}, valst. nr.: ${vehiclePlateNumber}`}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <p className='m-0 p-0 text-xxs'>
                                        {projectOrderData?.data?.result.note}
                                    </p>
                                    <p className='m-0 p-0 text-xxs'>
                                        {/* {customerNote} */}
                                        {companyProfile?.data?.result?.agreementNote}
                                    </p>
                                    {/* <br /> */}
                                    <div className='text-center'>
                                        <Heading fontWeight="bold" fontSize="xl3">
                                            {'ŠALIŲ REKVIZITAI IR PARAŠAI:'}
                                        </Heading>
                                    </div>
                                    <div className='row d-flex justify-content-between'>
                                        <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontWeight="bold" fontSize="sm3">
                                                    {'NUOMOTOJAS:(Pardavėjas)'}
                                                </Heading>
                                            </div>
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontWeight="bold" fontSize="sm3">
                                                    {'UAB SIMIS'}
                                                </Heading>
                                            </div>
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontSize="sm3">
                                                    {`Inžinierius ${createdByData}`}
                                                </Heading>
                                            </div>
                                            <div className='d-flex'>
                                                <Heading fontSize="sm3">
                                                    {'A.V.'}
                                                </Heading>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontWeight="bold" fontSize="sm3">
                                                    {'NUOMININKAS:(Pirkėjas)'}
                                                </Heading>
                                            </div>
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontWeight="bold" fontSize="sm3">
                                                    {`${customerPrefix} ${customerNumber}`}
                                                </Heading>
                                            </div>
                                            <div className='d-flex textfield-underline'>
                                                <Heading fontSize="sm3">
                                                    {`${customerPosition}, ${customer}`}
                                                </Heading>
                                            </div>
                                            <div className='d-flex'>
                                                <Heading fontSize="sm3">
                                                    {'A.V.'}
                                                </Heading>
                                            </div>
                                        </div>
                                    </div>
                                </> : data.includes("Grąžinimo aktas") ?
                                    <>
                                        <div className="row text-center">
                                            <div className="col-sm-12 col-4 col-md-4">
                                                <img
                                                    src={"/assets/images/simis-logo.png"}
                                                    width={185}
                                                    alt="Logo"
                                                />
                                            </div>

                                            <div className="col-sm-12 col-4 col-md-4 text-start">
                                                <p className='m-0 p-0 text-normal'>{"Nuomotojas: "}<span className='fw-bold'>{` UAB SIMIS`}</span></p>
                                                <p className='m-0 p-0 text-normal'>{"Nuomininkas: "}<span className='fw-bold'>{` ${customerName}`}</span></p>
                                                <p className='m-0 p-0 text-normal'>{"Objektas:"}<span className='fw-bold'>{` ${projectData?.data?.result?.name}, ${projectData?.data?.result?.address}, ${projectData?.data?.result?.city}`}</span></p>
                                                <p className='m-0 p-0 text-normal'>{"Atsakingas asmo"}<span className='fw-bold'>{` ${customer}`}</span></p>
                                                <p className='m-0 p-0 text-normal'>{"Telefono numeris"}<span className='fw-bold'>{` ${customerPhone}`}</span></p>
                                            </div>

                                            <div className="col-sm-12 col-4 col-md-4">
                                                <Heading fontWeight="bold" fontSize="sm3">
                                                    {projectOrderData?.data?.result?.createdOn}
                                                </Heading>
                                                <p className='m-0 p-0 text-normal'>{` `}</p>
                                                <p className='m-0 p-0 text-normal'>{` `}</p>
                                                <p className='m-0 p-0 text-normal'>{`Klaipėda`}</p>
                                            </div>
                                        </div>
                                        <br />
                                        <div className='text-center'>
                                            <Heading fontWeight="bold" fontSize="xl3">
                                                {spiltName?.length > 0 && `Įrangos grąžinimo aktas. ${spiltName[0]}-${spiltName[1]}-${Number(spiltName[2])} `}
                                            </Heading>
                                        </div>
                                        <br />
                                        {
                                            tableReturn.length !== 0 &&
                                            <SubTableReturn
                                                data={tableReturn || []}
                                                uniqueCol="id"
                                                isFilter={false}
                                                isPrint={true}
                                                rowsPerPage={10000}
                                                isPagenation={false}
                                                showAddNewButton={false}
                                                hide={['id', 'imageUrl']}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                            />
                                        }
                                        <br />
                                        <p>
                                            {customerReturnOrderNote}
                                        </p>
                                        <Br />
                                        <div className='text-center'>
                                            <Heading fontWeight="bold" fontSize="xl3">
                                                {'ŠALIŲ REKVIZITAI IR PARAŠAI:'}
                                            </Heading>
                                        </div>
                                        <div className='row d-flex justify-content-between'>
                                            <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontWeight="bold" fontSize="sm3">
                                                        {'NUOMOTOJAS:(Pardavėjas)'}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontWeight="bold" fontSize="sm3">
                                                        {'UAB SIMIS'}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontSize="sm3">
                                                        {`Inžinierius ${createdByData}`}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex'>
                                                    <Heading fontSize="sm3">
                                                        {'A.V.'}
                                                    </Heading>
                                                </div>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontWeight="bold" fontSize="sm3">
                                                        {'NUOMININKAS:(Pirkėjas)'}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontWeight="bold" fontSize="sm3">
                                                        {`${customerPrefix} ${customerNumber}`}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex textfield-underline'>
                                                    <Heading fontSize="sm3">
                                                        {`${customerPosition}, ${customer}`}
                                                    </Heading>
                                                </div>
                                                <div className='d-flex'>
                                                    <Heading fontSize="sm3">
                                                        {'A.V.'}
                                                    </Heading>
                                                </div>
                                            </div>
                                        </div>
                                    </> : data.includes("Contract supplement") ?
                                        <>
                                            <div className='text-center'>
                                                <Heading fontWeight="bold" fontSize="xl">
                                                    {`Equipment Rental contract attachment ${projectData?.data?.result.number}`}
                                                </Heading>
                                            </div>
                                            <div className='row d-flex justify-content-center'>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 m-2 p-2 bg-smoth-grey">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="lg">
                                                            {'Owner:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {'UAB SIMS'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="lg">
                                                            {'Client:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {customerName}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="lg">
                                                            {'Object:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {projectData?.data?.result.name}
                                                        </Heading>
                                                    </div>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 m-2 p-2 bg-smoth-grey">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="lg">
                                                            {'Phone:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {'869836393'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="lg">
                                                            {'Date:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {projectData?.data?.result.createdOn}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="lg">
                                                            {'City:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="lg">
                                                            {'Klaipėda'}
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                            <Br />
                                            <Br />
                                            <SubTable
                                                data={tablemockData || []}
                                                uniqueCol="id"
                                                rowsPerPage={10000}
                                                isPagenation={false}
                                                isFilter={false}
                                                showAddNewButton={false}
                                                hide={['id', 'imageUrl']}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                            />
                                            <Br />
                                            <SubTable1
                                                data={tablemockDataService || []}
                                                showAddNewButton={false}
                                                isFilter={false}
                                                rowsPerPage={10000}
                                                isPagenation={false}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                            />
                                            <Br />
                                            <div className='d-flex'>
                                                <Heading fontSize="sm" className='col-6 col-sm-6 col-md-6 col-lg-4'>
                                                    {'Transport'}
                                                </Heading>
                                                <Heading fontWeight="bold" fontSize="sm" className='col-6 col-sm-6 col-md-6 col-lg-8'>
                                                    {` ${employeeName}, automobiliu: ${vehicleName}, valst. nr.:  ${vehiclePlateNumber}`}
                                                </Heading>
                                            </div>
                                            <Br />
                                            <div className='row d-flex'>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-12">
                                                    <div className='d-flex'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'Object fo the contract:'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'Bendras naudojamas kiekis (m2): '}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {` ${projectOrderData?.data?.result.rentArea} m2`}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'Vieno kvadratinio metro kaina laikotarpiui:'}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {`${projectOrderData?.data?.result.totalRentPriceForPeriod} Є be PVM`}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'Minimalus komplekto nuomos laikotarpis:  '}
                                                        </Heading>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {`${projectOrderData?.data?.result.rentLengthInDays} d.`}
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                            <Br />
                                            <p>
                                                Notes: Transporto priemonė turi būti bortinė, kad nuomuotojas galėtų pakrauti daigtus paktautuvu  Pastabos: Transporto priemonė turi būti bortinė, kad nuomuotojas galėtų pakrauti daigtus paktautuvu  Transporto priemonė turi būti bortinė, kad nuomuotojas galėtų pakrauti daigtus paktautuvu
                                            </p>
                                            <Br />
                                            <div className='text-center'>
                                                <Heading fontWeight="bold" fontSize="xl">
                                                    {'Requisites and signatures of the Parties'}
                                                </Heading>
                                            </div>
                                            <div className='row d-flex justify-content-between'>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'Owner (seller):'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'UAB SIMIS'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="sm">
                                                            {`Inžinierius ${createdByData}`}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'A.V.'}
                                                        </Heading>
                                                    </div>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'Client (customer):'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {customerName}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="sm">
                                                            {mangerData}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'A.V.'}
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            <div className='text-center'>
                                                <Heading fontWeight="bold" fontSize="xl">
                                                    {`Act of transmission - admission for scaffolds explotation ${projectOrder['Order Name']}`}
                                                </Heading>
                                            </div>
                                            <Br />
                                            <Br />
                                            <Heading fontWeight="bold" fontSize="sm">
                                                {'Statybiniai pastoliai pastatyti pagal pastolių montavimo instrukciją, atitinka saugumo technikos reikalavimus  ir tinkami naudojimui.'}
                                            </Heading>
                                            <Heading fontSize="sm">
                                                Pastolius galima eksplotuoti iki 16m. aukščio, laikanti darbuotojų saugos ir sveikatos norminių aktų reikalavimų dirbant aukštyje ir ant pastolių ir “Saugos ir sveikatos taisyklių statyboje DT-5-00” reikalavimų.
                                            </Heading>
                                            <Br />
                                            <div className='text-center'>
                                                <Heading fontWeight="bold" fontSize="xl">
                                                    {'Requisites and signatures of the Parties'}
                                                </Heading>
                                            </div>
                                            <div className='row d-flex justify-content-between'>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'Owner (seller):'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'UAB SIMIS'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="sm">
                                                            {`Inžinierius ${createdByData}`}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'A.V.'}
                                                        </Heading>
                                                    </div>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-6 col-lg-5 p-2">
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {'Client (customer):'}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontWeight="bold" fontSize="sm">
                                                            {`${projectData?.data?.result.name}`}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex textfield-underline'>
                                                        <Heading fontSize="sm">
                                                            {mangerData}
                                                        </Heading>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <Heading fontSize="sm">
                                                            {'A.V.'}
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                    }
                </div>
            }
        </div>
    );
});

export default PrintContent;
