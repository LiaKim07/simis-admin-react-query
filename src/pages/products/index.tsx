import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewProductModal from '../../components/Organisms/products/AddNewProductModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { productStore } from '../../store/products.store';
import { productType } from '../../store/producttype.store';
import { productGroup } from '../../store/productgroup.store';
import { ProductItemTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';

export default function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: productData } = productStore.getAll();
    const { data: producTypeData } = productType.getAll();
    const { data: producGroupData } = productGroup.getAll();

    const products = [];
    if (productData) {
        for (const productsData of productData.data.result) {
            let productypeName = '', productgroupName = '';
            producTypeData?.data?.result.map((typeData: any) => {
                if (productsData.productTypeId === typeData.id) {
                    productypeName = typeData.name;
                }
            })

            producGroupData?.data?.result.map((groupData: any) => {
                if (productsData.productGroupId === groupData.id) {
                    productgroupName = groupData.name;
                }
            })
            products.push({
                id: productsData.id,
                "Numeris": productsData.number,
                "Pavadinimas": productsData.name,
                "Svoris": productsData.weight,
                "Plotas": productsData.area,
                "Tipas": productypeName,
                "Grupė": productgroupName,
            });
        }
    }

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
        navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProductTable
                data={products || []}
                uniqueCol="id"
                hide={['id']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ProductTable = (props: any) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Prekės" navigation={['Sandėliai', 'Prekės']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    rowsPerPage={25}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewProductModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
            />
            <SuccessModal
                isUpdate={false}
                show={isSuccessModalOpen}
                text='Prekė sėkmingai pridėta'
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
