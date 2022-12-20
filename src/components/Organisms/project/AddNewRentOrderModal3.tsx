import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';

import { employeeStore } from '../../../store/employees.store';
import { vehiclesStore } from '../../../store/vehicles.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { serviceOrder } from '../../../store/service-order.store';
import { productStore } from '../../../store/products.store';
import { servicesStore } from '../../../store/services.store';
import { serviceCategory } from '../../../store/service-categories.store';
import { serviceSubCategory } from '../../../store/service-subcategories.store';
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';

import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import CustomSelect from '../../Atoms/Form/Select';
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../types';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Table from '../../Organisms/tables/TableProjectModal';
import SubTable from '../../Organisms/tables/TableProjectSubModal';
import ServiceSubTable from '../../Organisms/tables/TableServiceSubModal';
import SubTableSale from '../../Organisms/tables/TableProjectSaleSubModal';
import RemoveModal from "../Modals/RemoveModal";
import SuccessModal from "../Modals/SuccessModal";
import SwitchInput from '../../Atoms/Form/SwitchInput';
import SwitchInputCheck from '../../Atoms/Form/SwitchInputCheck';
import { v4 as uuidv4 } from 'uuid';
import WareHouse from '../../../pages/warehouses';

interface IModalProps extends ModalProps {
    vehiclesId?: string;
    isUpdating?: boolean;
    additional?: boolean;
    idData?: any;
    tableType?: string;
    handleSuccess: () => void;
}
const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultStateServiceInfo: any = {
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
    "repairCost": 0
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
    transport: '',
};

export default function AddNewRentOrderModal3({
    setShow,
    vehiclesId,
    isUpdating = false,
    additional = false,
    idData,
    handleSuccess,
    tableType = 'Rent',
    ...props
}: IModalProps) {
    let orderInfo: any = localStorage.getItem('rentOrder-OrderInfo');
    let isUpdateData: any = localStorage.getItem('update');
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };
    const productMockData = [
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
        },
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Tipas': 'Pastoliai',
            'Grupė': 'Fasadiniai',
        },
    ]

    const productMockData1: any = []
    const productMockDataSale = [
        {
            'Kodas': 'e286058',
            'Pavadinimas': 'Product Nr.1',
            'Svoris': 296,
            'Plotas': 0,
            'Vertė': 1913,
            'Nuolaida': 0,
            'Vertė 1 produkto': 1913,
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
            'Vertė 1 produkto': 1913,
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

    const serviceMockData = [
        {
            'id': 0,
            'Kodas': 'NDIEN',
            'Pavadinimas': 'Service1',
            'Kiekis': 1,
            'Matavimo Vnt': 'psc',
            'Kaina(€/Vnt)': 33,
            'Nuolaida': 0,
            'Vertė 1 produkto': 33,
            'Viso': 33,
        },
        {
            'id': 1,
            'Kodas': 'NDIEN',
            'Pavadinimas': 'Service1',
            'Kiekis': 1,
            'Matavimo Vnt': 'psc',
            'Kaina(€/Vnt)': 33,
            'Nuolaida': 0,
            'Vertė 1 produkto': 33,
            'Viso': 33,
        },
    ]

    const onChangePage = (_page: number) => {
        return {};
    };
    const [values, setvalues] = useState<any>({ ...defaultState });
    const [valuesOrderInfo, setValuesOrderInfo] = useState<any>({ ...defaultStateOrderInfo });
    const [valuesProjectInfo, setValuesProjectInfo] = useState<any>({ ...defaultStateProjectInfo });
    const [valuesServiceInfo, setValuesServiceInfo] = useState<any>({ ...defaultStateServiceInfo });
    const [isAskModalOpen, setisAskModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [creationType, setCreationType] = useState<string>('string');
    const [startDateType, setStartDateType] = useState<string>('string');
    const [endDateType, setEndDateType] = useState<string>('string');

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

        let serviceInfo: any = localStorage.getItem('serviceInfo');
        let serviceInfoData = JSON.parse(serviceInfo);
        if (serviceInfoData) {
            setValuesServiceInfo(serviceInfoData);
        }

        if (tableType === 'Rent') {
            let tableData: any = localStorage.getItem('tableData');
            let tableSubData: any = localStorage.getItem('subTableData');
            let tableDataService: any = localStorage.getItem('tableDataService');
            let tableSubDataService: any = localStorage.getItem('subTableDataService');
            if (tableData) {
                setProductMockDataState(JSON.parse(tableData));
            }
            if (tableSubData) {
                setProductSubState(JSON.parse(tableSubData));
            }
            if (tableDataService) {
                setProductServiceMockDataState(JSON.parse(tableDataService));
            }
            if (tableSubDataService) {
                setProductServicSubState(JSON.parse(tableSubDataService));
            }

        } else if (tableType === 'Sale') {
            let tableData: any = localStorage.getItem('tableData');
            let tableSubData: any = localStorage.getItem('subTableData');
            let tableDataService: any = localStorage.getItem('tableDataService');
            let tableSubDataService: any = localStorage.getItem('subTableDataService');
            if (tableData) {
                setProductMockSaleState(JSON.parse(tableData));
            }
            if (tableSubData) {
                setProductSaleSubState(JSON.parse(tableSubData));
            }
            if (tableDataService) {
                setServiceSale(JSON.parse(tableDataService));
            }
            if (tableSubDataService) {
                setServiceSaleSub(JSON.parse(tableSubDataService));
            }
        }

    }, [orderInfo, localStorage.getItem('projectInfo'), localStorage.getItem('serviceInfo')]);

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

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleChangeOrderInfo = (e: ValueType) => {
        setValuesOrderInfo({ ...valuesOrderInfo, [e.name]: e.value });
    };

    const handleChangenumber = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };


    const [productIdSale, setProductIdSale] = useState<string>('');
    const [productSubIdSale, setProductSubIdSale] = useState<string>('');
    const [productId, setProductId] = useState<string>('');
    const [productSubId, setProductSubId] = useState<string>('');
    const [productMockDataState, setProductMockDataState] = useState<any>(productMockData);
    const [productSubState, setProductSubState] = useState<any>(productMockData1);
    const [productServiceMockDataState, setProductServiceMockDataState] = useState<any>([]);
    const [productServiceSubState, setProductServiceSubState] = useState<any>(serviceMockData);
    const [productMockSaleState, setProductMockSaleState] = useState<any>(productMockDataSaleTable);
    const [productSaleSubState, setProductSaleSubState] = useState<any>(productMockDataSale);
    const [serviceId, setServiceId] = useState<string>('');
    const [serviceSubId, setServiceSubId] = useState<string>('');

    const [serviceIdSale, setServiceIdSale] = useState<string>('');
    const [serviceSale, setServiceSale] = useState<any>([]);
    const [serviceSaleSub, setServiceSaleSub] = useState<any>([]);
    const [productServicSubState, setProductServicSubState] = useState<any>([]);
    const [serviceSubIdSale, setServiceSubIdSale] = useState<string>('');

    const { data: employee } = employeeStore.getAll();
    const { data: vehiclesData } = vehiclesStore.getAll();
    const { mutateAsync: createProjectOrderMutation } = projectsOrdersStore.create();
    const { mutateAsync: updateMutationProjectOrderMutation } = projectsOrdersStore.update();
    const { mutateAsync: createWarehouseOrderMutation } = warehouseStore.createWarehouseOrder();
    const { mutateAsync: updateMutationWarehouseOrderMutation } = warehouseStore.updateWarehouseOrder();
    const { mutateAsync: createServiceOrderMutation } = serviceOrder.create();
    const { mutateAsync: updateMutationServiceOrder } = serviceOrder.update();

    const { data: projectOrdersData } = projectsOrdersStore.getAll();
    const { data: productData } = productStore.getAll();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: serviceOrderData } = serviceOrder.getAll();
    const { data: serviceData } = servicesStore.getAll();
    const { data: serviceCatData } = serviceCategory.getAll();
    const { data: serviceSubCatData } = serviceSubCategory.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getAll();
    const { data: warehouseOrdersData } = warehouseStore.getAllWarehosueOrders();
    const { data: productgroupData } = productGroup.getAll();
    const { data: producttypeData } = productType.getAll();

    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }


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
                        'Vertė 1 produkto': 0,
                        'Viso': 0,
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
                        'Vertė 1 produkto': 0,
                        'Viso': 0,
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

    const handleSubmit = async () => {

        if (isUpdateData !== 'edit') {
            let orderInfoData = {};
            orderInfoData = {
                ...valuesOrderInfo,
                vehicleId: values.transport,
                projectId: projectIdDatas,
                percentOfValueForOneDay: valuesOrderInfo.percentOfValueForOneDay,
                pricePerToneForOneDay: valuesOrderInfo.pricePerToneForOneDay,
                isPercentOfValueForOneDay: valuesOrderInfo.percentOfValueForOneDay > 0 ? true : false,
                isPricePerToneForOneDay: valuesOrderInfo.pricePerToneForOneDay > 0 ? true : false
            };
            let projectInfoData: any = [];
            let serviceInfoData: any = [];

            if (tableType === 'Rent') {
                productServicSubState.map((item: any) => {
                    let orderData = '';
                    projectOrderData?.data?.result?.map((order: any) => {
                        if (projectIdDatas === order.projectId) {
                            orderData = order.id;
                        }
                    })
                    serviceInfoData.push({
                        ...defaultStateServiceInfo,
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
                    console.log('last item', item)
                    let warehouseProjectIdData = 'string', priceData = '';
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
                    projectInfoData.push({
                        'type': 'loans',
                        'quantity': Number(item.Kiekis),
                        'number': item['Kodas'],
                        'warehouseProductId': warehouseProjectIdData,
                        'projectId': projectIdDatas,
                        'projectOrderId': orderData,
                        'basePrice': priceData,
                        'discount': Number(item['Nuolaida']),
                        'discountedPrice': Number(item['Vertė 1 produkto']),
                        'rentFactor': Number(item['Kaina rankiniu']),
                        'isCustomRentPrice': item['Kaina rankiniu'] > 0 ? true : false,
                        "customUnitRentPriceForOneDay": 0,
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
                    serviceInfoData.push({
                        ...defaultStateServiceInfo,
                        "number": item['Kodas'],
                        "serviceId": item.id,
                        "projectId": localStorage.getItem('projectId'),
                        "projectOrderId": orderData,
                        "quantity": item.Kiekis,
                        "discount": item['Nuolaida'],
                        "discountedUnitPrice": item['Kaina(€/Vnt)'],
                        "totPrice": item['Viso'],
                        "startOn": item.Pradžia,
                    })
                })

                productSaleSubState.map((item: any) => {
                    let warehouseProjectIdData = 'string', priceData = '';
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
                    projectInfoData.push({
                        'type': 'sales',
                        'quantity': Number(item.Kiekis),
                        'number': item['Kodas'],
                        'warehouseProductId': warehouseProjectIdData,
                        'projectId': localStorage.getItem('projectId'),
                        'projectOrderId': orderData,
                        'basePrice': priceData,
                        'discount': Number(item['Nuolaida']),
                        'discountedPrice': Number(item['Vertė 1 produkto']),
                        'rentFactor': item['Kaina rankiniu'],
                        'isCustomRentPrice': item['Kaina rankiniu'] > 0 ? true : false,
                        "customUnitRentPriceForOneDay": 0,
                        "customTotalRentPriceForOneDay": 0,
                        "unitRentPriceForOneDay": 0,
                        "totalRentPriceForOneDay": 0,
                        "note": "note",
                        "createdBy": tokenData,
                        "isQuantityContstant": false,
                    })
                })
            }

            if (tableType === 'Rent') {
                const toastId = toast.loading('Saving ....');
                createProjectOrderMutation(orderInfoData, {
                    async onSuccess(_data: any) {
                        toast.success('OrderInfo was created successfully', { id: toastId });
                        if (_data) {
                            let project: any = [];
                            let service: any = [];
                            projectInfoData.map((item: any) => {
                                project.push({
                                    ...item,
                                    "projectOrderId": _data.data.result.id,
                                })
                            })
                            serviceInfoData.map((item: any) => {
                                service.push({
                                    ...item,
                                    "projectOrderId": _data.data.result.id,
                                })
                            })

                            if (project.length > 0) {
                                const toastIdProject = toast.loading('Saving ....');
                                createWarehouseOrderMutation(project, {
                                    async onSuccess(_dataWarehouse) {
                                        toast.success('ProjectInfo was created successfully', { id: toastIdProject });
                                        if (_dataWarehouse) {
                                            if (service.length > 0) {
                                                const toastIdService = toast.loading('Saving ....');
                                                createServiceOrderMutation(service, {
                                                    async onSuccess(_data) {
                                                        toast.success('ServiceInfo was created successfully', { id: toastIdService });
                                                        localStorage.removeItem('rentOrder-OrderInfo');
                                                        localStorage.removeItem('projectInfo');
                                                        localStorage.removeItem('serviceInfo');
                                                        queryClient.invalidateQueries(['project-orders']);
                                                        closeModal();
                                                        resetForm();
                                                    },
                                                    onError(error: any) {
                                                        toast.error(error.response.data.message || 'error occurred please try again', {
                                                            id: toastIdService,
                                                        });
                                                    },
                                                });
                                            }

                                        }
                                    },
                                    onError(error: any) {
                                        toast.error(error.response.data.message || 'error occurred please try again', {
                                            id: toastIdProject,
                                        });
                                    },
                                });
                            }

                        }
                    },
                    onError(error: any) {
                        toast.error(error.response.data.message || 'error occurred please try again', {
                            id: toastId,
                        });
                    },
                });
            } else if (tableType === 'Sale') {
                let orderInfo = {
                    "rentUnitPrice": 0,
                    "rentArea": 0,
                    "rentLengthInDays": 30,
                    "totalRentPriceForPeriod": 0,
                    "totalRentPriceForOneDay": 0,
                    "rentFactor": 0,
                    "isPercentOfValueForOneDay": false,
                    "percentOfValueForOneDay": 0,
                    "isPricePerToneForOneDay": false,
                    "pricePerToneForOneDay": 0,
                    "isActive": false,
                    "number": "string",
                    "type": "sales",
                    "projectId": projectIdDatas,
                    "vehicleId": values.transport,
                    "totalBaseRentPriceForPeriod": 0,
                    "totalBaseRentPriceForOneDay": 0,
                    "note": "note",
                    "createdBy": tokenData,
                    "remark": "remark",
                    "projectLengthInDays": 0,
                    "activatedOn": null,
                }

                const toastId = toast.loading('Saving ....');
                createProjectOrderMutation(orderInfo, {
                    async onSuccess(_data: any) {
                        toast.success('OrderInfo was created successfully', { id: toastId });
                        if (_data) {
                            let project: any = [];
                            let service: any = [];
                            projectInfoData.map((item: any) => {
                                project.push({
                                    ...item,
                                    "projectOrderId": _data.data.result.id,
                                })
                            })
                            serviceInfoData.map((item: any) => {
                                service.push({
                                    ...item,
                                    "projectOrderId": _data.data.result.id,
                                })
                            })
                            if (project.length > 0) {
                                const toastIdProject = toast.loading('Saving ....');
                                createWarehouseOrderMutation(project, {
                                    async onSuccess(_data) {
                                        toast.success('ProjectInfo was created successfully', { id: toastIdProject });
                                        if (_data && service.length > 0) {
                                            const toastIdService = toast.loading('Saving ....');
                                            createServiceOrderMutation(service, {
                                                async onSuccess(_data) {
                                                    toast.success('ServiceInfo was created successfully', { id: toastIdService });
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    localStorage.removeItem('rentOrder-OrderInfo');
                                                    localStorage.removeItem('projectInfo');
                                                    localStorage.removeItem('serviceInfo');
                                                    localStorage.removeItem('tableData');
                                                    localStorage.removeItem('tableDataService');
                                                    localStorage.removeItem('subTableData');
                                                    localStorage.removeItem('subTableDataService');
                                                    localStorage.removeItem('update');
                                                    closeModal();
                                                    resetForm();
                                                },
                                                onError(error: any) {
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdService,
                                                    });
                                                },
                                            });
                                        }
                                    },
                                    onError(error: any) {
                                        toast.error(error.response.data.message || 'error occurred please try again', {
                                            id: toastIdProject,
                                        });
                                    },
                                });
                            }
                        }
                    },
                    onError(error: any) {
                        toast.error(error.response.data.message || 'error occurred please try again', {
                            id: toastId,
                        });
                    },
                });
            }
        } else {
            let orderInfoData = {};
            orderInfoData = {
                ...valuesOrderInfo,
                rentUnitPrice: Number(valuesOrderInfo.rentUnitPrice),
                rentArea: Number(valuesOrderInfo.rentArea),
                rentLengthInDays: Number(valuesOrderInfo.rentLengthInDays),
                vehicleId: values.transport, id,
                isPercentOfValueForOneDay: valuesOrderInfo.percentOfValueForOneDay > 0 ? true : false,
                isPricePerToneForOneDay: valuesOrderInfo.pricePerToneForOneDay > 0 ? true : false
            };
            let projectInfoData: any = {};
            let serviceInfoData: any = {};

            if (tableType === 'Rent') {
                productServicSubState.map((item: any) => {
                    let orderData = '';
                    projectOrderData?.data?.result?.map((order: any) => {
                        if (projectIdDatas === order.projectId) {
                            orderData = order.id;
                        }
                    })
                    serviceInfoData = {
                        ...defaultStateServiceInfo,
                        'id': item.updateId,
                        "number": item['Kodas'],
                        "serviceId": item.id,
                        "projectId": projectIdDatas,
                        "projectOrderId": id,
                        "quantity": Number(item.Kiekis),
                        "discount": Number(item['Nuolaida']),
                        "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                        "totPrice": Number(item['Viso']),
                        "startOn": item.Pradžia,
                    }
                })

                productSubState.map((item: any) => {
                    let warehouseProjectIdData = 'string', priceData = '';
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
                    projectInfoData = {
                        'id': item.updateId,
                        'type': 'loans',
                        'quantity': Number(item.Kiekis),
                        'number': item['Kodas'],
                        'warehouseProductId': warehouseProjectIdData,
                        'projectId': projectIdDatas,
                        'projectOrderId': id,
                        'basePrice': priceData,
                        'discount': Number(item['Nuolaida']),
                        'discountedPrice': Number(item['Vertė 1 produkto']),
                        'rentFactor': Number(item['Kaina rankiniu']),
                        'isCustomRentPrice': item['Kaina rankiniu'] > 0 ? true : false,
                        "customUnitRentPriceForOneDay": Number(item['Kaina rankiniu']),
                        "customTotalRentPriceForOneDay": 0,
                        "unitRentPriceForOneDay": 0,
                        "totalRentPriceForOneDay": 0,
                        "note": "note",
                        "createdBy": tokenData,
                        "isQuantityContstant": false,
                    }
                })
            } else if (tableType === 'Sale') {
                serviceSaleSub.map((item: any) => {
                    let orderData = '';
                    projectOrderData?.data?.result?.map((order: any) => {
                        if (projectIdDatas === order.projectId) {
                            orderData = order.id;
                        }
                    })
                    serviceInfoData = {
                        ...defaultStateServiceInfo,
                        'id': item.updateId,
                        "number": item['Kodas'],
                        "serviceId": item.id,
                        "projectId": projectIdDatas,
                        "projectOrderId": id,
                        "quantity": item.Kiekis,
                        "discount": item['Nuolaida'],
                        "discountedUnitPrice": item['Kaina(€/Vnt)'],
                        "totPrice": item['Viso'],
                        "startOn": item.Pradžia,
                    }
                })

                productSaleSubState.map((item: any) => {
                    let warehouseProjectIdData = 'string', priceData = '';
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
                    projectInfoData = {
                        'id': item.updateId,
                        'type': 'sales',
                        'quantity': Number(item.Kiekis),
                        'number': item['Kodas'],
                        'warehouseProductId': warehouseProjectIdData,
                        'projectId': projectIdDatas,
                        'projectOrderId': id,
                        'basePrice': priceData,
                        'discount': Number(item['Nuolaida']),
                        'discountedPrice': Number(item['Vertė 1 produkto']),
                        'rentFactor': item['Kaina rankiniu'],
                        'isCustomRentPrice': item['Kaina rankiniu'] > 0 ? true : false,
                        "customUnitRentPriceForOneDay": 0,
                        "customTotalRentPriceForOneDay": 0,
                        "unitRentPriceForOneDay": 0,
                        "totalRentPriceForOneDay": 0,
                        "note": "note",
                        "createdBy": tokenData,
                        "isQuantityContstant": false,
                    }
                })
            }

            if (tableType === 'Rent') {
                console.log('edit test', orderInfoData)
                const toastId = toast.loading('Updating ....');
                updateMutationProjectOrderMutation(orderInfoData, {
                    async onSuccess(_data: any) {
                        toast.success('OrderInfo was updated successfully', { id: toastId });
                        if (_data && Object.keys(projectInfoData).length > 0) {
                            const toastIdProject = toast.loading('Saving ....');
                            updateMutationWarehouseOrderMutation(projectInfoData, {
                                async onSuccess(_dataProject) {
                                    toast.success('ProjectInfo was updated successfully', { id: toastIdProject });
                                    if (_dataProject && Object.keys(serviceInfoData).length > 0) {
                                        const toastIdService = toast.loading('Saving ....');
                                        updateMutationServiceOrder(serviceInfoData, {
                                            async onSuccess(_data) {
                                                toast.success('ServiceInfo was updated successfully', { id: toastIdService });
                                                localStorage.removeItem('rentOrder-OrderInfo');
                                                localStorage.removeItem('projectInfo');
                                                localStorage.removeItem('serviceInfo');
                                                localStorage.removeItem('tableData');
                                                localStorage.removeItem('tableDataService');
                                                localStorage.removeItem('subTableData');
                                                localStorage.removeItem('subTableDataService');
                                                localStorage.removeItem('update');
                                                closeModal();
                                                resetForm();
                                            },
                                            onError(error: any) {
                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                    id: toastIdService,
                                                });
                                            },
                                        });
                                    }
                                },
                                onError(error: any) {
                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                        id: toastIdProject,
                                    });
                                },
                            });
                        }
                    },
                    onError(error: any) {
                        toast.error(error.response.data.message || 'error occurred please try again', {
                            id: toastId,
                        });
                    },
                });
            } else if (tableType === 'Sale') {
                console.log('dataDF')
                const toastIdProject = toast.loading('updating ....');
                updateMutationWarehouseOrderMutation(projectInfoData, {
                    async onSuccess(_data) {
                        toast.success('ProjectInfo was updated successfully', { id: toastIdProject });
                        const toastIdService = toast.loading('Saving ....');
                        updateMutationServiceOrder(serviceInfoData, {
                            async onSuccess(_data) {
                                toast.success('ServiceInfo was updated successfully', { id: toastIdService });
                                localStorage.removeItem('rentOrder-OrderInfo');
                                localStorage.removeItem('projectInfo');
                                localStorage.removeItem('serviceInfo');
                                localStorage.removeItem('tableData');
                                localStorage.removeItem('tableDataService');
                                localStorage.removeItem('subTableData');
                                localStorage.removeItem('subTableDataService');
                                localStorage.removeItem('update');
                                closeModal();
                                resetForm();
                            },
                            onError(error: any) {
                                toast.error(error.response.data.message || 'error occurred please try again', {
                                    id: toastIdService,
                                });
                            },
                        });
                    },
                    onError(error: any) {
                        toast.error(error.response.data.message || 'error occurred please try again', {
                            id: toastIdProject,
                        });
                    },
                });

            }
        }
    };

    const handleClick = async () => {
        //Update order information, products, services information and save transport data.
        closeModal();
        resetForm();
        setisAskModalOpen(false)
        setisSuccessModalOpen(true)
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const onFocusCreation = (e: any) => {
        setCreationType('date')
    }

    const onBlurtypeCreation = (e: any) => {
        if (e.target.value === "") {
            setCreationType('string')
        }
    }

    const onFocusStart = (e: any) => {
        setStartDateType('date')
    }

    const onBlurtypeStart = (e: any) => {
        if (e.target.value === "") {
            setStartDateType('string')
        }
    }

    const onFocusEnd = (e: any) => {
        setEndDateType('date')
    }

    const onBlurtypeEnd = (e: any) => {
        if (e.target.value === "") {
            setEndDateType('string')
        }
    }

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
                productSubState[index]['Rent'] = productSubState[index]['Kaina rankiniu'] * projectOrderData;
                setProductSubState([...productSubState]);
            }
        })
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
                                            name="remark"
                                            handleChange={handleChangeOrderInfo}
                                            placeholder="Name"
                                            value={valuesOrderInfo.remark}
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
                        <Collapsible isOpen={false} title="Services">
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
                                                hide={['id', 'Vertė 1 produkto']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickMinusButton={onClickMinusButtonService}
                                                onChangeInputService={onChangeInputService}
                                            />
                                            :
                                            <ServiceSubTable
                                                data={serviceSaleSub || []}
                                                uniqueCol="id"
                                                hide={['id', 'Vertė 1 produkto']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                                onClickMinusButton={onClickMinusButtonService}
                                                onChangeInputService={onChangeInputService}
                                            />
                                    }
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible isOpen={true} title="Transport">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <CustomSelect
                                        name="transport"
                                        handleChange={handleChange}
                                        placeholder="Transport *"
                                        value={values.transport}
                                        options={
                                            vehiclesData?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Save</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <RemoveModal
                handleClickAddAnother={() => handleClick()}
                isUpdate={true}
                show={isAskModalOpen}
                onHide={() => setisAskModalOpen(false)}
                setShow={setisAskModalOpen}
            />
            <SuccessModal
                isUpdate={true}
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
            />
        </div>
    );
}
