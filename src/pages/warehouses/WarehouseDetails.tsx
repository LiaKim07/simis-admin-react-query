import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import WarehouseInfo from "../../components/Organisms/warehouses/Warehouseinfo";
import WarehouseProductlist from "../../pages/products/WarehuoseProductlist";
import WarehouseHistory from "./WarehouseHistory";
import WarehouseDocuments from "./WarehouseDocuments";
import WarehouseInvoice from "./WarehouseInvoice";
import { warehouseStore } from "../../store/warehouse.store";

export default function WarehouseDetails() {
    const { id } = useParams();
    const { data: warehouse } = warehouseStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${warehouse?.data?.result.name}`}
                navigation={[
                    { name: 'Sandėlio valdymas', clickTo: 'warehouses' },
                    {
                        name: 'Sandėliai',
                        clickTo: 'warehouses'
                    },
                    `${warehouse?.data?.result.name}`
                ]}
            />
            <Tabs className="mt-5">
                <Tab label="BENDRA INFORMACIJA">
                    <WarehouseInfo warehouse={warehouse?.data?.result!} />
                </Tab>
                <Tab label="PREKĖS">
                    <WarehouseProductlist warehouseById={warehouse?.data.result!} />
                </Tab>
                {/* <Tab label="SĄSKAITOS">
                    <WarehouseInvoice warehouseById={warehouse?.data.result!} />
                </Tab> */}
                <Tab label="DOKUMENTAI">
                    <WarehouseDocuments warehouseById={warehouse?.data.result!} />
                </Tab>
                {/* <Tab label="ISTORIJA">
                    <WarehouseHistory warehouseById={warehouse?.data.result!} />
                </Tab> */}
            </Tabs>
        </div>
    );
}
