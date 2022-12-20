import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import Table from '../../components/Organisms/tables/Table';
import { TableProps } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';
import { warehouseStore } from '../../store/warehouse.store';
import { warehouseAttachmentStore } from '../../store/warehouseAttachement';
import { userStore } from '../../store/user.store';
import { companyContacts } from '../../store/company-contacts.store';

export default function Operation(props: { product: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    let documents: any = [];
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseAttachment } = warehouseAttachmentStore.getAllWriteoff();
    const { data: companyContracts } = companyContacts.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
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
    warehouseProduct?.data?.result.map((warehouseProducts: any) => {
        if (warehouseProducts.productId === id) {
            warehouseOrder?.data?.result.map((warehouseOrders: any) => {
                if (warehouseOrders.warehouseProductId === warehouseProducts.id && (warehouseOrders.type === 'purchases' || warehouseOrders.type === 'writeoffs')) {
                    let fileName: string = '', fileUrl: string = '';
                    warehouseAttachment?.data?.result.map((warehouseAttachments: any) => {
                        if (warehouseAttachments.warehouseProductId === warehouseProducts.id) {
                            fileName = warehouseAttachments.customFileName;
                            fileUrl = warehouseAttachments.url;
                        }
                    })
                    if (fileName) {
                        documents.push({
                            'Paremta': fileName,
                            'Veiksmas': warehouseOrders.type === 'purchases' ? 'Pirkimas' : warehouseOrders.type === 'writeoffs' ? 'Nurašymas' : '',
                            'Data': warehouseOrders.createdOn,
                            'Kiekis': warehouseOrders.quantity,
                            'Kaina': warehouseOrders.basePrice,
                            'Atsakingas': createdByData,
                            'fileUrl': fileUrl,
                        })
                    }
                }
            })
        }
    })

    const handleClickRow = (row: any) => {
        window.open(row.fileUrl, "_blank");
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <OperationTable
                data={documents || []}
                uniqueCol="id"
                hide={['id', 'fileUrl']}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const OperationTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
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
