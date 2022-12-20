import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { ProductCategoryDto } from "../../../types/services/productcategory.type";
import { productCategory } from '../../../store/productcategory.store';
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProductcategoryModal from "./AddNewProductcategory";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { productGroup } from '../../../store/productgroup.store';

export default function ProductcategoryInfo(props: { productcategory: ProductCategoryDto }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const { data: productgroups } = productGroup.getAll();
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = productCategory.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.productcategory.id, {
            async onSuccess(_data) {
                toast.success('ProductCategory was deleted successfully', { id: toastId });
                queryClient.invalidateQueries(['productcategories']);
                navigate(`/dashboard/warehouse-settings/productcategory`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    }
    let productInfo = {};

    if (props.productcategory) {
        productInfo = {
            "Pavadinimas": props.productcategory?.name,
            "Aprašymas": props.productcategory?.note,
        }
    }

    return (
        <React.Fragment>
            {props.productcategory ? (
                <div className="py-4 px-5 bg-white">
                    <div className="p-2 border d-inline-block">
                        <div className="w-20 h-20 border rounded-circle text-center text-sm">
                            {/* Photo placeholder */}
                            <img
                                src={props.productcategory?.imageUrl! || '/assets/images/product-type.png'}
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
                            <Details title="Bendra prekių kategorijos informacija" data={productInfo} />
                        </div>
                    </div>

                    <AddNewProductcategoryModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        productcategoryId={props.productcategory.id}
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
