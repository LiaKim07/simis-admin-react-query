import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewUserModal from '../../components/Organisms/employees/AddNewUserModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { accessLevelsStore } from '../../store/accessLevel.store';
import { userStore } from '../../store/user.store';
import { companyContacts } from '../../store/company-contacts.store';
import { UserTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { UserTableDto } from '../../types/services/employees.types';

export default function User() {
    const navigate = useNavigate();
    const { data: accessLevelsStoreData } = accessLevelsStore.getAll();
    const { data: usersData } = userStore.getAll();
    const { data: companyContactsData } = companyContacts.getAll();
    const users: any = [];
    // if (accessLevelsStoreData) {
    //     for (const usersData of accessLevelsStoreData.data.result) {
    //         user.push({
    //             id: usersData.id,
    //             Vartotojas: usersData.name,
    //             Lygis: usersData?.userRoles[0],
    //         });
    //     }
    // }

    usersData?.data?.result.map((user: any) => {
        let nameData: string = '', roleData: string = '';
        companyContactsData?.data?.result.map((companyContact: any) => {
            if (user.companyContactId === companyContact.id) {
                nameData = companyContact.firstName + ' ' + companyContact.lastName;
            }
        })

        accessLevelsStoreData?.data?.result.map((accessLevel: any) => {
            if (user.accessLevelId === accessLevel.id) {
                // roleData = accessLevel.userRoles.join(', ');
                // roleData = accessLevel.userRoles[0];
                roleData = accessLevel.name;
            }
        })

        users.push({
            id: user.id,
            Vartotojas: nameData,
            Lygis: roleData,
        });
    })

    const actions: TableActionsType<UserTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: UserTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: UserTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: UserTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: UserTableDto) => {
        // navigate(`/dashboard/employee-roles/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <UserTable
                data={users || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const UserTable = (props: any) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="User" navigation={['User']} />
            </div>
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

            <AddNewUserModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />

            <SuccessModal
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
