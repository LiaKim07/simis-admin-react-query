import React from 'react';
import { Modal } from 'react-bootstrap';

import { ModalProps } from '../../../types/props';
import Heading from '../../Atoms/Heading';
import Table from '../tables/PrintTable';
import { DismissTableProps, TableActionsType } from '../../../types/tableProps/table.props';
let propsData: any = {};

interface IModalProps extends ModalProps {
    producttypeId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

export default function DismissEmployee({
    setShow,
    handleSuccess,
    data,
    ...props
}: any) {
    const closeModal = () => {
        setShow(false);
    };

    const documents = [
        {
            "Name": "Sutikimas del atsiskaitymo",
            "active": true,
        },
        {
            "Name": "Prašymas dėl atleidimo",
            "active": false,
        },
        {
            "Name": "Priedas prie sutarties_atleidimas",
            "active": true,
        },
        {
            "Name": "Artūro Žičkaus antstoliui",
            "active": false,
        },
        {
            "Name": "Atleidimo įsakymas",
            "active": false,
        },
    ];

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

    const handleClickRow = (row: any) => {
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {'Dismiss Employee'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Close
                            </span>
                            <img
                                src={'/icons/close-icon.svg'}
                                className="cursor-pointer"
                                width={30}
                                alt="close-icon"
                            />
                        </button>
                    </div>
                    <div className="body-content px-4 modal-border">
                        <div className="mb-5">
                            <DismissTable
                                data={documents || []}
                                subdata={data}
                                uniqueCol="id"
                                hide={['id']}
                                actions={actions}
                                handleClickRow={handleClickRow}
                                onChangePage={onChangePage}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

const DismissTable = (props: DismissTableProps) => {

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    subdata={props.subdata}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    dismiss={true}
                    showAddNewButton={false}
                    isPagenation={false}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                />
            </div>
        </div>
    );
};
