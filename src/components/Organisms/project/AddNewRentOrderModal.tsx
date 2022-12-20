import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { employeeStore } from '../../../store/employees.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import SwitchInput from '../../Atoms/Form/SwitchInput';
import SwitchInputCheck from '../../Atoms/Form/SwitchInputCheck';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../types';
import Collapsible from '../../Molecules/Modal/Collapsible';
import AddNewRentOrderModal1 from "./AddNewRentOrderModal1";
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    rentorderId?: string;
    isUpdating?: boolean;
    additional?: boolean;
    idData?: any;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "rentUnitPrice": "",
    "rentArea": "",
    "rentLengthInDays": 30,
    "isActive": false,
    "type": "",
    "projectId": "",
    "createdBy": tokenData,
    "totalRentPriceForPeriod": "",
    "totalRentPriceForOneDay": 0,
    "rentFactor": 0,
    "number": "",
    "vehicleId": "",
    "note": "",
    "totalBaseRentPriceForPeriod": 0,
    "totalBaseRentPriceForOneDay": 0,
    "isPercentOfValueForOneDay": false,
    "percentOfValueForOneDay": 0,
    "isPricePerToneForOneDay": false,
    "pricePerToneForOneDay": 0,
    "remark": "",
    "projectLengthInDays": 0,
    "activatedOn": null,
};

export default function AddNewRentOrderModal({
    setShow,
    rentorderId,
    isUpdating = false,
    additional = false,
    idData,
    handleSuccess,
    ...props
}: IModalProps) {
    // localStorage.removeItem('update');
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isAddNewModalOpen1, setisAddNewModalOpen1] = useState(false);
    const [creationType, setCreationType] = useState<string>('string');
    const [startDateType, setStartDateType] = useState<string>('string');
    const [endDateType, setEndDateType] = useState<string>('string');

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);

    useEffect(() => {
        if (projectOrderData?.data) {
            setvalues((prev: any) => ({
                ...prev,
                "rentUnitPrice": projectOrderData?.data?.result.rentUnitPrice,
                "rentArea": projectOrderData?.data?.result.rentArea,
                "rentLengthInDays": projectOrderData?.data?.result.rentLengthInDays,
                "isActive": projectOrderData?.data?.result.isActive,
                "type": projectOrderData?.data?.result.type,
                "projectId": projectOrderData?.data?.result.projectId,
                "createdBy": projectOrderData?.data?.result.createdBy,
                "totalRentPriceForPeriod": projectOrderData?.data?.result.totalRentPriceForPeriod,
                "totalRentPriceForOneDay": projectOrderData?.data?.result.totalRentPriceForOneDay,
                "rentFactor": projectOrderData?.data?.result.rentFactor,
                "number": projectOrderData?.data?.result.number,
                "vehicleId": projectOrderData?.data?.result.vehicleId,
                "note": projectOrderData?.data?.result.note,
                "totalBaseRentPriceForPeriod": projectOrderData?.data?.result.totalBaseRentPriceForPeriod,
                "totalBaseRentPriceForOneDay": projectOrderData?.data?.result.totalBaseRentPriceForOneDay,
                "isPercentOfValueForOneDay": projectOrderData?.data?.result.isPercentOfValueForOneDay,
                "percentOfValueForOneDay": projectOrderData?.data?.result.percentOfValueForOneDay,
                "isPricePerToneForOneDay": projectOrderData?.data?.result.isPricePerToneForOneDay,
                "pricePerToneForOneDay": projectOrderData?.data?.result.pricePerToneForOneDay,
                "remark": projectOrderData?.data?.result.remark,
                "projectLengthInDays": projectOrderData?.data?.result.projectLengthInDays,
                "activatedOn": projectOrderData?.data?.result.activatedOn,
            }));
        }
    }, [projectOrderData?.data]);

    useEffect(() => {
        projectOrder?.data?.result.map((item: any) => {
            if (additional && idData === item.id) {
                setvalues({
                    ...values,
                    type: 'loans',
                    projectId: projectIdDatas,
                    rentUnitPrice: item.rentUnitPrice,
                    totalRentPriceForPeriod: item.totalRentPriceForPeriod,
                    rentArea: item.rentArea,
                    note: item.note
                })
            }
        })
    }, [additional, idData?.length > 0]);

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleSubmit = async () => {
        if (isUpdating) {
            localStorage.setItem('update', 'edit');
            let storeData = { ...values, type: 'loans', };
            localStorage.setItem('rentOrder-OrderInfo', JSON.stringify(storeData));
            setisAddNewModalOpen1(true)
            closeModal();
            resetForm();
        }
        let storeData = { ...values, type: 'loans', };
        localStorage.setItem('rentOrder-OrderInfo', JSON.stringify(storeData));

        // save order information data part. 
        setisAddNewModalOpen1(true)
        closeModal();
        resetForm();

    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const onFocusCreation = (e: any) => {
        setCreationType('date')
    }

    const onBlurtypeCreation = (e: any) => {
        if (e.target.value === "") {
            setCreationType('string')
        }
    }

    const onFocusStart = (e: any) => {
        setStartDateType('date')
    }

    const onBlurtypeStart = (e: any) => {
        if (e.target.value === "") {
            setStartDateType('string')
        }
    }

    const onFocusEnd = (e: any) => {
        setEndDateType('date')
    }

    const onBlurtypeEnd = (e: any) => {
        if (e.target.value === "") {
            setEndDateType('string')
        }
    }

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Rent Order' : 'Naujas nuomos užsakymas'}
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
                        <Collapsible isOpen={true} title="Užsakymo informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="test"
                                        handleChange={handleChangeString}
                                        placeholder="Name"
                                        value={values.test}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <SwitchInput
                                        className="mr-3"
                                        type="number"
                                        name="rentUnitPrice"
                                        handleChange={handleChange}
                                        placeholder="Kaina 1m²/Є per diena *"
                                        value={values.rentUnitPrice}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="rentArea"
                                        handleChange={handleChange}
                                        placeholder={additional ? "" : "Area (m²)"}
                                        value={values.rentArea}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="rentLengthInDays"
                                        handleChange={handleChange}
                                        // placeholder="30 Dienų"
                                        placeholder={values.rentLengthInDays ? '' : "30 Dienų"}
                                        value={values.rentLengthInDays}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="number"
                                        name="totalRentPriceForPeriod"
                                        handleChange={handleChange}
                                        placeholder={additional ? "" : "Nuomos periodas(dienomis)"}
                                        value={values.totalRentPriceForPeriod}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <SwitchInputCheck
                                        className="mr-3"
                                        type="string"
                                        name="percentOfValueForOneDay"
                                        handleChange={handleChangeString}
                                        placeholder="% nuo vertės / per diena"
                                        value={values.percentOfValueForOneDay}
                                    // disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <SwitchInputCheck
                                        className="mr-3"
                                        type="string"
                                        name="pricePerToneForOneDay"
                                        handleChange={handleChange}
                                        placeholder="Kaina 1 t/per diena"
                                        value={values.pricePerToneForOneDay}
                                    // disabled={additional ? true : false}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChange}
                                        placeholder={additional ? "" : "Pastaba:"}
                                        value={values.note}
                                        disabled={additional ? true : false}
                                    />
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Toliau</span>
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
            <AddNewRentOrderModal1
                handleSuccess={() => console.log('')}
                show={isAddNewModalOpen1}
                setShow={setisAddNewModalOpen1}
                onHide={() => setisAddNewModalOpen1(false)}
                className={'side-modal-mid'}
                tableType={'Rent'}
                additional={additional ? true : false}
                idData={idData}
            />
        </div>
    );
}
