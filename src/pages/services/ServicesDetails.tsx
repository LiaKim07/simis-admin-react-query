import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ServicesInfo from "../../components/Organisms/services/Servicesinfo";
import { servicesStore } from '../../store/services.store';

export default function ServicesDetails() {
    const { id } = useParams();
    const { data: serviceData } = servicesStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="Paslaugos"
                navigation={[
                    { name: 'Pardavimų valdymas', clickTo: 'services' },
                    {
                        name: 'Paslaugos',
                        clickTo: 'services'
                    },
                    `${serviceData?.data?.result.name}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="PASLAUGOS INFORMACIJA">
                    <ServicesInfo services={serviceData?.data?.result!} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
