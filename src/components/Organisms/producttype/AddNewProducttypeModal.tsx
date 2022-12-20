import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';
import { ModalProps } from '../../../types/props';
import { ICreateProducttype } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Textarea from '../../Atoms/Form/Textarea';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { SelectData, ValueType } from '../../../types';
import CustomSelect from '../../Atoms/Form/Select';

interface IModalProps extends ModalProps {
    producttypeId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: any = {
    imageUrl: '',
    name: '',
    note: '',
    productGroupId: '',
    createdBy: ''
};

export default function AddNewProducttypeModal({
    setShow,
    producttypeId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreateProducttype>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { mutateAsync } = productType.createProduct();
    const { mutateAsync: updateMutation } = productType.updateProducttype();
    const { data: productgroupsData } = productGroup.getAll();
    const { data: product } = productType.getById(producttypeId);

    useEffect(() => {
        if (product?.data) {
            setvalues((prev) => ({
                ...prev,
                imageUrl: product.data.result.imageUrl,
                name: product.data.result.name,
                note: product.data.result.note,
                productGroupId: product.data.result.productGroupId,
            }));
        }
    }, [product?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (producttypeId && isUpdating) {
            updateMutation(
                { ...values, id: producttypeId },
                {
                    async onSuccess(_data) {
                        toast.success('ProductType was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['productypetById', producttypeId]);
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
                    toast.success('ProductType was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['producttypes']);
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
                            {isUpdating ? 'Prekių tipo redagavimas' : 'Naujo prekių tipo registravimas'}
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
                        <Collapsible isOpen={true} title="Bendra informacija apie prekių tipą">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeString}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productGroupId"
                                        handleChange={handleChange}
                                        placeholder="Prekės tipas *"
                                        value={values.productGroupId}
                                        options={
                                            productgroupsData?.data?.result?.map((n: any) => ({
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
                                        handleChange={handleChangeString}
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
