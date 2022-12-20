import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import EcommerceOrderInfo from "../../components/Organisms/ecommerce-order/EcommerceOrderInfo";
import { ecommerceOrderStore } from '../../store/ecommerce-order.store';

export default function EcommerceOrderDetails() {
    const { id } = useParams();
    const { data: ecommerceOrder } = ecommerceOrderStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={ecommerceOrder?.data?.result.title}
                navigation={[
                    { name: 'E komercija', clickTo: 'ecommerce-order' },
                    {
                        name: 'Užsakymai',
                        clickTo: 'ecommerce-order'
                    },
                    `${ecommerceOrder?.data?.result.title}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="KLIENTO INFORMACIJA">
                    <EcommerceOrderInfo ecomData={ecommerceOrder?.data?.result!} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
