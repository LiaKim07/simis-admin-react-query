import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';

import { projectsStore } from '../../store/projects.store';
import { customerContacts } from '../../store/customer-contacts.store';
import { clientsStore } from '../../store/clients.store';
import { customerSettings } from '../../store/customer-settings.store';

export default function Invoice() {
    const navigate = useNavigate();

    const { data: projects } = projectsStore.getAll();
    const { data: customerContract } = customerContacts.getAll();
    const { data: customer } = clientsStore.getAll();
    const { data: customerSetting } = customerSettings.fetchType();

    let tableData: any = [];
    projects?.data?.result.map((item: any) => {
        let client: string = '';
        let contact: string = '';
        let phone: string = '';
        let type: string = '';
        customer?.data?.result.map((customer: any) => {
            customerSetting?.data?.result.map((setting: any) => {
                if (customer.customerTypeId === setting.id) {
                    type = setting.name;
                }
            })
            if (customer.id === item.customerId) {
                client = customer.name;
                phone = customer.phone;
            }
        })

        customerContract?.data?.result.map((contract: any) => {
            if (contract.customerId === item.customerId) {
                contact = contract.firstName + " " + contract.lastName;
            }
        })

        tableData.push({
            'id': item.id,
            'Projektas': item.name,
            'Klientas': client,
            'Kontaktinis Asmuo': contact,
            'Adresas': `${item.address}, ${item.city}`,
            'Telefonas': phone,
            'Tipas': type,
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
        navigate(`/dashboard/invoices/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <InvoiceTable
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

const InvoiceTable = (props: any) => {

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Sąskaitos"
                    navigation={[
                        { name: 'Pardavimų valdymas', clickTo: 'invoices' },
                        {
                            name: 'Sąskaitos',
                            clickTo: 'invoices'
                        },
                    ]} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    showAddNewButton={false}
                    actions={props.actions}
                    rowsPerPage={50}
                    tableType={'order'}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="New Invoice"
                />
            </div>
        </div>
    );
};
