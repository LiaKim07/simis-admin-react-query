import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { productCategory } from '../../../store/productcategory.store';
import { SelectData, ValueType } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import { ModalProps } from '../../../types/props';
import { ICreateProductCategory } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Textarea from '../../Atoms/Form/Textarea';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    productcategoryId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: ICreateProductCategory = {
    imageUrl: '',
    name: '',
    createdBy: '',
    note: '',
};

export default function AddNewProductcategoryModal({
    setShow,
    productcategoryId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreateProductCategory>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { mutateAsync } = productCategory.createProduct();
    const { mutateAsync: updateMutation } = productCategory.updateProductcategory();
    const { data: productcategory } = productCategory.getById(productcategoryId);

    useEffect(() => {
        if (productcategory?.data) {
            setvalues((prev) => ({
                ...prev,
                imageUrl: productcategory.data.result.imageUrl,
                name: productcategory.data.result.name,
                note: productcategory.data.result.note
            }));
        }
    }, [productcategory?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (productcategoryId && isUpdating) {
            updateMutation(
                { ...values, id: productcategoryId },
                {
                    async onSuccess(_data) {
                        toast.success('ProductCategory was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['productcategoryById', productcategoryId]);
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
                    toast.success('ProductCategory was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['productcategories']);
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
                            {isUpdating ? 'Prekių kategorijos redagavimas' : 'Naujos prekių kategorijos registravimas'}
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
                        <Collapsible isOpen={true} title="Bendra informacija apie prekių kategoriją">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>
                                {/* 
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productGroupId"
                                        handleChange={handleChange}
                                        placeholder="Prekių grupė *"
                                        value={values.productGroupId}
                                        options={
                                            typeof (productgroupData?.data) !== 'string' ?
                                                productgroupData?.data?.result?.map((n: any) => ({
                                                    value: n.id,
                                                    label: n.name,
                                                })) as SelectData[] :
                                                [{ id: '', name: '' }].map((n) => ({
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
