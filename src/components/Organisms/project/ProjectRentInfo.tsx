import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SuccessModal from "../Modals/SuccessModal";
// import AddNewRentOrderModal from "./AddNewRentOrderModal";
import AddNewRentOrderModal from "./NewRentOrderModal";
import TableDropdown from '../tables/Table-drop';
import { ProjectTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { useNavigate } from 'react-router-dom';
import { ProjectDto, ProjectTableDto } from '../../../types/services/project.types';

import { projectsOrdersStore } from '../../../store/project-orders.store';
let idInfo = '';

export default function ProjectRentInfo(props: { project: ProjectDto, isActive: boolean }) {
    const { id } = useParams();
    if (id) {
        localStorage.setItem('projectId', id);
    }
    const navigate = useNavigate();
    const { data: projectOrderData } = projectsOrdersStore.getAll();

    let tablemockData: any = [];
    let additionalInfo: boolean = false;
    let activatedCount: number = 0;
    if (projectOrderData) {
        projectOrderData?.data?.result.map((item: any) => {
            if (item.projectId === id && item.type === 'loans') {
                if (item.type === 'loans' && (item.number).split("-")[2] === "1") {
                    additionalInfo = true;
                    idInfo = item;
                }
                if (!item.isActive) {
                    activatedCount = activatedCount + 1;
                }
                tablemockData.push({
                    'id': item.id,
                    'Pavadinimas': item.number,
                    'Aktyvavimo Data': item.activatedOn,
                    'Sūkurimo Data': item.createdOn,
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
        navigate(`/dashboard/projects/rentorder/${row.id}`, {
            state: {
                projectId: id,
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
                                additional={additionalInfo}
                                showIcon={false}
                                showTitle={true}
                                actions={actions}
                                handleClickRow={handleClickRow}
                                onChangePage={onChangePage}
                                isShowAddtionalBtn={(tablemockData.length > 0 && activatedCount > 0) || !(props.isActive) ? false : true}
                            // isShowAddtionalBtn={activatedCount > 0 ? true : false}
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
    const [isAdditionalModalOpen, setisAdditionalModalOpen] = useState(false);
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
                    additional={props.additional}
                    rowsPerPage={30}
                    actions={props.actions}
                    showIcon={props.showIcon}
                    showTitle={props.showTitle}
                    isShowAddtionalBtn={props.isShowAddtionalBtn}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                    onClickAdditionalButton={() => { setisAdditionalModalOpen(true) }}
                />
            </div>
            <AddNewRentOrderModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal-mid'}
            />
            <AddNewRentOrderModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAdditionalModalOpen}
                setShow={setisAdditionalModalOpen}
                onHide={() => setisAdditionalModalOpen(false)}
                className={'side-modal-mid'}
                additional={true}
                idData={idInfo}
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
