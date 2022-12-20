import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { servicesStore } from '../../../store/services.store';
import { serviceCategory } from '../../../store/service-categories.store';
import { serviceSubCategory } from '../../../store/service-subcategories.store';
import { SelectData, ValueType } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import { ModalProps } from '../../../types/props';
import { ICreateServices } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Textarea from '../../Atoms/Form/Textarea';

interface IModalProps extends ModalProps {
    servicesId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreateServices = {
    "name": "",
    "number": "",
    "unit": "",
    "note": "",
    "serviceCategoryId": "",
    "serviceSubCategoryId": "",
    "basePrice": "",
    "createdBy": tokenData,
}

export default function AddNewServicesModal({
    setShow,
    servicesId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreateServices>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { data: serviceCategoryData } = serviceCategory.getAll();
    const { data: serviceSubCategoryData } = serviceSubCategory.getAll();
    const { mutateAsync } = servicesStore.create();
    const { mutateAsync: updateMutation } = servicesStore.update();
    const { data: servicesData } = servicesStore.getById(servicesId);

    useEffect(() => {
        if (servicesData?.data) {
            setvalues((prev) => ({
                ...prev,
                id: servicesData.data.result.id,
                name: servicesData.data.result.name,
                number: servicesData.data.result.number,
                basePrice: servicesData.data.result.basePrice,
                unit: servicesData.data.result.unit,
                serviceCategoryId: servicesData.data.result.serviceCategoryId,
                serviceSubCategoryId: servicesData.data.result.serviceSubCategoryId,
                note: servicesData.data.result.note,
            }));
        }
    }, [servicesData?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (servicesId && isUpdating) {
            updateMutation(
                { ...values, id: servicesId },
                {
                    async onSuccess(_data) {
                        toast.success('Paslauga sėkmingai pridėta', { id: toastId });
                        queryClient.invalidateQueries(['servicesById', servicesId]);
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
                    toast.success('Services was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['services']);
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
                            {isUpdating ? 'Update Services' : 'Nauja Paslauga'}
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
                        <Collapsible isOpen={true} title="Paslaugos Informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
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
                                        type="number"
                                        name="basePrice"
                                        handleChange={handleChange}
                                        placeholder="Kaina"
                                        value={values.basePrice}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChange}
                                        placeholder="Paslaugos kodas"
                                        value={values.number}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="unit"
                                        handleChange={handleChange}
                                        placeholder="Matavimo vienetai"
                                        value={values.unit}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="serviceCategoryId"
                                        handleChange={handleChange}
                                        placeholder="Kategorija *"
                                        value={values.serviceCategoryId}
                                        options={
                                            serviceCategoryData?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="serviceSubCategoryId"
                                        handleChange={handleChange}
                                        placeholder="Tipas *"
                                        value={values.serviceSubCategoryId}
                                        options={
                                            serviceSubCategoryData?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div> */}
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
