import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProdcuttypeInfo from "../../components/Organisms/producttype/Producttypeinfo";
import { productType } from '../../store/producttype.store';

export default function ProducttypeDetails() {
    const { id } = useParams();
    const { data: producttype } = productType.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${producttype?.data?.result.name}`}
                navigation={["Sandėlio valdymas", "Nustatymai", "Prekių tipai"]}
            />
            <Tabs className="mt-5">
                <Tab label="BENDRA INFORMACIJA">
                    <ProdcuttypeInfo producttype={producttype?.data?.result!} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
