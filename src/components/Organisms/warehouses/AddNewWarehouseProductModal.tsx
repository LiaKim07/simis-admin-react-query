import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { warehouseStore } from '../../../store/warehouse.store';
import { ModalProps } from '../../../types/props';
import { ICreateWarehouseProduct } from '../../../types/interface';
import ProductRegistrationTable from '../../../components/Organisms/tables/warehouse/ProductRegistrationTable';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { productStore } from '../../../store/products.store';
import { productGroup } from '../../../store/productgroup.store';
import { productType } from '../../../store/producttype.store';

interface IModalProps extends ModalProps {
    productId?: string;
    warehouseId: string;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreateWarehouseProduct = {
    warehouseId: '',
    productId: '',
    margin: '',
    createdBy: tokenData
};

export default function AddNewWarehouseProductModal({
    setShow,
    productId,
    handleSuccess,
    warehouseId,
    ...props
}: IModalProps,) {
    const closeModal = () => {
        setShow(false);
    };

    const { data: productData } = productStore.getAll();
    const { data: productGroupData } = productGroup.getAll();
    const { data: productTypeData } = productType.getAll();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    let data = productData?.data?.result.filter((item: any) => !warehouseProduct?.data?.result.some((itemToBeRemoved: any) => itemToBeRemoved.productId === item.id))

    let arr: any = [];
    if (productData) {
        data.map((item: any) => {
            let groupData, typeData = '';
            if (productGroupData) {
                productGroupData?.data?.result.map((group: any) => {
                    if (group.id === item.productGroupId) {
                        groupData = group.name;
                    }
                })
            }
            if (productTypeData) {
                productTypeData?.data?.result.map((type: any) => {
                    if (type.id === item.productTypeId) {
                        typeData = type.name;
                    }
                })
            }
            arr.push({
                'id': item.id,
                'Pavadinimas': item.name,
                'Kodas': item.number,
                'Tipas': typeData,
                'Grupė': groupData,
            })
        })
    }


    const [values, setvalues] = useState<ICreateWarehouseProduct>({ ...defaultState });
    const [arrSubmitData, setArrSubmitData] = useState<any>([]);
    const [productValue, setProductValue] = useState<any>([]);


    const { mutateAsync } = warehouseStore.createProductToWarehouse();
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        let set = arrSubmitData.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (JSON.stringify(v) === JSON.stringify(v2))) === i);
        mutateAsync(set, {
            async onSuccess(_data) {
                toast.success('Product was created successfully', { id: toastId });
                queryClient.invalidateQueries(['products']);
                queryClient.invalidateQueries(['getproductById']);
                queryClient.invalidateQueries(['warehouse-products']);
                closeModal();
                resetForm();
                handleSuccess();
                delay(300);
            },
            onError(error: any) {
                delay(300);
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

    const onChangePage = (_page: number) => {
        return {};
    };

    const onClickAddNewItemButton = (row: any) => {
        let submitArr: any = [];
        let initialVal = productValue;
        if (initialVal.length === 0) {
            initialVal.push(row);
        } else {
            if (!initialVal.includes(row)) {
                initialVal.push(row);
            } else {
                initialVal.map((item: any, key: number) => {
                    if (item === row) {
                        initialVal.splice(key, 1);
                    }
                })

            }
        }
        setProductValue(initialVal);
        initialVal.map((item: any) => {
            submitArr.push({
                productId: item.id,
                warehouseId,
                margin: 0,
                createdBy: tokenData
            })
        })
        setArrSubmitData(submitArr);
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            Registruoti prekę į sandėlį
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
                        <Collapsible isOpen={true} title="">
                            <div className="p-3 row">
                                <div className="my-4">
                                    <ProductRegistrationTable
                                        data={arr || []}
                                        uniqueCol="id"
                                        isPagenation={false}
                                        hide={['id', 'quantity']}
                                        showAddNewButton={false}
                                        handleClickRow={() => { }}
                                        onChangePage={onChangePage}
                                        onClickAddNewItemButton={onClickAddNewItemButton}
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
