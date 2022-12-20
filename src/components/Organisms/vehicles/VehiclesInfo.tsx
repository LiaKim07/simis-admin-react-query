import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { VehiclesDto } from "../../../types/services/vehicles.type"
import { vehiclesStore } from '../../../store/vehicles.store';
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewVehiclesModal from "./AddNewVehiclesModal";
import RemoveModal from "../Modals/RemoveConfirmModal";

export default function VehiclesInfo(props: { vehicles: any }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = vehiclesStore.removeById();

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.vehicles.id, {
            async onSuccess(_data) {
                toast.success('Vehicles was created successfully', { id: toastId });
                queryClient.invalidateQueries(['vehicles']);
                navigate(`/dashboard/vehicles`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };
    let vehiclesinfo = {};
    if (props.vehicles) {
        vehiclesinfo = {
            "Pavadinimas": props.vehicles?.name,
            "Registracijos nr": props.vehicles?.plateNumber,
            "Registracijos data": props.vehicles?.service,
            "Tipas": props.vehicles?.type,
            "Keliamoji galia": props.vehicles?.liftingCapacity,
            "Kilometražas": props.vehicles?.milage,
            "Kitas techninis aptarnavimas": props.vehicles?.service,
            "Techninės priežiūros pabaiga": props.vehicles?.inspection,
            "Draudimo pabaiga": props.vehicles?.insurance,
        }
    }

    return (
        <React.Fragment>
            {props.vehicles ? (
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
                            <Details title="Informacija" data={vehiclesinfo} />
                        </div>
                    </div>

                    <AddNewVehiclesModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        vehiclesId={props.vehicles.id}
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
