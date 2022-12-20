
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { EmployeeRoleTableDto } from "../../../types/services/employees.types";
import { drivingLicenseStore } from '../../../store/driving-license.store';
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewDriverLicenseModal from "./AddNewDriverLicenseModal";
import RemoveModal from "../Modals/RemoveConfirmModal";

export default function DriverLicenseInfo(props: { data: any }) {    
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = drivingLicenseStore.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.data.id, {
            async onSuccess(_data) {
                toast.success('DriverLicense was removed successfully', { id: toastId });
                queryClient.invalidateQueries(['d-licenses']);
                navigate(`/dashboard/driver-license`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let driverLicenseInfo = {};
    if (props.data) {
        driverLicenseInfo = {
            "Name": props.data?.name,
        }
    }

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
                                Edit
                            </Button>
                        </div>
                        <div className="col-3 ml-3">
                            <Button
                                className="text-capitalize b-radius light"
                                onClick={() => setIsRemoveModalOpen(true)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Data" data={driverLicenseInfo} />
                        </div>
                    </div>

                    <AddNewDriverLicenseModal
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
