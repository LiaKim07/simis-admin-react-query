import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ClientsInfo from "../../components/Organisms/clients/ClientsInfo";
import ClientDataHistory from "./ClientDataHistory";
import ClientOperations from "./ClientOperations";
import ClientDocument from "./ClientDocument";
import ClientInvoice from "./ClientInvoice";
import PeopleInfo from "../../components/Organisms/clients/PeopleInfo";
import ContractInfo from "../../components/Organisms/clients/ContractInfo";
import { clientsStore } from "../../store/clients.store";

export default function SalesDetails() {
    const { id } = useParams();
    const { data: clients } = clientsStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${clients?.data?.result?.name}`}
                navigation={[
                    { name: 'Pardavimų valdymas', clickTo: 'customers' },
                    {
                        name: 'Klientai',
                        clickTo: 'customers'
                    },
                    `${clients?.data?.result.name}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="INFORMACIJA">
                    <ClientsInfo clients={clients?.data?.result!} />
                </Tab>
                {/* <Tab label="ISTORIJA">
                    <ClientDataHistory clients={clients?.data?.result!} />
                </Tab> */}
                <Tab label="Istorija">
                    <ClientOperations clients={clients?.data?.result!} />
                </Tab>
                <Tab label="DOKUMENTAI">
                    <ClientDocument clients={clients?.data?.result!} />
                </Tab>
                <Tab label="SĄSKAITOS">
                    <ClientInvoice clients={clients?.data?.result!} />
                </Tab>
                <Tab label="ŽMONĖS">
                    <PeopleInfo clients={clients?.data?.result!} />
                </Tab>
                <Tab label="SUTARTYS">
                    <ContractInfo clients={clients?.data?.result!} />
                </Tab>
            </Tabs>
        </div>
    );
}
