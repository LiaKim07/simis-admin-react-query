import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { drivingLicenseStore } from '../../../store/driving-license.store';
import { ICreateDriverLicense } from '../../../types/interface';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import { ValueType } from '../../../types';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import jwt_decode from 'jwt-decode' // import dependency

interface IModalProps extends ModalProps {
    idData?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreateDriverLicense = {
    "name": "",
    "createdBy": tokenData,
};

export default function AddNewLiftingCapacityModal({
    setShow,
    idData,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    // const { mutateAsync } = drivingLicenseStore.create();
    // const { mutateAsync: updateMutation } = drivingLicenseStore.update();
    // const { data: driverLicense } = drivingLicenseStore.getById(idData);

    // useEffect(() => {
    //     if (driverLicense?.data) {
    //         setvalues((prev) => ({
    //             ...prev,
    //             id: driverLicense.data.result.id,
    //             name: driverLicense.data.result.name,
    //         }));
    //     }
    // }, [driverLicense?.data]);

    const handleSubmit = async () => {
        // const toastId = toast.loading('Saving ....');
        if (idData && isUpdating) {
            // updateMutation(
            //     { ...values, id: idData },
            //     {
            //         async onSuccess(_data) {
            //             toast.success('MeasurementUnit was updated successfully', { id: toastId });
            //             queryClient.invalidateQueries(['d-byId', idData]);
            closeModal();
            handleSuccess();
            //         },
            //         onError(error: any) {
            //             toast.error(
            //                 error.response.data.message || 'error occurred please try again',
            //                 { id: toastId },
            //             );
            //         },
            //     },
            // );
        } else {
            // mutateAsync(values, {
            //     async onSuccess(_data) {
            //         toast.success('MeasurementUnit was created successfully', { id: toastId });
            //         queryClient.invalidateQueries(['d-licenses']);
            closeModal();
            resetForm();
            handleSuccess();
            //     },
            //     onError(error: any) {
            //         toast.error(error.response.data.message || 'error occurred please try again', {
            //             id: toastId,
            //         });
            //     },
            // });
        }
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update LiftingCapacity' : 'New LiftingCapacity'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Close
                            </span>
                            <img
                                src={'/icons/close-icon.svg'}
                                className="cursor-pointer"
                                width={30}
                                alt="close-icon"
                            />
                        </button>
                    </div>
                    <div className="body-content px-4 modal-border">
                        <Collapsible isOpen={true} title="Data">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Name *"
                                        value={values.name}
                                    />
                                </div>
                            </div>
                        </Collapsible>

                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Išsaugoti</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                                Atšaukti
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
