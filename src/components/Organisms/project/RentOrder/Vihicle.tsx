import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { employeeStore } from '../../../../store/employees.store';
import { vehiclesStore } from '../../../../store/vehicles.store';
import { projectsOrdersStore } from '../../../../store/project-orders.store';
import Table from '../../../Organisms/tables/TableProjectModal';
import Collapsible from '../../../Molecules/Modal/Collapsible';
import CustomSelect from '../../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../../types';

interface IModalProps {
    rentorderId?: string;
    isUpdating?: boolean;
    additional?: boolean;
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

export default function Vehicle({
    onChangeInput,
    setShow,
    storeData,
    idData,
    additional = false,
    tableType = 'Rent',
    isUpdating,
    isOpenModal,
    handleSuccess,
    ...props
}: any) {
    // localStorage.removeItem('update');
    let projectIdDatas = localStorage.getItem('projectId');
    const { id } = useParams();
    const [values, setvalues] = useState<any>({ ...defaultState });
    const [rentProductTable, setRentProductTable] = useState<any>([]);

    const { data: vehiclesData } = vehiclesStore.getAll();

    useEffect(() => {
        onChangeInput && onChangeInput(values.vehicleId, 3);
    }, [values]);

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    return (
        <div className="side-modal">
            <div className="body-content px-4 modal-border">
                <Collapsible isOpen={isOpenModal === 3 ? true : false} title="Transport">
                    <div className="p-3 row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                            <CustomSelect
                                name="vehicleId"
                                handleChange={handleChange}
                                placeholder="Transport *"
                                value={values.vehicleId}
                                options={
                                    vehiclesData?.data?.result?.map((n: any) => ({
                                        value: n.id,
                                        label: n.name,
                                    })) as SelectData[]
                                }
                            />
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
