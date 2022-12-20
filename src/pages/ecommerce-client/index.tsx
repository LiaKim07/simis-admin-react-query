import React from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ecommerceClientStore } from '../../store/ecommerce-client';

export default function EcommerceClient() {
    const navigate = useNavigate();
    const tableData: any = []

    const { data: ecommerceClient } = ecommerceClientStore.getAll();

    ecommerceClient?.data?.result.map((ecomClient: any) => {
        tableData.push({
            id: ecomClient.id,
            'Pavadinimas': ecomClient.companyName,
            'Vardas': `${ecomClient.firstName} ${ecomClient.lastName}`,
            'Įmonės kodas': ecomClient.companyNumber,
            'Tipas': ecomClient.isCompany ? 'Juridinis' : 'Fizinis',
            'Adresas': `${ecomClient.address}, ${ecomClient.postalCode}, ${ecomClient.city}`,
            // 'Adresas': ecomClient.address + ', ' + ecomClient.postalCode + ', ' + ecomClient.city,
        })
    })


    const actions: TableActionsType<any>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('dsfadsfa', item);
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
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        navigate(`/dashboard/ecommerce-client/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <EcommerceClientTable
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

const EcommerceClientTable = (props: TableProps) => {

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Klientai" navigation={['Klientai']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    // rowsPerPage={25}
                    showAddNewButton={false}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                />
            </div>
        </div>
    );
};
