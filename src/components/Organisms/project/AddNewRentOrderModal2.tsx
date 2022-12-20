import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import { employeeStore } from '../../../store/employees.store';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import SwitchInput from '../../Atoms/Form/SwitchInput';
import SwitchInputCheck from '../../Atoms/Form/SwitchInputCheck';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Textarea from '../../Atoms/Form/Textarea';
import Collapsible from '../../Molecules/Modal/Collapsible';
import AddNewRentOrderModal from "./AddNewRentOrderModal3";
import Table from '../../Organisms/tables/TableProjectModal';
import SubTable from '../../Organisms/tables/TableProjectSubModal';
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import ServiceSubTable from '../../Organisms/tables/TableServiceSubModal';
import SubTableSale from '../../Organisms/tables/TableProjectSaleSubModal';

import { servicesStore } from '../../../store/services.store';
import { serviceCategory } from '../../../store/service-categories.store';
import { serviceSubCategory } from '../../../store/service-subcategories.store';
import { serviceOrder } from '../../../store/service-order.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { productStore } from '../../../store/products.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';

interface IModalProps extends ModalProps {
    vehiclesId?: string;
    idData?: any;
    isUpdating?: boolean;
    additional?: boolean;
    tableType?: string;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultStateProjectInfo: any = {
    "type": "",
    "quantity": "",
    "note": "note",
    "number": "",
    "warehouseProductId": "",
    "projectId": "",
    "projectOrderId": "",
    "basePrice": "",
    "discount": "",
    "discountedPrice": "",
    "rentFactor": "",
    "isCustomRentPrice": false,
    "customUnitRentPriceForOneDay": "",
    "customTotalRentPriceForOneDay": "",
    "unitRentPriceForOneDay": "",
    "totalRentPriceForOneDay": "",
    "createdBy": tokenData,
    "isQuantityContstant": false,
};

const defaultStateOrderInfo: any = {
    "rentUnitPrice": "",
    "rentArea": "",
    "rentLengthInDays": 30,
    "isActive": true,
    "type": "",
    "projectId": "",
    "createdBy": tokenData,
    "totalRentPriceForPeriod": 0,
    "totalRentPriceForOneDay": 0,
    "rentFactor": 0,
    "number": "",
    "vehicleId": "",
    "note": "note",
    "totalBaseRentPriceForPeriod": 0,
    "totalBaseRentPriceForOneDay": 0,
    "isPercentOfValueForOneDay": false,
    "percentOfValueForOneDay": 0,
    "isPricePerToneForOneDay": false,
    "pricePerToneForOneDay": 0,
    "remark": "",
    "projectLengthInDays": 0,
    "activatedOn": null,
};

const defaultState: any = {
    "number": "",
    "serviceId": "",
    "projectId": "",
    "projectOrderId": "",
    "quantity": 0,
    "discount": 0,
    "discountedUnitPrice": 0,
    "totPrice": 0,
    "startOn": new Date().toJSON().slice(0, 10),
    "note": "note",
    "createdBy": tokenData,
};

export default function AddNewRentOrderModal2({
    setShow,
    vehiclesId,
    isUpdating = false,
    handleSuccess,
    additional,
    idData,
    tableType = 'Rent',
    ...props
}: IModalProps) {
    let projectIdDatas = localStorage.getItem('projectId');
    let orderInfo: any = localStorage.getItem('rentOrder-OrderInfo');
    let isUpdateData: any = localStorage.getItem('update');
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [valuesOrderInfo, setValuesOrderInfo] = useState<any>({ ...defaultStateOrderInfo });
    const [valuesProjectInfo, setValuesProjectInfo] = useState<any>({ ...defaultStateProjectInfo });
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const { data: serviceData } = servicesStore.getAll();
    const { data: serviceCatData } = serviceCategory.getAll();
    const { data: serviceSubCatData } = serviceSubCategory.getAll();
    const { data: serviceOrderData } = serviceOrder.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getAll();
    const { data: projectOrdersData } = projectsOrdersStore.getAll();
    const { data: productData } = productStore.getAll();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: producttypeData } = productType.getAll();
    const { data: productgroupData } = productGroup.getAll();
    const { data: warehouseOrdersData } = warehouseStore.getAllWarehosueOrders();
    const { data: projectOrderDatas } = projectsOrdersStore.getById(id as string);

    useEffect(() => {
        let orderInfoData = JSON.parse(orderInfo);
        if (orderInfoData) {
            setValuesOrderInfo(orderInfoData);
        }

        let projectInfo: any = localStorage.getItem('projectInfo');
        let projectInfoData = JSON.parse(projectInfo);
        if (projectInfoData) {
            setValuesProjectInfo(projectInfoData);
        }

        if (tableType === 'Rent') {
            let tableData: any = localStorage.getItem('tableData');
            let tableSubData: any = localStorage.getItem('subTableData');
            if (tableData) {
                setProductMockDataState(JSON.parse(tableData));
            }
            if (tableSubData) {
                setProductSubState(JSON.parse(tableSubData));
            }

        } else if (tableType === 'Sale') {
            let tableData: any = localStorage.getItem('tableData');
            let tableSubData: any = localStorage.getItem('subTableData');
            if (tableData) {
                setProductMockSaleState(JSON.parse(tableData));
            }
            if (tableSubData) {
                setProductSaleSubState(JSON.parse(tableSubData));
            }
        }

    }, [orderInfo, localStorage.getItem('projectInfo')]);

    const { data: projectOrder } = projectsOrdersStore.getAll();

    useEffect(() => {
        projectOrder?.data?.result.map((item: any) => {
            if (additional && idData === item.id) {
                setvalues({
                    ...valuesOrderInfo,
                    type: 'loans',
                    projectId: projectIdDatas,
                    rentUnitPrice: item.rentUnitPrice,
                    totalRentPriceForPeriod: item.totalRentPriceForPeriod,
                    rentArea: item.rentArea,
                    note: item.note
                })
            }
        })
    }, [additional, idData?.length > 0]);

    let servicesData: any = [];
    let initialData: any = [];
    if (isUpdateData === 'edit') {
        serviceOrderData?.data?.result.map((item: any) => {
            if (item.projectId === projectOrderDatas?.data?.result.projectId && item.projectOrderId === id) {
                serviceData?.data?.result.map((service: any) => {
                    if (service.id === item.serviceId) {
                        initialData.push({
                            'id': service.id,
                            'Kodas': service.number,
                            'Pavadinimas': service.name,
                            'Kiekis': item.quantity,
                            'Matavimo Vnt': service.unit,
                            'Pradžia': item.startOn,
                            'Kaina(€/Vnt)': service.basePrice,
                            'Nuolaida': item.discount,
                            // 'Vertė 1 produktoc': item.discountedUnitPrice,
                            'Viso': item.discountedUnitPrice * item.quantity,
                            // 'Execution': 0,
                            // 'Min. term (d)': 0,
                            'updateId': item.id
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (isUpdateData) {
            setProductServicSubState([...initialData]);
            setServiceSaleSub([...initialData]);

            serviceData?.data?.result.map((item: any) => {
                let catData: any = '', subCatData: any = '';
                if (serviceCatData) {
                    serviceCatData?.data?.result.map((cat: any) => {
                        if (cat.id === item.serviceCategoryId) {
                            catData = cat.name;
                        }
                    })
                }
                if (serviceSubCatData) {
                    serviceSubCatData?.data?.result.map((subCat: any) => {
                        if (subCat.id === item.serviceSubCategoryId) {
                            subCatData = subCat.name;
                        }
                    })
                }

                if (initialData.length > 0) {
                    initialData.map((ini: any) => {
                        if (item.id !== ini.id) {
                            servicesData.push({
                                'id': item.id,
                                'Kodas': item.number,
                                'Pavadinimas': item.name,
                                'Vnt': item.unit,
                                'Kategorija': catData,
                                'Tipas': subCatData,
                                'Testinė': 'Delay',
                            })
                        }
                    })
                } else {
                    servicesData.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Vnt': item.unit,
                        'Kategorija': catData,
                        'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                }

                setProductServiceMockDataState([...servicesData]);
                setServiceSale([...servicesData]);
            })
        } else {
            if (serviceData) {
                serviceData?.data?.result.map((item: any) => {
                    let catData, subCatData = '';
                    if (serviceCatData) {
                        serviceCatData?.data?.result.map((cat: any) => {
                            if (cat.id === item.serviceCategoryId) {
                                catData = cat.name;
                            }
                        })
                    }
                    if (serviceSubCatData) {
                        serviceSubCatData?.data?.result.map((subCat: any) => {
                            if (subCat.id === item.serviceSubCategoryId) {
                                subCatData = subCat.name;
                            }
                        })
                    }
                    servicesData.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Vnt': item.unit,
                        'Kategorija': catData,
                        'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                    if (isUpdateData !== 'edit') {
                        setProductServiceMockDataState([...servicesData]);
                        setServiceSale([...servicesData]);
                    }
                })
            }
        }

    }, [isUpdateData, serviceData, serviceCatData, serviceSubCatData, projectOrderDatas]);

    const productMockData = [
        {
            'id': 0,
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
        },
        {
            'id': 1,
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
        },
    ]

    const productMockData1 = [
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Nuolaida': 0,
            'Vertė 1 produktoc': 1913,
            'Viso': 0,
            'Kaina rankiniu': 0,
            'Kiekis': '',
        },
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.2',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Nuolaida': 0,
            'Vertė 1 produktoc': 1913,
            'Viso': 0,
            'Kaina rankiniu': 0,
            'Kiekis': '',
        },
    ]

    const productMockDataSale = [
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Nuolaida': 0,
            'Vertė 1 produktoc': 1913,
            'Viso': 0,
            'Kiekis': '',
        },
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.2',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Nuolaida': 0,
            'Vertė 1 produktoc': 1913,
            'Viso': 0,
            'Kiekis': '',
        },
    ]

    const productMockDataSaleTable = [
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
            'Price': 1913,
        },
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
            'Price': 1913,
        },
    ]

    const [productId, setProductId] = useState<string>('');
    const [productSubId, setProductSubId] = useState<string>('');
    const [productIdSale, setProductIdSale] = useState<string>('');
    const [productSubIdSale, setProductSubIdSale] = useState<string>('');
    const [productMockDataState, setProductMockDataState] = useState<any>(productMockData);
    const [productSubState, setProductSubState] = useState<any>(productMockData1);
    const [productServiceMockDataState, setProductServiceMockDataState] = useState<any>([]);
    const [productServicSubState, setProductServicSubState] = useState<any>([]);
    const [productMockSaleState, setProductMockSaleState] = useState<any>(productMockDataSaleTable);
    const [productSaleSubState, setProductSaleSubState] = useState<any>(productMockDataSale);

    const [serviceSale, setServiceSale] = useState<any>([]);
    const [serviceSaleSub, setServiceSaleSub] = useState<any>([]);

    const [serviceId, setServiceId] = useState<string>('');
    const [serviceSubId, setServiceSubId] = useState<string>('');

    const [serviceIdSale, setServiceIdSale] = useState<string>('');
    const [serviceSubIdSale, setServiceSubIdSale] = useState<string>('');

    useEffect(() => {
        if (serviceData) {
            serviceData?.data?.result.map((item: any) => {
                if (item.id === serviceId) {
                    let startOn = new Date().toJSON().slice(0, 10);
                    serviceOrderData?.data?.result.map((serviceOrder: any) => {
                        if (serviceOrder.projectId === projectIdDatas) {
                            startOn = serviceOrder.startOn;
                        }
                    })
                    productServicSubState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Kiekis': 0,
                        'Matavimo Vnt': item.unit,
                        'Pradžia': startOn,
                        'Kaina(€/Vnt)': item.basePrice,
                        'Nuolaida': 0,
                        // 'Vertė 1 produktoc': 0,
                        'Viso': 0,
                        // 'Execution': 0,
                        // 'Min. term (d)': 0,
                    })
                } else if (item.id === serviceIdSale) {
                    let startOn = new Date().toJSON().slice(0, 10);
                    serviceOrderData?.data?.result.map((serviceOrder: any) => {
                        if (serviceOrder.projectId === projectIdDatas) {
                            startOn = serviceOrder.startOn;
                        }
                    })
                    serviceSaleSub.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Kiekis': 0,
                        'Matavimo Vnt': item.unit,
                        'Pradžia': startOn,
                        'Kaina(€/Vnt)': item.basePrice,
                        'Nuolaida': 0,
                        // 'Vertė 1 produktoc': 0,
                        'Viso': 0,
                        // 'Execution': 0,
                        // 'Min. term (d)': 0,
                    })
                }
                if (tableType === "Rent") {
                    setProductServicSubState([...productServicSubState]);
                    setServiceId('');
                } else if (tableType === "Sale") {
                    setServiceSaleSub([...serviceSaleSub]);
                    setServiceIdSale('');
                }
            })
        }
    }, [productServiceMockDataState.length, serviceSale.length]);

    useEffect(() => {
        if (serviceData) {
            serviceData?.data?.result.map((item: any) => {
                if (item.id === serviceSubId) {
                    let catData, subCatData = '';
                    if (serviceCatData) {
                        serviceCatData?.data?.result.map((cat: any) => {
                            if (cat.id === item.serviceCategoryId) {
                                catData = cat.name;
                            }
                        })
                    }
                    if (serviceSubCatData) {
                        serviceSubCatData?.data?.result.map((subCat: any) => {
                            if (subCat.id === item.serviceSubCategoryId) {
                                subCatData = subCat.name;
                            }
                        })
                    }
                    productServiceMockDataState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Vnt': item.unit,
                        'Kategorija': catData,
                        'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                } else if (item.id === serviceSubIdSale) {
                    let catData, subCatData = '';
                    if (serviceCatData) {
                        serviceCatData?.data?.result.map((cat: any) => {
                            if (cat.id === item.serviceCategoryId) {
                                catData = cat.name;
                            }
                        })
                    }
                    if (serviceSubCatData) {
                        serviceSubCatData?.data?.result.map((subCat: any) => {
                            if (subCat.id === item.serviceSubCategoryId) {
                                subCatData = subCat.name;
                            }
                        })
                    }
                    serviceSale.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Vnt': item.unit,
                        'Kategorija': catData,
                        'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                }
                if (tableType === "Rent") {
                    setProductServiceMockDataState([...productServiceMockDataState]);
                    setServiceSubId('');
                } else if (tableType === "Sale") {
                    setServiceSale([...serviceSale]);
                    setServiceSubIdSale('');
                }

            })
        }
    }, [productServicSubState.length, serviceSaleSub.length]);

    useEffect(() => {
        if (productData) {
            productData?.data?.result.map((item: any) => {
                let priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        priceData = warehouse.price;
                    }
                })
                if (item.id === productId) {
                    productSubState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': 0,
                        'Plotas': 0,
                        'Vertė': priceData,
                        'Nuolaida': 0,
                        'Vertė 1 produkto': 0,
                        'Viso': 0,
                        'Kaina rankiniu': 0,
                        'Kiekis': 0,
                    })
                }
                setProductSubState([...productSubState]);
                setProductId('');
            })
        }
    }, [productMockDataState.length]);

    useEffect(() => {
        if (productData) {
            productData?.data?.result.map((item: any) => {
                if (item.id === productSubId) {
                    let groupData, typeData = '';
                    if (productgroupData) {
                        productgroupData?.data?.result.map((group: any) => {
                            if (group.id === item.productGroupId) {
                                groupData = group.name;
                            }
                        })
                    }
                    if (producttypeData) {
                        producttypeData?.data?.result.map((type: any) => {
                            if (type.id === item.productTypeId) {
                                typeData = type.name;
                            }
                        })
                    }
                    productMockDataState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': item.weight,
                        'Plotas': item.area,
                        'Vertė': item.volym,
                        'Tipas': typeData,
                        'Grupė': groupData,
                    })
                }
                setProductMockDataState([...productMockDataState]);
                setProductSubId('');
            })
        }
    }, [productSubState.length]);

    useEffect(() => {
        if (productData) {
            productData?.data?.result.map((item: any) => {
                let warehouseOrderData = '';
                if (warehouseOrdersData) {
                    warehouseOrdersData?.data?.result.map((warehouseOrders: any) => {
                        if (projectIdDatas === warehouseOrders.projectId) {
                            warehouseOrderData = warehouseOrders.basePrice;
                        }
                    })
                }
                if (item.id === productIdSale) {
                    productSaleSubState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': 0,
                        'Plotas': 0,
                        'Vertė': warehouseOrderData,
                        'Nuolaida': 0,
                        'Vertė 1 produkto': 0,
                        'Viso': 0,
                        'Kiekis': 0,
                    })
                }
                setProductSaleSubState([...productSaleSubState]);
                setProductIdSale('');
            })
        }
    }, [productMockSaleState.length]);

    useEffect(() => {
        if (productData) {
            productData?.data?.result.map((item: any) => {
                if (item.id === productSubIdSale) {
                    let groupData, typeData = '';
                    if (productgroupData) {
                        productgroupData?.data?.result.map((group: any) => {
                            if (group.id === item.productGroupId) {
                                groupData = group.name;
                            }
                        })
                    }
                    if (producttypeData) {
                        producttypeData?.data?.result.map((type: any) => {
                            if (type.id === item.productTypeId) {
                                typeData = type.name;
                            }
                        })
                    }
                    let warehouseOrderData = '';
                    if (warehouseOrdersData) {
                        warehouseOrdersData?.data?.result.map((warehouseOrders: any) => {
                            if (projectIdDatas === warehouseOrders.projectId) {
                                warehouseOrderData = warehouseOrders.basePrice;
                            }
                        })
                    }
                    productMockSaleState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': item.weight,
                        'Plotas': item.area,
                        'Vertė': warehouseOrderData,
                        'Tipas': typeData,
                        'Grupė': groupData,
                    })
                }
                setProductMockSaleState([...productMockSaleState]);
                setProductSubIdSale('');
            })
        }
    }, [productSaleSubState.length]);

    const onChangePage = (_page: number) => {
        return {};
    };

    const handleChangeOrderInfo = (e: ValueType) => {
        setValuesOrderInfo({ ...valuesOrderInfo, [e.name]: e.value });
    };

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const onChangeInputService = (e: any, idData: any, row: any) => {
        if (tableType === "Rent") {
            productServicSubState.map((item: any, index: number) => {
                if (item.id === idData) {
                    productServicSubState[index][row] = e.target.value;
                    if (Number(productServicSubState[index]['Kaina(€/Vnt)']) === 0) {
                        productServicSubState[index]['Vertė 1 produkto'] = 0;
                    } else {
                        productServicSubState[index]['Vertė 1 produkto'] = (Number(productServicSubState[index]['Kaina(€/Vnt)']) * ((100 - Number(productServicSubState[index]['Nuolaida'])) / 100)).toFixed(2);
                    }
                    productServicSubState[index]['Viso'] = (productServicSubState[index]['Kiekis'] * productServicSubState[index]['Vertė 1 produkto']).toFixed(2);
                    setProductServicSubState([...productServicSubState]);
                }
            })
        } else if (tableType === "Sale") {
            serviceSaleSub.map((item: any, index: number) => {
                if (item.id === idData) {
                    serviceSaleSub[index][row] = e.target.value;
                    if (Number(serviceSaleSub[index]['Kaina(€/Vnt)']) === 0) {
                        serviceSaleSub[index]['Vertė 1 produkto'] = 0;
                    } else {
                        serviceSaleSub[index]['Vertė 1 produkto'] = (Number(serviceSaleSub[index]['Kaina(€/Vnt)']) * ((100 - Number(serviceSaleSub[index]['Nuolaida'])) / 100)).toFixed(2);
                    }
                    serviceSaleSub[index]['Viso'] = (serviceSaleSub[index]['Kiekis'] * serviceSaleSub[index]['Vertė 1 produkto']).toFixed(2);
                    setProductServicSubState([...serviceSaleSub]);
                }
            })
        }

    };

    const handleChangenumber = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleSubmit = async () => {
        let subData: any = [];
        let productData: any = [];
        if (tableType === 'Rent') {
            productServicSubState.map((item: any) => {
                let orderData = '';
                projectOrderData?.data?.result?.map((order: any) => {
                    if (projectIdDatas === order.projectId) {
                        orderData = order.id;
                    }
                })
                subData.push({
                    ...values,
                    "number": item['Kodas'],
                    "serviceId": item.id,
                    "projectId": projectIdDatas,
                    "projectOrderId": orderData,
                    "quantity": Number(item.Kiekis),
                    "discount": Number(item['Nuolaida']),
                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                    "totPrice": Number(item['Viso']),
                    "startOn": item.Pradžia,
                })
            })

            productSubState.map((item: any) => {
                let warehouseProjectIdData = '', priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        warehouseProjectIdData = warehouse.id;
                        priceData = warehouse.price;
                    }
                })
                let orderData = '';
                projectOrdersData?.data?.result?.map((order: any) => {
                    if (projectIdDatas === order.projectId) {
                        orderData = order.id;
                    }
                })
                productData.push({
                    'type': 'loans',
                    'quantity': Number(item.Kiekis),
                    'number': item['Kodas'],
                    'warehouseProductId': warehouseProjectIdData,
                    'projectId': projectIdDatas,
                    'projectOrderId': orderData,
                    'basePrice': priceData,
                    'discount': Number(item['Nuolaida']),
                    'discountedPrice': Number(item['Vertė 1 produktoc']),
                    'rentFactor': item['Kaina rankiniu'],
                    'isCustomRentPrice': item['Kaina rankiniu'] > 0 ? true : false,
                    "customUnitRentPriceForOneDay": item['Kaina rankiniu'],
                    "customTotalRentPriceForOneDay": 0,
                    "unitRentPriceForOneDay": 0,
                    "totalRentPriceForOneDay": 0,
                    "note": "note",
                    "createdBy": tokenData,
                    "isQuantityContstant": false,
                })
            })
        } else if (tableType === 'Sale') {
            serviceSaleSub.map((item: any) => {
                let orderData = '';
                projectOrderData?.data?.result?.map((order: any) => {
                    if (projectIdDatas === order.projectId) {
                        orderData = order.id;
                    }
                })
                subData.push({
                    ...values,
                    "number": item['Kodas'],
                    "serviceId": item.id,
                    "projectId": projectIdDatas,
                    "projectOrderId": orderData,
                    "quantity": item.Kiekis,
                    "discount": item['Nuolaida'],
                    "discountedUnitPrice": item['Kaina(€/Vnt)'],
                    "totPrice": item['Viso'],
                    "startOn": item.Pradžia,
                })
            })

            productSaleSubState.map((item: any) => {
                let warehouseProjectIdData = '', priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        warehouseProjectIdData = warehouse.id;
                        priceData = warehouse.price;
                    }
                })
                let orderData = '';
                projectOrdersData?.data?.result?.map((order: any) => {
                    if (projectIdDatas === order.projectId) {
                        orderData = order.id;
                    }
                })
                productData.push({
                    ...valuesProjectInfo,
                    'type': 'sales',
                    'quantity': Number(item.Kiekis),
                    'number': item['Kodas'],
                    'warehouseProductId': warehouseProjectIdData,
                    'projectId': projectIdDatas,
                    'projectOrderId': orderData,
                    'basePrice': priceData,
                    'discount': Number(item['Nuolaida']),
                    'discountedPrice': Number(item['Vertė 1 produktoc']),
                    'rentFactor': item['Sale'],
                    'isCustomRentPrice': false,
                    "customUnitRentPriceForOneDay": item['Sale'],
                    "customTotalRentPriceForOneDay": 0,
                    "unitRentPriceForOneDay": 0,
                    "totalRentPriceForOneDay": 0,
                })
            })
        }
        if (tableType === 'Rent') {
            localStorage.setItem('tableData', JSON.stringify(productMockDataState));
            localStorage.setItem('subTableData', JSON.stringify(productSubState));
            localStorage.setItem('tableDataService', JSON.stringify(productServiceMockDataState));
            localStorage.setItem('subTableDataService', JSON.stringify(productServicSubState));
        } else if (tableType === 'Sale') {
            localStorage.setItem('tableData', JSON.stringify(productMockSaleState));
            localStorage.setItem('subTableData', JSON.stringify(productSaleSubState));
            localStorage.setItem('tableDataService', JSON.stringify(serviceSale));
            localStorage.setItem('subTableDataService', JSON.stringify(serviceSaleSub));
        }
        localStorage.setItem('rentOrder-OrderInfo', JSON.stringify(valuesOrderInfo));
        localStorage.setItem('projectInfo', JSON.stringify(productData));
        localStorage.setItem('serviceInfo', JSON.stringify(subData));
        //Update order information, products and save services data.
        closeModal();
        resetForm();
        setisAddNewModalOpen(true)
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const onClickPlusButton = (row: any) => {
        let i = 0;
        productMockDataState?.map((item: any, key: number) => {
            if (item.id === row.id) {
                i = key;
            }
        })
        productMockDataState.splice(i, 1);
        setProductMockDataState([...productMockDataState]);
        setProductId(row.id);
    }

    const onClickPlusButtonService = (row: any) => {
        if (tableType === "Rent") {
            let i = 0;
            productServiceMockDataState.map((item: any, key: number) => {
                if (item.id === row.id) {
                    i = key;
                }
            })
            productServiceMockDataState.splice(i, 1);
            setProductServiceMockDataState([...productServiceMockDataState])
            setServiceId(row.id);
        } else if (tableType === "Sale") {
            let i = 0;
            serviceSale.map((item: any, key: number) => {
                if (item.id === row.id) {
                    i = key;
                }
            })
            serviceSale.splice(i, 1);
            setServiceSale([...serviceSale])
            setServiceIdSale(row.id);
        }
    }

    const onClickMinusButton = (row: any) => {
        let i = 0;
        productSubState.map((item: any, key: number) => {
            if (item.id === row.id) {
                i = key;
            }
        })
        productSubState.splice(i, 1)
        setProductSubState([...productSubState]);
        setProductSubId(row.id);
    }

    const onClickMinusButtonService = (row: any) => {
        if (tableType === "Rent") {
            let i = 0;
            productServicSubState.map((item: any, key: number) => {
                if (item.id === row.id) {
                    i = key;
                }
            })
            productServicSubState.splice(i, 1)
            setProductServicSubState([...productServicSubState]);
            setServiceSubId(row.id);
        } else if (tableType === "Sale") {
            let i = 0;
            serviceSaleSub.map((item: any, key: number) => {
                if (item.id === row.id) {
                    i = key;
                }
            })
            serviceSaleSub.splice(i, 1)
            setServiceSaleSub([...serviceSaleSub]);
            setServiceSubIdSale(row.id);
        }
    }

    const onClickSalePlusButton = (row: any) => {
        let i = 0;
        productMockSaleState.map((item: any, key: number) => {
            if (item.id === row.id) {
                i = key;
            }
        })
        productMockSaleState.splice(i, 1);
        setProductMockSaleState([...productMockSaleState])
        setProductIdSale(row.id);
    }

    const onClickSaleMinusButton = (row: any) => {
        let i = 0;
        productSaleSubState.map((item: any, key: number) => {
            if (item.id === Number(row.id)) {
                i = key;
            }
        })
        productSaleSubState.splice(i, 1)
        setProductSaleSubState([...productSaleSubState]);
        setProductSubIdSale(row.id);
    }

    const onChangeInputSale = (e: any, idData: any, row: any) => {
        productSaleSubState.map((item: any, index: number) => {
            if (item.id === idData) {
                let projectOrderData: number = 0;
                if (projectOrdersData) {
                    projectOrdersData?.data?.result.map((projectOrders: any) => {
                        if (projectIdDatas === projectOrders.projectId) {
                            projectOrderData = projectOrders.rentLengthInDays;
                        }
                    })
                }
                productSaleSubState[index][row] = e.target.value;
                productSaleSubState[index]['Svoris'] = Number(productSaleSubState[index]['Kiekis']) * Number(productData?.data?.result[index].weight);
                productSaleSubState[index]['Plotas'] = Number(productSaleSubState[index]['Kiekis']) * Number(productData?.data?.result[index].area);
                if (productSaleSubState[index]['Vertė'] === 0) {
                    productSaleSubState[index]['Vertė 1 produkto'] = 0;
                } else {
                    productSaleSubState[index]['Vertė 1 produkto'] = (Number(productSaleSubState[index]['Vertė']) * (100 - Number(productSaleSubState[index]['Nuolaida'])) / 100).toFixed(2);
                }

                productSaleSubState[index]['Viso'] = (Number(productSaleSubState[index]['Kiekis']) * Number(productSaleSubState[index]['Vertė 1 produkto'])).toFixed(2);

                setProductSubState([...productSaleSubState]);
            }
        })
    };

    const onChangeInput = (e: any, idData: any, row: any) => {
        productSubState.map((item: any, index: number) => {
            if (item.id === idData) {
                let projectOrderData: number = 0;
                if (projectOrdersData) {
                    projectOrdersData?.data?.result.map((projectOrders: any) => {
                        if (projectIdDatas === projectOrders.projectId) {
                            projectOrderData = projectOrders.rentLengthInDays;
                        }
                    })
                }
                productSubState[index][row] = e.target.value;
                productSubState[index]['Svoris'] = Number(productSubState[index]['Kiekis']) * Number(productData?.data?.result[index].weight);
                productSubState[index]['Plotas'] = Number(productSubState[index]['Kiekis']) * Number(productData?.data?.result[index].area);
                if (productSubState[index]['Vertė'] === 0) {
                    productSubState[index]['Vertė 1 produkto'] = 0;
                } else {
                    productSubState[index]['Vertė 1 produkto'] = (Number(productSubState[index]['Vertė']) * (100 - (Number(productSubState[index]['Nuolaida']))) / 100).toFixed(2);
                }

                productSubState[index]['Viso'] = (Number(productSubState[index]['Kiekis']) * Number(productSubState[index]['Vertė 1 produkto'])).toFixed(2);
                // productSubState[index]['Rent'] = productSubState[index]['Kaina rankiniu'] * projectOrderData;
                setProductSubState([...productSubState]);
            }
        })
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? `Update ${tableType}` : `Naujas užsakymas`}
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
                        {
                            tableType === 'Rent' &&
                            <Collapsible isOpen={false} title="Užsakymo informacija">
                                <div className="p-3 row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="test"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="Name"
                                            value={valuesOrderInfo.test}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <SwitchInput
                                            className="mr-3"
                                            type="number"
                                            name="rentUnitPrice"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="Price 1m²/Є per day *"
                                            value={valuesOrderInfo.rentUnitPrice}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="rentArea"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder={additional ? "" : "Area (m²)"}
                                            value={valuesOrderInfo.rentArea}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="number"
                                            name="rentLengthInDays"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="Amount for 30 days"
                                            value={valuesOrderInfo.rentLengthInDays}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="number"
                                            name="totalRentPriceForPeriod"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder={additional ? "" : "Rent period(day)"}
                                            value={valuesOrderInfo.totalRentPriceForPeriod}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <SwitchInputCheck
                                            className="mr-3"
                                            type="string"
                                            name="percentOfValueForOneDay"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="% of value / per day"
                                            value={valuesOrderInfo.percentOfValueForOneDay}
                                        // disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <SwitchInputCheck
                                            className="mr-3"
                                            type="string"
                                            name="pricePerToneForOneDay"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="Price 1 t/per day"
                                            value={valuesOrderInfo.pricePerToneForOneDay}
                                        // disabled={additional ? true : false}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        <Textarea
                                            className="mr-3 textarea"
                                            type="string"
                                            name="note"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder={additional ? "" : "Note:"}
                                            value={valuesOrderInfo.note}
                                            disabled={additional ? true : false}
                                        />
                                    </div>
                                </div>
                            </Collapsible>
                        }
                        <Collapsible isOpen={false} title="Produktai">
                            <div className="p-3 row">
                                <div className="mb-5">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        {
                                            tableType === 'Sale' ?
                                                <Table
                                                    data={productMockSaleState || []}
                                                    uniqueCol="id"
                                                    rowsPerPage={20}
                                                    hide={['id']}
                                                    actions={[]}
                                                    handleClickRow={() => { }}
                                                    onChangePage={onChangePage}
                                                    onClickPlusButton={onClickSalePlusButton}
                                                />
                                                :
                                                <Table
                                                    data={productMockDataState || []}
                                                    uniqueCol="id"
                                                    rowsPerPage={20}
                                                    hide={['id', 'isChecked']}
                                                    actions={[]}
                                                    handleClickRow={() => { }}
                                                    onChangePage={onChangePage}
                                                    onClickPlusButton={onClickPlusButton}
                                                />
                                        }
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        {
                                            tableType === 'Sale' || tableType === 'Offer' ?
                                                <SubTableSale
                                                    data={productSaleSubState || []}
                                                    uniqueCol="id"
                                                    hide={['id', 'updateId']}
                                                    handleClickRow={() => { }}
                                                    onChangePage={onChangePage}
                                                    onClickMinusButton={onClickSaleMinusButton}
                                                    onChangeInputSale={onChangeInputSale}
                                                />
                                                :
                                                <SubTable
                                                    data={productSubState || []}
                                                    uniqueCol="id"
                                                    hide={['id', 'updateId']}
                                                    handleClickRow={() => { }}
                                                    onClickMinusButton={onClickMinusButton}
                                                    onChangePage={onChangePage}
                                                    onChangeInput={onChangeInput}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible isOpen={true} title="Services">
                            <div className="p-3 row">
                                <div className="mb-5">
                                    {
                                        tableType === 'Rent' ?
                                            <Table
                                                data={productServiceMockDataState || []}
                                                uniqueCol="id"
                                                hide={['id', 'imageUrl']}
                                                actions={[]}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickPlusButton={onClickPlusButtonService}
                                            />
                                            :
                                            <Table
                                                data={serviceSale || []}
                                                uniqueCol="id"
                                                hide={['id', 'imageUrl']}
                                                actions={[]}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickPlusButton={onClickPlusButtonService}
                                            />
                                    }
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    {
                                        tableType === 'Rent' ?
                                            <ServiceSubTable
                                                data={productServicSubState || []}
                                                uniqueCol="id"
                                                hide={['id', 'Nuolaida', 'Vertė 1 produkto', 'updateId']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickMinusButton={onClickMinusButtonService}
                                                onChangeInputService={onChangeInputService}
                                            />
                                            :
                                            <ServiceSubTable
                                                data={serviceSaleSub || []}
                                                uniqueCol="id"
                                                hide={['id', 'Nuolaida', 'Vertė 1 produkto', 'updateId']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickMinusButton={onClickMinusButtonService}
                                                onChangeInputService={onChangeInputService}
                                            />
                                    }
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
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
            <AddNewRentOrderModal
                handleSuccess={() => { }}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal-mid'}
                tableType={tableType}
                additional={additional ? true : false}
                idData={idData}
            />
        </div>
    );
}
