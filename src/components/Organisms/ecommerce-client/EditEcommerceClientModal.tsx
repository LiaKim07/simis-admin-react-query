import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { servicesStore } from '../../../store/services.store';
import { serviceCategory } from '../../../store/service-categories.store';
import { ecommerceClientStore } from '../../../store/ecommerce-client';
import { SelectData, ValueType } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Textarea from '../../Atoms/Form/Textarea';

interface IModalProps extends ModalProps {
    idData?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: any = {
    "email": "",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "isCompany": false,
    "companyName": null,
    "companyNumber": null,
    "vatNumber": null,
    "address": null,
    "postalCode": null,
    "city": null,
    "pricePerSqm": 0,
}

export default function EditEcommerceClientModal({
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

    const { mutateAsync: updateMutation } = ecommerceClientStore.update();
    const { data: currentEcomClientData } = ecommerceClientStore.getById(idData);

    useEffect(() => {
        if (currentEcomClientData?.data) {
            setvalues((prev: any) => ({
                ...prev,
                id: currentEcomClientData.data.result.id,
                "email": currentEcomClientData.data.result.email,
                "firstName": currentEcomClientData.data.result.firstName,
                "lastName": currentEcomClientData.data.result.lastName,
                "phone": currentEcomClientData.data.result.phone,
                // "isCompany": currentEcomClientData.data.result.id,
                "companyName": currentEcomClientData.data.result.companyName,
                "companyNumber": currentEcomClientData.data.result.companyNumber,
                "vatNumber": currentEcomClientData.data.result.vatNumber,
                "address": currentEcomClientData.data.result.address,
                "postalCode": currentEcomClientData.data.result.postalCode,
                "city": currentEcomClientData.data.result.city,
                "pricePerSqm": currentEcomClientData.data.result.pricePerSqm,
            }));
        }
    }, [currentEcomClientData?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (idData && isUpdating) {
            updateMutation(
                { ...values, id: idData },
                {
                    async onSuccess(_data) {
                        toast.success('Paslauga sėkmingai pridėta', { id: toastId });
                        queryClient.invalidateQueries(['ecommerce-client-byId', idData]);
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
                                        name="email"
                                        handleChange={handleChange}
                                        placeholder="El. paštas *"
                                        value={values.email}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="phone"
                                        handleChange={handleChange}
                                        placeholder="Telefonas"
                                        value={values.phone}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="firstName"
                                        handleChange={handleChange}
                                        placeholder="Vardas *"
                                        value={values.firstName}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="lastName"
                                        handleChange={handleChange}
                                        placeholder="Pavardė"
                                        value={values.lastName}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="companyName"
                                        handleChange={handleChange}
                                        placeholder="Įmonės pavadinimas *"
                                        value={values.companyName}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="companyNumber"
                                        handleChange={handleChange}
                                        placeholder="Įmonės kodas"
                                        value={values.companyNumber}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="vatNumber"
                                        handleChange={handleChange}
                                        placeholder="PVM kodas *"
                                        value={values.vatNumber}
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
                                        name="pricePerSqm"
                                        handleChange={handleChange}
                                        placeholder="Kaina už Kv. m"
                                        value={values.pricePerSqm}
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
