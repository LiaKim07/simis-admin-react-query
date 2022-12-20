import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewClientsModal from '../../components/Organisms/clients/AddNewClientsModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { clientsStore } from '../../store/clients.store';
import { ClientsTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ClientsTableDto } from '../../types/services/clients.type';

export default function Sales() {
    const navigate = useNavigate();
    const { data: clientsData } = clientsStore.getAll();
    const clients = [];
    if (clientsData?.data) {
        for (const clientsdata of clientsData?.data?.result) {
            clients.push({
                "pavadinimas": clientsdata.name,
                "imonės kodas": clientsdata.number,
                "pvm Kodas": clientsdata.vatNumber,
                "adresas": clientsdata.address,
                "telefonas": clientsdata.phone,
                id: clientsdata.id,
            });
        }
    }

    const actions: TableActionsType<ClientsTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ClientsTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ClientsTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ClientsTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: ClientsTableDto) => {
        navigate(`/dashboard/customers/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ClientsTable
                data={clients || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ClientsTable = (props: ClientsTableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Clients" navigation={['Clients']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    rowsPerPage={50}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>

            <AddNewClientsModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />

            <SuccessModal
                text='Klientas sėkmingai pridėtas'
                isUpdate={false}
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
