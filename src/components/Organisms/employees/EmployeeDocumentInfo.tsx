import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
// import AddNewWDocument from "./AddNewDocument";
import AddDocument from '../../../components/Organisms/warehouses/AddDocument';
import SuccessModal from '../Modals/SuccessWarehouseModal';
import { employeeAttachmentStore } from '../../../store/employeeAttachment.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

import Table from '../tables/Table';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';

export default function EmployeeDocuments(props: { employee: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: employeeAttachment } = employeeAttachmentStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    // const { data: user } = userStore.getAll();
    // const { data: getUserData } = userStore.getById(user?.data?.result[0]?.id);
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const documents: any = [];
    employeeAttachment?.data?.result.map((item: any) => {
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
        documents.push({
            "Pavadinimas": item.customFileName,
            "Tipas": item.attachmentType,
            "Pridėjo": createdByData,
            "Galiojimas": item.expiresOn,
            "url": item.url,
        })
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
            <EmployeeDocumentTable
                data={documents || []}
                uniqueCol="id"
                hide={['id', 'url']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const EmployeeDocumentTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
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
                docType={'employee'}
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
