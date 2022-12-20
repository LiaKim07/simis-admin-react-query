import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";

import { queryClient } from '../../../plugins/react-query';

import { ProductDto } from "../../../types/services/product.types";
import Button from "../../Molecules/Button/Button";
import Switch from "../../Atoms/Form/SwitchNormal";
import Checkbox from '../../Atoms/Form/Checkbox';
import CustomSelect from '../../Atoms/Form/Select';
import SuccessModal from "../Modals/SuccessModal";
import AddNewProductModal from "./AddNewProductModal";
import Icon from '../../Atoms/Icon';
import Textarea from '../../Atoms/Form/Textarea';
import Collapsible from '../../Molecules/Modal/Collapsible';
import Input from '../../Atoms/Form/Input';
import { SelectData, ValueType } from '../../../types';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}
const defaultState: any = {
    "name": "",
    "number": "",
    "unit": "",
    "note": "",
    "isEcommerce": false,
    "isActive": false,
    "imageUrl": "string",
    "height": 0,
    "width": 0,
    "length": 0,
    "weight": 0,
    "area": 0,
    "volym": 0,
    "productCategoryId": "",
    "productGroupId": "",
    "productTypeId": "",
    "createdBy": tokenData
};

export default function EcomInfo(props: { product: any }) {
    const { id } = useParams();
    const [checked, setChecked] = useState(false);
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [values, setvalues] = useState<any>({ ...defaultState });

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const { data: productgroupData } = productGroup.getAll();
    const { mutateAsync: updateMutation } = productStore.updateProduct();

    let productGroupData: any = [];
    if (!productgroupData?.data) {
        productGroupData = [];
    } else {
        productGroupData = productgroupData.data.result;
    }

    useEffect(() => {
        if (props?.product) {
            setvalues((prev: any) => ({
                ...prev,
                "id": props?.product.id,
                "name": props?.product.name,
                "number": props?.product.number,
                "unit": props?.product.unit,
                "note": props?.product.note,
                "isEcommerce": props?.product.isEcommerce,
                "isActive": props?.product.isActive,
                "imageUrl": props?.product.imageUrl,
                "height": props?.product.height,
                "width": props?.product.width,
                "length": props?.product.length,
                "weight": props?.product.weight,
                "area": props?.product.area,
                "volym": props?.product.volym,
                "productCategoryId": props?.product.productCategoryId,
                "productGroupId": props?.product.productGroupId,
                "productTypeId": props?.product.productTypeId,
                "createdBy": props?.product.createdBy,
            }));
        }
        if (props.product.isEcommerce) {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [props?.product]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Updating ....');
        updateMutation(
            { ...values, isEcommerce: checked },
            {
                async onSuccess(_data) {
                    toast.success('Product was updated successfully', { id: toastId });
                    queryClient.invalidateQueries(['productById', props?.product?.id]);
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

    async function handleOnChange(event: any) {
        // setSelectedFile(event.target.files[0]);
        // event.target.files[0] && setIsFilePicked(true);
        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        const token = localStorage.getItem('jwt_info');
        if (token) {
            const toastId = toast.loading('Uploading ....');
            const jwtInfo = JSON.parse(token);
            let url: string = '';

            url = `https://www.simis.itvs.lt/api/v1/product-attachments?productId=${id}&customFileName=${values.name}&createdBy=${tokenData}`

            fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${jwtInfo.result?.token}`
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.statusCode === 201) {
                        toast.success('Uploaded successfully', { id: toastId });
                        queryClient.invalidateQueries(['vehicleAttachment']);
                        queryClient.invalidateQueries(['customerAttachment']);
                        queryClient.invalidateQueries(['warehouseAttachment']);
                        queryClient.invalidateQueries(['employeeAttachment']);
                    } else {
                        toast.error(result.message, {
                            id: toastId,
                        });
                    }
                })
                .catch((error) => {
                    toast.error('error occurred please try again', {
                        id: toastId,
                    });
                });
        }
    }

    return (
        <React.Fragment>
            {props.product ? (
                <div className="py-4 px-5 bg-white">
                    <div className="text-center">
                        <Switch checked={checked} onClick={() => setChecked(!checked)} title="Add to E-Shop" />
                    </div>

                    {checked && <div className="text-center">
                        <div className="d-flex justify-content-center">
                            <div className="m-4">
                                <div className="profile-pic w-20 h-20">
                                    <label
                                        htmlFor="profileUrl"
                                        className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                                        <Icon name="plus" size={28} />
                                        <p className="text-xxs">Pridėti nuotrauką</p>
                                    </label>
                                </div>
                                {/* hidden input file */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="profileUrl"
                                    id="profileUrl"
                                    onChange={handleOnChange}
                                    hidden
                                />
                            </div>
                            <div className="m-4">
                                <div className="profile-pic w-20 h-20">
                                    <label
                                        htmlFor="profileUrl"
                                        className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                                        <Icon name="plus" size={28} />
                                        <p className="text-xxs">Pridėti nuotrauką</p>
                                    </label>
                                </div>
                                {/* hidden input file */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="profileUrl"
                                    id="profileUrl"
                                    onChange={handleOnChange}
                                    hidden
                                />
                            </div>
                            <div className="m-4">
                                <div className="profile-pic w-20 h-20">
                                    <label
                                        htmlFor="profileUrl"
                                        className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                                        <Icon name="plus" size={28} />
                                        <p className="text-xxs">Pridėti nuotrauką</p>
                                    </label>
                                </div>
                                {/* hidden input file */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="profileUrl"
                                    id="profileUrl"
                                    onChange={handleOnChange}
                                    hidden
                                />
                            </div>
                            <div className="m-4">
                                <div className="profile-pic w-20 h-20">
                                    <label
                                        htmlFor="profileUrl"
                                        className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                                        <Icon name="plus" size={28} />
                                        <p className="text-xxs">Pridėti nuotrauką</p>
                                    </label>
                                </div>
                                {/* hidden input file */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="profileUrl"
                                    id="profileUrl"
                                    onChange={handleOnChange}
                                    hidden
                                />
                            </div>
                        </div>

                        <div className="body-content px-4 modal-border">
                            <Collapsible isOpen={true} title="E-COMMERCE DATA">
                                <div className="p-3 row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                        <Textarea
                                            className="mr-3 textarea"
                                            type="string"
                                            name="note"
                                            handleChange={handleChangeString}
                                            placeholder="Description"
                                            value={values.note}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="name"
                                            handleChange={handleChangeString}
                                            placeholder="Name *"
                                            value={values.name}
                                        />
                                    </div>
                                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="name"
                                            handleChange={handleChangeString}
                                            placeholder="Name *"
                                            value={props.product?.rentPrice}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="name"
                                            handleChange={handleChangeString}
                                            placeholder="Type *"
                                            value={props.product?.productTypeId}
                                        />
                                    </div> */}
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >

                                        <CustomSelect
                                            name="productGroupId"
                                            handleChange={handleChangeString}
                                            placeholder="Group *"
                                            value={values.productGroupId}
                                            options={
                                                productGroupData.map((n: any) => ({
                                                    value: n.id,
                                                    label: n.name,
                                                })) as SelectData[]
                                            }
                                        />
                                    </div>
                                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="name"
                                            handleChange={handleChangeString}
                                            placeholder="Quantity *"
                                            value={props.product?.quantity}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type="string"
                                            name="name"
                                            handleChange={handleChangeString}
                                            placeholder="ItemCode *"
                                            value={props.product?.itemNumber}
                                        />
                                    </div>
                                    <Checkbox title="DPD home delivery" />
                                    <Checkbox title="Venipak home delivery" />
                                    <Checkbox title="Shipping by post" />
                                    <Checkbox title="pick-up at the warehouse" /> */}
                                </div>
                            </Collapsible>
                        </div>

                        <div className="d-flex justify-content-center action py-3 row">
                            <div className="col-3 mr-3">
                                <Button
                                    onClick={handleSubmit}
                                    className="text-capitalize b-radius"
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className="col-3 ml-3">
                                <Button
                                    className="text-capitalize b-radius light"
                                // onClick={() => setPopupModalShow(true)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>}

                    <AddNewProductModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        productId={props.product.id}
                        isUpdating={true}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}