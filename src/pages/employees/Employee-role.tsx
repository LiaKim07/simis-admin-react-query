import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewEmployeeRoleModal from '../../components/Organisms/employees/AddNewEmployeeRoleModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { employeeRoleStore } from '../../store/employee-role.store';
import { EmployeeRoleTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { EmployeeRoleTableDto } from '../../types/services/employees.types';

export default function ProductGroup() {
    const navigate = useNavigate();
    const { data: empRoleData } = employeeRoleStore.getAll();
    const employeeRole = [];
    if (empRoleData) {
        for (const producttypesData of empRoleData.data.result) {
            employeeRole.push({
                id: producttypesData.id,
                name: producttypesData.name,
            });
        }
    }

    const actions: TableActionsType<EmployeeRoleTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: EmployeeRoleTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: EmployeeRoleTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: EmployeeRoleTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: EmployeeRoleTableDto) => {
        navigate(`/dashboard/employee-roles/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <EmployeeRoleTable
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

const EmployeeRoleTable = (props: EmployeeRoleTableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Employee Role" navigation={['Employee Role']} />
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
            <AddNewEmployeeRoleModal
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
