import React, { useState } from 'react';
import Table from '../../components/Organisms/tables/Table';
import { WarehouseHistoryTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { WarehouseDto } from '../../types/services/warehouse.types';

export default function WarehouseHistory(props: { warehouseById: WarehouseDto }) {
    const products = [
        {
            "Produktas": "Product1",
            "Veiksmas": "Rent",
            "Data": "2022.05.26",
            "Klientas": "UAB AIDAVA",
            "Nuoma": 5,
            "Kaina": 1930,
            "Projektas": "Nežinomas",
            "Apmokėjimas": "Paid"
        },
       
    ];


    const actions: TableActionsType<WarehouseDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: WarehouseDto) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: WarehouseDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: WarehouseDto) => {
                console.log('delete', item);
            },
        },
    ];

    const handleClickRow = (row: WarehouseDto) => {
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <WarehouseHistoryTable
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

const WarehouseHistoryTable = (props: WarehouseHistoryTableProps) => {
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
