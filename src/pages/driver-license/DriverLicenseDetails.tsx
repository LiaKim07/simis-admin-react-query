import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import DirverLicenseInfo from "../../components/Organisms/DriverLicense/DirverLicenseInfo";
import { drivingLicenseStore } from '../../store/driving-license.store';

export default function DriverLicenseDetails() {
    const { id } = useParams();
    const { data: driverLicense } = drivingLicenseStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="Klojiniai"
                navigation={["Warehouse", "Setting", "Product Groups"]}
            />
            <Tabs className="mt-5">
                <Tab label="TYPE DATA">
                    <DirverLicenseInfo data={driverLicense?.data?.result!} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
