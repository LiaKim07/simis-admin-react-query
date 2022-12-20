import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { ProductTypeDto } from "../../../types/services/producttype.type";
import { productType } from '../../../store/producttype.store';
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProductypetModal from "./AddNewProducttypeModal";
import RemoveModal from "../Modals/RemoveConfirmModal";

export default function ProducttypeInfo(props: { producttype: ProductTypeDto }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = productType.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.producttype.id, {
            async onSuccess(_data) {
                toast.success('ProductType was created successfully', { id: toastId });
                queryClient.invalidateQueries(['producttypes']);
                navigate(`/dashboard/warehouse-settings/producttype`);
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
    if (props.producttype) {
        productInfo = {
            "Pavadinimas": props.producttype?.name,
            "Aprašymas": props.producttype?.note
        }
    }

    return (
        <React.Fragment>
            {props.producttype ? (
                <div className="py-4 px-5 bg-white">
                    <div className="p-2 border d-inline-block">
                        <div className="w-20 h-20 border rounded-circle text-center text-sm">
                            {/* Photo placeholder */}
                            <img
                                src={props.producttype?.imageUrl! || '/assets/images/product-type.png'}
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
                            <Details title="Bendra prekių tipo informacija" data={productInfo} />
                        </div>
                    </div>

                    <AddNewProductypetModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        producttypeId={props.producttype.id}
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
