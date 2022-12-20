import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { productType } from '../../../store/producttype.store';
import { productCategory } from '../../../store/productcategory.store';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateProduct } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Textarea from '../../Atoms/Form/Textarea';

interface IModalProps extends ModalProps {
    productId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: ICreateProduct = {
    isActive: false,
    imageUrl: '',
    number: '',
    name: '',
    unit: '',
    note: '',
    height: 0,
    width: 0,
    length: 0,
    weight: '',
    area: 0,
    volym: 0,
    isEcommerce: false,
    productTypeId: '',
    productGroupId: '',
    productCategoryId: '',
    createdBy: "",
};

export default function AddNewProductModal({
    setShow,
    productId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<ICreateProduct>({ ...defaultState });

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const { data: producttypeData } = productType.getAll();
    let productTypeData: any = [];
    if (!producttypeData?.data) {
        productTypeData = [];
    } else {
        productTypeData = producttypeData.data.result;
    }

    const { data: productgroupData } = productGroup.getAll();
    let productGroupData: any = [];
    if (!productgroupData?.data) {
        productGroupData = [];
    } else {
        productGroupData = productgroupData.data.result;
    }

    const { data: productcategoryData } = productCategory.getAll();
    let productCategoryData: any = [];
    if (!productcategoryData?.data) {
        productCategoryData = [];
    } else {
        productCategoryData = productcategoryData.data.result;
    }

    const { mutateAsync } = productStore.createProduct();
    const { mutateAsync: updateMutation } = productStore.updateProduct();
    const { data: product } = productStore.getById(productId);

    useEffect(() => {
        if (product?.data) {
            setvalues((prev) => ({
                ...prev,
                name: product.data.result.name,
                imageUrl: product.data.result.imageUrl,
                number: product.data.result.number,
                height: product.data.result.height,
                width: product.data.result.width,
                length: product.data.result.length,
                weight: product.data.result.weight,
                area: product.data.result.area,
                volym: product.data.result.volym,
                productTypeId: product.data.result.productTypeId,
                productGroupId: product.data.result.productGroupId,
                productCategoryId: product.data.result.productCategoryId,
                unit: product.data.result.unit,
                note: product.data.result.note,
            }));
        }
    }, [product?.data]);

    const handleSubmit = async () => {

        const toastId = toast.loading('Saving ....');
        if (productId && isUpdating) {
            updateMutation(
                { ...values, id: productId },
                {
                    async onSuccess(_data) {
                        toast.success('Product was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['productById', productId]);
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
                    toast.success('Product was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['products']);
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
                            {isUpdating ? 'Update Product' : 'Naujas produktas'}
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
                        <Collapsible isOpen={true} title="Produkto informacija">
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
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChangeString}
                                        placeholder="Kodas *"
                                        value={values.number}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productTypeId"
                                        handleChange={handleChange}
                                        placeholder="Tipas *"
                                        value={values.productTypeId}
                                        options={
                                            productTypeData.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productGroupId"
                                        handleChange={handleChange}
                                        placeholder="Grupė *"
                                        value={values.productGroupId}
                                        options={
                                            productGroupData.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <CustomSelect
                                        name="productCategoryId"
                                        handleChange={handleChange}
                                        placeholder="Kategorija *"
                                        value={values.productCategoryId}
                                        options={
                                            productCategoryData.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="weight"
                                        handleChange={handleChange}
                                        placeholder="Svoris"
                                        value={values.weight}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChangeString}
                                        placeholder="Aprašymas:"
                                        value={values.note}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="area"
                                        handleChange={handleChange}
                                        placeholder="Plotas"
                                        value={values.area}
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