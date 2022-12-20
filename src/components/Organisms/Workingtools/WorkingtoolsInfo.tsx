import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '../../../plugins/react-query';
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewWorkingtoolsModal from "./AddNewWorkingtoolsModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { equipmentStore } from '../../../store/equipment.store';

export default function WorkingtoolsInfo(props: { data: any }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = equipmentStore.removeById();
    let testinfo = {};
    if (props.data) {
        testinfo = {
            "Pavadinimas:": props.data?.name,
            "Matavimo vnt": props.data?.unit,
            "Numeris": props.data?.number,
            "Galiojimo laikas": props.data?.expiredOn,
            "Kiekis": props.data?.quantity,
            "Išduota": props.data?.loanedOutQuantity,
        }
    }

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.data.id, {
            async onSuccess(_data) {
                toast.success('Equipment was removed successfully', { id: toastId });
                queryClient.invalidateQueries(['equipments']);
                navigate(`/dashboard/equipments`);
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
            {props.data ? (
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
                                Ištrint
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Informacija" data={testinfo} />
                        </div>
                    </div>

                    <AddNewWorkingtoolsModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        idData={props.data.id}
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
