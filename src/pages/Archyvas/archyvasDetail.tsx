import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SpinnerCircularFixed } from 'spinners-react';

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProjectInfo from "../../components/Organisms/project/ProjectInfo";
import ProjectRentInfo from "../../components/Organisms/project/ProjectRentInfo";
import ProjectSalesInfo from "../../components/Organisms/project/ProjectSales";
import ProjectReturnsInfo from "../../components/Organisms/project/ProjectReturnsInfo";
import ProjectInvoiceInfo from "../../components/Organisms/project/ProjectInvoices";
import ProjectOffersInfo from "../../components/Organisms/project/Projectoffers";
import ProjectAttachmentsInfo from "../../components/Organisms/project/ProjectAttachments";

import { projectsStore } from '../../store/projects.store';
import { projectsOrdersStore } from '../../store/project-orders.store';
import { warehouseStore } from '../../store/warehouse.store';

export default function ArchyvasDetails() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    if (id) {
        localStorage.setItem('projectId', id)
    }
    const { data: projectData } = projectsStore.getById(id as string);
    const { data: projectsOrders } = projectsOrdersStore.getAll();

    useEffect(() => {
        if (projectData?.data?.result) {
            let storeData: any = {
                id: projectData?.data?.result.id,
                name: projectData?.data?.result.name
            }
            localStorage.setItem('projectStore', JSON.stringify(storeData));
            setIsLoading(false);
        }
    },)

    let cnt: number = 0;
    projectsOrders?.data?.result.map((item: any) => {
        if (item.projectId === id && !(item.isActive)) {
            cnt++;
        }
    })


    return (
        <div className="px-3">
            {
                isLoading ? (<SpinnerCircularFixed
                    color={'green'}
                    secondaryColor={'rgb(0,0,0,0.12'}
                />) : (
                    <Breadcrump
                        title={`${projectData?.data?.result.name}`}
                        // navigation={["Projektų valdymas", "Projektai"]}
                        navigation={[{ name: 'Projektų valdymas', clickTo: 'projects' }, { name: 'Projektai', clickTo: 'projects' }, `${projectData?.data?.result.name}`]}
                    />
                )
            }

            <Tabs className="mt-5">
                {/* <Tab label="BENDRAS">
                    <ProjectInfo projects={projectData?.data?.result!} />
                </Tab>
                <Tab label="NUOMA">
                    <ProjectRentInfo isActive={cnt > 0 ? false : true} project={projectData?.data?.result!} />
                </Tab>
                <Tab label="GRĄŽINIMAI">
                    <ProjectReturnsInfo isActive={cnt > 0 ? false : true} project={projectData?.data?.result!} />
                </Tab>
                <Tab label="PARDAVIMAI">
                    <ProjectSalesInfo isActive={cnt > 0 ? false : true} project={projectData?.data?.result!} />
                </Tab>
                <Tab label="SĄSKAITOS">
                    <ProjectInvoiceInfo project={projectData?.data?.result!} />
                </Tab> */}
                {/* <Tab label="KOM. PASIŪLYMAI">
                    <ProjectOffersInfo project={projectData?.data?.result!} />
                </Tab> */}
                <Tab label="DOKUMENTAI">
                    <ProjectAttachmentsInfo project={projectData?.data?.result!} />
                </Tab>
                <Tab label="">
                    {/* <p>Čia bus istorija</p> */}
                </Tab>
            </Tabs>
        </div>
    );
}
