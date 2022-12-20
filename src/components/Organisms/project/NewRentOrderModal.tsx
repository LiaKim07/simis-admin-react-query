import React, { useEffect, useState } from 'react';
import { Modal, NavItem } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { serviceOrder } from '../../../store/service-order.store';
import { productStore } from '../../../store/products.store';
import { servicesStore } from '../../../store/services.store';

import { ModalProps } from '../../../types/props';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import ProjectOrderContent from "./RentOrder/projectOrder";
import WarehouseProductContent from "./RentOrder/warehouseProduct";
import ServiceProductContent from "./RentOrder/ServiceOrder";
import VehicleContent from "./RentOrder/Vihicle";

interface IModalProps extends ModalProps {
    rentorderId?: string;
    isUpdating?: boolean;
    additional?: boolean;
    idData?: any;
    tableType?: any;
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
    "repairCost": 0,
};

const defaultState: any = {
    "rentUnitPrice": 0,
    "rentArea": "",
    "rentLengthInDays": 30,
    "isActive": false,
    "type": "",
    "projectId": "",
    "createdBy": tokenData,
    "totalRentPriceForPeriod": "",
    "totalRentPriceForOneDay": 0,
    "rentFactor": 0,
    "number": "",
    "vehicleId": "",
    "note": "",
    "totalBaseRentPriceForPeriod": 0,
    "totalBaseRentPriceForOneDay": 0,
    "isPercentOfValueForOneDay": false,
    "percentOfValueForOneDay": 0,
    "isPricePerToneForOneDay": false,
    "pricePerToneForOneDay": 0,
    "remark": "",
    "projectLengthInDays": 0,
    "activatedOn": null,
    "isRentUnitPrice": false
};

export default function AddNewRentOrderModal({
    setShow,
    rentorderId,
    isUpdating = false,
    additional = false,
    idData,
    tableType = 'Rent',
    handleSuccess,
    ...props
}: IModalProps) {
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };
    let currentProjectOrder: any = {};
    if (isUpdating) {
        currentProjectOrder = projectsOrdersStore.getById(id as string);
    }

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [valuesWarehouse, setValuesWarehouse] = useState<any>([]);
    const [valuesService, setValuesService] = useState<any>([]);
    const [originProjectOrder, setOriginProjectOrder] = useState<any>({});
    const [originWarehouse, setOriginWarehouse] = useState<any>([]);
    const [originService, setOriginService] = useState<any>([]);
    const [sendOriginWarehouse, setSendOriginWarehouse] = useState<any>(originWarehouse);
    const [sendOriginService, setSendOriginService] = useState<any>(originService);
    const [sendProjdctOrder, setSendProjdctOrder] = useState<any>({});
    const [stepNum, setStepNum] = useState(0);

    const { mutateAsync: createProjectOrderMutation } = projectsOrdersStore.create();
    const { mutateAsync: updateMutationProjectOrderMutation } = projectsOrdersStore.update();
    const { mutateAsync: createWarehouseOrderMutation } = warehouseStore.createWarehouseOrder();
    const { mutateAsync: updateMutationWarehouseOrderMutation } = warehouseStore.updateWarehouseOrder();
    const { mutateAsync: removeWarehouseOrderMutation } = warehouseStore.removeWarehouseOrderById();
    const { mutateAsync: removeServiceOrderMutation } = serviceOrder.removeById();
    const { mutateAsync: createServiceOrderMutation } = serviceOrder.create();
    const { mutateAsync: updateMutationServiceOrder } = serviceOrder.update();

    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: warehouseOrdersData } = warehouseStore.getAllWarehosueOrders();
    const { data: productData } = productStore.getAll();
    const { data: serviceOrderData } = serviceOrder.getAll();
    const { data: serviceData } = servicesStore.getAll();

    useEffect(() => {
        if (isUpdating) {
            let initialDataWarehouse: any = [];
            let initialDataService: any = [];
            let initialDataProject: any = {};
            warehouseOrdersData?.data?.result.map((item: any) => {
                if (item.projectId === currentProjectOrder?.data?.data?.result.projectId && item.projectOrderId === id) {
                    let valueData: any = 0;
                    warehouseProducts?.data?.result.map((warehouseProduct: any) => {
                        if (warehouseProduct.id === item.warehouseProductId) {
                            valueData = warehouseProduct.price;
                            productData?.data?.result.map((productData: any) => {
                                if (productData.id === warehouseProduct.productId) {
                                    initialDataWarehouse.push({
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

            serviceOrderData?.data?.result.map((item: any) => {
                if (item.projectId === currentProjectOrder?.data?.data?.result.projectId && item.projectOrderId === id) {
                    serviceData?.data?.result.map((service: any) => {
                        if (service.id === item.serviceId) {
                            initialDataService.push({
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

            if (currentProjectOrder?.data?.data?.result) {
                initialDataProject = currentProjectOrder?.data?.data?.result;
            }

            setOriginWarehouse(initialDataWarehouse);
            setOriginService(initialDataService);
            setOriginProjectOrder(initialDataProject);
        }
    }, [isUpdating, warehouseOrdersData?.data, serviceOrderData?.data, projectOrder, currentProjectOrder?.data?.data?.result]);

    useEffect(() => {
        setStepNum(0);
    }, [stepNum > 3]);

    useEffect(() => {
        if (tableType === "Rent") {
            setStepNum(0);
        } else if (tableType === "Sale") {
            setStepNum(1);
        }
    }, [tableType]);

    const onChangeInput = async (data: any, stepKey: number) => {
        if (stepKey === 0) {
            console.log('data', data)
            setvalues(data);
            setSendProjdctOrder(data);
        } else if (stepKey === 1) {
            setValuesWarehouse(data);
            setSendOriginWarehouse(data);
        } else if (stepKey === 2) {
            setValuesService(data);
            setSendOriginService(data);
        } else if (stepKey === 3) {
            setvalues({ ...values, vehicleId: data });
        }
    }

    const handleSubmit = async () => {
        if (stepNum > 3) {
            setStepNum(0);
        }
        if (stepNum === 0) {
            if ((values.isRentUnitPrice && values.isPricePerToneForOneDay && values.isPercentOfValueForOneDay) || (values.isRentUnitPrice && values.isPricePerToneForOneDay) || (values.isPricePerToneForOneDay && values.isPercentOfValueForOneDay) || (values.isRentUnitPrice && values.isPercentOfValueForOneDay)) {
                const toastId = toast.loading('');
                toast.error('Prašome pasirinkti vieną mokėjimo būdą', {
                    id: toastId,
                });
                setStepNum(0);
            } else {
                setStepNum(stepNum + 1);
            }

        } else if (stepNum === 1) {
            if (valuesWarehouse.length > 0) {
                setStepNum(stepNum + 1);
            } else if (tableType === 'Rent' && valuesWarehouse.length === 0) {
                const toastId = toast.loading('');
                toast.error('Please select at least 1 data', {
                    id: toastId,
                });
            } else {
                setStepNum(stepNum + 1);
            }
        } else {
            setStepNum(stepNum + 1);
        }
        if (stepNum > 2) {
            let orderInfoData = {};
            let projectInfoData: any = [];
            let serviceInfoData: any = [];

            if (isUpdating) {
                let projectInfoDataRemove: any = [];
                let serviceInfoDataRemove: any = [];
                let projectInfoDataUpdate: any = [];
                let serviceInfoDataUpdate: any = [];
                let projectInfoDataAdd: any = [];
                let serviceInfoDataAdd: any = [];
                let initialUpdateData: any = [];
                let initialUpdateDataService: any = [];
                if (tableType === 'Rent') {
                    orderInfoData = {
                        ...values,
                        id: currentProjectOrder?.data?.data?.result.id,
                        rentUnitPrice: values.rentUnitPrice ? Number(values.rentUnitPrice) : 0,
                        rentArea: Number(values.rentArea),
                        percentOfValueForOneDay: Number(values.percentOfValueForOneDay),
                        rentLengthInDays: Number(values.rentLengthInDays),
                        isPercentOfValueForOneDay: values.percentOfValueForOneDay > 0 ? true : false,
                        isPricePerToneForOneDay: values.pricePerToneForOneDay > 0 ? true : false
                    };
                    console.log('edit data', orderInfoData)
                    let addDataService = valuesService.filter((item: any) => !originService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let updateDataService = valuesService.filter((item: any) => originService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let removeDataService = originService.filter((item: any) => !valuesService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    valuesService.map((item: any) => {
                        updateDataService.map((updateService: any) => {
                            if (item.id === updateService.id) {
                                initialUpdateDataService.push({
                                    ...defaultStateServiceInfo,
                                    'id': item.id,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })
                                serviceInfoDataUpdate.push({
                                    ...defaultStateServiceInfo,
                                    'id': item.updateId,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })

                            }
                        })

                        addDataService.map((add: any) => {
                            if (item.id === add.id) {
                                serviceInfoDataAdd.push({
                                    ...defaultStateServiceInfo,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })
                            }
                        })
                    })

                    let addData = valuesWarehouse.filter((item: any) => !originWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let updateData = valuesWarehouse.filter((item: any) => originWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let removeData = originWarehouse.filter((item: any) => !valuesWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))

                    valuesWarehouse.map((item: any) => {
                        updateData?.map((update: any) => {
                            if (item.id === update.id) {
                                let warehouseProjectIdData = 'string', priceData = '';
                                warehouseProducts?.data?.result.map((warehouse: any) => {
                                    if (item.id === warehouse.productId) {
                                        warehouseProjectIdData = warehouse.id;
                                        priceData = warehouse.price;
                                    }
                                })
                                initialUpdateData.push({
                                    'id': item.id,
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
                                    "repairCost": 0
                                })
                                projectInfoDataUpdate.push({
                                    'id': update.updateId,
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
                                    "repairCost": 0
                                })
                            }
                        })
                        addData.map((add: any) => {
                            if (item.id === add.id) {
                                let warehouseProjectIdData = 'string', priceData = '';
                                warehouseProducts?.data?.result.map((warehouse: any) => {
                                    if (item.id === warehouse.productId) {
                                        warehouseProjectIdData = warehouse.id;
                                        priceData = warehouse.price;
                                    }
                                })
                                projectInfoDataAdd.push({
                                    ...defaultStateProjectInfo,
                                    'type': 'loans',
                                    'quantity': Number(item.Kiekis),
                                    'number': item['Kodas'],
                                    'warehouseProductId': warehouseProjectIdData,
                                    'projectId': projectIdDatas,
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
                                    "repairCost": 0
                                })
                            }
                        })

                    })
                    originService?.map((origin: any) => {
                        removeDataService.map((remove: any) => {
                            if (origin.id === remove.id) {
                                serviceInfoDataRemove.push(origin.updateId);
                            }
                        })
                    })

                    originWarehouse.map((origin: any) => {
                        removeData.map((remove: any) => {
                            if (origin.id === remove.id) {
                                projectInfoDataRemove.push(remove.updateId);
                            }
                        })

                    })
                    const toastId = toast.loading('Updating ....');
                    let project: any = [];
                    let service: any = [];
                    console.log('edit data submit', orderInfoData)
                    updateMutationProjectOrderMutation(orderInfoData, {
                        async onSuccess(_data: any) {
                            toast.success('1. OrderInfo was updated successfully', { id: toastId });
                            queryClient.invalidateQueries(['project-orders']);
                            queryClient.invalidateQueries(['warehouse-orders']);
                            queryClient.invalidateQueries(['servicesOrder']);
                            if (_data) {
                                try {
                                    if (projectInfoDataUpdate.length > 0) {
                                        const toastIdProject = toast.loading('Updating ....');
                                        await Promise.all(projectInfoDataUpdate.map((data: any) => {
                                            updateMutationWarehouseOrderMutation(data, {
                                                async onSuccess(_dataProject) {
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    queryClient.invalidateQueries(['warehouse-orders']);
                                                    queryClient.invalidateQueries(['servicesOrder']);
                                                    toast.success('WarehouseOrder was updated successfully', { id: toastIdProject });
                                                },
                                                onError(error: any) {
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdProject,
                                                    });
                                                },
                                            });
                                        }))
                                    }
                                    if (serviceInfoDataUpdate.length > 0) {
                                        const toastIdProject = toast.loading('Updating ....');
                                        await Promise.all(serviceInfoDataUpdate.map((serviceData: any) => {
                                            updateMutationServiceOrder(serviceData, {
                                                async onSuccess(_dataProject) {
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    queryClient.invalidateQueries(['warehouse-orders']);
                                                    queryClient.invalidateQueries(['servicesOrder']);
                                                    toast.success('ServiceOrder was updated successfully', { id: toastIdProject });
                                                },
                                                onError(error: any) {
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdProject,
                                                    });
                                                },
                                            });
                                        }))
                                    }
                                    if (projectInfoDataAdd.length > 0) {
                                        projectInfoDataAdd.map((item: any) => {
                                            project.push({
                                                ...item,
                                                "projectOrderId": id,
                                            })
                                        })
                                        const toastIdProject = toast.loading('Saving ....');
                                        await createWarehouseOrderMutation(project, {
                                            async onSuccess(_dataWarehouse) {
                                                queryClient.invalidateQueries(['project-orders']);
                                                queryClient.invalidateQueries(['warehouse-orders']);
                                                queryClient.invalidateQueries(['servicesOrder']);
                                                toast.success('Warehosue was created successfully', { id: toastIdProject });
                                            },
                                            onError(error: any) {
                                                setStepNum(3);
                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                    id: toastIdProject,
                                                });
                                            },
                                        });
                                    }
                                    if (serviceInfoDataAdd.length > 0) {
                                        serviceInfoDataAdd.map((item: any) => {
                                            service.push({
                                                ...item,
                                                "projectOrderId": id,
                                            })
                                        })
                                        const toastIdProject = toast.loading('Saving ....');
                                        await createServiceOrderMutation(service, {
                                            async onSuccess(_dataWarehouse) {
                                                queryClient.invalidateQueries(['project-orders']);
                                                queryClient.invalidateQueries(['warehouse-orders']);
                                                queryClient.invalidateQueries(['servicesOrder']);
                                                toast.success('ServiceOrder was created successfully', { id: toastIdProject });
                                            },
                                            onError(error: any) {
                                                setStepNum(3);
                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                    id: toastIdProject,
                                                });
                                            },
                                        });
                                    }
                                    if (projectInfoDataRemove.length > 0) {
                                        const toastIdProject = toast.loading('Removing ....');
                                        await Promise.all(projectInfoDataRemove.map((data: any) => {
                                            removeWarehouseOrderMutation(data, {
                                                async onSuccess(_dataProject) {
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    queryClient.invalidateQueries(['warehouse-orders']);
                                                    queryClient.invalidateQueries(['servicesOrder']);
                                                    toast.success('WarehouserOrder was removed successfully', { id: toastIdProject });
                                                },
                                                onError(error: any) {
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdProject,
                                                    });
                                                },
                                            });
                                        }))
                                    }
                                    if (serviceInfoDataRemove.length > 0) {
                                        const toastIdProject = toast.loading('Removing ....');
                                        await Promise.all(serviceInfoDataRemove.map((data: any) => {
                                            removeServiceOrderMutation(data, {
                                                async onSuccess(_dataProject) {
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    queryClient.invalidateQueries(['warehouse-orders']);
                                                    queryClient.invalidateQueries(['servicesOrder']);
                                                    toast.success('ServiceOrder was removed successfully', { id: toastIdProject });
                                                },
                                                onError(error: any) {
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdProject,
                                                    });
                                                },
                                            });
                                        }))
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }

                        },
                        onError(error: any) {
                            toast.error(error.response.data.message || 'error occurred please try again', {
                                id: toastId,
                            });
                        },
                    });
                    queryClient.invalidateQueries(['project-orders']);
                    queryClient.invalidateQueries(['warehouse-orders']);
                    queryClient.invalidateQueries(['servicesOrder']);
                    closeModal();
                    resetForm();
                    setStepNum(0);
                } else if (tableType === 'Sale') {
                    orderInfoData = {
                        ...values,
                        id: currentProjectOrder?.data?.data?.result.id,
                        rentUnitPrice: values.rentUnitPrice ? Number(values.rentUnitPrice) : 0,
                        rentArea: Number(values.rentArea),
                        rentLengthInDays: Number(values.rentLengthInDays),
                        isPercentOfValueForOneDay: values.percentOfValueForOneDay > 0 ? true : false,
                        isPricePerToneForOneDay: values.pricePerToneForOneDay > 0 ? true : false
                    };
                    let addDataService = valuesService.filter((item: any) => !originService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let updateDataService = valuesService.filter((item: any) => originService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let removeDataService = originService.filter((item: any) => !valuesService.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    valuesService.map((item: any) => {
                        updateDataService.map((updateService: any) => {
                            if (item.id === updateService.id) {
                                initialUpdateDataService.push({
                                    ...defaultStateServiceInfo,
                                    'id': item.id,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })
                                serviceInfoDataUpdate.push({
                                    ...defaultStateServiceInfo,
                                    'id': item.updateId,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })

                            }
                        })

                        addDataService.map((add: any) => {
                            if (item.id === add.id) {
                                serviceInfoDataAdd.push({
                                    ...defaultStateServiceInfo,
                                    "number": item['Kodas'],
                                    "serviceId": item.id,
                                    "projectId": projectIdDatas,
                                    "quantity": Number(item.Kiekis),
                                    "discount": Number(item['Nuolaida']),
                                    "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                                    "totPrice": Number(item['Viso']),
                                    "startOn": item.Pradžia,
                                })
                            }
                        })
                    })

                    let addData = valuesWarehouse.filter((item: any) => !originWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let updateData = valuesWarehouse.filter((item: any) => originWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))
                    let removeData = originWarehouse.filter((item: any) => !valuesWarehouse.some((itemToBeRemoved: any) => itemToBeRemoved.id === item.id))

                    valuesWarehouse.map((item: any) => {
                        updateData?.map((update: any) => {
                            if (item.id === update.id) {
                                let warehouseProjectIdData = 'string', priceData = '';
                                warehouseProducts?.data?.result.map((warehouse: any) => {
                                    if (item.id === warehouse.productId) {
                                        warehouseProjectIdData = warehouse.id;
                                        priceData = warehouse.price;
                                    }
                                })
                                initialUpdateData.push({
                                    'id': item.id,
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
                                    "repairCost": 0
                                })
                                projectInfoDataUpdate.push({
                                    'id': update.updateId,
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
                                    "repairCost": 0
                                })
                            }
                        })
                        addData.map((add: any) => {
                            if (item.id === add.id) {
                                let warehouseProjectIdData = 'string', priceData = '';
                                warehouseProducts?.data?.result.map((warehouse: any) => {
                                    if (item.id === warehouse.productId) {
                                        warehouseProjectIdData = warehouse.id;
                                        priceData = warehouse.price;
                                    }
                                })
                                projectInfoDataAdd.push({
                                    ...defaultStateProjectInfo,
                                    'type': 'loans',
                                    'quantity': Number(item.Kiekis),
                                    'number': item['Kodas'],
                                    'warehouseProductId': warehouseProjectIdData,
                                    'projectId': projectIdDatas,
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
                                    "repairCost": 0
                                })
                            }
                        })

                    })
                    originService?.map((origin: any) => {
                        removeDataService.map((remove: any) => {
                            if (origin.id === remove.id) {
                                serviceInfoDataRemove.push(origin.updateId);
                            }
                        })
                    })

                    originWarehouse.map((origin: any) => {
                        removeData.map((remove: any) => {
                            if (origin.id === remove.id) {
                                projectInfoDataRemove.push(remove.updateId);
                            }
                        })

                    })
                    //Update part
                    if (projectInfoDataUpdate.length > 0) {
                        Promise.all(projectInfoDataUpdate.map((data: any) => {
                            const toastIdProject = toast.loading('Updating ....');
                            updateMutationWarehouseOrderMutation(data, {
                                async onSuccess(_dataProject) {
                                    toast.success('WarehouseOrder was updated successfully', { id: toastIdProject });
                                },
                                onError(error: any) {
                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                        id: toastIdProject,
                                    });
                                },
                            });
                        }))
                    }
                    if (serviceInfoDataUpdate.length > 0) {

                        Promise.all(serviceInfoDataUpdate.map((serviceData: any) => {
                            const toastIdProject = toast.loading('Updating ....');
                            updateMutationServiceOrder(serviceData, {
                                async onSuccess(_dataProject) {

                                    toast.success('ServiceOrder was updated successfully', { id: toastIdProject });
                                },
                                onError(error: any) {
                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                        id: toastIdProject,
                                    });
                                },
                            });
                        }))
                    }
                    //Add part
                    let project: any = [];
                    let service: any = [];

                    if (projectInfoDataAdd.length > 0) {
                        projectInfoDataAdd.map((item: any) => {
                            project.push({
                                ...item,
                                "projectOrderId": id,
                            })
                        })
                        const toastIdProject = toast.loading('Saving ....');

                        createWarehouseOrderMutation(project, {
                            async onSuccess(_dataWarehouse) {

                                toast.success('Warehosue was created successfully', { id: toastIdProject });
                            },
                            onError(error: any) {
                                setStepNum(3);
                                toast.error(error.response.data.message || 'error occurred please try again', {
                                    id: toastIdProject,
                                });
                            },
                        });
                    }
                    if (serviceInfoDataAdd.length > 0) {
                        serviceInfoDataAdd.map((item: any) => {
                            service.push({
                                ...item,
                                "projectOrderId": id,
                            })
                        })
                        const toastIdProject = toast.loading('Saving ....');

                        createServiceOrderMutation(service, {
                            async onSuccess(_dataWarehouse) {

                                toast.success('ServiceOrder was created successfully', { id: toastIdProject });
                            },
                            onError(error: any) {
                                setStepNum(3);
                                toast.error(error.response.data.message || 'error occurred please try again', {
                                    id: toastIdProject,
                                });
                            },
                        });
                    }

                    //Remove part
                    if (projectInfoDataRemove.length > 0) {

                        Promise.all(projectInfoDataRemove.map((data: any) => {
                            const toastIdProject = toast.loading('Updating ....');
                            removeWarehouseOrderMutation(data, {
                                async onSuccess(_dataProject) {

                                    toast.success('WarehouserOrder was removed successfully', { id: toastIdProject });
                                },
                                onError(error: any) {
                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                        id: toastIdProject,
                                    });
                                },
                            });
                        }))
                    }
                    if (serviceInfoDataRemove.length > 0) {
                        Promise.all(serviceInfoDataRemove.map((data: any) => {
                            const toastIdProject = toast.loading('Updating ....');
                            removeServiceOrderMutation(data, {
                                async onSuccess(_dataProject) {

                                    toast.success('ServiceOrder was removed successfully', { id: toastIdProject });
                                },
                                onError(error: any) {
                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                        id: toastIdProject,
                                    });
                                },
                            });
                        }))
                    }
                    queryClient.invalidateQueries(['project-orders']);
                    queryClient.invalidateQueries(['project-orders']);
                    queryClient.invalidateQueries(['project-orders']);
                    closeModal();
                    resetForm();
                    setStepNum(1);
                }
                closeModal();
            } else {
                if (tableType === 'Rent') {

                    delete values.isRentUnitPrice;
                    if (additional) {
                        orderInfoData = {
                            ...idData,
                            customRentArea: 0,
                            vehicleId: values.vehicleId,
                            isActive: false
                        };
                    } else {
                        orderInfoData = {
                            ...values,
                            rentUnitPrice: values.rentUnitPrice && (values.percentOfValueForOneDay === 0 || values.pricePerToneForOneDay === 0) ? Number(values.rentUnitPrice) : 0,
                            projectId: projectIdDatas,
                            percentOfValueForOneDay: values.percentOfValueForOneDay ? Number(values.percentOfValueForOneDay) : 0,
                            pricePerToneForOneDay: values.pricePerToneForOneDay ? Number(values.pricePerToneForOneDay) : 0,
                            isPercentOfValueForOneDay: (Number(values.percentOfValueForOneDay)) > 0 ? true : false,
                            isPricePerToneForOneDay: values.pricePerToneForOneDay > 0 ? true : false,
                            isActive: false,
                            "type": "",
                            "createdBy": tokenData,
                            "totalRentPriceForPeriod": 0,
                            "totalRentPriceForOneDay": 0,
                            "rentFactor": 0,
                            "totalBaseRentPriceForPeriod": 0,
                            "totalBaseRentPriceForOneDay": 0,
                            "remark": "",
                            "activatedOn": null,
                            "isRentUnitPrice": values.rentUnitPrice > 0 ? true : false,
                        };
                    }

                    valuesService.map((item: any) => {
                        serviceInfoData.push({
                            ...defaultStateServiceInfo,
                            "number": item['Kodas'],
                            "serviceId": item.id,
                            "projectId": projectIdDatas,
                            "quantity": Number(item.Kiekis),
                            "discount": Number(item['Nuolaida']),
                            "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                            "totPrice": Number(item['Viso']),
                            "startOn": item.Pradžia,
                        })
                    })

                    valuesWarehouse.map((item: any) => {
                        let warehouseProjectIdData = 'string', priceData = '';
                        warehouseProducts?.data?.result.map((warehouse: any) => {
                            if (item.id === warehouse.productId) {
                                console.log('submit warehouse', item.id)
                                warehouseProjectIdData = warehouse.id;
                                priceData = warehouse.price;
                                projectInfoData.push({
                                    ...defaultStateProjectInfo,
                                    'type': 'loans',
                                    'quantity': Number(item.Kiekis),
                                    'number': item['Kodas'],
                                    'warehouseProductId': warehouseProjectIdData,
                                    'projectId': projectIdDatas,
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
                                    "repairCost": 0
                                })
                            }
                        })
                    })

                    if (projectInfoData.length > 0) {
                        console.log('create data', orderInfoData)
                        const toastId = toast.loading('Saving ....');
                        createProjectOrderMutation({ ...orderInfoData, type: 'loans' }, {
                            async onSuccess(_data: any) {
                                toast.success('1. OrderInfo was created successfully', { id: toastId });
                                queryClient.invalidateQueries(['project-orders']);
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
                                        console.log('warehosue order', project)
                                        const toastIdProject = toast.loading('Saving ....');
                                        createWarehouseOrderMutation(project, {
                                            async onSuccess(_dataWarehouse) {
                                                toast.success('2. ProjectInfo was created successfully', { id: toastIdProject });
                                                queryClient.invalidateQueries(['project-orders']);
                                                if (_dataWarehouse) {
                                                    if (service.length > 0) {
                                                        const toastIdService = toast.loading('Saving ....');
                                                        createServiceOrderMutation(service, {
                                                            async onSuccess(_data) {
                                                                toast.success('3. ServiceInfo was created successfully', { id: toastIdService });
                                                                queryClient.invalidateQueries(['project-orders']);
                                                                closeModal();
                                                                resetForm();
                                                                setStepNum(0);
                                                            },
                                                            onError(error: any) {
                                                                setStepNum(3);
                                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                                    id: toastIdService,
                                                                });
                                                            },
                                                        });
                                                    }

                                                }
                                            },
                                            onError(error: any) {
                                                setStepNum(3);
                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                    id: toastIdProject,
                                                });
                                            },
                                        });
                                    }

                                }
                            },
                            onError(error: any) {
                                setStepNum(3);
                                toast.error(error.response.data.message || 'error occurred please try again', {
                                    id: toastId,
                                });
                            },
                        });
                    } else {
                        const toastId = toast.loading('');
                        toast.error('Please select at warehouse product data', {
                            id: toastId,
                        });
                        setStepNum(1);
                    }
                    queryClient.invalidateQueries(['project-orders']);
                    closeModal();
                    resetForm();
                    setStepNum(1);
                } else if (tableType === "Sale") {
                    orderInfoData = {
                        ...values,
                        projectId: projectIdDatas,
                        number: 'number',
                        rentUnitPrice: 0,
                        rentArea: 0,
                        totalRentPriceForPeriod: 0,
                        isActive: false
                    };
                    valuesService.map((item: any) => {
                        serviceInfoData.push({
                            ...defaultStateServiceInfo,
                            "number": item['Kodas'],
                            "serviceId": item.id,
                            "projectId": projectIdDatas,
                            "quantity": Number(item.Kiekis),
                            "discount": Number(item['Nuolaida']),
                            "discountedUnitPrice": Number(item['Kaina(€/Vnt)']),
                            "totPrice": Number(item['Viso']),
                            "startOn": item.Pradžia,
                        })
                    })

                    valuesWarehouse.map((item: any) => {
                        let warehouseProjectIdData = 'string', priceData = '';
                        warehouseProducts?.data?.result.map((warehouse: any) => {
                            if (item.id === warehouse.productId) {
                                warehouseProjectIdData = warehouse.id;
                                priceData = warehouse.price;
                            }
                        })
                        projectInfoData.push({
                            ...defaultStateProjectInfo,
                            'type': 'sales',
                            'quantity': Number(item.Kiekis),
                            'number': item['Kodas'],
                            'warehouseProductId': warehouseProjectIdData,
                            'projectId': projectIdDatas,
                            'basePrice': priceData,
                            'discount': Number(item['Nuolaida']),
                            'discountedPrice': Number(item['Vertė 1 produkto']),
                            'rentFactor': 0,
                            'isCustomRentPrice': false,
                            "customUnitRentPriceForOneDay": 0,
                            "customTotalRentPriceForOneDay": 0,
                            "unitRentPriceForOneDay": 0,
                            "totalRentPriceForOneDay": 0,
                            "note": "note",
                            "createdBy": tokenData,
                            "isQuantityContstant": false,
                            "repairCost": 0
                        })
                    })
                    if (projectInfoData.length > 0 || serviceInfoData.length > 0) {
                        const toastId = toast.loading('Saving ....');
                        createProjectOrderMutation({ ...orderInfoData, type: 'sales' }, {
                            async onSuccess(_data: any) {
                                toast.success('1. OrderInfo was created successfully', { id: toastId });
                                queryClient.invalidateQueries(['project-orders']);
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
                                                toast.success('2. ProjectInfo was created successfully', { id: toastIdProject });
                                                queryClient.invalidateQueries(['project-orders']);
                                                if (_dataWarehouse) {
                                                    if (service.length > 0) {
                                                        const toastIdService = toast.loading('Saving ....');
                                                        createServiceOrderMutation(service, {
                                                            async onSuccess(_data) {
                                                                toast.success('3. ServiceInfo was created successfully', { id: toastIdService });
                                                                queryClient.invalidateQueries(['project-orders']);
                                                                closeModal();
                                                                resetForm();
                                                                setStepNum(1);
                                                            },
                                                            onError(error: any) {
                                                                setStepNum(3);
                                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                                    id: toastIdService,
                                                                });
                                                            },
                                                        });
                                                    } else {
                                                        queryClient.invalidateQueries(['project-orders']);
                                                        closeModal();
                                                        resetForm();
                                                        setStepNum(1);
                                                    }
                                                }
                                            },
                                            onError(error: any) {
                                                setStepNum(3);
                                                toast.error(error.response.data.message || 'error occurred please try again', {
                                                    id: toastIdProject,
                                                });
                                            },
                                        });
                                    } else {
                                        if (service.length > 0) {
                                            const toastIdService = toast.loading('Saving ....');
                                            createServiceOrderMutation(service, {
                                                async onSuccess(_data) {
                                                    toast.success('ServiceInfo was created successfully', { id: toastIdService });
                                                    queryClient.invalidateQueries(['project-orders']);
                                                    closeModal();
                                                    resetForm();
                                                    setStepNum(1);
                                                },
                                                onError(error: any) {
                                                    setStepNum(3);
                                                    toast.error(error.response.data.message || 'error occurred please try again', {
                                                        id: toastIdService,
                                                    });
                                                },
                                            });
                                        }
                                    }
                                }
                            },
                            onError(error: any) {
                                setStepNum(3);
                                toast.error(error.response.data.message || 'error occurred please try again', {
                                    id: toastId,
                                });
                            },
                        });
                    } else {
                        const toastId = toast.loading('');
                        toast.error('Please select at least 1 data', {
                            id: toastId,
                        });
                        setStepNum(1);
                    }
                    closeModal();
                    resetForm();
                    setStepNum(0);
                }
                closeModal();
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
    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {/* {isUpdating ? 'Update Rent Order' : 'Naujas pardavimas'} */}
                            {isUpdating ? 'Update Order' : tableType === "Sale" ? 'Naujas pardavimas' : 'Naujas nuomos užsakymas'}
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
                            (tableType === "Rent" && (stepNum === 0 || stepNum === 1 || stepNum === 2 || stepNum === 3)) &&
                            <ProjectOrderContent
                                projectOrder={projectOrder}
                                setShow={() => { }}
                                setPrintShow={() => { }}
                                onHide={() => props.onHide}
                                className={props.className}
                                onChangeInput={onChangeInput}
                                isOpenModal={stepNum}
                                currentData={values}
                                tableType={tableType}
                                additional={additional}
                                idData={idData}
                                isUpdating={isUpdating}
                                originProjectOrder={originProjectOrder}
                                sendProjdctOrder={sendProjdctOrder}
                            />
                        }
                        {
                            (stepNum === 1 || stepNum === 2 || stepNum === 3) &&
                            <WarehouseProductContent
                                projectOrder={projectOrder}
                                setShow={() => { }}
                                setPrintShow={() => { }}
                                onHide={() => props.onHide}
                                className={props.className}
                                onChangeInput={onChangeInput}
                                isOpenModal={stepNum}
                                currentData={valuesWarehouse}
                                tableType={tableType}
                                isUpdating={isUpdating}
                                originWarehouse={originWarehouse}
                                sendOriginWarehouse={sendOriginWarehouse}
                            />
                        }
                        {
                            (stepNum === 2 || stepNum === 3) &&
                            <ServiceProductContent
                                projectOrder={projectOrder}
                                setShow={() => { }}
                                setPrintShow={() => { }}
                                onHide={() => props.onHide}
                                className={props.className}
                                onChangeInput={onChangeInput}
                                isOpenModal={stepNum}
                                currentData={valuesService}
                                tableType={tableType}
                                isUpdating={isUpdating}
                                originService={originService}
                                sendOriginService={sendOriginService}
                            />
                        }
                        {
                            (stepNum === 3) &&
                            <VehicleContent
                                projectOrder={projectOrder}
                                setShow={() => { }}
                                setPrintShow={() => { }}
                                onHide={() => props.onHide}
                                onChangeInput={onChangeInput}
                                className={props.className}
                                isOpenModal={stepNum}
                                tableType={tableType}
                                isUpdating={isUpdating}
                            />
                        }
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Toliau</span>
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
        </div>
    );
}
