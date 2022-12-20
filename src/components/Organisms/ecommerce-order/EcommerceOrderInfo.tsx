import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { ecommerceOrderStore } from '../../../store/ecommerce-order.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { productStore } from '../../../store/products.store';
import EditEcommerceClientModal from "./EditEcommerceOrderModal";
import Collapsible from '../../Molecules/Modal/Collapsible';
import SubTable from '../../Organisms/tables/EcommerceOrderTableProduct';

export default function EcommerceOrderinfo(props: { ecomData: any }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [values, setvalues] = useState<any>({});

    const { mutateAsync } = ecommerceOrderStore.removeById();
    const { mutateAsync: updateMutation } = ecommerceOrderStore.update();
    const { data: ecomOrder } = ecommerceOrderStore.getById(id as string);
    const { data: product } = productStore.getAll();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    let tablemockData: any = [];

    ecomOrder?.data?.result?.warehouseProductIds.map((item: any) => {
        warehouseProduct?.data?.result.map((warehosueProduct: any) => {
            if (item === warehosueProduct.id) {
                product?.data?.result.map((products: any) => {
                    if (warehosueProduct.productId === products.id) {
                        tablemockData.push({
                            'Kodas': products.name,
                            'Pavadinimas': products.number,
                            'Matavimo Vnt': 'm2',
                            'Kiekis': '5',
                            '1Vnt Kaina (€ /D)': '12',
                            'Visų kaina dienai': 'test',
                            'Vnt Vertė': 'test',
                        })
                    }
                })
            }
        })
    })

    useEffect(() => {
        if (props.ecomData) {
            setvalues(props.ecomData);
        }
    }, [props.ecomData]);

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Removing ....');
        mutateAsync(props.ecomData.id, {
            async onSuccess(_data) {
                toast.success('Removed successfully', { id: toastId });
                queryClient.invalidateQueries(['ecommerce-order']);
                navigate(`/dashboard/ecommerce-orders`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    const handleUpdate = async () => {
        const toastId = toast.loading('Activating ....');
        updateMutation(
            { ...values, isActive: true, id: props.ecomData.id },
            {
                async onSuccess(_data) {
                    toast.success('Activated', { id: toastId });
                    queryClient.invalidateQueries(['project-ordersById', props.ecomData.id]);

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

    const onChangePage = (_page: number) => {
        return {};
    };

    let ecomInfo = {};
    if (props.ecomData) {
        ecomInfo = {
            'Pavadinimas': props.ecomData.title,
            'Sukūrimo data': props.ecomData.createdOn,
            'Atsakingas': props.ecomData.approvedBy,
            'Adresas': `${props.ecomData.address}, ${props.ecomData.postalCode}, ${props.ecomData.city}`,
            'Nuomojamas kiekis': props.ecomData.totalArea,
            'Patvirtina data': props.ecomData.approvedOn,
        }
    }

    return (
        <React.Fragment>
            {props.ecomData ? (
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
                        <div className="col-3 mr-1">
                            <Button
                                onClick={() => handleUpdate()}
                                className="text-capitalize b-radius btn-green-opacity"
                            >
                                Aktyvuoti
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Data" data={ecomInfo} />
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
                    </div>

                    <EditEcommerceClientModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        idData={props.ecomData.id}
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
