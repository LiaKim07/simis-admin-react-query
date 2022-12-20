import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import EcommerceClient from "../../components/Organisms/ecommerce-client/EcommerceClient";
import { ecommerceClientStore } from '../../store/ecommerce-client';

export default function EcommerceClientDetails() {
    const { id } = useParams();
    const { data: ecommerceClient } = ecommerceClientStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={ecommerceClient?.data?.result.companyName}
                navigation={[
                    { name: 'E komercija', clickTo: 'ecommerce-client' },
                    {
                        name: 'Klientai',
                        clickTo: 'ecommerce-client'
                    },
                    `${ecommerceClient?.data?.result.companyName}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="KLIENTO INFORMACIJA">
                    <EcommerceClient ecomData={ecommerceClient?.data?.result!} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
