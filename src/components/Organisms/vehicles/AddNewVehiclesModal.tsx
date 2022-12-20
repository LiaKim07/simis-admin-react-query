import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { vehiclesStore } from '../../../store/vehicles.store';
import { employeeStore } from '../../../store/employees.store';
import { drivingLicenseStore } from '../../../store/driving-license.store';

import { ModalProps } from '../../../types/props';
import { VehiclesDto } from '../../../types/services/vehicles.type';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import Collapsible from '../../Molecules/Modal/Collapsible';

interface IModalProps extends ModalProps {
    vehiclesId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: VehiclesDto = {
    "name": "",
    "plateNumber": "",
    "milage": "",
    "insurance": "",
    "service": "",
    "inspection": "",
    "manufactory": "",
    "employeeId": "4e649395-5091-4c02-9ced-2869f71e230d",
    "type": "",
    "liftingCapacity": "",
    "drivingLicenseCategoryId": "",
    "createdBy": tokenData
};

export default function AddNewVehiclesModal({
    setShow,
    vehiclesId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<VehiclesDto>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const handleChangenumber = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data?.result;
    }

    const { mutateAsync } = vehiclesStore.create();
    const { mutateAsync: updateMutation } = vehiclesStore.update();
    const { data: vehicles } = vehiclesStore.getById(vehiclesId);
    const { data: drivingLincenseData } = drivingLicenseStore.getAll();

    const [type1, setType1] = useState<string>('string');
    const [type2, setType2] = useState<string>('string');
    const [type3, setType3] = useState<string>('string');
    const [type4, setType4] = useState<string>('string');

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onBlurtype2 = (e: any) => {
        if (e.target.value === "") {
            setType2('string')
        }
    }

    const onBlurtype3 = (e: any) => {
        if (e.target.value === "") {
            setType3('string')
        }
    }

    const onBlurtype4 = (e: any) => {
        if (e.target.value === "") {
            setType4('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    const onFocus2 = (e: any) => {
        setType2('date')
    }

    const onFocus3 = (e: any) => {
        setType3('date')
    }

    const onFocus4 = (e: any) => {
        setType4('date')
    }

    useEffect(() => {
        if (vehicles?.data) {
            setvalues((prev) => ({
                ...prev,
                id: vehicles.data.result.id,
                name: vehicles.data.result.name,
                plateNumber: vehicles.data.result.plateNumber,
                milage: vehicles.data.result.milage,
                manufactory: vehicles.data.result.manufactory,
                insurance: vehicles.data.result.insurance,
                service: vehicles.data.result.service,
                inspection: vehicles.data.result.inspection,
                employeeId: vehicles.data.result.employeeId,
                type: vehicles.data.result.type,
                liftingCapacity: vehicles.data.result.liftingCapacity,
            }));
        }
    }, [vehicles?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (vehiclesId && isUpdating) {
            updateMutation(
                { ...values, id: vehiclesId },
                {
                    async onSuccess(_data) {
                        toast.success('Vehicles was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['vehiclesById', vehiclesId]);
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
                            {isUpdating ? 'Update ProductType' : 'Nauja transporto priemonė'}
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
                        <Collapsible isOpen={true} title="Automobilio informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="plateNumber"
                                        handleChange={handleChange}
                                        placeholder="Registracijos nr *"
                                        value={values.plateNumber}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="employeeId"
                                        handleChange={handleChange}
                                        placeholder="Vairuotojas *"
                                        value={values.employeeId}
                                        options={
                                            empData?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="type"
                                        handleChange={handleChange}
                                        placeholder="Tipas *"
                                        value={values.type}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="liftingCapacity"
                                        handleChange={handleChangenumber}
                                        placeholder="Keliamoji galia *"
                                        value={values.liftingCapacity}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="milage"
                                        handleChange={handleChangenumber}
                                        placeholder="Kilometražas *"
                                        value={values.milage}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <CustomSelect
                                        className="mr-3"
                                        name="drivingLicenseCategoryId"
                                        handleChange={handleChange}
                                        placeholder="Vairuotojo kategorija"
                                        value={values.drivingLicenseCategoryId}
                                        options={
                                            drivingLincenseData?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        name="service"
                                        handleChange={handleChange}
                                        placeholder="Techninis aptarnavimas "
                                        value={values.service}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type2}
                                        onFocus={onFocus2}
                                        onBlur={onBlurtype2}
                                        name="inspection"
                                        handleChange={handleChange}
                                        placeholder="Techninė priežiūra"
                                        value={values.inspection}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type3}
                                        onFocus={onFocus3}
                                        onBlur={onBlurtype3}
                                        name="insurance"
                                        handleChange={handleChange}
                                        placeholder="Draudimas"
                                        value={values.insurance}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type4}
                                        onFocus={onFocus4}
                                        onBlur={onBlurtype4}
                                        name="manufactory"
                                        handleChange={handleChange}
                                        placeholder="Pagaminimo data"
                                        value={values.manufactory}
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
