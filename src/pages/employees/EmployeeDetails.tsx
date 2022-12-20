import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import EmployeeInfo from "../../components/Organisms/employees/EmployeeInfo";
import { employeeStore } from "../../store/employees.store";
import EmployeeDocuments from "../../components/Organisms/employees/EmployeeDocumentInfo";
import EmployeeWorkingtools from "../../components/Organisms/employees/EmployeeWorkingToolsInfo";
import EmployeeHistory from "../../components/Organisms/employees/EmployeeHistoryInfo";
import EmployeeFormGeneration from "../../components/Organisms/employees/EmployeeForm";

export default function EmployeeDetails() {
  const { id } = useParams();
  const { data: employee } = employeeStore.getById(id as string);

  return (
    <div className="px-3">
      <Breadcrump
        title={employee?.data?.result.firstName + ' ' + employee?.data?.result.lastName}
        navigation={[{ name: 'Personalo valdymas', clickTo: 'employees' }, { name: 'Darbuotojai', clickTo: 'employees' }, `${employee?.data?.result.firstName} ${employee?.data?.result.lastName}`]}
      />
      <Tabs className="mt-5">
        <Tab label="DARBUOTOJO DUOMENYS">
          <EmployeeInfo employee={employee?.data?.result!} />
        </Tab>
        <Tab label="DARBO PRIEMONĖS">
          <EmployeeWorkingtools employee={employee?.data?.result!} />
        </Tab>
        {/* <Tab label="ISTORIJA">
          <EmployeeHistory employee={employee?.data?.result!} />
        </Tab> */}
        <Tab label="DOKUMENTAI">
          <EmployeeDocuments employee={employee?.data?.result!} />
        </Tab>
        <Tab label="FORM GENERAVIMAS">
          <EmployeeFormGeneration testdata={employee?.data?.result!} />
        </Tab>
      </Tabs>
    </div>
  );
}
