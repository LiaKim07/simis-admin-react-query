import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Table from '../../components/Organisms/tables/Table';
import { TableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';
import { warehouseStore } from '../../store/warehouse.store';
import { projectsOrdersStore } from '../../store/project-orders.store';
import { projectsStore } from '../../store/projects.store';
import { clientsStore } from '../../store/clients.store';
import { companyContacts } from '../../store/company-contacts.store';
import { userStore } from '../../store/user.store';

export default function ProductHistory(props: { product: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: warehouseOrder } = warehouseStore.getAllWarehosueOrders();
    const { data: warehouseProduct } = warehouseStore.getAllWarehosueProducts();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: companyContracts } = companyContacts.getAll();
    const { data: projects } = projectsStore.getAll();
    const { data: client } = clientsStore.getAll();
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
    // const { data: warehouse } = warehouseStore.getById(userId as string);

    let products: any = [];
    warehouseProduct?.data?.result.map((warehosueProduct: any) => {
        let customerData: string = '', projectName: string = '';
        if (warehosueProduct.productId === id) {
            warehouseOrder?.data?.result.map((warehouseOrder: any) => {
                let projectId: string = '';
                projects?.data?.result.map((project: any) => {
                    if (warehouseOrder.projectId === project.id) {
                        client?.data?.result.map((client: any) => {
                            if (client.id === project.customerId) {
                                customerData = client.name;
                                projectName = project.name;
                                projectId = project.id;
                            }
                        })
                    }

                })
                if (warehosueProduct.id === warehouseOrder.warehouseProductId) {
                    projectOrder?.data?.result.map((projectOrder: any) => {
                        if (projectOrder.id === warehouseOrder.projectOrderId) {
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

                            products.push({
                                "Pavadinimas": projectOrder.number,
                                "Veiksmas": projectOrder.type === 'returns' ? 'Gražinimas' : projectOrder.type === 'sales' ? 'Paravimas' : projectOrder.type === 'loans' ? "Nuoma" : projectOrder.type === 'writeoff' ? 'Paravimas' : projectOrder.type === 'purchases' ? 'Pirkimas' : '',
                                "Data": projectOrder.activatedOn,
                                "Klientas": customerData,
                                "Kiekis": warehouseOrder.quantity,
                                "Vertė": 1930,
                                "Projektas": projectName,
                                "Atsakingas": createdByData,
                                type: projectOrder.type,
                                id: projectOrder.id,
                                projetId: projectId,
                            })
                        }
                    })
                }
            })
        }
    })


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

    const handleClickRow = (row: any) => {
        if (row.type === 'loans') {
            navigate(`/dashboard/projects/rentorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        } else if (row.type === 'returns') {
            navigate(`/dashboard/projects/returnorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        } else if (row.type === 'sales') {
            navigate(`/dashboard/projects/salesorder/${row.id}`, {
                state: {
                    projectId: row.projetId,
                }
            });
        }
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <ProductHistoryTable
                data={products || []}
                uniqueCol="id"
                hide={['id', 'Vertė', 'projetId']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ProductHistoryTable = (props: TableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

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
        </div>
    );
};
