import React, { useState, useEffect } from 'react';

import Table from '../tables/Table';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { equipmentOrderStore } from '../../../store/equipmentOrder.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

export default function EmployeeWorkingtools(props: { employee: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { data: equipmentData } = equipmentOrderStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
    const [equipmentOrder, setEquipmentOrder] = useState<any>([]);
    let documents: any = [];
    if (equipmentData?.data) {
        equipmentData?.data?.result.map((item: any) => {
            let nameData: string = '';
            if (item.employeeId === props.employee.id) {
                nameData = props?.employee?.firstName + ' ' + props?.employee?.lastName;
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
                    'id': item.id,
                    'Pavadinimas': nameData,
                    'Numeris': item.number,
                    'Vnt.Kaina': item.pricePerUnit,
                    'Išdavė': createdByData,
                    'Galioja iki': item.validUntil,
                    'Data': item.createdOn,
                    'Operacija': item.type === 'loans' ? 'Išdavimas' : item.type === 'returns' ? 'Grąžinimas' : '',
                    'Kiekis': item.quantity
                });
            }
        })
    }
    console.log('docu', documents)
    useEffect(() => {

    }, [equipmentData?.data]);


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
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <WorkingToolsTable
                data={documents || []}
                uniqueCol="id"
                hide={['id', 'employeeId', 'createdBy', 'createdOn', 'equipmentId', 'note']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const WorkingToolsTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    showAddNewButton={false}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
        </div>
    );
};
