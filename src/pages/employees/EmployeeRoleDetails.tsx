import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import EmployeeRoleInfo from "../../components/Organisms/employees/EmployeeRoleInfo";
import { employeeRoleStore } from '../../store/employee-role.store';

export default function EmployeeRoleDetails() {
    const { id } = useParams();
    const { data: emprole } = employeeRoleStore.getById(id as string);

    return (
        <div className="px-3">
            <Breadcrump
                title="Klojiniai"
                navigation={["Warehouse", "Setting", "Product Groups"]}
            />
            <Tabs className="mt-5">
                <Tab label="TYPE DATA">
                    <EmployeeRoleInfo employeeRole={emprole?.data?.result!} />
                </Tab>

                <Tab label="">
                </Tab>
            </Tabs>
        </div>
    );
}
