import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { ecommerceOrderStore } from '../../../store/ecommerce-order.store';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';

interface IModalProps extends ModalProps {
    idData?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: any = {
    "title": "",
    "address": "",
    "postalCode": "",
    "city": "",
    "totalArea": 0,
    "isActive": true,
    "warehouseProductIds": [],
    "serviceIds": [],
    "approvedOn": "",
    "approvedBy": ""
}

export default function EditEcommerceOrderModal({
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

    const { mutateAsync: updateMutation } = ecommerceOrderStore.update();
    const { data: currentEcomOrderData } = ecommerceOrderStore.getById(idData);

    useEffect(() => {
        if (currentEcomOrderData?.data) {
            setvalues((prev: any) => ({
                ...prev,
                id: currentEcomOrderData?.data?.result.id,
                "title": currentEcomOrderData?.data?.result.title,
                "address": currentEcomOrderData?.data?.result.address,
                "postalCode": currentEcomOrderData?.data?.result.postalCode,
                "city": currentEcomOrderData?.data?.result.city,
                "totalArea": currentEcomOrderData?.data?.result.totalArea,
                "isActive": currentEcomOrderData?.data?.result.isActive,
                "warehouseProductIds": currentEcomOrderData?.data?.result.warehouseProductIds,
                "serviceIds": currentEcomOrderData?.data?.result.serviceIds,
                "approvedOn": currentEcomOrderData?.data?.result.approvedOn,
                "approvedBy": currentEcomOrderData?.data?.result.approvedBy,
            }));
        }
    }, [currentEcomOrderData?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (idData && isUpdating) {
            updateMutation(
                { ...values, id: idData },
                {
                    async onSuccess(_data) {
                        toast.success('Paslauga sėkmingai pridėta', { id: toastId });
                        queryClient.invalidateQueries(['ecommerce-order-byId', idData]);
                        closeModal();
                        handleSuccess();
                    },
                    onError(error: any) {
                        toast.error(
                            error.response.data.message || 'error occurred please try again',
                            { id: toastId },
                        );
                    },
                },
            );
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
                            {isUpdating ? 'Atnaujinti e komercijos klientą' : 'Nauja Paslauga'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Uždaryti
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
                        <Collapsible isOpen={true} title="Kliento informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="title"
                                        handleChange={handleChange}
                                        placeholder="title *"
                                        value={values.title}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="address"
                                        handleChange={handleChange}
                                        placeholder="Adresas"
                                        value={values.address}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="postalCode"
                                        handleChange={handleChange}
                                        placeholder="Pašto kodas *"
                                        value={values.postalCode}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="city"
                                        handleChange={handleChange}
                                        placeholder="Miestas"
                                        value={values.city}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="totalArea"
                                        handleChange={handleChange}
                                        placeholder="totalArea"
                                        value={values.totalArea}
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
