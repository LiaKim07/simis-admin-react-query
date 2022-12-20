import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../../plugins/react-query';

import { ProjectTableDto } from "../../../types/services/project.types"
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProjectModal from "./AddNewRentOrderModal";
import AddNewRentOrderModal1 from "./NewRentOrderModal";
import Collapsible from '../../Molecules/Modal/Collapsible';
import { TableActionsType } from '../../../types/tableProps/table.props';
// import SubTable from '../../Organisms/tables/subTableRentProduct';
import SubTable from '../../Organisms/tables/TableSaleOrderProduct';
import SubTable1 from '../../Organisms/tables/OrderServiceTable';
import RemoveModal from "../Modals/RemoveConfirmModal";

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { projectsStore } from '../../../store/projects.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { serviceOrder } from '../../../store/service-order.store';
import { servicesStore } from '../../../store/services.store';
import { productStore } from '../../../store/products.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';
import { clientsStore } from '../../../store/clients.store';

export default function SalesInfo(props: { project: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const location: any = useLocation();
    const navigate = useNavigate();
    let projectIdData = location.state.projectIdSales;
    const { id } = useParams();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

    let orderInfo = {};
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: project } = projectsStore.getAll();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProductss } = warehouseStore.getAllWarehosueProducts();
    const { data: serviceOrders } = serviceOrder.getAll();
    const { data: products } = productStore.getAll();
    const { data: service } = servicesStore.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);
    const { mutateAsync: updateMutation } = projectsOrdersStore.update();
    const { data: projectOrderLatestData } = projectsOrdersStore.getByIdLatestSale(projectIdData as string);
    const { mutateAsync } = projectsOrdersStore.removeById();
    const { data: companyContracts } = companyContacts.getAll();
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
    let tableData: any = [];
    warehouseOrder?.data?.result.map((item: any) => {
        if (item.type === 'sales' && item.projectOrderId === id) {
            warehouseProductss?.data?.result.map((warehouseProduct: any) => {
                if (item.warehouseProductId === warehouseProduct.id) {
                    products?.data?.result.map((product: any) => {
                        if (warehouseProduct.productId === product.id) {
                            tableData.push({
                                'Kodas': product.number,
                                'Pavadinimas': product.name,
                                'Svoris(kg)': product.weight,
                                // 'Plotas': product.area,
                                'Vertė 1 Vnt': warehouseProduct.price,
                                // 'Nuolaida': item.discount,
                                'Kaina su nuolaida': item.discountedPrice,
                                'Viso vertė': item.discountedPrice * item.quantity,
                                'Kiekis': item.quantity,
                            })
                        }
                    })
                }
            })

        }
    })

    const [values, setvalues] = useState<any>({});
    const [isLast, setIsLast] = useState<boolean>(false);
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

    let tablemockData: any = [];
    let tablemockDataService: any = [];
    if (projectOrder) {
        projectOrder?.data?.result?.map((item: any) => {
            let projectData = '';
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
            if (item.id === id) {
                orderInfo = {
                    "Užsakymo Nr": item.number,
                    "Projektas": projectData,
                    "Sukūrimo data": item.createdOn,
                    "Atsakingas": createdByData,
                    // "Returned product": data.toFixed(2),
                    // "Returned services": price,
                    // "Additional information": item.note,
                }
            }
        })
    }
    if (warehouseOrder) {
        warehouseOrder?.data?.result.map((warehouseOrderData: any) => {
            if (projectIdData === warehouseOrderData.projectId && warehouseOrderData.projectOrderId === id) {
                warehouseProductss?.data?.result.map((warehouseProductData: any) => {
                    if (warehouseOrderData.warehouseProductId === warehouseProductData.id) {
                        let orderName = '';
                        let unitData = '';
                        projectOrder?.data?.result?.map((item: any) => {
                            if (warehouseOrderData.projectOrderId === item.id) {
                                orderName = item.number;
                            }
                        })

                        products?.data?.result.map((item: any) => {
                            if (warehouseProductData.productId === item.id) {
                                if (item.unit) {
                                    unitData = item.unit;
                                } else {
                                    unitData = 'vnt';
                                }
                            }
                        })
                        tablemockData.push({
                            'Code': warehouseOrderData.number,
                            'Order Name': orderName,
                            'Measuring unit': unitData,
                            'Quantity': warehouseOrderData.quantity,
                            '1 psc Rent (Є/d)': Number(warehouseOrderData.unitRentPriceForOneDay).toFixed(2),
                            'Rental price for all elements': Number(warehouseOrderData.totalRentPriceForOneDay).toFixed(2),
                            'Psc value (Є)': warehouseOrderData.basePrice,
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
                    'Pradėta': serviceOrderData.startOn,
                    // 'Value (Є/psc)': basePrice,
                    // 'Discount (%)': serviceOrderData.discount,
                    'Vertė': serviceOrderData.discountedUnitPrice,
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
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {
                alert('deleted ' + item['id']);
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
                        <div className="mb-5">
                            <Collapsible isOpen={true} title="Produktai">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            {/* <SubTable
                                                data={tablemockData || []}
                                                showAddNewButton={false}
                                                isFilter={false}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                            /> */}
                                            <SubTable
                                                data={tableData || []}
                                                uniqueCol="id"
                                                hide={['id']}
                                                rowsPerPage={50}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                                showAddNewButton={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible isOpen={true} title="Paslaugos">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <SubTable1
                                                data={tablemockDataService || []}
                                                showAddNewButton={false}
                                                isFilter={false}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        </div>
                    </div>

                    {/* <AddNewProjectModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        rentorderId={props.project.id}
                        isUpdating={true}
                    /> */}

                    <AddNewRentOrderModal1
                        handleSuccess={() => console.log('')}
                        show={rightModalShow}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        className={'side-modal-mid'}
                        tableType={'Sale'}
                        isUpdating={true}
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
