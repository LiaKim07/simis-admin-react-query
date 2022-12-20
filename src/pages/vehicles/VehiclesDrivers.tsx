import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import AddNewWDriver from "../../components/Organisms/vehicles/AddNewDriver";
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import { employeeStore } from '../../store/employees.store';
import { vehiclesStore } from '../../store/vehicles.store';
import { employeeRoleStore } from '../../store/employee-role.store';

export default function VehiclesDrivers(props: { vehicles: any }) {
    const { id } = useParams();

    const { data: employee } = employeeStore.getAll();
    const { data: vehicel } = vehiclesStore.getAll();
    const { data: employeeRole } = employeeRoleStore.getAll();

    let tableData: any = [];
    vehicel?.data?.result.map((vehicles: any) => {
        employee?.data?.result.map((emp: any) => {
            let roleName: string = '';
            if (vehicles.employeeId === emp.id && vehicles.id === id) {
                employeeRole?.data?.result.map((empRole: any) => {
                    if (empRole.id === emp.employeeRoleId) {
                        roleName = empRole.name;
                    }
                })

                tableData.push({
                    "Vardas": emp.firstName,
                    "Pavardė": emp.lastName,
                    "Telefonas": emp.phone,
                    "Pareigos": roleName,
                })
            }
        })
    })

    const actions: TableActionsType<any>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: any) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('delete', item);
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <VehiclesDriverTable
                data={tableData || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const VehiclesDriverTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    showAddNewButton={false}
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewWDriver
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />
            <SuccessModal
                // isupdate={false}
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
