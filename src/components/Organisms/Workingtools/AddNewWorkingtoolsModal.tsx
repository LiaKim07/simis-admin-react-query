import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { SelectData } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import Textarea from '../../Atoms/Form/Textarea';

import { equipmentStore } from '../../../store/equipment.store';

interface IModalProps extends ModalProps {
    idData?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "quantity": "",
    "expiredOn": "",
    "name": "",
    "number": "",
    "unit": "",
    "note": "",
    "createdBy": tokenData
};

export default function AddNewWorkingtoolsModal({
    setShow,
    idData,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };
    const measurementData = [
        { "id": 'id1', "name": "psc" },
        { "id": 'id2', "name": "kg" },
    ];

    const [values, setvalues] = useState<any>({ ...defaultState });
    const { mutateAsync } = equipmentStore.create();
    const { mutateAsync: updateMutation } = equipmentStore.update();
    const { data: equipments } = equipmentStore.getById(idData);
    const [type1, setType1] = useState<string>('string');

    useEffect(() => {
        if (equipments?.data) {
            setvalues((prev: any) => ({
                ...prev,
                "id": equipments.data.result.id,
                "quantity": equipments.data.result.quantity,
                "expiredOn": equipments.data.result.expiredOn,
                "name": equipments.data.result.name,
                "number": equipments.data.result.number,
                "unit": equipments.data.result.unit,
                "note": equipments.data.result.note,
                "createdBy": tokenData
            }));
        }
    }, [equipments?.data]);

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };
    const handleChangeVal = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (idData && isUpdating) {
            updateMutation(
                { ...values, id: idData },
                {
                    async onSuccess(_data) {
                        toast.success('Workingtools was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['equipmentsById', idData]);
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
        } else {
            mutateAsync(values, {
                async onSuccess(_data) {
                    toast.success('Workingtools was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['equipments']);
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
                            {isUpdating ? 'Update Accomodation' : 'Nauja darbo priemonė'}
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
                        <Collapsible isOpen={true} title="Informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="unit"
                                        handleChange={handleChange}
                                        placeholder="Matavimo vienetai *"
                                        value={values.unit}
                                        options={
                                            measurementData.map((n) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChangeVal}
                                        placeholder="Reason *"
                                        value={values.number}
                                    />
                                </div> */}

                                <div className="col-12 col-sm-12 col-md-6 col-lg-9 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeVal}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-3 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="quantity"
                                        handleChange={handleChange}
                                        placeholder="Kiekis *"
                                        value={values.quantity}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        name="expiredOn"
                                        handleChange={handleChange}
                                        placeholder="Galiojimas "
                                        value={values.expiredOn}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChangeVal}
                                        placeholder="Pastaba"
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
