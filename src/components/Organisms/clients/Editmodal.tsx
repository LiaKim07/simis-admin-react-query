import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { employeeStore } from '../../../store/employees.store';
import { customerSettings } from '../../../store/customer-settings.store';
import { customerAgreements } from '../../../store/cutomer-agreement.store';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateCustomerAgreement } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Textarea from '../../Atoms/Form/Textarea';

interface IModalProps extends ModalProps {
    clientsId?: any;
    contracts: string;
    isUpdating?: boolean;
    handleSuccessContract: (d: any) => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreateCustomerAgreement = {
    "customerId": "",
    "isActive": true,
    "prefix": "",
    "number": "",
    "customerPaymentMethodId": "",
    "customerAgreementTerminationTermId": "",
    "maxOrderValue": 0,
    "advancedPaymentAmount": 0,
    "customerPaymentDueTermId": "",
    "employeeId": "",
    "note": "",
    "validUntil": "2023.05.05",
    "createdBy": tokenData,
};

export default function EditModal({
    setShow,
    clientsId,
    isUpdating = false,
    contracts,
    handleSuccessContract,
    ...props
}: IModalProps) {
    console.log('test', contracts)
    const closeModal = () => {
        setShow(false);
    };

    const handleChange1 = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const [values, setvalues] = useState<ICreateCustomerAgreement>({ ...defaultState });
    const { data: agreementData } = customerAgreements.getById(contracts as string);
    const { mutateAsync: updateMutation } = customerAgreements.updateCutomerAgreements();

    useEffect(() => {
        if (agreementData?.data) {
            setvalues((prev) => ({
                ...prev,
                "customerId": agreementData?.data?.result.customerId,
                "isActive": agreementData?.data?.result.isActive,
                "prefix": agreementData?.data?.result.prefix,
                "number": agreementData?.data?.result.number,
                "customerPaymentMethodId": agreementData?.data?.result.customerPaymentMethodId,
                "customerAgreementTerminationTermId": agreementData?.data?.result.customerAgreementTerminationTermId,
                "maxOrderValue": agreementData?.data?.result.maxOrderValue,
                "advancedPaymentAmount": agreementData?.data?.result.advancedPaymentAmount,
                "customerPaymentDueTermId": agreementData?.data?.result.customerPaymentDueTermId,
                "employeeId": agreementData?.data?.result.employeeId,
                "note": agreementData?.data?.result.note,
                "validUntil": agreementData?.data?.result.validUntil,
                "createdBy": agreementData?.data?.result.createdBy,
            }));
        }
    }, [agreementData?.data]); console.log('val', values)

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        updateMutation(
            { ...values, id: contracts, maxOrderValue: values.maxOrderValue },
            {
                async onSuccess(_data) {
                    toast.success('Updated successfully', { id: toastId });
                    queryClient.invalidateQueries(['agreementById', contracts]);
                    queryClient.invalidateQueries(['agreement']);
                    closeModal();
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
                            {'Keisti maksimalią skolą'}
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

                        <Collapsible isOpen={true} title="Sutarties informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        className="mr-3"
                                        name="maxOrderValue"
                                        type="number"
                                        handleChange={handleChange1}
                                        placeholder="Nauja max skola"
                                        value={values.maxOrderValue}
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
