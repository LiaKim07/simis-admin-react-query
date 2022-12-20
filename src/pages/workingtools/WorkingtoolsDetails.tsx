import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import WorkingtoolsInfo from "../../components/Organisms/Workingtools/WorkingtoolsInfo";
import WorkingtoolsIssues from "../../components/Organisms/Workingtools/WorkingtoolsIssuesInfo";
import WorkingtoolsReturns from "../../components/Organisms/Workingtools/WorkingtoolsReturnsInfo";
import WorkingtoolsPurchases from "../../components/Organisms/Workingtools/WorkingtoolsPurchasesInfo";

import { equipmentStore } from "../../store/equipment.store";

export default function WorkingtoolsDetails() {

    const { id } = useParams();
    const { data: equipmentData } = equipmentStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={equipmentData?.data?.result.name}
                navigation={[
                    { name: 'Resursų valdymas', clickTo: 'equipments' },
                    {
                        name: 'Darbo priemonės',
                        clickTo: 'equipments'
                    },
                    `${equipmentData?.data?.result.name}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="Informacija">
                    <WorkingtoolsInfo data={equipmentData?.data?.result || []} />
                </Tab>
                <Tab label="Išdavimai">
                    <WorkingtoolsIssues data={equipmentData?.data?.result} />
                </Tab>
                <Tab label="Grąžinimai">
                    <WorkingtoolsReturns data={equipmentData?.data?.result} />
                </Tab>
                <Tab label="Pirkimai">
                    <WorkingtoolsPurchases data={equipmentData?.data?.result} />
                </Tab>
            </Tabs>
        </div>
    );
}
