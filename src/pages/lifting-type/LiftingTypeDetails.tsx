import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import LiftingTypeInfo from "../../components/Organisms/lifting-type/LiftingTypeInfo";
import { drivingLicenseStore } from '../../store/driving-license.store';

export default function LiftingTypeDetails() {
    // const { id } = useParams();
    // const { data: driverLicense } = drivingLicenseStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="LiftingType"
                navigation={["Dashboard", "Setting", "liftingtype"]}
            />
            <Tabs className="mt-5">
                <Tab label="TYPE DATA">
                    <LiftingTypeInfo data={[]} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
