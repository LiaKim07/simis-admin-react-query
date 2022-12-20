import React from 'react';

import Table from '../tables/PrintTable';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';
let propsData: any = {};

export default function FormGeneratoin(props: { testdata: any }) {
    if (props.testdata) {
        propsData = props.testdata;
    }

    const documents = [
        {
            "Name": "Prašymas priimti į darbą",
            "active": true,
        },
        {
            "Name": "Darbo sutartis",
            "active": false,
        },
        {
            "Name": "NPD prašymas",
            "active": true,
        },
        {
            "Name": "Darbuotojo asmeninių apsaugos priemonių apskaitos kortelė",
            "active": false,
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
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <EmployeeFormTable
                data={documents || []}
                subdata={propsData}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const EmployeeFormTable = (props: TableProps) => {

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    subdata={props.subdata}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    showAddNewButton={false}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                />
            </div>
        </div>
    );
};
