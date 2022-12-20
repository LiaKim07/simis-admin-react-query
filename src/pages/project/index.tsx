import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewProjectModal from '../../components/Organisms/project/AddNewProjectModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import TableDropdown from '../../components/Organisms/tables/ProjectTable';

import { projectsOrdersStore } from '../../store/project-orders.store';
import { projectsStore } from '../../store/projects.store';
import { employeeStore } from '../../store/employees.store';
import { clientsStore } from '../../store/clients.store';
import { customerContacts } from '../../store/customer-contacts.store';
import { ProjectTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProjectTableDto } from '../../types/services/project.types';

export default function Projects() {
    const navigate = useNavigate();
    const { data: projectsData } = projectsStore.getAll();
    const { data: employeesData } = employeeStore.getAll();
    const { data: customersData } = clientsStore.getAll();
    const { data: contactData } = customerContacts.getAll();
    const { data: projectOrder } = projectsOrdersStore.getAll();
    const projects: any = [];

    //mock data for subdata
    const subTableData: any = []

    if (projectsData) {
        for (const projData of projectsData.data.result) {
            let cnt: number = 0;
            projectOrder?.data?.result.map((item: any) => {
                if (item.projectId === projData.id && !(item.isActive)) {
                    cnt++;
                }
            })

            let responsibleEmployee = '';
            let customer = '';
            let contact = '';

            if (employeesData) {
                for (const empData of employeesData.data.result) {
                    if (empData.id === projData.projectResponsibleId) {
                        responsibleEmployee = empData.firstName + ' ' + empData.lastName;
                    }
                }
            }

            if (customersData) {
                for (const custData of customersData.data.result) {
                    if (custData.id === projData.customerId) {
                        customer = custData.name;
                    }
                }
            }

            if (contactData) {
                for (const contData of contactData.data.result) {
                    if (contData.id === projData.customerContactId) {
                        contact = `${contData.firstName} ${contData.lastName}`;
                    }
                }
            }

            projects.push({
                id: projData.id,
                "Segtuvo Nr.": projData.sequenceNumber,
                "Klientas": customer,
                "number": projData.number,
                "Pavadinimas": projData.name,
                "Address": `${projData.address}, ${projData.city}`,
                "Data": projData.createdOn,
                "projectOrderState": cnt === 0 ? true : false,
                subData: subTableData
            })
        }
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
        navigate(`/dashboard/projects/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };
    const compare = (a: any, b: any) => {
        return a["Segtuvo Nr."] - b["Segtuvo Nr."];
    };

    return (
        <div className="mb-5">
            <ProjectsTable
                data={projects.sort(compare) || []}
                uniqueCol="id"
                hide={['id', 'subData', 'projectOrderState']}
                subuniqueCol="id"
                subhide={['id']}
                showIcon={true}
                showTitle={true}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />
        </div>
    );
}

const ProjectsTable = (props: ProjectTableProps) => {
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="">
                <Breadcrump title="Projektai" navigation={['Projektų valdymas', 'Projektai']} />
            </div>
            <div className="mt-4">
                <TableDropdown
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    rowsPerPage={100}
                    subuniqueCol={props.subuniqueCol}
                    subhide={props.subhide}
                    actions={props.actions}
                    showIcon={props.showIcon}
                    showTitle={props.showTitle}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => setisAddNewModalOpen(true)}
                />
            </div>
            <AddNewProjectModal
                handleSuccess={() => setisSuccessModalOpen(true)}
                show={isAddNewModalOpen}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                className={'side-modal'}
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
