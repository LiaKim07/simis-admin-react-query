import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { ProductDto } from "../../../types/services/product.types";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProductModal from "./AddNewProductModal";
import AddNewSubProductModal from "./AddSubProductModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';

export default function ProductInfo(props: { product: ProductDto }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = productStore.removeById();

    const { data: producttypeData } = productType.getAll();
    const { data: productgroupData } = productGroup.getAll();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.product.id, {
            async onSuccess(_data) {
                toast.success('Employee was created successfully', { id: toastId });
                queryClient.invalidateQueries(['employees-roles']);
                navigate(`/dashboard/warehouses/products`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let productInfo = {};
    let valueInfo = {};
    let quantitiesInfo = {};
    if (props.product) {
        let typeData: string = '';
        if (producttypeData) {
            for (const producttypesData of producttypeData?.data?.result) {
                if (producttypesData.id === props.product?.productTypeId) {
                    typeData = producttypesData.name;
                }
            }
        }
        let groupData: string = '';
        if (productgroupData) {
            for (const productgroupsData of productgroupData?.data?.result) {
                if (productgroupsData.id === props.product?.productGroupId) {
                    groupData = productgroupsData.name;
                }
            }
        }
        productInfo = {
            "Prekės kodas": props.product?.number,
            "Pavadinimas": props.product?.name,
            "Tipas": typeData,
            "Grupė": groupData,
        }

        valueInfo = {
            "Svoris (kg)": props.product?.weight,
            "Plotas": props.product?.area,
        }
    }

    return (
        <React.Fragment>
            {props.product ? (
                <div className="py-4 px-5 bg-white">
                    <div className="d-flex  justify-content-between">
                        <div className="action py-3 row w-100">
                            <div className="col-3 mr-1">
                                <Button
                                    onClick={() => setRightModalShow(true)}
                                    className="text-capitalize b-radius"
                                >
                                    Redaguoti
                                </Button>
                            </div>
                            <div className="col-3 ml-1">
                                <Button
                                    className="text-capitalize b-radius light"
                                    onClick={() => setIsRemoveModalOpen(true)}
                                >
                                    Panaikinti
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Prekės Informacija" data={productInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Papildoma informacija" data={valueInfo} />
                        </div>
                    </div>

                    <AddNewProductModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        productId={props.product.id}
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
