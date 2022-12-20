import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewVehiclesModal from '../../components/Organisms/vehicles/AddNewVehiclesModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { vehiclesStore } from '../../store/vehicles.store';
import { employeeStore } from '../../store/employees.store';
import { VehiclesTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { VehiclesTableDto } from '../../types/services/vehicles.type';

export default function Vehicles() {
    const navigate = useNavigate();
    const { data: vehiclesData } = vehiclesStore.getAll();
    const { data: employee } = employeeStore.getAll();
    const vehicle: any[] = [];
    if (vehiclesData) {
        for (const vehiclesvalData of vehiclesData.data.result) {
            let DriverData = '';
            if (employee) {
                for (const empData of employee.data.result) {
                    if (empData.id === vehiclesvalData.employeeId) {
                        DriverData = empData.firstName + ' ' + empData.lastName;
                    }
                }
            }
            vehicle.push({
                id: vehiclesvalData.id,
                subData: '',
                "Pavadinimas": vehiclesvalData.name,
                "Numeriai": vehiclesvalData.plateNumber,
                "Kilometražas": vehiclesvalData.milage,
                "insurance": vehiclesvalData.insurance,
                "service": vehiclesvalData.service,
                "inspection": vehiclesvalData.inspection,
                "manufactory": vehiclesvalData.manufactory,
                "employeeId": vehiclesvalData.employeeId,
                "Tipas": vehiclesvalData.type,
                "Keliamoji galia": vehiclesvalData.liftingCapacity,
                "drivingLicenseCategoryId": vehiclesvalData.drivingLicenseCategoryId,
                "createdBy": vehiclesvalData.createdBy,
            });
        }
    }

    const actions: TableActionsType<VehiclesTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: VehiclesTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: VehiclesTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: VehiclesTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: VehiclesTableDto) => {
        navigate(`/dashboard/vehicles/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <VehiclesTable
                data={vehicle || []}
                uniqueCol="id"
                hide={['id', 'subData', 'insurance', 'service', 'inspection', 'manufactory', 'employeeId', 'drivingLicenseCategoryId', 'createdBy']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const VehiclesTable = (props: VehiclesTableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Automobiliai" navigation={['Resursų valdymas', 'Automobiliai']} />
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
            <AddNewVehiclesModal
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
