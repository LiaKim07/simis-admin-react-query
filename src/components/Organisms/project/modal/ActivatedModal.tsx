import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams, useLocation } from "react-router-dom";

import { queryClient } from '../../../../plugins/react-query';
import { projectsStore } from '../../../../store/projects.store';
import { employeeStore } from '../../../../store/employees.store';
import { clientsStore } from '../../../../store/clients.store';
import { customerContacts } from '../../../../store/customer-contacts.store';
import { projectsOrdersStore } from '../../../../store/project-orders.store';
import { userStore } from '../../../../store/user.store';
import { ModalProps } from '../../../../types/props';
import { ProjectDto } from '../../../../types/services/project.types';
import Input from '../../../Atoms/Form/Input';
import Heading from '../../../Atoms/Heading';
import Icon from '../../../Atoms/Icon';
import Button from '../../../Molecules/Button/Button';
import CustomSelect from '../../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../../types';
import Collapsible from '../../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "rentUnitPrice": 0,
    "rentArea": 0,
    "rentLengthInDays": 0,
    "totalRentPriceForPeriod": 0,
    "totalRentPriceForOneDay": 0,
    "rentFactor": 0,
    "isPercentOfValueForOneDay": false,
    "percentOfValueForOneDay": 0,
    "isPricePerToneForOneDay": false,
    "pricePerToneForOneDay": 0,
    "isActive": false,
    "number": "string",
    "type": "string",
    "projectId": "string",
    "vehicleId": "string",
    "totalBaseRentPriceForPeriod": 0,
    "totalBaseRentPriceForOneDay": 0,
    "remark": "string",
    "note": "string",
    "projectLengthInDays": 0,
    "customRentArea": 0,
    "activatedOn": "",
    "createdBy": tokenData
};

export default function EditActivatedmodal({
    setShow,
    handleSuccess,
    ...props
}: IModalProps) {
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const [type1, setType1] = useState<string>('string');

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

    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);
    const { mutateAsync: updateMutation } = projectsOrdersStore.update();

    useEffect(() => {
        if (projectOrderData?.data) {
            setvalues(projectOrderData?.data?.result);
        }
    }, [projectOrderData?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Updating ....'); console.log('sub data', values, id)
        updateMutation(
            { ...values, id },
            {
                async onSuccess(_data) {
                    toast.success('ProjectOrder was updated successfully', { id: toastId });
                    queryClient.invalidateQueries(['project-ordersById', id]);
                    queryClient.invalidateQueries(['project-orders']);
                    queryClient.invalidateQueries(['loanAggregate']);
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
                            {'Keisti datą'}
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
                        <Collapsible isOpen={true} title="Informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-5 p-2" >
                                    <Input
                                        className="mr-3"
                                        type={type1}
                                        onFocus={onFocus1}
                                        onBlur={onBlurtype1}
                                        name="activatedOn"
                                        handleChange={handleChange}
                                        placeholder="Nauja data *"
                                        value={values.activatedOn}
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
