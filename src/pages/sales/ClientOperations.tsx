import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';
import { clientsStore } from "../../store/clients.store";
import { projectsStore } from "../../store/projects.store";
import { projectsOrdersStore } from "../../store/project-orders.store";
import { customerContacts } from "../../store/customer-contacts.store";
import { companyContacts } from '../../store/company-contacts.store';
import { userStore } from '../../store/user.store';

export default function ClientOperations(props: { clients: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const navigate = useNavigate();

    const { data: client } = clientsStore.getAll();
    const { data: project } = projectsStore.getAll();
    const { data: customerContact } = customerContacts.getAll();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
    let products: any = [];

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
    project?.data?.result.map((item: any) => {
        if (item.customerId === props.clients.id) {
            let contactName: string = '';
            customerContact?.data?.result.map((customerContact: any) => {
                if (customerContact.id === item.customerContactId) {
                    contactName = customerContact.firstName + ' ' + customerContact.lastName;
                }
            })

            projectOrder?.data?.result.map((projectOrder: any) => {
                if (projectOrder.projectId === item.id) {
                    products.push({
                        "Tipas": projectOrder.type === 'returns' ? 'Gražinimas' : projectOrder.type === 'sales' ? 'Paravimas' : projectOrder.type === 'loans' ? "Nuoma" : projectOrder.type === 'writeoff' ? 'Paravimas' : projectOrder.type === 'purchases' ? 'Pirkimas' : '',
                        "Data": projectOrder.activatedOn,
                        "Projektas": item.name,
                        "Atsakingas asmuo": contactName,
                        "Aktas": projectOrder.number,
                        "Atsakingas": createdByData,
                        id: projectOrder.id,
                        type: projectOrder.type,
                        projetId: item.id
                    })
                }
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
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        if (row.type === 'loans') {
            navigate(`/dashboard/projects/rentorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        } else if (row.type === 'returns') {
            navigate(`/dashboard/projects/returnorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        } else if (row.type === 'sales') {
            navigate(`/dashboard/projects/salesorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        }
        // navigate(`/dashboard/projects/salesorder/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <CientOperationTable
                data={products || []}
                uniqueCol="id"
                hide={['id', 'projetId', 'type']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const CientOperationTable = (props: TableProps) => {
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
