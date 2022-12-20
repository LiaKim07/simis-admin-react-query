import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import LiftingCapacityInfo from "../../components/Organisms/lifting-capacity/LiftingCapacityInfo";
import { drivingLicenseStore } from '../../store/driving-license.store';

export default function LiftingCapacityDetails() {
    // const { id } = useParams();
    // const { data: driverLicense } = drivingLicenseStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="LiftingCapacity"
                navigation={["Dashboard", "Setting", "lifting capacity"]}
            />
            <Tabs className="mt-5">
                <Tab label="TYPE DATA">
                    <LiftingCapacityInfo data={[]} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
