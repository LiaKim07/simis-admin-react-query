import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import { queryClient } from '../../../../plugins/react-query';
import { ModalProps } from '../../../../types/props';
import Input from '../../../Atoms/Form/Input';
import Textarea from '../../../Atoms/Form/Textarea';
import Heading from '../../../Atoms/Heading';
import Icon from '../../../Atoms/Icon';
import Button from '../../../Molecules/Button/Button';
import Collapsible from '../../../Molecules/Modal/Collapsible';
import CustomSelect from '../../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../../types';

import { employeeStore } from '../../../../store/employees.store';
import { equipmentOrderStore } from '../../../../store/equipmentOrder.store';

interface IModalProps extends ModalProps {
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "type": "loans",
    "quantity": "",
    "note": "",
    "employeeId": "",
    "prefix": "prefix",
    "number": "",
    "equipmentId": '',
    "validUntil": "",
    "pricePerUnit": "",
    "createdBy": tokenData
};

export default function AddNewIssueModal({
    setShow,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {

    const closeModal = () => {
        setShow(false);
    };
    const { id } = useParams();
    const [values, setvalues] = useState<any>({ ...defaultState });
    const [type1, setType1] = useState<string>('string');
    const { mutateAsync } = equipmentOrderStore.create();

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeVal = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

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
        let sub_data = { ...values, equipmentId: id };
        mutateAsync(sub_data, {
            async onSuccess(_data) {
                toast.success('Issue was created successfully', { id: toastId });
                queryClient.invalidateQueries(['equipmentOrder']);
                closeModal();
                resetForm();
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Issue' : 'Naujas išdavimas'}
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
                        <Collapsible isOpen={true} title="Naujas išdavimas">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="employeeId"
                                        handleChange={handleChange}
                                        placeholder="Darbuotojas *"
                                        value={values.employeeId}
                                        options={
                                            empData?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="quantity"
                                        handleChange={handleChange}
                                        placeholder="Kiekis *"
                                        value={values.quantity}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="prefix"
                                        handleChange={handleChange}
                                        placeholder="Prefix"
                                        value={values.prefix}
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChangeVal}
                                        placeholder="Priežastis"
                                        value={values.number}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="pricePerUnit"
                                        handleChange={handleChange}
                                        placeholder="Vertė"
                                        value={values.pricePerUnit}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <Input
                                        name="validUntil"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        handleChange={handleChange}
                                        placeholder=" Galioja iki *"
                                        value={values.validUntil}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChange}
                                        placeholder="Aprašymas"
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
