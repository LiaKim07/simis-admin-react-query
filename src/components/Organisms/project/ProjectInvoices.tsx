import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Table from '../../Organisms/tables/TableProjectInvoice';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ProductItemDto } from '../../../types/services/product.types';
import { invoiceStore } from '../../../store/invoice.store';
import { clientsStore } from '../../../store/clients.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

export default function ProjectInvoice(props: { project: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: invoice } = invoiceStore.getAll();
    const { data: customer } = clientsStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    let createdByData: string = '';
    if (tokenData === "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        createdByData = "Sistemos administratorius";
    } else {
        companyContracts?.data?.result.map((item: any) => {
            if (item.id === userData?.data?.data?.result.companyContactId) {
                createdByData = item.firstName + ' ' + item.lastName;
            }
        })
    }

    let documents: any = [];
    invoice?.data?.result.map((item: any) => {
        if (item.projectId === id) {
            let customerName: string = '';
            customer?.data?.result.map((customers: any) => {
                if (customers.id === item.customerId) {
                    customerName = customers.name;
                }
            })
            documents.push({
                id: item.id,
                "projectId": item.projectId,
                "Pavadinimas": item.invoiceNumber,
                "Išrašė": createdByData,
                "Klientas": customerName,
                "Projektas": item.invoiceNumber,
                "Data": item.createdOn,
                "Suma": Number(item.totalAmountExclVat * 1.21).toFixed(2),
                "Statusas": item.isPayed ? 'Apmokėta' : 'Neapmokėta',
                "isPayed": item.isPayed
            })
        }
    })


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
            },
        },
    ];

    const handleClickRow = (row: ProductItemDto) => {
        navigate(`/dashboard/invoices/${row.projectId}`, {
            state: {
                activeIndex: 1,
            }
        });
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProjectInvoiceTable
                data={documents || []}
                uniqueCol="id"
                hide={['id', 'isPayed', 'projectId']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ProjectInvoiceTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    showAddNewButton={false}
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
