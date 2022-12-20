import React, { useState, useEffect } from 'react';
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
import AddNewRentOrderModa from "./AddNewRentOrderModal2";
import Table from '../../Organisms/tables/TableProjectModal';
import SubTable from '../../Organisms/tables/TableProjectSubModal';
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import SubTableSale from '../../Organisms/tables/TableProjectSaleSubModal';

import { productStore } from '../../../store/products.store';
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';

interface IModalProps extends ModalProps {
    storeData?: any;
    idData?: any;
    isUpdating?: boolean;
    additional?: boolean;
    handleSuccess: () => void;
    tableType?: string;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

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

export default function AddNewRentOrderModal1({
    setShow,
    storeData,
    idData,
    additional = false,
    tableType = 'Rent',
    isUpdating,
    handleSuccess,
    ...props
}: IModalProps) {
    let orderInfo: any = localStorage.getItem('rentOrder-OrderInfo');
    let isUpdateData: any = localStorage.getItem('update');
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [valuesOrderInfo, setValuesOrderInfo] = useState<any>({ ...defaultStateOrderInfo });
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    const { data: producttypeData } = productType.getAll();
    const { data: productgroupData } = productGroup.getAll();
    const { data: productData } = productStore.getAll();
    const { data: warehouseOrdersData } = warehouseStore.getAllWarehosueOrders();
    const { data: projectOrdersData } = projectsOrdersStore.getAll();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();

    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);

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

    const [productSubState, setProductSubState] = useState<any>([]);

    useEffect(() => {
        let orderInfoData = JSON.parse(orderInfo);
        if (orderInfoData) {
            setValuesOrderInfo(orderInfoData);
        }
    }, [orderInfo]);


    let initialData: any = [];
    let productMockData: any = [];
    let salesTableData: any = [];

    if (isUpdateData === 'edit') {
        warehouseOrdersData?.data?.result.map((item: any) => {

            if (item.projectId === projectOrderData?.data?.result.projectId && item.projectOrderId === id) {
                let valueData: any = 0;
                warehouseProducts?.data?.result.map((warehouseProduct: any) => {
                    if (warehouseProduct.id === item.warehouseProductId) {
                        valueData = warehouseProduct.price;
                        productData?.data?.result.map((productData: any) => {
                            if (productData.id === warehouseProduct.productId) {
                                initialData.push({
                                    'id': productData.id,
                                    'Kodas': productData.number,
                                    'Pavadinimas': productData.name,
                                    'Svoris': productData.weight,
                                    'Plotas': productData.area,
                                    'Vertė': valueData,
                                    'Nuolaida': item.discount,
                                    'Vertė 1 produkto': item.discountedPrice,
                                    'Viso': item.discountedPrice * item.quantity,
                                    'Kaina rankiniu': item.isCustomRentPrice ? item.customUnitRentPriceForOneDay : 0,
                                    'Kiekis': item.quantity,
                                    'updateId': item.id
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (isUpdateData === 'edit' || isUpdating) {
            console.log('update')
            setProductSubState([...initialData]);
            setProductSaleSubState([...initialData]);

            productData?.data?.result.map((item: any) => {
                let groupData: any = '', typeData: any = '';
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
                let priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        priceData = warehouse.price;
                    }
                })

                if (initialData.length > 0) {
                    initialData.map((initial: any) => {
                        if (item.id !== initial.id) {
                            productMockData.push({
                                'id': item.id,
                                'Kodas': item.number,
                                'Pavadinimas': item.name,
                                'Svoris': item.weight,
                                'Plotas': item.area,
                                'Vertė': priceData,
                                'Tipas': typeData,
                                'Grupė': groupData,
                            })
                            salesTableData.push({
                                'id': item.id,
                                'Kodas': item.number,
                                'Pavadinimas': item.name,
                                'Svoris': item.weight,
                                'Plotas': item.area,
                                'Vertė': priceData,
                                'Tipas': typeData,
                                'Grupė': groupData,
                            })
                        }
                    })
                } else {
                    console.log('create')
                    productMockData.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': item.weight,
                        'Plotas': item.area,
                        'Vertė': priceData,
                        'Tipas': typeData,
                        'Grupė': groupData,
                    })
                    salesTableData.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': item.weight,
                        'Plotas': item.area,
                        'Vertė': priceData,
                        'Tipas': typeData,
                        'Grupė': groupData,
                    })
                }
                setProductMockDataState([...productMockData]);
                setProductMockSaleState([...salesTableData]);
            })
        } else if (localStorage.getItem('update') !== 'edit') {
            productData?.data?.result.map((item: any) => {
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
                let priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        priceData = warehouse.price;
                    }
                })
                productMockData.push({
                    'id': item.id,
                    'Kodas': item.number,
                    'Pavadinimas': item.name,
                    'Svoris': item.weight,
                    'Plotas': item.area,
                    'Vertė': priceData,
                    'Tipas': typeData,
                    'Grupė': groupData,
                })
                salesTableData.push({
                    'id': item.id,
                    'Kodas': item.number,
                    'Pavadinimas': item.name,
                    'Svoris': item.weight,
                    'Plotas': item.area,
                    'Vertė': priceData,
                    'Tipas': typeData,
                    'Grupė': groupData,
                })
                if (isUpdateData !== 'edit') {
                    setProductMockDataState([...productMockData]);
                    setProductMockSaleState([...salesTableData]);
                }
            })
        }
    }, [isUpdateData, productgroupData, producttypeData, warehouseProducts]);

    const [productId, setProductId] = useState<string>('');
    const [productSubId, setProductSubId] = useState<string>('');
    const [productIdSale, setProductIdSale] = useState<string>('');
    const [productSubIdSale, setProductSubIdSale] = useState<string>('');
    const [productMockDataState, setProductMockDataState] = useState<any>([]);
    const [productMockSaleState, setProductMockSaleState] = useState<any>([]);
    const [productSaleSubState, setProductSaleSubState] = useState<any>([]);

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


    const handleChangeOrderInfo = (e: ValueType) => {
        setValuesOrderInfo({ ...valuesOrderInfo, [e.name]: e.value });
    };

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
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
        if (tableType === 'Rent') {
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
                subData.push({
                    'type': 'loans',
                    'quantity': Number(item.Kiekis),
                    'number': item['Kodas'],
                    'warehouseProductId': warehouseProjectIdData,
                    'projectId': projectIdDatas,
                    'projectOrderId': orderData,
                    'basePrice': priceData,
                    'discount': Number(item['Nuolaida']),
                    'discountedPrice': Number(item['Vertė 1 produkto']),
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
                subData.push({
                    ...values,
                    'type': 'sales',
                    'quantity': Number(item.Kiekis),
                    'number': item['Kodas'],
                    'warehouseProductId': warehouseProjectIdData,
                    'projectId': projectIdDatas,
                    'projectOrderId': orderData,
                    'basePrice': priceData,
                    'discount': Number(item['Nuolaida']),
                    'discountedPrice': Number(item['Vertė 1 produkto']),
                    // 'rentFactor': item['Sale'],
                    'isCustomRentPrice': false,
                    // "customUnitRentPriceForOneDay": item['Sale'],
                    "customTotalRentPriceForOneDay": 0,
                    "unitRentPriceForOneDay": 0,
                    "totalRentPriceForOneDay": 0,
                })
            })
        }

        if (tableType === 'Rent') {
            localStorage.setItem('tableData', JSON.stringify(productMockDataState));
            localStorage.setItem('subTableData', JSON.stringify(productSubState));
        } else if (tableType === 'Sale') {
            localStorage.setItem('tableData', JSON.stringify(productMockSaleState));
            localStorage.setItem('subTableData', JSON.stringify(productSaleSubState));
        }
        localStorage.setItem('rentOrder-OrderInfo', JSON.stringify(valuesOrderInfo));
        localStorage.setItem('projectInfo', JSON.stringify(subData));

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

    const onChangePage = (_page: number) => {
        return {};
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

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {`Naujas užsakymas`}
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
                        <Collapsible isOpen={true} title="Produktai">
                            <div className="p-3 row">
                                <div className="mb-5">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        {
                                            tableType === 'Sale' ?
                                                <Table
                                                    data={productMockSaleState || []}
                                                    uniqueCol="id"
                                                    rowsPerPage={20}
                                                    hide={['id', 'updateId']}
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
                                                    hide={['id', 'isChecked', 'updateId']}
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
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Next</span>
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
            <AddNewRentOrderModa
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
