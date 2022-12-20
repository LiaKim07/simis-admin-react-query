import React, { useState } from 'react';

import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';

export default function VehiclesDataHistory(props: { vehicles: any }) {
    const products = [
        {
            "Changes": "Data changes",
            "Type": "Edited",
            "Info": "Phone:861853319",
            "Date": "2022.05.26",
            "Person": "Jonas Jonaitis"
        },
        {
            "Changes": "People changes",
            "Type": "Added",
            "Info": "Petras Antanaltis",
            "Date": "2022.05.26",
            "Person": "Jonas Jonaitis"
        },
    ];


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
            <VehiclesDetaHistoryTable
                data={products || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const VehiclesDetaHistoryTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

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
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
        </div>
    );
};
