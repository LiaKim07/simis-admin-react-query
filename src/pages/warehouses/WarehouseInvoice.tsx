import React, { useState } from 'react';
import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { WarehouseDto } from '../../types/services/warehouse.types';

export default function WarehouseInvoice(props: { warehouseById: WarehouseDto }) {
    const documents = [
        {
            "Sąskaitos Nr.": "Title 1",
            "Tipas": "Digital",
            "Klientas": "VYTAUTAS",
            "Data": "2022.05.26",
            "Mokėjimo būklė": "paid",
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
            <WarehouseInvoiceTable
                data={documents || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const WarehouseInvoiceTable = (props: TableProps) => {
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
