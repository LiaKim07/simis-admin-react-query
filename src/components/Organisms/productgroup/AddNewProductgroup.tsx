import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { productCategory } from '../../../store/productcategory.store';
import { productGroup } from '../../../store/productgroup.store';
import { SelectData, ValueType } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';
import { ModalProps } from '../../../types/props';
import { ICreateProductGroup } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Textarea from '../../Atoms/Form/Textarea';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    productgroupId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: ICreateProductGroup = {
    createdBy: '',
    imageUrl: '',
    name: '',
    productCategoryId: '',
    note: '',
};

export default function AddNewProductgroupModal({
    setShow,
    productgroupId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreateProductGroup>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const { mutateAsync } = productGroup.createProduct();
    const { mutateAsync: updateMutation } = productGroup.updateProductgroup();
    const { data: productgroup } = productGroup.getById(productgroupId);
    const { data: productcategoryData } = productCategory.getAll();

    useEffect(() => {
        if (productgroup?.data) {
            setvalues((prev) => ({
                ...prev,
                imageUrl: productgroup.data.result.imageUrl,
                name: productgroup.data.result.name,
                note: productgroup.data.result.note,
                productCategoryId: productgroup.data.result.productCategoryId
            }));
        }
    }, [productgroup?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (productgroupId && isUpdating) {
            updateMutation(
                { ...values, id: productgroupId },
                {
                    async onSuccess(_data) {
                        toast.success('ProductGroup was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['productgroupById', productgroupId]);
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
                    toast.success('ProductGroup was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['productgroups']);
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
                            {isUpdating ? 'Prekių grupės redagavimas' : 'Naujos prekių grupės registravimas'}
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
                        <Collapsible isOpen={true} title="Bendra informacija apie prekių grupę">
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

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productCategoryId"
                                        handleChange={handleChange}
                                        placeholder="Prekės tipas *"
                                        value={values.productCategoryId}
                                        options={
                                            productcategoryData?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
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
