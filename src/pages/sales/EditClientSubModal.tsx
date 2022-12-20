import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams, useLocation } from "react-router-dom";

import { queryClient } from '../../plugins/react-query';

import { projectsOrdersStore } from '../../store/project-orders.store';
import { invoicePaymentsStore } from '../../store/invoicePayments.store';
import { ModalProps } from '../../types/props';
import Input from '../../components/Atoms/Form/Input';
import Heading from '../../components/Atoms/Heading';
import Icon from '../../components/Atoms/Icon';
import Button from '../../components/Molecules/Button/Button';
import CustomSelect from '../../components/Atoms/Form/Select';
import { SelectData, ValueType } from '../../types';
import Collapsible from '../../components/Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    sendData?: any;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "invoiceId": "",
    "customerId": "",
    "amountPayed": 0,
    "createdBy": tokenData
};

export default function EditActivatedmodal({
    setShow,
    handleSuccess,
    sendData,
    isUpdating,
    ...props
}: IModalProps) {
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const [type1, setType1] = useState<string>('string');
    const { mutateAsync } = invoicePaymentsStore.create();

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const { data: invoicePayment } = invoicePaymentsStore.getById(sendData as string);
    const { mutateAsync: updateMutation } = invoicePaymentsStore.update();

    useEffect(() => {
        if (invoicePayment?.data) {
            setvalues(invoicePayment?.data?.result);
        }
    }, [invoicePayment?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (isUpdating && sendData) {
            let submitData: any = { ...values, id: sendData, amountPayed: Number(values.amountPayed) };
            updateMutation(submitData, {
                async onSuccess(_data) {
                    toast.success('Updated successfully', { id: toastId });
                    queryClient.invalidateQueries(['invoicePaymentsById', id]);
                    queryClient.invalidateQueries('invoice');
                    queryClient.invalidateQueries('invoicePayment');
                    closeModal();
                    handleSuccess();
                },
                onError(error: any) {
                    toast.error(
                        error.response.data.message || 'error occurred please try again',
                        { id: toastId },
                    );
                },
            },);
        } else {
            let submitData: any = { ...values, invoiceId: sendData, customerId: id, amountPayed: Number(values.amountPayed) };
            mutateAsync(submitData, {
                async onSuccess(_data) {
                    toast.success('Created successfully', { id: toastId });
                    queryClient.invalidateQueries(['invoicePayment']);
                    closeModal();
                    resetForm();
                    handleSuccess();
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
                            {'Registruoti mokėjimą'}
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
                        <Collapsible isOpen={true} title="Mokėjimo informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="amountPayed"
                                        handleChange={handleChange}
                                        placeholder="Mokėjimo suma *"
                                        value={values.amountPayed}
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
