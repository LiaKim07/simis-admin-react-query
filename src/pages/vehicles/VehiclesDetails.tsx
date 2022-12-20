import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import VehiclesInfo from "../../components/Organisms/vehicles/VehiclesInfo";
import VehiclesDataHistory from "./VehiclesDataHistory";
import VehiclesDocument from "./VehiclesDocument";
import VehivlesDrivers from "./VehiclesDrivers";
import { vehiclesStore } from '../../store/vehicles.store';

export default function VehiclesDetails() {
    const { id } = useParams();
    const { data: vehiclesData } = vehiclesStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${vehiclesData?.data?.result.name}`}
                navigation={[
                    { name: 'Resursų valdymas', clickTo: 'vehicles' },
                    {
                        name: 'Automobiliai',
                        clickTo: 'vehicles'
                    },
                    `${vehiclesData?.data?.result.name}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="Informacija">
                    <VehiclesInfo vehicles={vehiclesData?.data?.result!} />
                </Tab>
                {/* <Tab label="DATA HISTORY">
                    <VehiclesDataHistory vehicles={vehiclesData?.data?.result!} />
                </Tab> */}
                <Tab label="Dokumentai">
                    <VehiclesDocument vehicles={vehiclesData?.data?.result!} />
                </Tab>
                <Tab label="Vairuotojai">
                    <VehivlesDrivers vehicles={vehiclesData?.data?.result!} />
                </Tab>
            </Tabs>
        </div>
    );
}
