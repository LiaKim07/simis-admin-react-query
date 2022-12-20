import React, { useState } from "react";

import { VehiclesDto } from "../../../types/services/vehicles.type"
import Table from '../tables/Table';
import { ProjectTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ProjectTableDto } from '../../../types/services/project.types';
import { useNavigate } from 'react-router-dom';

export default function ProjectRentOrderReturnedInfo(props: { projects: any }) {
    const navigate = useNavigate();

    //mock data for subdata
    const tablemockData = [{
        'id': 'uuid',
        'Item code': 'e286508',
        'Name': 'Product Nr1',
        'Weight': 296,
        'Area': 0,
        'Value': 1913,
        'Rent': 1913,
    }, {
        'id': 'uuid',
        'Item code': 'e286508',
        'Name': 'Product Nr2',
        'Weight': 296,
        'Area': 0,
        'Value': 1913,
        'Rent': 1913,
    },]

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
        navigate(`/dashboard/projects/rentorder/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <React.Fragment>
            {props.projects ? (
                <div className="py-4 px-5 bg-white">
                    <div className="row">
                        <div className="mb-5">
                            <ProjectsTable
                                data={tablemockData || []}
                                uniqueCol="id"
                                hide={['id']}
                                subuniqueCol="id"
                                subhide={['id']}
                                showIcon={false}
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
