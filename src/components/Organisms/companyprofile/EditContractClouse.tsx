import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';
import { queryClient } from '../../../plugins/react-query';

import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../types';

import { agreementClausesStore } from '../../../store/agreement-clauses.store';
import { employeeStore } from '../../../store/employees.store';

interface IModalProps extends ModalProps {
    data?: any;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "number": "",
    "description": "",
    "agreementTypeId": "",
    "note": "",
    "createdBy": tokenData,
};

export default function EditContractClouse({
    setShow,
    data,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    // const { data: agreementClausesData } = agreementClausesStore.getAll();
    const { mutateAsync } = agreementClausesStore.create();

    // useEffect(() => {
    //     if (agreementClausesData) {
    //         setvalues((prev: any) => ({
    //             ...prev,
    //             "number": agreementClausesData?.data?.result.number,
    //             "description": agreementClausesData?.data?.result.description,
    //             // "agreementTypeId": agreementClausesData?.data?.result.agreementTypeId,
    //             "note": agreementClausesData?.data?.result.note,
    //         }));
    //     }
    // }, [agreementClausesData]);


    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(values, {
            async onSuccess(_data) {
                toast.success('Created successfully', { id: toastId });
                queryClient.invalidateQueries(['agreement-clauses']);
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
    };

    const resetForm = () => {
        setvalues('');
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
                            {'Edit company profile'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
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
                        <Collapsible isOpen={true} title="DATA">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="number"
                                        handleChange={handleChangeString}
                                        placeholder="Number:"
                                        value={values.number}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="description"
                                        handleChange={handleChangeString}
                                        placeholder="Description:"
                                        value={values.description}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChangeString}
                                        placeholder="Note:"
                                        value={values.note}
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
