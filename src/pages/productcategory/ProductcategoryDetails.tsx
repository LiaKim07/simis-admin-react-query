import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import ProdcutcategoryInfo from "../../components/Organisms/productcategory.tsx/Productcategoryinfo";
import { productCategory } from '../../store/productcategory.store';

export default function ProductcategoryDetails() {
    const { id } = useParams();
    const { data: productcategory } = productCategory.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title={`${productcategory?.data?.result.name}`}
                navigation={['Sandėlio valdymas', 'Nustatymai', 'Prekių kategorijos']}
            />
            <Tabs className="mt-5">
                <Tab label="BENDRA INFORMACIJA">
                    <ProdcutcategoryInfo productcategory={productcategory?.data?.result!} />
                </Tab>
                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
