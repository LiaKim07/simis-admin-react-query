import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { ProductGroupDto } from "../../../types/services/productgroup.type";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProductgroupModal from "./AddNewProductgroup";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { productCategory } from '../../../store/productcategory.store';
import { productGroup } from '../../../store/productgroup.store';

export default function ProductgroupInfo(props: { productgroup: ProductGroupDto }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const { data: productcategories } = productCategory.getAll();
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = productGroup.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.productgroup.id, {
            async onSuccess(_data) {
                toast.success('ProductGroup was deleted successfully', { id: toastId });
                queryClient.invalidateQueries(['productgroups']);
                navigate(`/dashboard/warehouse-settings/productgroup`);
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

    if (props.productgroup) {
        if (productcategories) {
            for (const prodCategory of productcategories.data.result) {
                if (prodCategory.id === props.productgroup.productCategoryId) {
                    productInfo = {
                        "Pavadinimas": props.productgroup?.name,
                        "Aprašymas": props.productgroup?.note,
                        "Prekės tipas": prodCategory.name
                    }
                }
            }
        }
    }

    return (
        <React.Fragment>
            {props.productgroup ? (
                <div className="py-4 px-5 bg-white">
                    <div className="p-2 border d-inline-block">
                        <div className="w-20 h-20 border rounded-circle text-center text-sm">
                            {/* Photo placeholder */}
                            <img
                                src={props.productgroup?.imageUrl! || '/assets/images/product-type.png'}
                                className="d-block w-20 h-20 rounded-circle"
                                alt="Profile url"
                            />
                        </div>
                    </div>
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
                                Pašalinti
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Bendra prekių grupės informacija" data={productInfo} />
                        </div>
                    </div>

                    <AddNewProductgroupModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        productgroupId={props.productgroup.id}
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
