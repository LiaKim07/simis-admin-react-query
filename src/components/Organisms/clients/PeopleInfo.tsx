import React, { useState } from 'react';

import AddNewPeopleModal from './AddNewPeopleModal';
import SuccessModal from '../Modals/SuccessWarehouseModal';
import Table from '../../../components/Organisms/tables/Table';
import { customerContacts } from '../../../store/customer-contacts.store';
import { peopleTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ClientsDto } from "../../../types/services/clients.type";
let clientIdData: string = '';

export default function PeopleInfo(props: { clients: ClientsDto }) {
    clientIdData = props.clients?.id;
    const { data: peopleeData } = customerContacts.getAll();

    const peoples = [];
    if (peopleeData) {
        for (const peoplesData of peopleeData.data?.result) {
            if (props.clients) {
                if (peoplesData.customerId === props.clients.id) {
                    peoples.push({
                        "vardas": peoplesData.firstName,
                        "pavarde": peoplesData.lastName,
                        "telefonas": peoplesData.phone,
                        "pareigos": peoplesData.position,
                        "papildoma_info": peoplesData.note,
                        id: peoplesData.id,
                    });
                }
            }
        }
    }


    const actions: TableActionsType<any>[] = [

    ];

    const handleClickRow = (row: any) => {
        console.log('clicked');
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <PeopleTable
                data={peoples || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const PeopleTable = (props: peopleTableProps) => {
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
            <AddNewPeopleModal
                handleSuccessPeople={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                className={'side-modal'}
                onHide={() => setisAddNewModalOpen(false)}
                idData={clientIdData}
            />
            <SuccessModal
                text='Konktaktinis asmuo sėkmingai pridėtas'
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
