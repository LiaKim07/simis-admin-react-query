import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { projectsStore } from '../../../store/projects.store';
import { employeeStore } from '../../../store/employees.store';
import { clientsStore } from '../../../store/clients.store';
import { customerContacts } from '../../../store/customer-contacts.store';
import { userStore } from '../../../store/user.store';
import { ModalProps } from '../../../types/props';
import { ProjectDto } from '../../../types/services/project.types';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    projectId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ProjectDto = {
    "number": "",
    "name": "",
    "address": "",
    "postalCode": "",
    "city": "",
    "country": "",
    "customerId": "",
    "customerContactId": "",
    "employeeId": "",
    "sequenceNumber": "",
    "isActive": true,
    "note": "",
    "createdBy": tokenData
};

export default function AddNewProjectModal({
    setShow,
    projectId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ProjectDto>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data?.result;
    }

    const { data: customer } = clientsStore.getAll();
    let custData: any = [];
    if (customer?.data) {
        custData = customer?.data?.result;
    }

    const { data: customerContact } = customerContacts.getAll();
    let custContactData: any = [];
    if (customerContact?.data && values.customerId) {
        customerContact?.data?.result.map((item: any) => {
            if (item.customerId === values.customerId) {
                custContactData.push(item);
            }
        })
    }
    const { mutateAsync } = projectsStore.create();
    const { mutateAsync: updateMutation } = projectsStore.update();
    const { data: projects } = projectsStore.getById(projectId);
    useEffect(() => {
        if (projects?.data) {
            setvalues((prev) => ({
                ...prev,
                id: projects.data.result.id,
                name: projects.data.result.name,
                address: projects.data.result.address,
                postalCode: projects.data.result.postalCode,
                city: projects.data.result.city,
                country: projects.data.result.country,
                number: projects.data.result.number,
                employeeId: projects.data.result.employeeId,
                customerId: projects.data.result.customerId,
                customerContactId: projects.data.result.customerContactId,
            }));
        }
    }, [projects?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (projectId && isUpdating) {
            updateMutation(
                { ...values, id: projectId },
                {
                    async onSuccess(_data) {
                        toast.success('Project was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['projectsById', projectId]);
                        localStorage.removeItem('projectId')
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
                    toast.success('Project was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['projects']);
                    localStorage.removeItem('projectId')
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
                            {isUpdating ? 'Projekto redagavimas' : 'Naujo projekto registravimas'}
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
                        <Collapsible isOpen={true} title="Bendra projekto informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="address"
                                        handleChange={handleChange}
                                        placeholder="Adresas *"
                                        value={values.address}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="postalCode"
                                        handleChange={handleChange}
                                        placeholder="Pašto kodas"
                                        value={values.postalCode}
                                    />
                                </div> */}
                                <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="city"
                                        handleChange={handleChange}
                                        placeholder="Miestas *"
                                        value={values.city}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="country"
                                        handleChange={handleChange}
                                        placeholder="Šalis"
                                        value={values.country}
                                        disabled={false}
                                    />
                                </div> */}
                            </div>
                        </Collapsible>
                        <Collapsible isOpen={true} title="Kliento duomenys">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerId"
                                        handleChange={handleChange}
                                        placeholder="Klientas"
                                        value={values.customerId}
                                        options={
                                            custData?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerContactId"
                                        handleChange={handleChange}
                                        placeholder="Kontaktinis Asmuo"
                                        value={values.customerContactId}
                                        options={
                                            custContactData?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="employeeId"
                                        handleChange={handleChange}
                                        placeholder="Employee"
                                        value={values.employeeId}
                                        options={
                                            empData?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + ' ' + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div> */}
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
