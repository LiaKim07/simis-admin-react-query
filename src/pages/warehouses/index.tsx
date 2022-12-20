import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewWarehouseModal from '../../components/Organisms/warehouses/AddNewWarehouseModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { warehouseStore } from '../../store/warehouse.store';
import { employeeStore } from '../../store/employees.store';
import { WarehouseTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { WarehouseTableDto } from '../../types/services/warehouse.types';

export default function WareHouse() {
    const navigate = useNavigate();
    const { data: warehouseData } = warehouseStore.getAll();
    const { data: employeeData } = employeeStore.getAll();

    const warehouses = [];
    if (warehouseData) {
        for (const warehousesData of warehouseData.data.result) {
            let empName: string = '';
            if (employeeData) {
                for (const empdata of employeeData.data.result) {
                    if (warehousesData.employeeId === empdata.id) {
                        empName = empdata.firstName + ' ' + empdata.lastName;
                    }
                }
            }
            warehouses.push({
                id: warehousesData.id,
                "Sandėlio pavadinimas": warehousesData.name,
                "Adresas": `${warehousesData.address}, ${warehousesData.postalCode} ${warehousesData.city}, ${warehousesData.country}`,
                "Telefonas": warehousesData.phone,
                "El. paštas": warehousesData.email,
                // "Atsakingas": `${empdata.firstName} ${empdata.lastName}`,
                "Atsakingas": `${empName}`,
            });
        }
    }

    const actions: TableActionsType<WarehouseTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: WarehouseTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: WarehouseTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: WarehouseTableDto) => {
                console.log('delete', item);
            },
        },
    ];

    const handleClickRow = (row: WarehouseTableDto) => {
        navigate(`/dashboard/warehouses/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <WarehouseTable
                data={warehouses || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const WarehouseTable = (props: WarehouseTableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div>
                <Breadcrump title="Sandėliai" navigation={['Sandėlio valdymas', 'Sandėliai']} />
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

            <AddNewWarehouseModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />

            <SuccessModal
                isUpdate={false}
                show={isSuccessModalOpen}
                text='Sandėlys sėkmingai pridėtas'
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
