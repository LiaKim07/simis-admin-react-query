import React, { useState } from "react";
import { useParams } from "react-router-dom";

import TableDropdown from '../tables/Table-drop';
import { ProjectTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ProjectTableDto } from '../../../types/services/project.types';
import { projectsOrdersStore } from '../../../store/project-orders.store';

export default function ProjectAttachmentsInfo(props: { project: any }) {
    const { id } = useParams();
    const { data: projectOrderData } = projectsOrdersStore.getAll();
    let data = projectOrderData?.data?.result;
    const sorted = data.sort(function (a: any, b: any) {
        return a?.number.localeCompare(b?.number, undefined, { numeric: true, sensitivity: 'base' });
    });

    let tablemockData: any = [];
    if (projectOrderData) {
        sorted.map((item: any) => {
            if (item.projectId === id) {
                let subData: any = [];
                if (item.type === 'loans') {
                    let name = item.number.split("-");
                    subData.push('Perdavimo aktas' + " " + item.number, 'Sutarties priedas' + " " + name[0] + '-' + name[1] + '-' + (Number(name[2]) + 1));
                } else if (item.type === 'returns') {
                    let name = item.number.split("-");
                    subData.push('Grąžinimo aktas' + " " + item.number, 'Sutarties priedas' + " " + name[0] + '-' + name[1] + '-' + (Number(name[2]) + 1));
                }
                tablemockData.push({
                    'id': item.id,
                    'Pavadinimas': item.number,
                    'Data': item.createdOn,
                    // 'Unit Price': item.rentUnitPrice,
                    // 'Type': item.type,
                    // 'activated': item.isActive,
                    "subData": subData
                })
            }
        })
    }

    const actions: TableActionsType<ProjectTableDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {
                console.log('dsfadsfa', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProjectTableDto) => {
                alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: ProjectTableDto) => {

    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <React.Fragment>
            {props.project ? (
                <div className="py-4 px-5 bg-white">
                    <div className="row">
                        <div className="mb-5">
                            <ProjectsTable
                                data={tablemockData || []}
                                uniqueCol="id"
                                hide={['id', 'subData']}
                                subuniqueCol="id"
                                subhide={['id']}
                                showIcon={true}
                                showTitle={true}
                                actions={actions}
                                handleClickRow={handleClickRow}
                                onChangePage={onChangePage}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}

const ProjectsTable = (props: ProjectTableProps) => {

    return (
        <div className="px-3">
            <div className="mt-4">
                <TableDropdown
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    subuniqueCol={props.subuniqueCol}
                    subhide={props.subhide}
                    actions={props.actions}
                    showAddNewButton={false}
                    isArray={true}
                    isSubOpen={true}
                    rowsPerPage={50}
                    showIcon={props.showIcon}
                    showTitle={props.showTitle}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                />
            </div>
        </div>
    );
};
