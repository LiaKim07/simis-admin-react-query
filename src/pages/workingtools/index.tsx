import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { equipmentStore } from "../../store/equipment.store";

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewWorkingtoolsModal from '../../components/Organisms/Workingtools/AddNewWorkingtoolsModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';

export default function Workingtools() {
    const navigate = useNavigate();
    const { data: equipmentData } = equipmentStore.getAll();

    let tableData: any = [];
    if (equipmentData?.data) {
        equipmentData?.data?.result.map((item: any) => {
            tableData.push({
                "id": item.id,
                "Name": item.name,
                "Measurement unit": item.unit,
                "Number": item.number,
                "ExpiredOn": item.expiredOn,
                "Quantity": item.quantity,
            })
        })
    }

    const actions: TableActionsType<any>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('dsfadsfa', item);
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
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        navigate(`/dashboard/equipments/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <TestMockTable
                data={tableData || []}
                uniqueCol="id"
                hide={['id', 'imageUrl']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const TestMockTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Darbuotojai" navigation={['Resursų valdymas', 'Darbuotojai']} />
            </div>
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
                <AddNewWorkingtoolsModal
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
        </div>
    );
};
