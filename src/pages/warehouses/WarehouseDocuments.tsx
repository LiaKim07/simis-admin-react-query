import React, { useState } from 'react';

import AddDocument from '../../components/Organisms/warehouses/AddDocument';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { WarehouseHistoryTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { WarehouseDto } from '../../types/services/warehouse.types';
import { warehouseAttachmentStore } from '../../store/warehouseAttachement';
import { companyContacts } from '../../store/company-contacts.store';
import { userStore } from '../../store/user.store';

export default function WarehouseDocuments(props: { warehouseById: WarehouseDto }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { data: warehouseAttachment } = warehouseAttachmentStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const products: any = [];
    warehouseAttachment?.data?.result.map((item: any) => {
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
        products.push({
            "Pavadinimas": item.customFileName,
            "Pridėjo": createdByData,
            "url": item.url,
            // "Galiojimas": item.expiresOn,
        })
    })


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
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        window.open(row.url, "_blank")
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <WarehouseHistoryTable
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

const WarehouseHistoryTable = (props: WarehouseHistoryTableProps) => {
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
                docType={'warehouse'}
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
