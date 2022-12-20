import React, { useState } from 'react';
import InvoicePrintModal from '../invoices/InvoicePrintModal';
import { useParams } from "react-router-dom";

import Table from '../tables/Table'
import { TableActionsType } from '../../../types/tableProps/table.props';

// import { invoiceDetailsStore } from '../../../store/invoice-details.store';
import { invoiceStore } from '../../../store/invoice.store';
// import { clientsStore } from '../../../store/clients.store';
import { projectsStore } from '../../../store/projects.store';
import { projectsOrdersStore } from '../../../store/project-orders.store';
// import ProjectOfferInfo from '../project/ProjectOfferInfo';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

export default function InvoiceData(props: { data: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    // const { data: invoiceDetails } = invoiceDetailsStore.getAll();
    // const { data: clients } = clientsStore.getAll();
    const { data: invocies } = invoiceStore.getAll();
    const { data: projects } = projectsStore.getAll();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    let tableData: any = [];
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

    invocies?.data?.result.map((invoice: any) => {
        if (invoice.projectId === id) {
            let projectName: string = '';
            let projectOrderName: any = [];
            invoice?.selectedProjectOrderIds.map((projectId: string) => {
                projectOrder?.data?.result.map((item: any) => {
                    if (projectId === item.id) {
                        projectOrderName.push(item.number);
                    }
                })
            })
            projects?.data?.result.map((project: any) => {
                if (project.id === invoice.projectId) {
                    projectName = project.name;
                }
            })
            tableData.push({
                "id": invoice.id,
                "Pavadinimas": invoice.invoiceNumber,
                "Suformavoy": createdByData,
                "Aktai": projectOrderName.join(', '),
                "Projektas": projectName,
                "Data": invoice.createdOn,
                "Suma": invoice.totalAmountExclVat,
                "Statusas": invoice.isPayed ? 'Apmoketa' : invoice.isDelayed ? 'Vėluoja' : 'Išrašyta',
                "invoiceId": invoice.id,
            })
        }
    })

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

    return (
        <div className="mb-5">
            <InvoiceTable
                data={tableData || []}
                uniqueCol="id"
                hide={['id', 'invoiceId']}
                actions={actions}
            />
        </div>
    );
}

const InvoiceTable = (props: any) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState('');
    const [isShow, setIsShow] = useState<boolean>(false);
    const onClickRow = (row: any) => {
        if (row.id) {
            setInvoiceId(row.id);
            setIsShow(true)
            setisAddNewModalOpen(true);
        }
    }

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    showAddNewButton={false}
                    onChangePage={props.onChangePage}
                    // handleClickRow={() => setisAddNewModalOpen(true)}
                    handleClickRow={onClickRow}
                />
            </div>

            <InvoicePrintModal
                handleSuccess={() => { }}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => { setisAddNewModalOpen(false), setIsShow(false) }}
                className={'side-modal-mid'}
                invoiceId={invoiceId}
                setPrintShow={setIsShow}
                isShow={isShow}
            />
        </div>
    );
};
