import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Breadcrump from '../../components/Molecules/Breadcrump';
import AddNewEmployeeModal from '../../components/Organisms/employees/AddNewEmployeeModal';
import SuccessModal from '../../components/Organisms/Modals/SuccessModal';
import Table from '../../components/Organisms/tables/Table';
import { employeeStore } from '../../store/employees.store';
import { EmployeeTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { EmployeeTableDto } from '../../types/services/employees.types';
import { employeeRoleStore } from '../../store/employee-role.store';

export default function Employees() {
  const navigate = useNavigate();
  const { data: employeesData } = employeeStore.getAll();
  const { data: employeeRoleData } = employeeRoleStore.getAll();

  const employees: EmployeeTableDto[] = [];
  if (employeesData) {
    for (const employeeData of employeesData.data?.result) {
      if (employeeRoleData) {
        employees.push({
          "id": employeeData.id,
          "Sutarties Nr.": employeeData.contractNumber,
          "Vardas Pavardė": `${employeeData.firstName} ${employeeData.lastName}`,
          "Pareigos": employeeRoleData?.data ? employeeRoleData?.data?.result?.find((x: any) => x.id == employeeData.employeeRoleId)?.name as string : '',
          "Telefonas": employeeData.phone,
          "El. paštas": employeeData.email
        });
      }
    }
  }

  const actions: TableActionsType<EmployeeTableDto>[] = [
    {
      name: 'View',
      icon: 'add',
      handleAction: (item: EmployeeTableDto) => {
        console.log('dsfadsfa', item);
      },
    },
    {
      name: 'Edit',
      icon: 'add',
      handleAction: (item: EmployeeTableDto) => {
        console.log(item);
      },
    },
    {
      name: 'delete',
      icon: 'add',
      handleAction: (item: EmployeeTableDto) => {
        alert('deleted ' + item['id']);
      },
    },
  ];

  const handleClickRow = (row: EmployeeTableDto) => {
    navigate(`/dashboard/employees/${row.id}`);
  };
  const onChangePage = (_page: number) => {
    return {};
  };

  return (
    <div className="mb-5">
      <EmployeeTable
        data={employees || []}
        uniqueCol="id"
        hide={['id']}
        actions={actions}
        handleClickRow={handleClickRow}
        onChangePage={onChangePage}
      />
    </div>
  );
}

const EmployeeTable = (props: EmployeeTableProps) => {
  const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

  return (
    <div className="px-3">
      <div className="">
        <Breadcrump title="Darbuotojai" navigation={['Personalo valdymas', 'Darbuotojai']} />
      </div>
      <div className="mt-4">
        <Table
          data={props.data}
          uniqueCol={props.uniqueCol}
          hide={props.hide}
          actions={props.actions}
          handleClickRow={props.handleClickRow}
          onChangePage={props.onChangePage}
          addNewButtonText="Registruoti naują"
          onClickAddNewButton={() => setisAddNewModalOpen(true)}
        />
      </div>

      <AddNewEmployeeModal
        handleSuccess={() => setisSuccessModalOpen(true)}
        show={isAddNewModalOpen}
        setShow={setisAddNewModalOpen}
        onHide={() => setisAddNewModalOpen(false)}
        className={'side-modal'}
      />

      <SuccessModal
        isUpdate={false}
        show={isSuccessModalOpen}
        onHide={() => setisSuccessModalOpen(false)}
        setShow={setisSuccessModalOpen}
        handleClickAddAnother={() => {
          setisSuccessModalOpen(false);
          setisAddNewModalOpen(true);
        }}
      />
    </div>
  );
};
