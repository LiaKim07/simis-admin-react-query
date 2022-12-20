import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProjectRentOrderInfo from "../../components/Organisms/project/ProjectRentOrderInfo";
import ProjectRentOrderReturnedInfo from "../../components/Organisms/project/ProjectRentOrderReturnedProductsInfo";
import { projectsOrdersStore } from "../../store/project-orders.store";

export default function ProjectRentDetails() {
    const { id } = useParams();
    const { data: clients } = projectsOrdersStore.getById(id as string);
    const rentOrderData =
    {
        "id": "string",
        "name": "string",
        "plateNumber": "string",
        "milage": 0,
        "insurance": "string",
        "service": "string",
        "inspection": "string",
        "manufactory": "string",
        "employeeId": "string",
        "type": "string",
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
                    { name: 'Nuoma', clickTo: `projects/${projectData.id}` },
                    clients?.data?.result.number
                ]}
            // navigation={["Sales", "Projects", `${clients?.data?.result.number}`]}
            />
            <Tabs className="mt-5">
                <Tab label="Informacija">
                    <ProjectRentOrderInfo project={rentOrderData} />
                </Tab>
                <Tab label="">
                    <ProjectRentOrderReturnedInfo projects={rentOrderData} />
                </Tab>
                {/* <Tab label="RETURNED PRODUCTS">
                    <ProjectRentOrderReturnedInfo projects={rentOrderData} />
                </Tab> */}
            </Tabs>
        </div>
    );
}
