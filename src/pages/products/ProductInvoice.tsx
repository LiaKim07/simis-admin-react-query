import React, { useState } from 'react';

import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';

export default function ProductInvoice(props: { product: any }) {
    const documents = [
        {
            "Pavadinimas": "Title 1",
            "Pirkėjas": "VYTAUTAS",
            "Data": "2022.05.26",
            "Statusas": "paid",
        },
       
    ];


    const actions: TableActionsType<ProductItemDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('delete', item);
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: ProductItemDto) => {
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProductInvoiceTable
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

const ProductInvoiceTable = (props: TableProps) => {
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
