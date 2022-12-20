import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';

import { employeeStore } from '../../../store/employees.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { productStore } from '../../../store/products.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { vehiclesStore } from '../../../store/vehicles.store';

import { ModalProps } from '../../../types/props';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import TableProduct from '../../Organisms/tables/TableProjectReturnProduct';
import TableService from '../../Organisms/tables/TableProjectReturnService';
import ProjectRentOrderTable from '../../Organisms/tables/TableProjectReturnOrder';
import SuccessModal from "../Modals/SuccessModal";
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';

interface IModalProps extends ModalProps {
    projectReturnId?: string;
    isUpdating?: boolean;
    data?: any;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultStateOrderInfo: any = {
    "rentUnitPrice": 0,
    "rentArea": 0,
    "rentLengthInDays": 30,
    "isActive": false,
    "type": "returns",
    "projectId": "",
    "createdBy": tokenData,
    "totalRentPriceForPeriod": 0,
    "totalRentPriceForOneDay": 0,
    "rentFactor": 0,
    "number": "string",
    "vehicleId": "83714432-a40d-4e28-ae29-9ef45a0b92ee",
    "note": "",
    "totalBaseRentPriceForPeriod": 0,
    "totalBaseRentPriceForOneDay": 0,
    "isPercentOfValueForOneDay": false,
    "percentOfValueForOneDay": 0,
    "isPricePerToneForOneDay": false,
    "pricePerToneForOneDay": 0,
    "remark": "string",
    "projectLengthInDays": 0,
    "activatedOn": null,
};

const defaultState: any = {
    "type": "returns",
    "quantity": "",
    "note": "",
    "number": "string",
    "warehouseProductId": "",
    "projectId": "",
    "projectOrderId": "",
    "basePrice": 0,
    "discount": 0,
    "discountedPrice": 0,
    "rentFactor": 0,
    "isCustomRentPrice": false,
    "customUnitRentPriceForOneDay": 0,
    "customTotalRentPriceForOneDay": 0,
    "unitRentPriceForOneDay": 0,
    "totalRentPriceForOneDay": 0,
    "createdBy": tokenData,
    "isQuantityContstant": false,
    "repairCost": 0
};

export default function AddNewReturnOrderModal({
    setShow,
    projectReturnId,
    isUpdating = false,
    data,
    handleSuccess,
    ...props
}: IModalProps) {
    let projectId = localStorage.getItem('projectId');
    const { id } = useParams();
    const { data: projectOrderLatestData } = projectsOrdersStore.getByIdLatest(projectId as string);

    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [valuesOrderInfo, setValuesOrderInfo] = useState<any>({ ...defaultStateOrderInfo });
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    // const handleChange = (e: ValueType) => {
    //     setvalues({ ...values, [e.name]: e.value });
    // };
    // const handleChangenumber = (e: ValueType) => {
    //     setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    // };
    // const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseOrderReturn } = warehouseStore.getAllWarehosueOrdersReturn();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { mutateAsync: createWarehouseOrderMutation } = warehouseStore.createWarehouseOrder();
    const { mutateAsync: createProjectOrderMutation } = projectsOrdersStore.create();
    const { data: employee } = employeeStore.getAll();
    // const { data: products } = productStore.getAll();
    // const { data: warehosues } = warehouseStore.getAll();;
    // const { data: projectOrder } = projectsOrdersStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }
    const [tableData, setTableData] = useState<any>([]);
    const { data: product } = productStore.getAll();
    const { data: warehouse } = warehouseStore.getAll();
    const { mutateAsync: updateMutationWarehouseOrderMutation } = warehouseStore.updateWarehouseOrder();

    const { data: resData } = warehouseStore.getWarehosueOrdersById(projectId as string);
    // const res = warehouseStore.getWarehosueOrdersById(projectId as string); console.log('ddddd', res)

    useEffect(() => {
        if (isUpdating) {
            let tableData: any = [];
            warehouseOrderReturn?.data?.result.map((item: any) => {
                if (item.projectId === projectId) {
                    warehouseProducts?.data?.result.map((warehouseProduct: any) => {
                        if (warehouseProduct.id === item.warehouseProductId) {
                            resData?.data?.result.map((res: any) => {
                                if (warehouseProduct.id === res.warehouseProductId && projectOrderLatestData?.data?.result.projectId === projectId && projectOrderLatestData?.data?.result.id === item.projectOrderId) {

                                    let code: string = '';
                                    let name: string = '';
                                    // let warehouseData: string = '';
                                    let price: number = 0;
                                    product?.data?.result.map((product: any) => {
                                        if (product.id === warehouseProduct.productId) {
                                            code = product.number;
                                            name = product.name;
                                        }
                                    })
                                    warehouse?.data?.result.map((warehosue: any) => {
                                        if (warehosue.id === warehouseProduct.warehouseId) {
                                            // warehouseData = warehosue.name;
                                            price = warehosue.price * item.quantity;
                                        }
                                    })

                                    tableData.push({
                                        'id': item.id,
                                        'Kodas': code,
                                        'Pavadinimas': name,
                                        // 'Sandėlys': warehouseData,
                                        'Kiekis(Nuomoje)': res.currentLoanedOutQty,
                                        'Kiekis(Grąžinta,)': item.quantity,
                                        'Kiekis Likutiniame': (res.rentPrice).toFixed(2),
                                        // 'Neskaičiuoti': item.isCustomRentPrice,
                                        'Remonto kaina': item.repairCost,
                                        'price': (res.rentPrice.toFixed(2)),
                                        'Pastaba': item.note,
                                        'updateId': warehouseProduct.id
                                    })
                                }
                            })
                        }
                    })
                }
            })
            setTableData(tableData);
        } else {
            let productTableData: any = [];
            if (resData?.data?.result) {
                resData?.data?.result.map((item: any) => {
                    productTableData.push({
                        'id': item.warehouseProductId,
                        'Kaina': item.productNumber,
                        'Pavadinimas': item.productName,
                        'Sandėlys': item.warehouseName,
                        'Kiekis(Nuomoje)': item.currentLoanedOutQty,
                        'Kiekis(Grąžinta,)': '',
                        // 'Kiekis Likutiniame': (((item.rentPrice).toFixed(2)) * item.currentLoanedOutQty).toFixed(2),
                        'Kiekis Likutiniame': (item.currentLoanedOutQty).toFixed(2),
                        // 'Neskaičiuoti': item.isCustomRentPrice,
                        'Remonto kaina': '',
                        'price': (item.rentPrice.toFixed(2)),
                        'Pastaba': '',
                    })
                })
            }
            setTableData(productTableData);
        }
    }, [isUpdating]);
    const sleep = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms));

    const handleSubmit = async () => {
        let projectOrder = {
            ...valuesOrderInfo,
            'type': 'returns',
            'projectId': projectId,
        }

        let subData: any = [];
        if (isUpdating) {
            tableData.map((tablesData: any) => {
                subData.push({
                    ...values,
                    "type": "returns",
                    "quantity": tablesData['Kiekis(Grąžinta,)'] ? Number(tablesData['Kiekis(Grąžinta,)']) : 0,
                    "warehouseProductId": tablesData.id,
                    "projectId": projectId,
                    // "isCustomRentPrice": tablesData['Neskaičiuoti'],
                    "note": tablesData['Pastaba'],
                    "repairCost": Number(tablesData['Remonto kaina']),
                    'id': tablesData.id
                })
            })
        } else {
            tableData.map((tablesData: any) => {
                subData.push({
                    ...values,
                    "type": "returns",
                    "quantity": tablesData['Kiekis(Grąžinta,)'] ? Number(tablesData['Kiekis(Grąžinta,)']) : 0,
                    "warehouseProductId": tablesData.id,
                    "projectId": projectId,
                    "note": tablesData['Pastaba'],
                    "repairCost": Number(tablesData['Remonto kaina']),
                    // "isCustomRentPrice": tablesData['Neskaičiuoti']
                })
            })

        }
        if (!isUpdating) {
            const toastId = toast.loading('Saving ....');
            createProjectOrderMutation(projectOrder, {
                async onSuccess(_data: any) {
                    toast.success('OrderInfo was created successfully', { id: toastId });
                    if (_data) {
                        let project: any = [];
                        subData.map((item: any) => {
                            project.push({
                                ...item,
                                "projectOrderId": _data.data.result.id,
                            })
                        })
                        const toastIdProject = toast.loading('Saving ....');
                        createWarehouseOrderMutation(project, {
                            async onSuccess(_data) {
                                toast.success('ProjectInfo was created successfully', { id: toastIdProject });
                                queryClient.invalidateQueries(['warehouse-ordersReturn']);
                                queryClient.invalidateQueries(['project-orders']);
                                queryClient.invalidateQueries(['project-ordersLatestById']);
                                queryClient.invalidateQueries(['warehouse-products']);
                                queryClient.invalidateQueries(['warehouse-orders']);
                                queryClient.invalidateQueries(['warehouse-ordersById', projectId]);
                                await sleep(300);
                                closeModal();
                                resetForm();
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
        } else {
            console.log('update')
            let project: any = [];
            subData.map((item: any) => {
                project.push({
                    ...item,
                    "projectOrderId": id,
                })
            })
            console.log('data', project)
            //Update part
            if (project.length > 0) {
                const toastIdProject = toast.loading('Updating ....');
                Promise.all(project.map((data: any) => {
                    updateMutationWarehouseOrderMutation(data, {
                        async onSuccess(_dataProject) {
                            toast.success('ProjectInfo was updated successfully', { id: toastIdProject });
                            closeModal();
                            resetForm();
                        },
                        onError(error: any) {
                            toast.error(error.response.data.message || 'error occurred please try again', {
                                id: toastIdProject,
                            });
                        },
                    });
                }))
            }

        }
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const handleReturnEverything = () => {
        let data: any = [];
        tableData.map((item: any) => {
            data.push({
                ...item,
                'Kiekis(Grąžinta,)': item['Kiekis(Nuomoje)'],
                'Kiekis Likutiniame': 0
            })
        })
        setTableData(data);
    };

    const handleReturnNothing = () => {
        let data: any = [];
        tableData.map((item: any) => {
            data.push({
                ...item,
                'Kiekis(Grąžinta,)': 0,
                'Kiekis Likutiniame': item['Kiekis(Nuomoje)'] ? Number(item['Kiekis(Nuomoje)']) : 0,
            })
        })
        setTableData(data);
    };

    const onChangePage = (_page: number) => {
        return {};
    };

    const onChangeInput = (e: any, idData: any, row: any) => {
        if (row === 'Neskaičiuoti') {
            tableData.map((item: any, index: number) => {
                if (item.id === idData) {
                    tableData[index][row] = e.target.checked;
                    tableData[index]['Kiekis Likutiniame'] = ((Number(item['Kiekis(Nuomoje)'])) - (Number(item['Kiekis(Grąžinta,)']))).toFixed(2);
                    setTableData([...tableData]);
                }
            })
        } else {
            tableData.map((item: any, index: number) => {
                if (item.id === idData) {
                    tableData[index][row] = e.target.value;
                    tableData[index]['Kiekis Likutiniame'] = ((Number(item['Kiekis(Nuomoje)'])) - (Number(item['Kiekis(Grąžinta,)']))).toFixed(2);
                    setTableData([...tableData]);
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
                            {isUpdating ? 'Update Return Order' : 'Naujas gražinimas'}
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
                        <Collapsible isOpen={true} title="Produktai">
                            <div className="p-3 row">
                                <div className="mb-5">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        <ProjectRentOrderTable
                                            data={tableData || []}
                                            uniqueCol="id"
                                            hide={['id', 'price', 'updateId']}
                                            handleClickRow={() => { }}
                                            onChangePage={onChangePage}
                                            onChangeInput={onChangeInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Collapsible>

                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={handleReturnNothing}>
                                <Icon name="save" />
                                <span>&nbsp;Nieko negrąžinti</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={handleReturnEverything}>
                                <Icon name="save" />
                                <span>&nbsp;Grąžinti viską</span>
                            </Button>
                        </div>
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
