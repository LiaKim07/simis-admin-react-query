import React from "react";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProjectOfferInfo from "../../components/Organisms/project/ProjectOfferInfo";

export default function ProjectOfferDetails() {
    const vehiclesData =
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

    return (
        <div className="px-3">
            <Breadcrump
                title="Offer"
                navigation={["Sales", "Projects", "Offer"]}
            />
            <Tabs className="mt-5">
                <Tab label="DATA">
                    <ProjectOfferInfo project={vehiclesData} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
