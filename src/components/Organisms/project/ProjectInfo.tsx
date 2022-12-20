import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useParams, useNavigate } from "react-router-dom";
import { SpinnerCircularFixed } from 'spinners-react';

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProjectModal from "./AddNewProjectModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import Collapsible from '../../Molecules/Modal/Collapsible';
import TableDropdown from '../tables/Table-drop';
import SubTable from '../../Organisms/tables/subTableProjectInfo';
import SubTable1 from '../../Organisms/tables/OrderServiceTable';
import { ProjectTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { projectsStore } from '../../../store/projects.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { serviceOrder } from '../../../store/service-order.store';
import { servicesStore } from '../../../store/services.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

export default function ProjectsInfo(props: { projects: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { mutateAsync } = projectsStore.removeById();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.projects.id, {
            async onSuccess(_data) {
                toast.success('Projects was created successfully', { id: toastId });
                queryClient.invalidateQueries(['projects']);
                navigate(`/dashboard/projects`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };
    let info = {};
    if (props.projects) {
        info = {
            "Pavadinimas": props.projects.name,
            "Numeris": props.projects.number,
            "Adresas": props.projects.address,
            "Miestas": props.projects.city,
        }
    }
    let orderInfo = {};
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: project } = projectsStore.getAll();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProducts } = warehouseStore.getAllWarehosueProducts();
    const { data: serviceOrders } = serviceOrder.getAll();
    // const { data: productOrders } = productStore.getAll();
    const { data: service } = servicesStore.getAll();

    let tablemockDataService: any = [];
    let projectOrderArr: any = [];

    let data = projectOrder?.data?.result;
    const sorted = data?.sort(function (a: any, b: any) {
        return a?.number.localeCompare(b?.number, undefined, { numeric: true, sensitivity: 'base' });
    });

    if (sorted) {
        sorted?.map((item: any) => {
            if ((item.type === 'loans' || item.type === 'returns') && item.projectId === id) {
                projectOrderArr.push(item);
            }
        })
    }
    let orderData: string = '';
    if (projectOrderArr.length > 0) {
        orderData = projectOrderArr[projectOrderArr.length - 1]?.id;
    }
    const { data: currentRent } = warehouseStore.getWarehosueProductOrdersByRentAggregate([orderData]);

    projectOrderArr?.map((item: any) => {
        // let projectData = '';
        // project?.data?.result?.map((project: any) => {
        //     if (project.id === item.projectId) {
        //         projectData = project.name;
        //     }
        // })
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

        if (!item.isPercentOfValueForOneDay && !item.isPricePerToneForOneDay) {
            orderInfo = {
                "Numeris": item.number,
                "Sukūrimo data": item.createdOn,
                "Atsakingas": createdByData,
                "Kaina už kvadratą per dieną": (item.rentUnitPrice).toFixed(2),
                "Minimalus terminas": item.rentLengthInDays,
                "Nuomojamas kiekis": (currentRent?.data?.result[0].currentRentArea)?.toFixed(2),
            }
        } else {
            if (item.isPricePerToneForOneDay && !item.isPercentOfValueForOneDay) {
                orderInfo = {
                    "Numeris": item.number,
                    "Sukūrimo data": item.createdOn,
                    "Atsakingas": createdByData,
                    "Kaina už toną per 30 d": (item.pricePerToneForOneDay).toFixed(2),
                    "Minimalus terminas": item.rentLengthInDays,
                    "Nuomojamas kiekis": (currentRent?.data?.result[0].totWeght)?.toFixed(2),
                }
            } else if (item.isPercentOfValueForOneDay && !item.isPricePerToneForOneDay) {
                orderInfo = {
                    "Numeris": item.number,
                    "Sukūrimo data": item.createdOn,
                    "Atsakingas": createdByData,
                    "Nuomos kaina nuo vertės per 30d": (item.percentOfValueForOneDay).toFixed(2),
                    "Minimalus terminas": item.rentLengthInDays,
                    "Nuomojamas kiekis": (currentRent?.data?.result[0].totBaseValue)?.toFixed(2),
                }
            }
        }
    })


    const [tableData, setTableData] = useState<any>([]);
    const { data: res } = warehouseStore.getWarehosueOrdersById(id as string);
    // Check this part
    useEffect(() => {
        let productTableData: any = [];
        if (res?.data?.result) {
            res?.data?.result.map((item: any) => {
                warehouseProducts?.data?.result.map((warehouseProduct: any) => {
                    if (warehouseProduct.id === item.warehouseProductId) {
                        productTableData.push({
                            'Pavadinimas': item.productName,
                            'Matavimo Vnt': 'Kg',
                            'Kiekis': item.currentLoanedOutQty,
                            '1 Vnt Kaina(€ /D)': Number(item.rentPrice).toFixed(2),
                            'Visų produktų kaina D': Number(Number(item.rentPrice) * item.currentLoanedOutQty).toFixed(2),
                            'Vertė': (warehouseProduct.price * item.currentLoanedOutQty).toFixed(2),
                        })
                    }
                })
            })
        }
        setTableData(productTableData);
    }, [res?.data?.result]);

    useEffect(() => {
        if (props.projects) {
            setIsLoading(false);
        }
    }, [props.projects])

    if (serviceOrders) {
        serviceOrders?.data?.result.map((serviceOrderData: any) => {
            if (serviceOrderData.projectId === id) {
                let unitData: string = '';
                let basePrice: number = 0;
                let code: string = '';
                let name: string = '';
                service?.data?.result.map((item: any) => {
                    if (serviceOrderData.serviceId === item.id) {
                        unitData = item.unit;
                        basePrice = item.basePrice;
                        code = item.number;
                        name = item.name;
                    }
                })
                tablemockDataService.push({
                    'Kodas': code,
                    'Pavadinimas': name,
                    'Kiekis': serviceOrderData.quantity,
                    'Matavimo Vnt.': unitData,
                    'Pradžia': serviceOrderData.startOn,
                    'Vertė (€ /Vnt)': basePrice,
                    // 'Discount (%)': serviceOrderData.discount,
                    // 'Value 1 psc.(discounted)': serviceOrderData.totPrice,
                    'Viso': serviceOrderData.quantity * serviceOrderData.totPrice,
                })
            }
        })
    }

    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <React.Fragment >
            {props.projects && !isLoading ? (
                <div className="py-4 px-5 bg-white">
                    <div className="action py-3 row">
                        <div className="col-3 mr-3">
                            <Button
                                onClick={() => setRightModalShow(true)}
                                className="text-capitalize b-radius"
                            >
                                Redaguoti
                            </Button>
                        </div>
                        <div className="col-3 ml-3">
                            <Button
                                className="text-capitalize b-radius light"
                                onClick={() => setIsRemoveModalOpen(true)}
                            >
                                Ištrinti
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Informacija" data={info} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Nuomos informacija" data={orderInfo} />
                        </div>
                        <div className="mb-5">
                            {
                                tableData.length > 0 &&
                                <Collapsible isOpen={true} title="Produktai nuomoje">
                                    <div className="p-3 row">
                                        <div className="mb-5">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                                <SubTable
                                                    data={tableData || []}
                                                    showAddNewButton={false}
                                                    isFilter={false}
                                                    rowsPerPage={25}
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
                                <Collapsible isOpen={true} title="Services">
                                    <div className="p-3 row">
                                        <div className="mb-5">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                                <SubTable1
                                                    data={tablemockDataService || []}
                                                    showAddNewButton={false}
                                                    isFilter={false}
                                                    rowsPerPage={25}
                                                    uniqueCol="id"
                                                    hide={['id']}
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
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        projectId={props.projects.id}
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
            ) : (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                }}>
                    <SpinnerCircularFixed
                        size={80}
                        thickness={150}
                        color={'green'}
                        secondaryColor={'rgb(0,0,0,0.12'}
                    />
                </div>
            )
            }
        </React.Fragment>
    );
}
