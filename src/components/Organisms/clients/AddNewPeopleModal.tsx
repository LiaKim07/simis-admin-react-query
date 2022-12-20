import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { customerContacts } from '../../../store/customer-contacts.store';
import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreatePeople } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Textarea from '../../Atoms/Form/Textarea';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    clientsId?: string;
    isUpdating?: boolean;
    idData: string;
    handleSuccessPeople: (data: any) => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreatePeople = {
    "profileUrl": "",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "email": "",
    "isNotDirector": true,
    "customerId": "",
    "position": "",
    "note": "",
    "createdBy": tokenData
};

export default function AddNewPeopleModal({
    setShow,
    clientsId,
    isUpdating = false,
    idData,
    handleSuccessPeople,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreatePeople>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const { mutateAsync } = customerContacts.createCutomerContacts();

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (idData) {
            let sub_data: ICreatePeople;
            sub_data = { ...values, customerId: idData };
            mutateAsync(sub_data, {
                async onSuccess(_data) {
                    toast.success('Kontaktinis asmuos sėkmingai pridėtas', { id: toastId });
                    queryClient.invalidateQueries(['customer-contact']);
                    closeModal();
                    resetForm();
                    handleSuccessPeople(sub_data);
                },
                onError(error: any) {
                    toast.error(error.response.data.message || 'error occurred please try again', {
                        id: toastId,
                    });
                },
            });
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
                            {isUpdating ? 'Edit' : 'Kliento kontaktinis asmuo'}
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
                    <div className="body-content px-4">

                        <Collapsible isOpen={true} title="Kontaktinio asmens informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="firstName"
                                        handleChange={handleChange}
                                        placeholder="Vardas *"
                                        value={values.firstName}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="lastName"
                                        handleChange={handleChange}
                                        placeholder="Pavardė *"
                                        value={values.lastName}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                                    <Input
                                        className="mr-3"
                                        name="phone"
                                        type="string"
                                        handleChange={handleChange}
                                        placeholder="Telefonas"
                                        value={values.phone}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="position"
                                        handleChange={handleChange}
                                        placeholder="Pareigos *"
                                        value={values.position}
                                    />
                                </div>
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
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChange}
                                        placeholder="Aprašymas:"
                                        value={values.note}
                                    />
                                </div>
                            </div>
                        </Collapsible>

                    </div>
                    <div className="body-modal-footer row px-4">
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
