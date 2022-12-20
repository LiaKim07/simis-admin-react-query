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
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import Checkbox from '../../Atoms/Form/Checkbox';
import { employeeStore } from '../../../store/employees.store';
import { vehiclesStore } from '../../../store/vehicles.store';

interface IModalProps extends ModalProps {
    producttypeId?: string;
    isupdate?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "name": "",
    "plateNumber": "",
    "milage": 0,
    "insurance": "",
    "service": "",
    "inspection": "",
    "manufactory": "",
    "employeeId": "",
    "type": "",
    "liftingCapacity": 0,
    "drivingLicenseCategoryId": "",
    "createdBy": tokenData
};


export default function AddNewWDriver({
    setShow,
    producttypeId,
    isupdate = false,
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
    const { mutateAsync } = vehiclesStore.create();
    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        console.log('submit data', values)
        const toastId = toast.loading('Saving ....');
        mutateAsync(values, {
            async onSuccess(_data) {
                toast.success('Vehicles was created successfully', { id: toastId });
                queryClient.invalidateQueries(['vehicles']);
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
                            {isupdate ? 'Update Driver' : 'Vairuotojas'}
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
                                        name="employeeId"
                                        handleChange={handleChange}
                                        placeholder="Pasirinkte *"
                                        value={values.employeeId}
                                        options={
                                            empData?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
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
                            <Button className="text-capitalize b-radius bg-danger" onClick={handleCancel}>
                                Ištrinti
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
