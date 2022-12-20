import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from "react-router-dom";

import { ProductDto } from "../../../types/services/product.types";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessWarehouseModal";
import AddNewProductModal from "./AddwarehouseProductModal";
import AddNewSubProductModal from "./AddSubProductModal";
import AddNewSubProductModalWriteOff from "./AddSubProductModalWriteOff";
import RemoveModal from "../Modals/RemoveConfirmModal";

import { warehouseStore } from '../../../store/warehouse.store';
import { productType } from '../../../store/producttype.store';
import { productGroup } from '../../../store/productgroup.store';
import { productStore } from '../../../store/products.store';
import { employeeStore } from '../../../store/employees.store';

export default function ProductInfo(props: { product: ProductDto }) {
    const location: any = useLocation();
    let userId = location.state.warehouseId;
    const { id } = useParams();
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [subModalShow, setSubModalShow] = useState(false);
    const [subModalShowWriteoffs, setSubModalShowWriteoffs] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = productStore.removeById();

    const { data: producttypeData } = productType.getAll();
    const { data: productgroupData } = productGroup.getAll();
    const { data: warehouseProductData } = warehouseStore.getAllWarehosueProducts();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouse } = warehouseStore.getById(userId as string);
    const { data: employee } = employeeStore.getById(warehouse?.data?.result?.employeeId as string);
    const { data: productsData } = warehouseStore.getAllWarehosueProductsById(id as string);

    let sum: number = 0

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.product.id, {
            async onSuccess(_data) {
                toast.success('Employee was created successfully', { id: toastId });
                queryClient.invalidateQueries(['employees-roles']);
                navigate(`/dashboard/warehouses/products`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let productInfo = {};
    let valueInfo = {};
    let quantitiesInfo = {};
    if (props.product) {
        let typeData: string = '';
        if (producttypeData) {
            for (const producttypesData of producttypeData?.data?.result) {
                if (producttypesData.id === props.product?.productTypeId) {
                    typeData = producttypesData.name;
                }
            }
        }
        let groupData: string = '';
        if (productgroupData) {
            for (const productgroupsData of productgroupData?.data?.result) {
                if (productgroupsData.id === props.product?.productGroupId) {
                    groupData = productgroupsData.name;
                }
            }
        }
        let costData: any = 0;
        let quantityData: any = 0;
        let reservesData: string = '';
        let inRentData: string = '';
        let price: any = 0;
        let saleQuantity: number = 0;
        let writeOffQuantity: number = 0;
        if (warehouseProductData) {
            for (const warehouseProductsData of warehouseProductData?.data?.result) {
                if (warehouseProductsData.productId === id && userId === warehouseProductsData.warehouseId) {
                    sum = sum + warehouseProductsData.quantity;
                    costData = warehouseProductsData.cost;
                    quantityData = warehouseProductsData.quantity;
                    reservesData = warehouseProductsData.reservedQuantity;
                    inRentData = warehouseProductsData.loanedOutQuantity;
                    price = warehouseProductsData.price;

                    warehouseOrder?.data?.result.map((item: any) => {
                        if (warehouseProductsData.id === item.warehouseProductId) {
                            if (item.type === 'sales') {
                                saleQuantity = saleQuantity + item.quantity;
                            }
                            if (item.type === 'writeoffs') {
                                writeOffQuantity = writeOffQuantity + item.quantity;
                            }
                        }
                    })
                }
            }
        }

        productInfo = {
            "Prekės kodas": props.product?.number,
            "Pavadinimas": props.product?.name,
            "Tipas": typeData,
            "Grupė": groupData,
        }

        valueInfo = {
            "Svoris (kg)": props.product?.weight,
            "Plotas": props.product?.area,
            "Savikaina": costData,
            "Pardavimo kaina": price,
            "Visų prekių vertė": price * quantityData,
        }

        quantitiesInfo = {
            "Sandėlys": warehouse?.data?.result?.name,
            "Sandėlio darbuotojas": employee?.data?.result?.firstName + ' ' + employee?.data?.result?.lastName,
            "Kiekis": quantityData,
            "Rezervuota": reservesData,
            "Išnuomota": inRentData,
            "Parduota": saleQuantity,
            "Nurašyta": writeOffQuantity,
        }
    }

    return (
        <React.Fragment>
            {props.product ? (
                <div className="py-4 px-5 bg-white">
                    <div className="d-flex  justify-content-between">
                        <div className="action py-3 row w-100">
                            <div className="col-5 mr-1">
                                <Button
                                    onClick={() => setRightModalShow(true)}
                                    className="text-capitalize b-radius"
                                >
                                    Keisti antkainį
                                </Button>
                            </div>
                            {
                                sum === 0 &&
                                <div className="col-5 ml-1">
                                    <Button
                                        className="text-capitalize b-radius light"
                                        onClick={() => setIsRemoveModalOpen(true)}
                                    >
                                        Ištrinti
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className="action py-3 row w-100">
                            <div className="col-5 mr-1">
                                <Button
                                    onClick={() => setSubModalShow(true)}
                                    className="text-capitalize b-radius btn-green-opacity"
                                >
                                    Papildymas
                                </Button>
                            </div>
                            <div className="col-5 ml-1">
                                <Button
                                    onClick={() => setSubModalShowWriteoffs(true)}
                                    className="text-capitalize b-radius btn-red-opacity"
                                >
                                    Nurašymas
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Informacija" data={productInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Papildoma Informacija" data={valueInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Kiekiai" data={quantitiesInfo} />
                        </div>
                    </div>

                    <AddNewProductModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        productId={props.product.id}
                        isUpdating={true}
                    />

                    <AddNewSubProductModal
                        handleSuccess={() => console.log()}
                        show={subModalShow}
                        className={"side-modal"}
                        setShow={setSubModalShow}
                        onHide={() => setSubModalShow(false)}
                        productId={props.product.id}
                        quantitiesInfo={quantitiesInfo}
                        userId={userId}
                    />

                    <AddNewSubProductModalWriteOff
                        handleSuccess={() => console.log()}
                        show={subModalShowWriteoffs}
                        className={"side-modal"}
                        setShow={setSubModalShowWriteoffs}
                        onHide={() => setSubModalShowWriteoffs(false)}
                        productId={props.product.id}
                        quantitiesInfo={quantitiesInfo}
                        userId={userId}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        text='Antkainis sėkmingai pakeistas'
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
                    />

                    <RemoveModal
                        handleClickConfirm={() => handleClickConfirm()}
                        show={isRemoveModalOpen}
                        onHide={() => setIsRemoveModalOpen(false)}
                        setShow={setIsRemoveModalOpen}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}
