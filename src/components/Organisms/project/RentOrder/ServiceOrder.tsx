import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { employeeStore } from '../../../../store/employees.store';
import Table from '../../../Organisms/tables/TableProjectModal';
import Collapsible from '../../../Molecules/Modal/Collapsible';
import ServiceSubTable from '../../../Organisms/tables/TableServiceSubModal';

import { servicesStore } from '../../../../store/services.store';
import { serviceCategory } from '../../../../store/service-categories.store';
import { serviceSubCategory } from '../../../../store/service-subcategories.store';
import { serviceOrder } from '../../../../store/service-order.store';
import { projectsOrdersStore } from '../../../../store/project-orders.store';
import { productStore } from '../../../../store/products.store';
import { warehouseStore } from '../../../../store/warehouse.store';
import { productType } from '../../../../store/producttype.store';
import { productGroup } from '../../../../store/productgroup.store';

interface IModalProps {
    rentorderId?: string;
    isUpdating?: boolean;
    additional?: boolean;
    idData?: any;
    originService?: any;
    onChangeInput?: (e: any, key: any) => void;
    handleSuccess: () => void;
}

export default function ServiceOrder({
    onChangeInput,
    setShow,
    storeData,
    idData,
    additional = false,
    tableType = 'Rent',
    isUpdating,
    isOpenModal,
    handleSuccess,
    currentData,
    originService,
    sendOriginService,
    ...props
}: any) {
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const [valueArr, setValueArr] = useState<any>([]);

    const [productServiceMockDataState, setProductServiceMockDataState] = useState<any>([]);
    const [serviceSale, setServiceSale] = useState<any>([]);
    const [productServicSubState, setProductServicSubState] = useState<any>([]);
    const [serviceSaleSub, setServiceSaleSub] = useState<any>([]);

    const [serviceId, setServiceId] = useState<string>('');
    const [serviceSubId, setServiceSubId] = useState<string>('');

    const [serviceIdSale, setServiceIdSale] = useState<string>('');
    const [serviceSubIdSale, setServiceSubIdSale] = useState<string>('');


    const { data: serviceData } = servicesStore.getAll();
    const { data: serviceCatData } = serviceCategory.getAll();
    const { data: serviceSubCatData } = serviceSubCategory.getAll();
    const { data: serviceOrderData } = serviceOrder.getAll();
    const { data: projectOrderDatas } = projectsOrdersStore.getById(id as string);

    let servicesData: any = [];


    useEffect(() => {
        if (isUpdating) {

            let data: any = [];
            if (sendOriginService.length > 0) {
                setProductServicSubState([...sendOriginService]);
                setServiceSaleSub([...sendOriginService]);
                data = serviceData?.data?.result.filter((item: any) => !sendOriginService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
            } else {
                setProductServicSubState([...originService]);
                setServiceSaleSub([...originService]);
                data = serviceData?.data?.result.filter((item: any) => !originService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
            }

            data?.map((item: any) => {
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
                servicesData.push({
                    'id': item.id,
                    'Kodas': item.number,
                    'Pavadinimas': item.name,
                    'Vnt': item.unit,
                    // 'Kategorija': catData,
                    // 'Tipas': subCatData,
                    'Testinė': 'Delay',
                })

                setProductServiceMockDataState([...servicesData]);
                setServiceSale([...servicesData]);
            })
        } else {
            if (currentData.length === 0 && serviceData) {
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
                        // 'Kategorija': catData,
                        // 'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                    setProductServiceMockDataState([...servicesData]);
                    setServiceSale([...servicesData]);
                })
            }
        }

    }, [isUpdating, serviceData, serviceCatData, serviceSubCatData, projectOrderDatas]);

    useEffect(() => {
        if (serviceData) {
            serviceData?.data?.result.map((item: any) => {
                if (item.id === serviceId) {
                    let startOn = new Date().toJSON().slice(0, 10);
                    // serviceOrderData?.data?.result.map((serviceOrder: any) => {
                    //     if (serviceOrder.projectId === projectIdDatas) {
                    //         startOn = serviceOrder.startOn;
                    //     }
                    // })
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
                    // serviceOrderData?.data?.result.map((serviceOrder: any) => {
                    //     if (serviceOrder.projectId === projectIdDatas) {
                    //         startOn = serviceOrder.startOn;
                    //     }
                    // })
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
                    setValueArr([...productServicSubState]);
                    setServiceId('');
                } else if (tableType === "Sale") {
                    setServiceSaleSub([...serviceSaleSub]);
                    setValueArr([...serviceSaleSub]);
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
                        // 'Kategorija': catData,
                        // 'Tipas': subCatData,
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
                        // 'Kategorija': catData,
                        // 'Tipas': subCatData,
                        'Testinė': 'Delay',
                    })
                }
                if (tableType === "Rent") {
                    setProductServiceMockDataState([...productServiceMockDataState]);
                    setValueArr([...productServicSubState]);
                    setServiceSubId('');
                } else if (tableType === "Sale") {
                    setServiceSale([...serviceSale]);
                    setValueArr([...serviceSaleSub]);
                    setServiceSubIdSale('');
                }

            })
        }
    }, [productServicSubState.length, serviceSaleSub.length]);


    useEffect(() => {
        onChangeInput && onChangeInput(valueArr, 2);
    }, [valueArr]);

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
                    setValueArr([...productServicSubState]);
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
            <div className="body-content px-4 modal-border">
                <Collapsible isOpen={isOpenModal === 2 ? true : false} title="Services">
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
                                        onChangePage={() => { }}
                                        onClickPlusButton={onClickPlusButtonService}
                                    />
                                    :
                                    <Table
                                        data={serviceSale || []}
                                        uniqueCol="id"
                                        hide={['id', 'imageUrl']}
                                        actions={[]}
                                        handleClickRow={() => { }}
                                        onChangePage={() => { }}
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
                                        onChangePage={() => { }}
                                        onClickMinusButton={onClickMinusButtonService}
                                        onChangeInputService={onChangeInputService}
                                    />
                                    :
                                    <ServiceSubTable
                                        data={serviceSaleSub || []}
                                        uniqueCol="id"
                                        hide={['id', 'Nuolaida', 'Vertė 1 produkto', 'updateId']}
                                        handleClickRow={() => { }}
                                        onChangePage={() => { }}
                                        onClickMinusButton={onClickMinusButtonService}
                                        onChangeInputService={onChangeInputService}
                                    />
                            }
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
