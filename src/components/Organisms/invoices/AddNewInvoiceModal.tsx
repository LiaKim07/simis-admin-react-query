import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';

import { employeeStore } from '../../../store/employees.store';
import { serviceOrder } from '../../../store/service-order.store';
import { servicesStore } from '../../../store/services.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
// import { invoiceDetailsStore } from '../../../store/invoice-details.store';
import { invoiceStore } from '../../../store/invoice.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { productStore } from '../../../store/products.store';
import { companyStore } from '../../../store/company.store';
import { projectsStore } from '../../../store/projects.store';

import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import TableService from '../tables/TableInvoiceService';
import TableServiceProduct from '../tables/TableInvoiceProduct';
import TableServiceSale from '../tables/TableInvoiceSale';
import SuccessModal from "../Modals/SuccessModal";
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../types';
// import CustomSelect from '../../Atoms/Form/Select';

interface IModalProps extends ModalProps {
    orderData?: string;
    isUpdating?: boolean;
    idData?: any;
    idLoan?: any;
    setData?: any;
    setSale?: any;
    setLoan?: any;
    idSale?: any;
    modalOpen?: any;
    handleSuccess: () => void;
}
const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "invoiceNumber": "",
    "customerId": "",
    "projectId": "",
    "companyId": "",
    "invoicePeriodFrom": new Date().toJSON().slice(0, 10),
    "invoicePeriodTo": "",
    "dueOn": new Date().toJSON().slice(0, 10),
    "isPayed": false,
    "isDelayed": false,
    "note": "",
    "selectedProjectOrderIds": [],
    "discountLoanProducts": 0,
    "discountSaleProducts": 0,
    "discountServices": 0,
    "totalAmountLoanProductsExclVat": 0,
    "totalAmountSaleProductsExclVat": 0,
    "totalAmountServicesExclVat": 0,
    "totalAmountExclVat": 0,
    "createdBy": tokenData,
    "priceIncreaseLoanProducts": 0,
    "priceIncreaseSaleProducts": 0,
    "priceIncreaseServices": 0,
    "includePrices": false,
    "serviceOrderIds": [],
};

export default function AddNewInvoiceModal({
    setShow,
    orderData,
    setData,
    setLoan,
    setSale,
    modalOpen,
    isUpdating = false,
    idData,
    idLoan,
    idSale,
    handleSuccess,
    ...props
}: IModalProps) {
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [discountAmount, setDiscountAmount] = useState<any>(0);
    const [discountAmountProductSale, setDiscountAmountProductSale] = useState<any>(0);
    const [discountAmountProductLoan, setDiscountAmountProductLoan] = useState<any>(0);
    const [discountAmountMark, setDiscountAmountMark] = useState<any>(0);
    const [discountAmountProductSaleMark, setDiscountAmountProductSaleMark] = useState<any>(0);
    const [discountAmountProductLoanMark, setDiscountAmountProductLoanMark] = useState<any>(0);
    // const [type1, setType1] = useState<string>('string');
    const [type2, setType2] = useState<string>('string');
    // const [type3, setType3] = useState<string>('string');

    // const { data: invoiceDetails } = invoiceDetailsStore.getAll();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: serviceOrderS } = serviceOrder.getAll();
    const { data: services } = servicesStore.getAll();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    const { data: products } = productStore.getAll();
    const { data: companyProfile } = companyStore.getAll();
    const { data: projects } = projectsStore.getById(id as string);
    const { mutateAsync } = invoiceStore.create();
    const { data: getWarehouseOrderRentMutation } = warehouseStore.getWarehosueProductOrdersByRentAggregate(idLoan);
    const { data: getWarehouseOrderSaleMutation } = warehouseStore.getCurrentSale(idSale);
    // const { data: warehouseOrderSale } = warehouseStore.getAllWarehosueOrdersSale();
    let tableDataProduct: any = [];
    let tableDataProductLoans: any = [];
    let tableData: any = [];
    let emptyValid: number = 0;

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const onBlurtype2 = (e: any) => {
        if (e.target.value === "") {
            setType2('string')
        }
    }

    const onFocus2 = (e: any) => {
        setType2('date')
    }

    // const onFocus3 = (e: any) => {
    //     setType3('date')
    // }

    getWarehouseOrderRentMutation?.data?.result.map((item: any) => {
        let date: any = new Date(item.startDate);
        let valid: any = '';
        let term: any = '-';
        if (item.endDate?.length > 0) {
            valid = new Date(item.endDate);
            term = (valid - date) / (1000 * 60 * 60 * 24);
        } else if (values.invoicePeriodTo) {
            valid = new Date(values.invoicePeriodTo);
            term = (valid - date) / (1000 * 60 * 60 * 24);
        } else {
            term = '-';
            emptyValid = emptyValid + 1;
        }
        if (!item.endDate) {
            emptyValid = emptyValid + 1;
        }
        let quantityData: number = 0;
        projectOrder?.data?.result.map((projectOrder: any) => {
            if (projectOrder.id === item.projectOrderId) {
                if (projectOrder.isPricePerToneForOneDay) {
                    quantityData = item.totWeght;
                } else if (projectOrder.isPercentOfValueForOneDay) {
                    quantityData = item.totBaseValue;
                } else {
                    quantityData = item.currentRentArea;
                }
            }
        })
        tableDataProductLoans.push({
            'id': item.projectOrderId,
            'Aktor Nr': item.currentProjectOrderNumber,
            'Projektas': projects?.data?.result.name,
            'Adresas': projects?.data?.result.address + ', ' + projects?.data?.result.postalCode + ', ' + projects?.data?.result.city,
            'Pradžia': item.startDate,
            'Pabaiga': item.endDate ? item.endDate : values.invoicePeriodTo,
            'Dienos': term,
            'Kiekis': (quantityData).toFixed(2),
            'Kaina per diena': (item.priceForOneDay).toFixed(2),
            // 'Suma': (item.totPrice).toFixed(2),
            'Suma': term === 0 ? (item.priceForOneDay).toFixed(2) : term < 0 ? 'Neteisinga' : term > 0 ? (item.priceForOneDay * term).toFixed(2) : '-',
            'disAmount': discountAmountProductLoan,
            'disAmountMark': discountAmountProductLoanMark,
        })
    })

    // idSale?.data?.result.map((saleData: any) => {
    // getWarehouseOrderSaleMutation?.data?.result[0]?.map((data: any) => {
    //     // if(saleData ===data.)
    //     tableDataProduct.push({
    //         'id': data.warehouseProductId,
    //         'Aktor Nr': data.currentProjectOrderNumber,
    //         'Prekė': data.productName,
    //         'Numeris': data.productNumber,
    //         'Kiekis': data.quantity,
    //         'Kaina Vnt': Number(data.discountedPrice).toFixed(2),
    //         'Suma': (data.totDiscountedPrice).toFixed(2),
    //         'disAmount': discountAmountProductSale,
    //         'disAmountMark': discountAmountProductSaleMark,
    //     })

    //     // }
    // })
    // // })

    projectOrder?.data?.result.map((projectOrder: any) => {
        idSale?.map((idData: any) => {
            if (projectOrder.id === idData) {
                warehouseOrder?.data?.result.map((wrehouseProductOrder: any) => {
                    if (wrehouseProductOrder.projectOrderId === projectOrder.id) {
                        warehouseProduct?.data?.result?.map((warehouseProduct: any) => {
                            if (wrehouseProductOrder.warehouseProductId === warehouseProduct.id) {
                                products?.data?.result?.map((product: any) => {
                                    if (product.id === warehouseProduct.productId) {
                                        tableDataProduct.push({
                                            'id': warehouseProduct.id,
                                            'Aktor Nr': projectOrder.number,
                                            'Prekė': product.name,
                                            'Numeris': product.number,
                                            'Kiekis': wrehouseProductOrder.quantity,
                                            'Kaina Vnt': Number(wrehouseProductOrder.discountedPrice).toFixed(2),
                                            'Suma': (wrehouseProductOrder.quantity * wrehouseProductOrder.discountedPrice).toFixed(2),
                                            'disAmount': discountAmountProductSale,
                                            'disAmountMark': discountAmountProductSaleMark,
                                        })
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
        // if (projectOrder.id === id) {

        // }
    })

    idData.map((idDatas: any) => {
        serviceOrderS?.data?.result.map((serviceOrder: any) => {
            if (serviceOrder.projectId === id && serviceOrder.projectOrderId === idDatas) {
                let projectOrderNumber: string = '', serviceName: string = '', serviceUnit: string = '';
                projectOrder?.data?.result.map((projectOrders: any) => {
                    if (projectOrders.id === serviceOrder.projectOrderId) {
                        projectOrderNumber = projectOrders.number;
                    }
                })
                services?.data?.result.map((services: any) => {
                    if (services.id === serviceOrder.serviceId) {
                        serviceName = services.name;
                        serviceUnit = services.unit;
                    }
                })
                tableData.push({
                    'id': serviceOrder.id,
                    'Aktor Nr': projectOrderNumber,
                    'Pradžia': serviceOrder.startOn,
                    'Adresas': projects?.data?.result.address + ', ' + projects?.data?.result.postalCode + ', ' + projects?.data?.result.city,
                    // 'Invoice (to)': '2022.05.05',
                    'Projektas': projects?.data?.result.name,
                    'Paslauga': serviceName,
                    'Matavimo Vnt': serviceUnit,
                    'Kiekis': serviceOrder.quantity,
                    'Kaina': serviceOrder.discountedUnitPrice,
                    'Discount': 0,
                    // 'Period': 5,
                    'Suma': serviceOrder.totPrice,
                    'disAmount': discountAmount,
                    'disAmountMark': discountAmountMark,
                })
            }
        })
    })

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleSubmit = async () => {
        let amount: number = 0;
        let amountLoan: number = 0;
        let amountService: number = 0;
        let isNanLoan: boolean = false;
        tableDataProduct?.map((item: any) => {
            if (!isNaN(Number((item['Suma'])))) {
                amount = amount + Number(item['Suma']);
            }
        })
        tableDataProductLoans?.map((item: any) => {
            if (!isNaN(Number((item['Suma'])))) {
                amountLoan = amountLoan + Number(item['Suma']);
            } else {
                isNanLoan = true;
            }
        })
        tableData?.map((item: any) => {
            if (!isNaN(Number((item['Suma'])))) {
                amountService = amountService + Number(item['Suma']);
            }
        })

        let submitData = {
            ...values,
            'selectedProjectOrderIds': idData,
            "projectId": id,
            "discountSaleProducts": discountAmountProductSale,
            "discountLoanProducts": discountAmountProductLoan,
            "discountServices": discountAmount,
            "totalAmountLoanProductsExclVat": Number(amountLoan.toFixed(2)),
            "totalAmountSaleProductsExclVat": Number(amount.toFixed(2)),
            "totalAmountServicesExclVat": Number(amountService.toFixed(2)),
            "totalAmountExclVat": Number((amount + amountLoan + amountService).toFixed(2)),
            "priceIncreaseLoanProducts": discountAmountProductLoanMark,
            "priceIncreaseSaleProducts": discountAmountProductSaleMark,
            "priceIncreaseServices": discountAmountMark,
            "companyId": companyProfile?.data?.result.id,
            "customerId": projects?.data?.result.customerId
        }

        const toastId = toast.loading('Saving ....');
        if (isNanLoan) {
            toast.error('Neteisingi duomenys', {
                id: toastId,
            });
        } else {
            mutateAsync(submitData, {
                async onSuccess(_data) {
                    toast.success('Employee was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['invoice']);
                    queryClient.invalidateQueries(['project-uninvoiced-ordersById', id]);
                    modalOpen(false);
                    setData([]);
                    setLoan([]);
                    setSale([]);
                    idData = [];
                    idLoan = [];
                    idSale = [];
                    closeModal();
                    resetForm();
                    handleSuccess();
                },
                onError(error: any) {
                    toast.error(error.response.data.message || 'error occurred please try again', {
                        id: toastId,
                    });
                },
            });
        }
    };

    const resetForm = () => {
        setvalues({});
    };

    const handleCancel = () => {
        queryClient.invalidateQueries(['invoice']);
        queryClient.invalidateQueries(['project-uninvoiced-ordersById', id]);
        resetForm();
        closeModal();
    };

    const onChangePage = (_page: number) => {
        return {};
    };

    const onChangeInputProduct = (e: any) => {
        setvalues({ ...values, discountProducts: Number(e) });
        setDiscountAmountProductLoan(Number(e));
    };

    const onChangeInputProductMarkUp = (e: any) => {
        setvalues({ ...values, priceIncreaseLoanProducts: Number(e) });
        setDiscountAmountProductLoanMark(Number(e));
    };

    const onChangeInputProductSale = (e: any) => {
        setvalues({ ...values, discountProducts: Number(e) });
        setDiscountAmountProductSale(Number(e));
    };

    const onChangeInputProductSaleMarkUp = (e: any) => {
        setvalues({ ...values, priceIncreaseSaleProducts: Number(e) });
        setDiscountAmountProductSaleMark(Number(e));
    };

    const onChangeInputService = (e: any) => {
        setvalues({ ...values, discountServices: Number(e) });
        setDiscountAmount(Number(e));
    };

    const onChangeInputServiceMarkUp = (e: any) => {
        setvalues({ ...values, priceIncreaseServices: Number(e) });
        setDiscountAmountMark(Number(e));
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Invoice' : 'Generuoti sąskaitą'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Uždaryti
                            </span>
                            <img
                                src={'/icons/close-icon.svg'}
                                className="cursor-pointer"
                                width={30}
                                alt="close-icon"
                            />
                        </button>
                    </div>
                    <div className="body-content px-4 modal-border">

                        <Collapsible isOpen={true} title="Sąskaitos informacija">
                            <div className="p-3 row">
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        name="invoicePeriodFrom"
                                        handleChange={handleChange}
                                        placeholder="Date from"
                                        value={values.invoicePeriodFrom}
                                    />
                                </div> */}

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        name="invoicePeriodTo"
                                        // type={emptyValid === 0 ? 'string' : type2}
                                        type={type2}
                                        // disabled={emptyValid === 0 ? true : false}
                                        onFocus={onFocus2}
                                        onBlur={onBlurtype2}
                                        handleChange={handleChange}
                                        placeholder="Sąskaita iki *"
                                        value={values.invoicePeriodTo}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        name="dueOn"
                                        type={type3}
                                        onFocus={onFocus3}
                                        onBlur={onBlurtype3}
                                        handleChange={handleChange}
                                        placeholder="Payment terms"
                                        value={values.dueOn}
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChangeString}
                                        placeholder="Description:"
                                        value={values.note}
                                    />
                                </div>
                            </div>
                        </Collapsible>

                        {
                            tableDataProduct.length !== 0 &&
                            <Collapsible isOpen={true} title="Produktų pardavimas">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <TableServiceSale
                                                data={tableDataProduct || []}
                                                uniqueCol="id"
                                                rowsPerPage={1000}
                                                hide={['id', 'disAmount', 'disAmountMark']}
                                                actions={[]}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                                onChangeInput={onChangeInputProductSale}
                                                onChangeInputMarkUp={onChangeInputProductSaleMarkUp}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        }
                        {
                            tableDataProductLoans.length !== 0 &&
                            <Collapsible isOpen={true} title="Nuoma">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <TableServiceProduct
                                                data={tableDataProductLoans || []}
                                                uniqueCol="id"
                                                rowsPerPage={1000}
                                                hide={['id', 'disAmount', 'disAmountMark']}
                                                actions={[]}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                                onChangeInput={onChangeInputProduct}
                                                onChangeInputMarkUp={onChangeInputProductMarkUp}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        }
                        {
                            tableData.length !== 0 &&
                            <Collapsible isOpen={true} title="Paslaugos">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <TableService
                                                data={tableData || []}
                                                uniqueCol="id"
                                                rowsPerPage={1000}
                                                hide={['id', 'Discount', 'disAmount', 'disAmountMark']}
                                                actions={[]}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                                onChangeInput={onChangeInputService}
                                                onChangeInputMarkUp={onChangeInputServiceMarkUp}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        }
                    </div>
                    <div className="body-modal-footer row px-4 my-4 justify-content-end">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Išsaugoti</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                                Atšaukti
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <SuccessModal
                isUpdate={true}
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
            />
        </div>
    );
}
