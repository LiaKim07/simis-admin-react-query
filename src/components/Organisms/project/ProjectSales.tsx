import React, { useState } from "react";
import { useParams } from "react-router-dom";

import SuccessModal from "../Modals/SuccessModal";
import AddNewSaleOrderModal from "./AddNewSaleOrderOrderInfo";
import AddNewRentOrderModal1 from "./NewRentOrderModal";
import TableDropdown from '../tables/Table-drop';
import { ProjectTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ProjectDto, ProjectTableDto } from '../../../types/services/project.types';
import { useNavigate } from 'react-router-dom';
import { projectsOrdersStore } from '../../../store/project-orders.store';

export default function ProjectSalesInfo(props: { project: ProjectDto, isActive: boolean }) {
    const { id } = useParams();
    const navigate = useNavigate();
    //mock data for subdataconst { data: projectOrderData } = projectsOrdersStore.getAll();
    const { data: projectOrderData } = projectsOrdersStore.getAll();
    let tablemockData: any = [];
    let activatedCount: number = 0;
    if (projectOrderData) {
        projectOrderData?.data?.result.map((item: any) => {
            if (item.projectId === id && item.type === 'sales') {
                if (!item.isActive) {
                    activatedCount = activatedCount + 1;
                }
                tablemockData.push({
                    'id': item.id,
                    'Order Name': item.number,
                    'Date': item.createdOn,
                    'Quote': item.rentUnitPrice,
                    'DayPrice': item.totalRentPriceForOneDay,
                    'Statusas': item.isActive,
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
        navigate(`/dashboard/projects/salesorder/${row.id}`, {
            state: {
                projectIdSales: id,
            }
        });
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
                                hide={['id']}
                                subuniqueCol="id"
                                subhide={['id']}
                                showIcon={false}
                                showTitle={true}
                                actions={actions}
                                isShowAddtionalBtn={(tablemockData.length > 0 && activatedCount > 0) || !(props.isActive) ? false : true}
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
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

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
                    showIcon={props.showIcon}
                    showTitle={props.showTitle}
                    isShowAddtionalBtn={props.isShowAddtionalBtn}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewRentOrderModal1
                handleSuccess={() => console.log('')}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal-mid'}
                tableType={'Sale'}
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
    );
};
