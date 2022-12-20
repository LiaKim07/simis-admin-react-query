import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { employeeStore } from '../../../../store/employees.store';
import { projectsOrdersStore } from '../../../../store/project-orders.store';
import { ModalProps } from '../../../../types/props';
import Input from '../../../Atoms/Form/Input';
import SwitchInput from '../../../Atoms/Form/SwitchInput';
import SwitchInputCheck from '../../../Atoms/Form/SwitchInputCheck';
import Heading from '../../../Atoms/Heading';
import Icon from '../../../Atoms/Icon';
import Button from '../../../Molecules/Button/Button';
import Textarea from '../../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../../types';
import Collapsible from '../../../Molecules/Modal/Collapsible';

interface IModalProps {
    rentorderId?: string;
    originProjectOrder?: string;
    sendProjdctOrder?: string;
    isUpdating?: boolean;
    additional?: boolean;
    isOpenModal?: boolean;
    idData?: any;
    onChangeInput?: (e: any, key: any) => void;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    "rentUnitPrice": 0,
    "rentArea": 0,
    "rentLengthInDays": 30,
    "isActive": false,
    "type": "",
    "projectId": "",
    "createdBy": tokenData,
    "totalRentPriceForPeriod": 0,
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
    "isRentUnitPrice": false
};

export default function ProjectOrder({
    rentorderId,
    originProjectOrder,
    sendProjdctOrder,
    isUpdating = false,
    additional = false,
    idData,
    handleSuccess,
    onChangeInput,
    tableType = 'Rent',
    isOpenModal = false,
    ...props
}: any) {
    // console.log('sendProjdctOrder', sendProjdctOrder, isUpdating)
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const [values, setvalues] = useState<any>({});
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isChecked1, setIsChecked1] = useState<boolean>(false);
    const [isChecked2, setIsChecked2] = useState<boolean>(false);
    const { data: projectOrderData } = projectsOrdersStore.getById(id as string);
    // const { data: projectOrder } = projectsOrdersStore.getAll();

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeSwitch = (checked: boolean, val: any) => {
        setIsChecked(checked);
        if (!checked) {
            setvalues({ ...values, rentUnitPrice: 0 });
        }
    };
    const handleChangeSwitch1 = (checked: boolean, val: any) => {
        setIsChecked1(checked);
        if (!checked) {
            setvalues({ ...values, percentOfValueForOneDay: 0 });
        }
    };
    const handleChangeSwitch2 = (checked: boolean, val: any) => {
        setIsChecked2(checked);
        if (!checked) {
            setvalues({ ...values, pricePerToneForOneDay: 0 });
        }
    };


    useEffect(() => {
        if (isUpdating) {
            if (Object.keys(sendProjdctOrder).length > 1) {
                setvalues(sendProjdctOrder);
            } else {
                setvalues(originProjectOrder);
            }
        }
    }, [projectOrderData?.data]);

    let temp = {};
    useEffect(() => {
        if (additional) {
            setvalues(idData);
        }
    }, [additional]);

    useEffect(() => {
        if (!isUpdating && Object.keys(sendProjdctOrder).length < 2) {
            setvalues({ ...defaultState });
        }
        onChangeInput && onChangeInput(values, 0);
    }, [values]);

    useEffect(() => {
        setvalues({ ...values, isRentUnitPrice: isChecked });
    }, [isChecked]);

    useEffect(() => {
        setvalues({ ...values, isPercentOfValueForOneDay: isChecked1 });
    }, [isChecked1]);

    useEffect(() => {
        setvalues({ ...values, isPricePerToneForOneDay: isChecked2 });
    }, [isChecked2]);

    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleSubmit = async () => {
        onChangeInput();

    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    return (
        <div className="side-modal">
            <div className="body-content px-4 modal-border">
                <Collapsible isOpen={isOpenModal === 0 ? true : false} title="Užsakymo informacija">
                    <div className="p-3 row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                            <Input
                                className="mr-3"
                                type="string"
                                name="number"
                                handleChange={handleChangeString}
                                placeholder={additional ? "" : "Number"}
                                value={additional ? idData?.number : Object.keys(values).length > 1 ? values.number : defaultState.number}
                                disabled={additional ? true : false}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                            <SwitchInputCheck
                                className="mr-3"
                                type="number"
                                name="rentUnitPrice"
                                handleChange={handleChange}
                                handleChangeSwitch={handleChangeSwitch}
                                placeholder={additional ? "" : "Kaina už kvadratinį metrą"}
                                value={additional ? idData?.rentUnitPrice : Object.keys(values).length > 1 ? values.rentUnitPrice : defaultState.rentUnitPrice}
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
                                value={additional ? idData?.rentArea : Object.keys(values).length > 1 ? values.rentArea : defaultState.rentArea}
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
                                placeholder={additional ? "" : "Nuomos periodas(Skaičiavimams)"}
                                value={additional ? idData?.rentLengthInDays : Object.keys(values).length > 1 ? values.rentLengthInDays : defaultState.rentLengthInDays}
                                disabled={additional ? true : false}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                            <Input
                                className="mr-3"
                                type="number"
                                name="projectLengthInDays"
                                handleChange={handleChange}
                                placeholder={additional ? "" : "Nuomos periodas(dienomis)"}
                                value={additional ? idData?.projectLengthInDays : Object.keys(values).length > 1 ? values.projectLengthInDays : defaultState.projectLengthInDays}
                                disabled={additional ? true : false}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                            <SwitchInputCheck
                                className="mr-3"
                                type="string"
                                name="percentOfValueForOneDay"
                                handleChange={handleChangeString}
                                placeholder="Kaina % nuo vertės"
                                value={additional ? idData?.percentOfValueForOneDay : Object.keys(values).length > 1 ? values.percentOfValueForOneDay : defaultState.percentOfValueForOneDay}
                                handleChangeSwitch={handleChangeSwitch1}
                                disabled={additional ? true : false}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                            <SwitchInputCheck
                                className="mr-3"
                                type="string"
                                name="pricePerToneForOneDay"
                                handleChange={handleChange}
                                placeholder="Kaina už toną"
                                value={additional ? idData?.pricePerToneForOneDay : Object.keys(values).length > 1 ? values.pricePerToneForOneDay : defaultState.pricePerToneForOneDay}
                                handleChangeSwitch={handleChangeSwitch2}
                                disabled={additional ? true : false}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                            <Textarea
                                className="mr-3 textarea"
                                type="string"
                                name="note"
                                handleChange={handleChange}
                                placeholder={additional ? "" : "Pastaba:"}
                                value={additional ? idData?.note : Object.keys(values).length > 1 ? values.note : defaultState.note}
                                disabled={additional ? true : false}
                            />
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
