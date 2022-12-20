import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProjectReturnOrderInfo from "../../components/Organisms/project/ProjectReturnInfor";
import { projectsOrdersStore } from "../../store/project-orders.store";

export default function ProjectReturnDetails() {
    const { id } = useParams();
    const { data: clients } = projectsOrdersStore.getById(id as string);
    const returnOrderData =
    {
        "liftingCapacity": 0
    }
    const storeData = localStorage.getItem('projectStore');
    let projectData: any = {};
    if (storeData && storeData !== null) {
        projectData = JSON.parse(storeData);
    }

    return (
        <div className="px-3">
            <Breadcrump
                title={clients?.data?.result.number}
                navigation={[
                    { name: 'Projektų valdymas', clickTo: 'projects' },
                    { name: 'Projektai', clickTo: 'projects' },
                    { name: `${projectData.name}`, clickTo: `projects/${projectData.id}` },
                    { name: 'GRĄŽINIMAI', clickTo: `projects/${projectData.id}` },
                    clients?.data?.result.number
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="Informacija">
                    <ProjectReturnOrderInfo project={returnOrderData} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
