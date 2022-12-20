import React from "react";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import CompanyDetail from "./CompanyDetail";
import NoteDetail from "./NoteDetail";
import EmpContractDetail from "./EmpContractDetail";
import { companyStore } from "../../store/company.store";

export default function CompnyProfile() {
    const { data: companyData } = companyStore.getAll();

    return (
        <div className="px-3">
            <Breadcrump
                title={"Company profile"}
                navigation={["Admin settings", "Company profile"]}
            />
            <Tabs className="mt-5">
                <Tab label="DATA">
                    <CompanyDetail data={companyData?.data?.result} />
                </Tab>
                {/* <Tab label="EMPLOYEEMENT CONTRACT">
                    <EmpContractDetail data={companyData?.data?.result} />
                </Tab>
                <Tab label="Pastabos">
                    <NoteDetail data={companyData?.data?.result} />
                </Tab> */}
                <Tab label="">
                    {/* <CompanyDetail data={companyData?.data?.result} /> */}
                </Tab>
            </Tabs>
        </div>
    );
}
