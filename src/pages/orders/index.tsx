import React from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import Table from '../../components/Organisms/tables/Table';
import { OrderTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { projectsOrdersStore } from '../../store/project-orders.store';
import { projectsStore } from '../../store/projects.store';

export default function Order() {
    const navigate = useNavigate();

    const mockTableData: any = []

    const { data: projectOrder } = projectsOrdersStore.getAll();
    const { data: projects } = projectsStore.getAll();

    projectOrder?.data?.result.map((item: any) => {
        console.log('item', item)
        projects?.data?.result.map((project: any) => {
            if (item.projectId === project.id) {
                mockTableData.push({
                    'id': item.id,
                    'projetId': project.id,
                    'type': item.type,
                    'Projekto pavadinimas': project.name,
                    'Adresas': project.address + ', ' + project.postalCode + ', ' + project.city,
                    'Akto pavadinimas': item.number,
                    'Tipas': item.type === 'sales' ? 'Pardavimai' : item.type === 'loans' ? 'Nuoma' : item.type === 'returns' ? 'Grąžinimai' : '',
                    'Data': item.activatedOn,
                })
            }
        })
    })

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

    const handleClickRow = (row: any, key: string) => {
        if (key === 'Projekto pavadinimas') {
            navigate(`/dashboard/projects/${row.projetId}`);
        } else if (key === 'Akto pavadinimas') {
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
        }
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <OrderTable
                data={mockTableData || []}
                uniqueCol="id"
                hide={['id', 'projetId', 'type']}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const OrderTable = (props: OrderTableProps) => {

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Aktai" navigation={['Aktai']} />
            </div>
            <div className="mt-4">
                <Table
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    rowsPerPage={25}
                    showAddNewButton={false}
                    actions={props.actions}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                />
            </div>
        </div>
    );
};
