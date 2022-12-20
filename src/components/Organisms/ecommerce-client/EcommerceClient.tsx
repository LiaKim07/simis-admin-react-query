import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { ecommerceClientStore } from '../../../store/ecommerce-client';
import EditEcommerceClientModal from "./EditEcommerceClientModal";

export default function EcommerceClientinfo(props: { ecomData: any }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = ecommerceClientStore.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Removing ....');
        mutateAsync(props.ecomData.id, {
            async onSuccess(_data) {
                toast.success('Removed successfully', { id: toastId });
                queryClient.invalidateQueries(['ecommerce-client']);
                navigate(`/dashboard/ecommerce-client`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let ecomInfo = {};
    if (props.ecomData) {
        ecomInfo = {
            "Vardas Pavardė": `${props.ecomData.firstName} ${props.ecomData.lastName}`,
            "Tipas": props.ecomData?.isCompany ? "Fizinis" : "Juridinis",
            "įmonės Pavadinimas": props.ecomData?.companyName,
            "Telefonas": props.ecomData?.phone,
            "įmonės Kodas": props.ecomData?.companyNumber,
            "PVM Mok. kodas": props.ecomData?.vatNumber,
            "Adresas": `${props.ecomData?.address}, ${props.ecomData?.postalCode}, ${props.ecomData?.city}`,
            "Kaina už kv m.": props.ecomData?.pricePerSqm,
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
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Data" data={ecomInfo} />
                        </div>
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
