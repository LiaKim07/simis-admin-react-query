import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import AddNewOfferModal from "./AddNewOffer";
import SuccessModal from '../../Organisms/Modals/SuccessWarehouseModal';
import Table from '../../Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ProductItemDto } from '../../../types/services/product.types';

export default function ProjectOffers(props: { project: any }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const documents = [
        {
            "Offer name": "Offer Nr.1",
            "Date": "2022.05.26",
            "Quantity": 2,
            "Type": "offer",
        },
        {
            "Offer name": "Offer Nr.2",
            "Date": "2022.05.26",
            "Quantity": 1,
            "Type": "offer",
        },
    ];


    const actions: TableActionsType<ProductItemDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('delete', item);
            },
        },
    ];

    const handleClickRow = (row: ProductItemDto) => {
        navigate(`/dashboard/projects/offer/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProjectOfferTable
                data={documents || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ProjectOfferTable = (props: TableProps) => {
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
            <AddNewOfferModal
                handleSuccess={() => console.log()}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
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
