import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import AddDocument from '../../components/Organisms/warehouses/AddDocument';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { customAttachmentStore } from '../../store/customAttachment.store';
import { companyContacts } from '../../store/company-contacts.store';
import { userStore } from '../../store/user.store';

export default function ClientDocument(props: { clients: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    const { data: customerAttachment } = customAttachmentStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const products: any = [];
    customerAttachment?.data?.result.map((item: any) => {
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
        if (item.customerId === id) {
            products.push({
                "Pavadinimas": item.customFileName,
                "Pridėjo": createdByData,
                "url": item.url,
                // "Terminas": "2022.05.20 - 2023.01.25",
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
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        window.open(row.url, "_blank");
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ClientDocumentTable
                data={products || []}
                uniqueCol="id"
                hide={['id', 'url']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ClientDocumentTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

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
            <AddDocument
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
                docType={'customer'}
            />
            <SuccessModal
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessModalOpen(false);
                    setisAddNewModalOpen(true);
                }}
            />
        </div>
    );
};
