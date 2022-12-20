import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '../../../plugins/react-query';

import { ProjectTableDto } from "../../../types/services/project.types"
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProjectModal from "./NewRentOrderModal";
import EditRentAreaModal from "./modal/EditRentAreaModal";
import EditActivatedOnModal from "./modal/ActivatedModal";
import Collapsible from '../../Molecules/Modal/Collapsible';
import { TableActionsType } from '../../../types/tableProps/table.props';
import SubTable from '../../Organisms/tables/subTableRentProduct';
import SubTable1 from '../../Organisms/tables/OrderServiceTable';

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { projectsStore } from '../../../store/projects.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { serviceOrder } from '../../../store/service-order.store';
import { servicesStore } from '../../../store/services.store';
import { productStore } from '../../../store/products.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';
import { vehiclesStore } from '../../../store/vehicles.store';
import { employeeStore } from '../../../store/employees.store';
import RemoveModal from "../Modals/RemoveConfirmModal";
import { clientsStore } from '../../../store/clients.store';


export default function ProjectInfo(props: { project: any }) {
    const navigate = useNavigate();
    const location: any = useLocation();
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    let projectIdData = location?.state?.projectId;
    const { id } = useParams();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    let orderInfo = {};
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: project } = projectsStore.getAll();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: serviceOrders } = serviceOrder.getAll();
    const { data: productOrders } = productStore.getAll();
    const { data: service } = servicesStore.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);
    const { mutateAsync: updateMutation } = projectsOrdersStore.update();
    const { data: projectOrderLatestData } = projectsOrdersStore.getByIdLatest(projectIdData as string);
    const { data: currentProductRent } = warehouseStore.getWarehosueProductOrdersRentAggregate(id as string);
    const { data: currentRentProducts } = warehouseStore.getWarehosueProductOrdersByRentAggregate([id as string]);
    const { mutateAsync } = projectsOrdersStore.removeById();
    const { data: companyContracts } = companyContacts.getAll();
    const { data: vehicles } = vehiclesStore.getAll();
    const { data: employee } = employeeStore.getAll();
    const { data: user } = userStore.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    let data: any = {}
    if (project?.data?.result) {
        project?.data?.result?.map((item: any) => {
            if (item.id === projectIdData) {
                data = {
                    customerId: item.customerId,
                    projectOrderId: id
                }
            }
        })
    }
    const { data: customerByProjectOrderId } = clientsStore.getCustomerByProjectOrder(data);


    const [values, setvalues] = useState<any>({});
    const [isLast, setIsLast] = useState<boolean>(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isRentAreaModalOpen, setIsRentAreaModalOpen] = useState(false);
    const [isActivatedOnModalOpen, setIsActivatedOnModalOpen] = useState(false);

    useEffect(() => {
        if (projectOrderData?.data) {
            setvalues(projectOrderData?.data?.result);
        }
        if (projectOrderLatestData?.data?.result && projectOrderLatestData?.data?.result?.id === id) {
            setIsLast(true);
        } else if (projectOrderLatestData?.data?.result?.id !== id) {
            setIsLast(false);
        }
    }, [projectOrderData?.data, projectOrderLatestData]);


    let tablemockData: any = [];
    let tablemockDataService: any = [];
    if (projectOrder) {
        projectOrder?.data?.result?.map((item: any) => {
            if (item.projectId === projectIdData) {
                let projectData = '', quantity: number = 0, transData: string = '';
                project?.data?.result?.map((project: any) => {
                    if (project.id === item.projectId) {
                        projectData = project.name;
                    }
                })
                let data: any = 0;
                let price: any = 0;
                warehouseOrder?.data?.result.map((itemProject: any) => {
                    if (item.id === itemProject.projectOrderId) {
                        data = data + itemProject.totalRentPriceForOneDay;
                    }
                })
                serviceOrders?.data?.result.map((itemProject: any) => {
                    if (item.id === itemProject.projectOrderId) {
                        price = price + itemProject.totPrice;
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

                if (item.id === id) {
                    orderInfo = {
                        "Užsakymo Nr.": item.number,
                        "Projektas": projectData,
                        "Sukūrimo Data": item.createdOn,
                        "Atsakingas": createdByData,
                        // "Returned product": data.toFixed(2),
                        // "Returned services": price,
                        // "Additional information": item.note,
                        "Nuomojamas kiekis": quantity,
                        "Transportas": transData,
                        "Įsigalioja": currentProductRent?.data?.result?.startDate,
                    }
                }
            }
        })
    }
    if (warehouseOrder) {
        warehouseOrder?.data?.result.map((warehouseOrderData: any) => {
            if (projectIdData === warehouseOrderData.projectId && warehouseOrderData.projectOrderId === id) {
                warehouseProducts?.data?.result.map((warehouseProductData: any) => {
                    if (warehouseOrderData.warehouseProductId === warehouseProductData.id) {
                        let orderName = '';
                        let unitData = '';
                        projectOrder?.data?.result?.map((item: any) => {
                            if (warehouseOrderData.projectOrderId === item.id) {
                                orderName = item.number;
                            }
                        })

                        productOrders?.data?.result.map((item: any) => {
                            if (warehouseProductData.productId === item.id) {
                                if (item.unit) {
                                    unitData = item.unit;
                                } else {
                                    unitData = 'vnt';
                                }
                            }
                        })
                        tablemockData.push({
                            'Kodas': warehouseOrderData.number,
                            'Pavadinimas': orderName,
                            'Matavimo Vnt': unitData,
                            'Kiekis': warehouseOrderData.quantity,
                            '1Vnt Kaina (€ /D)': Number(warehouseOrderData.unitRentPriceForOneDay).toFixed(2),
                            'Visų kaina dienai': Number(warehouseOrderData.totalRentPriceForOneDay).toFixed(2),
                            'Vnt Vertė': warehouseOrderData.basePrice,
                        })
                    }
                })
            }
        })
    }

    if (serviceOrders) {
        serviceOrders?.data?.result.map((serviceOrderData: any) => {
            if (projectIdData === serviceOrderData.projectId && serviceOrderData.projectOrderId === id) {
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
                    // 'Value (Є/psc)': basePrice,
                    'Discount (%)': serviceOrderData.discount,
                    'Vertė(€ /Vnt)': serviceOrderData.discountedUnitPrice,
                    'Viso': serviceOrderData.totPrice,
                    // 'Execution/type (d/sav.)': serviceOrderData.quantity,
                    // 'Min. term (d)': serviceOrderData.quantity,
                })

            }
        })
    }


    const actions: TableActionsType<ProjectTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {

            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {

            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {

            },
        },
    ];

    const handleClickRow = (row: ProjectTableDto) => {

    };
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
        localStorage.setItem('update', 'edit');
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
                            (!values.isActive && isLast) && <div className="col-3 mr-3">
                                <Button
                                    // onClick={() => setRightModalShow(true)}
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
                                    Ištrinti
                                </Button>
                            </div>
                        }

                        {/* {
                            (!values.isActive && isLast) &&
                            <div className="col-3 mr-1">
                                <Button
                                    onClick={() => handleUpdate()}
                                    className="text-capitalize b-radius btn-green-opacity"
                                >
                                    Aktyvuoti
                                </Button>
                            </div>
                        } */}
                        {
                            !customerByProjectOrderId?.data?.result?.isApproved &&
                            <div className="col-3 mr-1">
                                <Button
                                    // onClick={() => handleUpdate()}
                                    className="text-capitalize b-radius redBtn"
                                >
                                    Viršyta skola
                                </Button>
                            </div>
                        }
                        {
                            customerByProjectOrderId?.data?.result?.isApproved &&
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
                            <Details title="Užsakymo informacija" data={orderInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <div style={{ marginTop: '130px' }}>
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
                            {
                                tablemockData.length > 0 &&
                                <Collapsible isOpen={true} title="Produktai">
                                    <div className="p-3 row">
                                        <div className="mb-5">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                                <SubTable
                                                    data={tablemockData || []}
                                                    showAddNewButton={false}
                                                    isFilter={false}
                                                    uniqueCol="id"
                                                    hide={['id']}
                                                    handleClickRow={() => { }}
                                                    onChangePage={onChangePage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Collapsible>
                            }

                            {
                                tablemockDataService.length > 0 &&
                                <Collapsible isOpen={true} title="Paslaugos">
                                    <div className="p-3 row">
                                        <div className="mb-5">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                                <SubTable1
                                                    data={tablemockDataService || []}
                                                    showAddNewButton={false}
                                                    isFilter={false}
                                                    uniqueCol="id"
                                                    hide={['id', 'Discount (%)']}
                                                    handleClickRow={() => console.log('')}
                                                    onChangePage={onChangePage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Collapsible>
                            }
                        </div>
                    </div>

                    <AddNewProjectModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal-mid"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        rentorderId={props.project.id}
                        isUpdating={true}
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
