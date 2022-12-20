import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import AddNewWarehouseProductModal from '../../components/Organisms/warehouses/AddNewWarehouseProductModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessWarehouseModal';
import Table from '../../components/Organisms/tables/Table';
import { warehouseStore } from '../../store/warehouse.store';
import { productStore } from '../../store/products.store';
import { productType } from '../../store/producttype.store';
import { productGroup } from '../../store/productgroup.store';
import { ProductItemTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';
import { WarehouseDto } from '../../types/services/warehouse.types';
let propsData = '';

export default function WarehouseProductlist(props: { warehouseById: any }) {
    propsData = props.warehouseById?.id;
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: productData } = productStore.getAll();
    const { data: productTypeData } = productType.getAll();
    const { data: productGroupData } = productGroup.getAll();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    let productIdArr: any = [];
    if (warehouseProduct) {
        warehouseProduct?.data?.result.map((item: any) => {
            if (item.warehouseId === id) {
                productIdArr.push(item.productId);
            }
        })
    }

    let products: any = [];
    if (productData) {
        productData?.data?.result.map((item: any) => {
            productIdArr.map((product: any) => {
                if (item.id === product) {
                    let typeData: string = '', groupData: string = '';
                    productTypeData?.data?.result.map((type: any) => {
                        if (type.id === item.productTypeId) {
                            typeData = type.name;
                        }
                    })

                    productGroupData?.data?.result.map((group: any) => {
                        if (group.id === item.productGroupId) {
                            groupData = group.name;
                        }
                    })
                    products.push({
                        id: item.id,
                        'Pavadinimas': item.name,
                        'Kodas': item.number,
                        'Tipas': typeData,
                        'Grupė': groupData,
                        'Svoris': item.weight,
                    })
                }
            })
        })
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
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: ProductItemDto) => {
        navigate(`/dashboard/warehouses/product/${row.id}`, {
            state: {
                warehouseId: id,
            }
        });
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProductTable
                data={products || []}
                uniqueCol="id"
                hide={['id', 'isEcommerce', 'isActive', 'imageUrl', 'productCategoryId', 'productGroupId', 'productTypeId', 'createdOn', 'createdBy', 'unit', 'note']}
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
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    rowsPerPage={25}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewWarehouseProductModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
                warehouseId={propsData}
            />
            <SuccessModal
                show={isSuccessModalOpen}
                text='Prekė sėkmingai pridėta į sandėlį'
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
