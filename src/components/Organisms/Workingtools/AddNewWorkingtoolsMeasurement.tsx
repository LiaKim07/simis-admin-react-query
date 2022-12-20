import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';

interface IModalProps extends ModalProps {
    producttypeId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: any = {
    imageUrl: '',
    name: '',
};

export default function AddNewWorkingtoolsTypeeModal({
    setShow,
    producttypeId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };
    const [values, setvalues] = useState<any>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        if (producttypeId && isUpdating) {
            closeModal();
            handleSuccess();
        } else {
            closeModal();
            resetForm();
            handleSuccess();
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
                            {isUpdating ? 'Update Measurement Units' : 'New Measurement Units'}
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
                        <Collapsible isOpen={true} title="Measurement Data">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeString}
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
