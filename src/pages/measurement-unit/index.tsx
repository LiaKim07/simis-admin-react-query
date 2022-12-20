import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewMeasurementUnitModal from '../../components/Organisms/measurement-unit/AddNewMeasurementUnitModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { drivingLicenseStore } from '../../store/driving-license.store';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { EmployeeRoleTableDto } from '../../types/services/employees.types';

export default function MeasureMentUnit() {
    const navigate = useNavigate();
    const { data: driverLicenseData } = drivingLicenseStore.getAll();
    const employeeRole = [];
    if (driverLicenseData) {
        for (const driverLicensesData of driverLicenseData.data.result) {
            employeeRole.push({
                id: driverLicensesData.id,
                name: driverLicensesData.name,
            });
        }
    }

    const actions: TableActionsType<any>[] = [

    ];

    const handleClickRow = (row: EmployeeRoleTableDto) => {
        navigate(`/dashboard/measurement-unit/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <MeasurementUnitTable
                data={employeeRole || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const MeasurementUnitTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Measurement Unit" navigation={['Measurement Unit']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewMeasurementUnitModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />
            <SuccessModal
                isUpdate={false}
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessModalOpen(false);
                    setisAddNewModalOpen(true);
                }}
            />
        </div>
    );
};
