import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProjectSalesOrderInfo from "../../components/Organisms/project/ProjectSalesOrderInfo";
import { projectsOrdersStore } from '../../store/project-orders.store';

export default function ProjectSalesOrderDetails() {
    const location: any = useLocation();
    const navigate = useNavigate();
    let projectIdData = location.state.projectIdSales;
    const { data: projectOrderLatestData } = projectsOrdersStore.getByIdLatestSale(projectIdData as string);

    const storeData = localStorage.getItem('projectStore');
    let projectData: any = {};
    if (storeData && storeData !== null) {
        projectData = JSON.parse(storeData);
    }
    const vehiclesData = {}

    return (
        <div className="px-3">
            <Breadcrump
                title={projectOrderLatestData?.data?.result?.number}
                navigation={[
                    { name: 'Projektų valdymas', clickTo: 'projects' },
                    { name: 'Projektai', clickTo: 'projects' },
                    { name: `${projectData.name}`, clickTo: `projects/${projectData.id}` },
                    { name: 'Pardavimai', clickTo: `projects/${projectData.id}` },
                    projectOrderLatestData?.data?.result?.number
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="Informacija">
                    <ProjectSalesOrderInfo project={vehiclesData} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
