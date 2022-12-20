import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { userStore } from '../../../store/user.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { accessLevelsStore } from '../../../store/accessLevel.store';
import { ModalProps } from '../../../types/props';
import { ICreateUser } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import { SelectData, ValueType } from '../../../types';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import CustomSelect from '../../Atoms/Form/Select';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    empRoleId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: ICreateUser = {
    companyContactId: '',
    accessLevelId: '',
};

export default function AddNewUserModal({
    setShow,
    empRoleId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const { data: companyContractData } = companyContacts.getAll();
    const { data: accessLevelData } = accessLevelsStore.getAll();
    const [values, setvalues] = useState<ICreateUser>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { mutateAsync } = userStore.create();
    // const { data: userroleData } = userStore.getrole();

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(values, {
            async onSuccess(_data) {
                toast.success('ProductGroup was created successfully', { id: toastId });
                queryClient.invalidateQueries(['users']);
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
                            {isUpdating ? 'Update ProductGroup' : 'Naujas vartotojas'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Close
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
                                        name="companyContactId"
                                        handleChange={handleChange}
                                        placeholder="Vartotojas *"
                                        value={values.companyContactId}
                                        options={
                                            companyContractData?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.firstName + " " + n.lastName,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="accessLevelId"
                                        handleChange={handleChange}
                                        placeholder="Lygis *"
                                        value={values.accessLevelId}
                                        options={
                                            accessLevelData?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
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
