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
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import Textarea from '../../Atoms/Form/Textarea';

import { companyStore } from '../../../store/company.store';
import { employeeStore } from '../../../store/employees.store';

interface IModalProps extends ModalProps {
    data?: any;
    handleSuccess: () => void;
}

const defaultState: any = {
    "name": "",
    "number": "",
    "vatNumber": "",
    "address": "",
    "postalCode": "",
    "city": "",
    "country": "",
    "phone": "",
    "email": "",
    "website": "",
    "payee": "",
    "bankName": "",
    "bankCode": "",
    "bankAccount": "",
    "managerId": "",
    "companyLogoUrl": "",
    "companyTypePrefix": "",
    "agreementNote": "",
    "transferNote": "",
    "returnNote": ""
};

export default function EditCompanyProfile({
    setShow,
    data,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const { data: companyProfileData } = companyStore.getAll();
    const { data: employees } = employeeStore.getAll();

    useEffect(() => {
        if (companyProfileData) {
            setvalues((prev: any) => ({
                ...prev,
                "name": companyProfileData?.data?.result.name,
                "number": companyProfileData?.data?.result.number,
                "vatNumber": companyProfileData?.data?.result.vatNumber,
                "address": companyProfileData?.data?.result.address,
                "postalCode": companyProfileData?.data?.result.postalCode,
                "city": companyProfileData?.data?.result.city,
                "country": companyProfileData?.data?.result.country,
                "phone": companyProfileData?.data?.result.phone,
                "email": companyProfileData?.data?.result.email,
                "website": companyProfileData?.data?.result.website,
                "payee": companyProfileData?.data?.result.payee,
                "bankName": companyProfileData?.data?.result.bankName,
                "bankCode": companyProfileData?.data?.result.bankCode,
                "bankAccount": companyProfileData?.data?.result.bankAccount,
                "managerId": companyProfileData?.data?.result.managerId,
                "companyLogoUrl": companyProfileData?.data?.result.companyLogoUrl,
                "companyTypePrefix": companyProfileData?.data?.result.companyTypePrefix,
                "agreementNote": companyProfileData?.data?.result.agreementNote,
                "transferNote": companyProfileData?.data?.result.transferNote,
                "returnNote": companyProfileData?.data?.result.returnNote,
            }));
        }
    }, [companyProfileData]);

    const { mutateAsync: updateMutation } = companyStore.update();

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        let submitData = { ...values, id: data.id };
        console.log('submit data', submitData);
        updateMutation(submitData, {
            async onSuccess(_data) {
                toast.success('Company profile was updated successfully', { id: toastId });
                queryClient.invalidateQueries(['company-profile']);
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
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeString}
                                        placeholder="Company name"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="companyTypePrefix"
                                        handleChange={handleChangeString}
                                        placeholder="Teisinė forma"
                                        value={values.companyTypePrefix}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="website"
                                        handleChange={handleChangeString}
                                        placeholder="Website"
                                        value={values.website}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChangeString}
                                        placeholder="Registration number"
                                        value={values.number}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="managerId"
                                        handleChange={handleChange}
                                        placeholder="Head of company"
                                        value={values.managerId}
                                        options={
                                            employees?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + '' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="phone"
                                        handleChange={handleChangeString}
                                        placeholder="Phone"
                                        value={values.phone}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="email"
                                        handleChange={handleChangeString}
                                        placeholder="E-mail"
                                        value={values.email}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="vatNumber"
                                        handleChange={handleChangeString}
                                        placeholder="VAT code"
                                        value={values.vatNumber}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="address"
                                        handleChange={handleChangeString}
                                        placeholder="Address"
                                        value={values.address}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="city"
                                        handleChange={handleChangeString}
                                        placeholder="City"
                                        value={values.city}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="postalCode"
                                        handleChange={handleChangeString}
                                        placeholder="Post code"
                                        value={values.postalCode}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="country"
                                        handleChange={handleChangeString}
                                        placeholder="Country"
                                        value={values.country}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="payee"
                                        handleChange={handleChangeString}
                                        placeholder="Payee"
                                        value={values.payee}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="bankName"
                                        handleChange={handleChangeString}
                                        placeholder="Bank Name"
                                        value={values.bankName}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="bankCode"
                                        handleChange={handleChangeString}
                                        placeholder="Bank Code"
                                        value={values.bankCode}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="bankAccount"
                                        handleChange={handleChangeString}
                                        placeholder="Bank Account"
                                        value={values.bankAccount}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="agreementNote"
                                        handleChange={handleChangeString}
                                        placeholder="Sutarties priedo pastaba"
                                        value={values.agreementNote}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="transferNote"
                                        handleChange={handleChangeString}
                                        placeholder="Grąžinimo pastaba"
                                        value={values.transferNote}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="returnNote"
                                        handleChange={handleChangeString}
                                        placeholder="Perdavimo priedo pastaba"
                                        value={values.returnNote}
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
