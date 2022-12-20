import React from "react";
import { useParams, useLocation } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import InvoiceData from "../../components/Organisms/invoices/InvoicesInfo";
import InvoiceOrder from "../../components/Organisms/invoices/InvoiceOrder";
import { projectsStore } from '../../store/projects.store';

export default function InvoiceDetails() {
    const { id } = useParams();
    const location: any = useLocation();
    let indexId = location?.state?.activeIndex;
    const { data: producttype } = projectsStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="Sąskaitos"
                navigation={[
                    { name: 'Pardavimų valdymas', clickTo: 'invoices' },
                    {
                        name: 'Sąskaitos',
                        clickTo: 'invoices'
                    },
                ]}
            />
            <Tabs activeIndex={indexId ? indexId : 0} className="mt-5">
                <Tab label="Užsakymai">
                    <InvoiceOrder data={producttype?.data!} />
                </Tab>

                <Tab label="Sąskaitos">
                    <InvoiceData data={producttype?.data!} />
                </Tab>
            </Tabs>
        </div>
    );
}
