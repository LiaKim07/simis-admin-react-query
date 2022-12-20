import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams, useLocation } from "react-router-dom";

import { queryClient } from '../../../plugins/react-query';
import { productType } from '../../../store/producttype.store';
import { productCategory } from '../../../store/productcategory.store';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateProduct } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    productId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}
const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "productId": "",
    "warehouseId": "",
    "quantity": 0,
    "reservedQuantity": 0,
    "loanedOutQuantity": 0,
    "cost": 0,
    "margin": 0,
    "price": 0,
    "createdBy": tokenData,
};

export default function AddNewProductModal({
    setShow,
    productId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const [idData, setIdData] = useState<string>('');

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: (e.value) });
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
    const { mutateAsync: updateMutation } = warehouseStore.updateWarehouseProduct();
    const { data: product } = productStore.getById(productId);
    const { data: warehosueProduct } = warehouseStore.getAllWarehosueProducts();

    useEffect(() => {
        warehosueProduct?.data?.result.map((item: any) => {
            if (item.productId === id) {
                setvalues((prev: any) => ({
                    ...prev,
                    "productId": item.productId,
                    "warehouseId": item.warehouseId,
                    "quantity": item.quantity,
                    "reservedQuantity": item.reservedQuantity,
                    "loanedOutQuantity": item.loanedOutQuantity,
                    "cost": item.cost,
                    "margin": item.margin,
                    "price": item.price,
                    "createdBy": item.createdBy,
                }));
                setIdData(item.id);
            }
        })
    }, [warehosueProduct?.data]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        let sub_data = { ...values, id: idData, margin: Number(values.margin) };
        if (productId && isUpdating) {
            updateMutation(
                sub_data,
                {
                    async onSuccess(_data) {
                        toast.success('Prekė sėkmingai atnaujinta', { id: toastId });
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
            console.log('val', values)
            mutateAsync(values, {
                async onSuccess(_data) {
                    toast.success('Prekė sėkmingai pridėta', { id: toastId });
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
                            {isUpdating ? 'Antkainis' : 'Nauja Prekė'}
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
                            {
                                isUpdating ? (
                                    <div className="p-3 row">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                            <Input
                                                className="mr-3"
                                                type="number"
                                                name="margin"
                                                handleChange={handleChangeString}
                                                placeholder="Antkainis"
                                                value={values.margin}
                                            />
                                        </div>
                                    </div>
                                ) :
                                    (
                                        <div className="p-3 row">
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2" >
                                                <Input
                                                    className="mr-3"
                                                    type="number"
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
                                                    placeholder="Prekės Kodas *"
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
                                                    placeholder="Svoris (kg.)"
                                                    value={values.weight}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                                <Input
                                                    className="mr-3"
                                                    type="number"
                                                    name="area"
                                                    handleChange={handleChange}
                                                    placeholder="Plotas"
                                                    value={values.area}
                                                />
                                            </div>
                                        </div>
                                    )
                            }
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
