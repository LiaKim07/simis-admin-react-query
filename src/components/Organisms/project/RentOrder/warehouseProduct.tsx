import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { employeeStore } from '../../../../store/employees.store';
import Table from '../../../Organisms/tables/TableProjectModal';
import SubTable from '../../../Organisms/tables/TableProjectSubModal';
import SubTableSale from '../../../Organisms/tables/TableProjectSaleSubModal';
import Collapsible from '../../../Molecules/Modal/Collapsible';

import { productStore } from '../../../../store/products.store';
import { productType } from '../../../../store/producttype.store';
import { productGroup } from '../../../../store/productgroup.store';
import { warehouseStore } from '../../../../store/warehouse.store';
import { projectsOrdersStore } from '../../../../store/project-orders.store';

interface IModalProps {
    rentorderId?: string;
    isUpdating?: boolean;
    additional?: boolean;
    idData?: any;
    originWarehouse?: any;
    currentData?: any;
    onChangeInput?: (e: any, key: any) => void;
    handleSuccess: () => void;
}

export default function WarehouseProduct({
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
    originWarehouse,
    sendOriginWarehouse,
    ...props
}: any) {
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const [valueArr, setValueArr] = useState<any>([]);

    const [rentProductTable, setRentProductTable] = useState<any>([]);
    const [saleProductTable, setSaleProductTable] = useState<any>([]);

    const [productSubState, setProductSubState] = useState<any>([]);
    const [productSaleSubState, setProductSaleSubState] = useState<any>([]);

    const [productId, setProductId] = useState<string>('');
    const [productIdSale, setProductIdSale] = useState<string>('');
    const [productSubId, setProductSubId] = useState<string>('');
    const [productSubIdSale, setProductSubIdSale] = useState<string>('');

    const { data: producttypeData } = productType.getAll();
    const { data: productgroupData } = productGroup.getAll();
    const { data: productData } = productStore.getAll();
    const { data: projectOrdersData } = projectsOrdersStore.getAll();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();

    // const { data: warehouseOrdersData } = warehouseStore.getAllWarehosueOrders();

    let productMockData: any = [];
    let salesTableData: any = [];

    useEffect(() => {
        if (isUpdating) {
            console.log('update test')
            let data: any = [];
            if (sendOriginWarehouse.length > 0) {
                setProductSubState([...sendOriginWarehouse]);
                setProductSaleSubState([...sendOriginWarehouse]);
                data = productData?.data?.result.filter((item: any) => !sendOriginWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
            } else {
                setProductSubState([...originWarehouse]);
                setProductSaleSubState([...originWarehouse]);
                data = productData?.data?.result.filter((item: any) => !originWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
            }

            data.map((item: any, index: number) => {
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

                if (item.weight !== 0 && priceData) {
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

            setRentProductTable([...productMockData]);
            setSaleProductTable([...salesTableData]);
        } else {
            if (currentData.length === 0) {
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
                    if (item.weight !== 0 && priceData) {
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

                    setRentProductTable([...productMockData]);
                    setSaleProductTable([...salesTableData]);
                })
            }

        }
    }, [productData, productgroupData, producttypeData]);

    useEffect(() => {
        onChangeInput && onChangeInput(valueArr, 1);
    }, [valueArr]);

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
                    let priceData = '';
                    warehouseProducts?.data?.result.map((warehouse: any) => {
                        if (item.id === warehouse.productId) {
                            priceData = warehouse.price;
                        }
                    })
                    rentProductTable.push({
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
                setRentProductTable([...rentProductTable]);
                setValueArr([...productSubState]);
                setProductSubId('');
            })
        }
    }, [productSubState.length]);


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
                setValueArr([...productSubState]);
                setProductId('');
            })
        }
    }, [rentProductTable.length]);

    useEffect(() => {
        console.log('table1')
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

                    let priceData = '';
                    warehouseProducts?.data?.result.map((warehouse: any) => {
                        if (item.id === warehouse.productId) {
                            priceData = warehouse.price;
                        }
                    })

                    saleProductTable.push({
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
                setSaleProductTable([...saleProductTable]);
                setProductSubIdSale('');
            })
        }
    }, [productSaleSubState.length]);

    useEffect(() => {
        console.log('table2')
        if (productData) {
            productData?.data?.result.map((item: any) => {
                let priceData = '';
                warehouseProducts?.data?.result.map((warehouse: any) => {
                    if (item.id === warehouse.productId) {
                        priceData = warehouse.price;
                    }
                })
                if (item.id === productIdSale) {
                    productSaleSubState.push({
                        'id': item.id,
                        'Kodas': item.number,
                        'Pavadinimas': item.name,
                        'Svoris': 0,
                        'Plotas': 0,
                        'Vertė': priceData,
                        'Nuolaida': 0,
                        'Vertė 1 produkto': 0,
                        'Viso': 0,
                        'Kiekis': 0,
                        "Kaina rankiniu": 0,
                    })
                }
                setProductSaleSubState([...productSaleSubState]);
                setValueArr([...productSaleSubState]);
                setProductIdSale('');
            })
        }
    }, [saleProductTable.length]);

    const onClickPlusButton = (row: any) => {
        let i = 0;
        rentProductTable?.map((item: any, key: number) => {
            if (item.id === row.id) {
                i = key;
            }
        })
        rentProductTable.splice(i, 1);
        setRentProductTable([...rentProductTable]);
        setProductId(row.id);
    }

    const onClickSalePlusButton = (row: any) => {
        let i = 0;
        saleProductTable.map((item: any, key: number) => {
            if (item.id === row.id) {
                i = key;
            }
        })
        saleProductTable.splice(i, 1);
        setSaleProductTable([...saleProductTable])
        setProductIdSale(row.id);
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

    const onChangeInputRent = (e: any, idData: any, row: any) => {
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
                setValueArr([...productSubState]);
            }
        })
    };

    return (
        <div className="side-modal">
            <div className="body-content px-4 modal-border">
                <Collapsible isOpen={isOpenModal === 1 ? true : false} title="Produktai">
                    <div className="p-3 row">warehouseProduct
                        <div className="mb-5">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                {
                                    tableType === 'Sale' ?
                                        <Table
                                            data={saleProductTable || []}
                                            uniqueCol="id"
                                            rowsPerPage={20}
                                            hide={['id', 'updateId', 'Plotas']}
                                            actions={[]}
                                            onChangePage={() => { }}
                                            handleClickRow={() => { }}
                                            onClickPlusButton={onClickSalePlusButton}
                                        />
                                        :
                                        <Table
                                            data={rentProductTable || []}
                                            uniqueCol="id"
                                            rowsPerPage={20}
                                            hide={['id', 'isChecked', 'updateId', 'Plotas']}
                                            actions={[]}
                                            onChangePage={() => { }}
                                            handleClickRow={() => { }}
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
                                            hide={['id', 'updateId', 'Kaina rankiniu', 'Plotas']}
                                            onChangePage={() => { }}
                                            handleClickRow={() => { }}
                                            onClickMinusButton={onClickSaleMinusButton}
                                            onChangeInputSale={onChangeInputSale}
                                        />
                                        :
                                        <SubTable
                                            data={productSubState || []}
                                            uniqueCol="id"
                                            hide={['id', 'updateId', 'Plotas', 'Kaina rankiniu']}
                                            onChangePage={() => { }}
                                            handleClickRow={() => { }}
                                            onClickMinusButton={onClickMinusButton}
                                            onChangeInput={onChangeInputRent}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
