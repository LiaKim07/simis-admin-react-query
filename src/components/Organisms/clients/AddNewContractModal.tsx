import React, { useState } from 'react';
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
    isUpdating?: boolean;
    idData: string;
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

export default function AddNewContractModal({
    setShow,
    clientsId,
    isUpdating = false,
    idData,
    handleSuccessContract,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleChange1 = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const [values, setvalues] = useState<ICreateCustomerAgreement>({ ...defaultState });
    const [type1, setType1] = useState<string>('string');
    const { data: employee } = employeeStore.getAll();
    const { data: customerPaymentMethod } = customerSettings.fetchPaymentMethod();
    const { data: customerAgreementTerm } = customerSettings.fetchAgreementTerm();
    const { data: customerPaymentDue } = customerSettings.fetchCustomerPaymentDueTerm();
    const { mutateAsync } = customerAgreements.createCutomerAgreements();

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (idData) {
            let sub_data: ICreateCustomerAgreement;
            sub_data = { ...values, customerId: idData, advancedPaymentAmount: 0 };
            mutateAsync(sub_data, {
                async onSuccess(_data) {
                    toast.success('Sutartis sėkmingai sukurta', { id: toastId });
                    queryClient.invalidateQueries(['agreement']);
                    closeModal();
                    resetForm();
                    handleSuccessContract(sub_data);
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
                            {isUpdating ? 'Edit' : 'Nauja sutartis'}
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
                                        type="string"
                                        name="prefix"
                                        handleChange={handleChange}
                                        placeholder="Prefix"
                                        value={values.prefix}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        className="mr-3"
                                        name="number"
                                        type="string"
                                        handleChange={handleChange}
                                        placeholder="Numeris"
                                        value={values.number}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        className="mr-3"
                                        name="maxOrderValue"
                                        type="number"
                                        handleChange={handleChange1}
                                        placeholder="Maksimali užsakymų suma"
                                        value={values.maxOrderValue}
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        className="mr-3"
                                        name="maxOrderValue"
                                        type="number"
                                        handleChange={handleChange1}
                                        placeholder="Didžiausia skola"
                                        value={values.maxOrderValue}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                                    <Input
                                        name="validUntil"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        handleChange={handleChange}
                                        placeholder="Galioja iki *"
                                        value={values.validUntil}
                                    />
                                </div> */}
                            </div>
                            <div className="p-3 row">
                                {/* <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerPaymentMethodId"
                                        handleChange={handleChange}
                                        placeholder="Mokėjimo būdas"
                                        value={values.customerPaymentMethodId}
                                        options={
                                            customerPaymentMethod?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerPaymentDueTermId"
                                        handleChange={handleChange}
                                        placeholder="Mokėjimas iki"
                                        value={values.customerPaymentDueTermId}
                                        options={
                                            customerPaymentDue?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerAgreementTerminationTermId"
                                        handleChange={handleChange}
                                        placeholder="Sutarties nutraukimo terminas"
                                        value={values.customerAgreementTerminationTermId}
                                        options={
                                            customerAgreementTerm?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="employeeId"
                                        handleChange={handleChange}
                                        placeholder="Darbuotojas"
                                        value={values.employeeId}
                                        options={
                                            employee?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
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
