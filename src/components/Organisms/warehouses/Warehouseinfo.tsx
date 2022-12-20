import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';

import { WarehouseDto } from "../../../types/services/warehouse.types";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import { employeeStore } from '../../../store/employees.store';
import { warehouseStore } from "../../../store/warehouse.store";
import AddNewWarehouseModal from "./AddNewWarehouseModal";
import RemoveModal from "../Modals/RemoveConfirmModal";

export default function WarehouseInfo(props: { warehouse: any }) {
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isRemove, setIsRemove] = useState<boolean>(false);

    const { mutateAsync } = warehouseStore.removeById();
    const { data: employeeData } = employeeStore.getAll();
    const { data: warehosueProduct } = warehouseStore.getAllWarehosueProducts();



    useEffect(() => {
        warehosueProduct?.data?.result.map((item: any) => {
            if (item?.warehouseId === props.warehouse?.id) {
                setIsRemove(true);
            } else {
                setIsRemove(false);
            }
        })
    }, [warehosueProduct?.data]);

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.warehouse.id, {
            async onSuccess(_data) {
                toast.success('Employee was created successfully', { id: toastId });
                queryClient.invalidateQueries(['warehouses']);
                navigate(`/dashboard/warehouses`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };

    let warehouseInfo = {};
    if (props.warehouse) {
        if (employeeData) {
            for (const empdata of employeeData.data?.result) {
                let empName: string = '';
                if (props.warehouse.employeeId === empdata.id) {
                    empName = `${empdata.firstName} ${empdata.lastName}`;
                    warehouseInfo = {
                        "Adresas": `${props.warehouse?.address}, ${props.warehouse?.postalCode} ${props.warehouse?.city}, ${props.warehouse?.country}`,
                        "Telefonas": props.warehouse?.phone,
                        "El. paštas": props.warehouse?.email,
                        "Atsakingas": `${empdata.firstName} ${empdata.lastName}`,
                    };
                }
            }
        }
    }

    return (
        <React.Fragment>
            {props.warehouse ? (
                <div className="py-4 px-5 bg-white">
                    <div className="action py-3 row">
                        <div className="col-3 mr-3">
                            <Button
                                onClick={() => setRightModalShow(true)}
                                className="text-capitalize b-radius"
                            >
                                Redaguoti
                            </Button>
                        </div>
                        {
                            !isRemove &&
                            <div className="col-3 ml-3">
                                <Button
                                    className="text-capitalize b-radius light"
                                    onClick={() => setIsRemoveModalOpen(true)}
                                >
                                    Pašalinti
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Informacija apie sandėlį" data={warehouseInfo} />
                        </div>
                    </div>

                    <AddNewWarehouseModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        warehouseId={props.warehouse.id}
                        isUpdating={true}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
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
