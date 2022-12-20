import React, { useState } from 'react';

import { equipmentOrderStore } from '../../../store/equipmentOrder.store';
import { employeeStore } from '../../../store/employees.store';

import Table from '../../Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';
import AddNewIssueModal from './Modal/AddNewIssueModal'

export default function WorkingtoolsIssues(props: { data: any }) {

    const { data: equipmentData } = equipmentOrderStore.getAll();
    const { data: employee } = employeeStore.getAll();
    let issueData: any = [];
    if (equipmentData) {
        equipmentData?.data?.result.map((item: any) => {
            if (item.equipmentId === props.data.id) {
                console.log('imp', item)
                let employeeName: string = '';
                employee?.data?.result.map((emp: any) => {
                    if (emp.id === item.employeeId) {
                        employeeName = emp.firstName + ' ' + emp.lastName;
                    }
                })
                issueData.push({
                    "id": item.id,
                    "Priežastis": item.number,
                    "Darbuotojas": employeeName,
                    "Išdavimo data": item.createdOn,
                    "Vertė": item.pricePerUnit,
                    "Kiekis": item.quantity,
                    "Galioja iki": item.validUntil
                })
            }
        })
    }

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
            <WorkingToolsIssueTable
                data={issueData || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const WorkingToolsIssueTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Naujas išdavimas"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>

            <AddNewIssueModal
                handleSuccess={() => { }}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />
        </div>
    );
};
