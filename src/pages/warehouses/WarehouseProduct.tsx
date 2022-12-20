import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProductInfo from "../../components/Organisms/products/WarehouseProductInfo";
import ProductHistory from "../products/ProductHistory";
import ProductDocument from "../products/ProductDocument";
import ProductInvoice from "../products/ProductInvoice";
import Operation from "../products/Operation";
import EcomInfo from "../../components/Organisms/products/EcomInfo";
import { productStore } from "../../store/products.store";

export default function WarehouseProduct() {
    const { id } = useParams();
    const { data: warehouse } = productStore.getById(id as string);
    return (
        <div className="px-3">
            <Breadcrump
                title={warehouse?.data?.result.name}
                navigation={[
                    { name: 'Sandėlio valdymas', clickTo: 'warehouses' },
                    {
                        name: 'Sandėliai',
                        clickTo: 'warehouses'
                    },
                    { name: 'Sandėlys Sildomas', clickTo: 'warehouses' },
                    `${warehouse?.data?.result.name}`
                ]}
            // navigation={["Warehouse", "Warehouse - Products"]}Sandėlio valdymas  Sandėliai             Sandėlys Sildomas
            />
            <Tabs className="mt-5">
                <Tab label="PRODUKTO INFORMACIJA">
                    <ProductInfo product={warehouse?.data?.result!} />
                </Tab>
                <Tab label="ISTORIJA">
                    <ProductHistory product={warehouse?.data?.result!} />
                </Tab>
                <Tab label="DOKUMENTAI">
                    <ProductDocument product={warehouse?.data?.result!} />
                </Tab>
                <Tab label="SĄSKAITOS">
                    <ProductInvoice product={warehouse?.data?.result!} />
                </Tab>
                <Tab label="E-COMMERCE">
                    <EcomInfo product={warehouse?.data?.result!} />
                </Tab>
                <Tab label="Operacijos">
                    <Operation product={warehouse?.data?.result!} />
                </Tab>
            </Tabs>
        </div>
    );
}
