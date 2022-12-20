import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProdcutgroupInfo from "../../components/Organisms/productgroup/Productgroupinfo";
import { productGroup } from '../../store/productgroup.store';

export default function ProductgroupDetails() {
    const { id } = useParams();
    const { data: productgroup } = productGroup.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${productgroup?.data?.result.name}`}
                navigation={["Sandėlio valdymas", "Nustatymai", "Prekių grupės"]}
            />
            <Tabs className="mt-5">
                <Tab label="BENDRA INFORMACIJA">
                    <ProdcutgroupInfo productgroup={productgroup?.data?.result!} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
