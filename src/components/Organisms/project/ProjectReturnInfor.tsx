import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProjectModal from "./AddNewReturnOrder";
import Collapsible from '../../Molecules/Modal/Collapsible';
import { TableActionsType } from '../../../types/tableProps/table.props';
import SubTable from '../../Organisms/tables/TableSum';
import SubTable1 from '../../Organisms/tables/TableSumRentOrder';
import RemoveModal from "../Modals/RemoveConfirmModal";
import EditRentAreaModal from "./modal/EditRentAreaModal";
import EditActivatedOnModal from "./modal/ActivatedModal";

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { productStore } from '../../../store/products.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';
import { vehiclesStore } from '../../../store/vehicles.store';
import { employeeStore } from '../../../store/employees.store';

export default function ProjectReturnOrderInfo(props: { project: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const location: any = useLocation();
    const navigate = useNavigate();
    let projectIdData = location.state.projectIdData;
    const { id } = useParams();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);

    let orderInfo = {};

    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: product } = productStore.getAll();
    const { data: warehouse } = warehouseStore.getAll();
    const { mutateAsync: updateMutation } = projectsOrdersStore.update();
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);
    const { mutateAsync } = projectsOrdersStore.removeById();
    const { data: projectOrderLatestData } = projectsOrdersStore.getByIdLatest(projectIdData as string);
    const { data: currentProductRent } = warehouseStore.getWarehosueProductOrdersRentAggregate(id as string);
    const { data: currentRentProducts } = warehouseStore.getWarehosueProductOrdersByRentAggregate([id as string]);
    const { data: companyContracts } = companyContacts.getAll();
    const { data: vehicles } = vehiclesStore.getAll();
    const { data: employee } = employeeStore.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const [values, setvalues] = useState<any>({});
    const [isLast, setIsLast] = useState<boolean>(false);

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isRentAreaModalOpen, setIsRentAreaModalOpen] = useState(false);
    const [isActivatedOnModalOpen, setIsActivatedOnModalOpen] = useState(false);
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

    useEffect(() => {
        if (projectOrderData?.data) {
            setvalues(projectOrderData?.data?.result);
        }
        if (projectOrderLatestData?.data?.result && projectOrderLatestData?.data?.result.id === id) {
            setIsLast(true);
        } else if (projectOrderLatestData?.data?.result.id !== id) {
            setIsLast(false);
        }
    }, [projectOrderData?.data, projectOrderLatestData]);

    projectOrder?.data?.result.map((item: any) => {
        if (item.type === 'returns') {
            let quantity: number = 0, transData: string = '';
            if (projectOrderData?.data?.result.isPricePerToneForOneDay) {
                quantity = currentRentProducts?.data?.result[0]?.totWeght;
                vehicles?.data?.result.map((vehicle: any) => {
                    if (projectOrderData?.data?.result.vehicleId === vehicle.id) {
                        transData = vehicle.name + vehicle.plateNumber;
                    }
                })
            } else if (projectOrderData?.data?.result?.isPercentOfValueForOneDay) {
                quantity = currentRentProducts?.data?.result[0]?.totPrice;
                vehicles?.data?.result.map((vehicle: any) => {
                    if (projectOrderData?.data?.result.vehicleId === vehicle.id) {
                        employee?.data?.result.map((empData: any) => {
                            if (vehicle.employeeId === empData.id) {
                                transData = empData.firstName + empData.lastName;
                            }
                        })
                    }
                })
            } else {
                quantity = (currentRentProducts?.data?.result[0].currentRentArea)?.toFixed(2);
                vehicles?.data?.result.map((vehicle: any) => {
                    if (projectOrderData?.data?.result.vehicleId === vehicle.id) {
                        transData = vehicle.name + vehicle.plateNumber;
                    }
                })
            }
            orderInfo = {
                "Projektas": item.number,
                "Grąžinimo data": item.createdOn,
                "Atsakingas": createdByData,
                "Nuomojamas kiekis": quantity,
                "Transportas": transData,
                "Įsigalioja": currentProductRent?.data?.result?.startDate,
            }
        }
    })

    useEffect(() => {
        let tableData: any = [];
        warehouseOrder?.data?.result.map((item: any) => {
            if (item.projectId === projectIdData && item.projectOrderId === id) {
                warehouseProducts?.data?.result.map((warehouseProduct: any) => {
                    if (item.type === 'returns' && warehouseProduct.id === item.warehouseProductId) {

                        let code: string = '';
                        let name: string = '';
                        let warehouseData: string = '';
                        let price: number = 0;
                        product?.data?.result.map((product: any) => {
                            if (product.id === warehouseProduct.productId) {
                                code = product.number;
                                name = product.name;
                            }
                        })
                        warehouse?.data?.result.map((warehosue: any) => {
                            if (warehosue.id === warehouseProduct.warehouseId) {
                                warehouseData = warehosue.name;
                                price = warehosue.price * item.quantity;
                            }
                        })
                        tableData.push({
                            'id': item.id,
                            'Kodas': code,
                            'Pavadinimas': name,
                            'Sandėlys': warehouseData,
                            'Kiekis (Grąžinta)': item.quantity,
                            'Vertė(Likutiniame)': 0,
                            'Neskaičiuoti': 0,
                        })
                    }
                })
            }
        })
        setTableData(tableData);
    }, [warehouseOrder?.data?.result]);

    const onChangePage = (_page: number) => {
        return {};
    };

    const handleUpdate = async () => {
        const toastId = toast.loading('Activating ....');
        updateMutation(
            { ...values, isActive: true, id },
            {
                async onSuccess(_data) {
                    toast.success('Activated', { id: toastId });
                    queryClient.invalidateQueries(['project-ordersById', id]);

                },
                onError(error: any) {
                    toast.error(
                        error.response.data.message || 'error occurred please try again',
                        { id: toastId },
                    );
                },
            },
        );
    };

    const handleEdit = async () => {
        if (!values.isActive && isLast) {
            setRightModalShow(true);
        }
    };

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Deleting ....');
        mutateAsync(id as string, {
            async onSuccess(_data) {
                toast.success('Employee was created successfully', { id: toastId });
                queryClient.invalidateQueries(['employees-roles']);
                navigate(`/dashboard/projects/${projectIdData}`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    return (
        <React.Fragment>
            {props.project ? (
                <div className="py-4 px-5 bg-white">
                    <div className="action py-3 row">
                        {
                            (!values.isActive && isLast) &&
                            <div className="col-3 mr-3">
                                <Button
                                    onClick={() => handleEdit()}
                                    className="text-capitalize b-radius"
                                >
                                    Redaguoti
                                </Button>
                            </div>
                        }
                        {
                            (!values.isActive && isLast) &&
                            <div className="col-3 ml-3">
                                <Button
                                    className="text-capitalize b-radius light"
                                    onClick={() => setIsRemoveModalOpen(true)}
                                >
                                    Pašalinti
                                </Button>
                            </div>
                        }
                        {
                            (!values.isActive && isLast) &&
                            <div className="col-3 mr-1">
                                <Button
                                    onClick={() => handleUpdate()}
                                    className="text-capitalize b-radius btn-green-opacity"
                                >
                                    Aktyvuoti
                                </Button>
                            </div>
                        }

                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Order information" data={orderInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <div style={{ marginTop: '50px' }}>

                                {
                                    !projectOrderData?.data?.result.isActive &&
                                    <>
                                        <Button
                                            onClick={() => setIsRentAreaModalOpen(true)}
                                            className="text-capitalize b-radius mb-3"
                                        >
                                            Keisti kiekį
                                        </Button>
                                        <Button
                                            onClick={() => setIsActivatedOnModalOpen(true)}
                                            className="text-capitalize b-radius mt-3"
                                        >
                                            Keisti datą
                                        </Button>
                                    </>
                                }

                            </div>
                        </div>
                        <div className="mb-5">
                            <Collapsible isOpen={true} title="Produktai">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <SubTable
                                                data={tableData || []}
                                                showAddNewButton={false}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        </div>
                    </div>

                    <AddNewProjectModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        projectReturnId={projectIdData}
                        isUpdating={true}
                        data={projectOrderLatestData}
                    />

                    <EditRentAreaModal
                        handleSuccess={() => { }}
                        show={isRentAreaModalOpen}
                        className={"side-modal-mid"}
                        setShow={setIsRentAreaModalOpen}
                        onHide={() => setIsRentAreaModalOpen(false)}
                    />

                    <EditActivatedOnModal
                        handleSuccess={() => { }}
                        show={isActivatedOnModalOpen}
                        className={"side-modal-mid"}
                        setShow={setIsActivatedOnModalOpen}
                        onHide={() => setIsActivatedOnModalOpen(false)}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
                    />

                    <RemoveModal
                        handleClickConfirm={() => handleClickConfirm()}
                        show={isRemoveModalOpen}
                        onHide={() => setIsRemoveModalOpen(false)}
                        setShow={setIsRemoveModalOpen}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}
