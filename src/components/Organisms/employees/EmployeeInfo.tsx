import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';
import { EmployeeDto } from "../../../types/services/employees.types";
import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import DismissEmployeeModal from "./DismissModal";
import AddNewEmployeeModal from "./AddNewEmployeeModal";
import { employeeStore } from '../../../store/employees.store';
import { employeeRoleStore } from '../../../store/employee-role.store';
import { nationalityStore } from '../../../store/nationality.store';
import { drivingLicenseStore } from '../../../store/driving-license.store';
import { employmentTermStore } from '../../../store/employment-term.store';
import { employmentTypeStore } from '../../../store/employment-type.store';
import { workingWeekStore } from '../../../store/working-week.store';

export default function EmployeeInfo(props: { employee: any }) {
  const navigate = useNavigate();
  const [rightModalShow, setRightModalShow] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isdismissModalOpen, setisDismissModalOpen] = useState(false);
  // const { data: employeedetailData } = employeeStore.getEmpdata();

  const { mutateAsync } = employeeStore.removeById();

  let roleData: string = '';
  let nationality: string = '';
  let termData: string = '';
  let typeData: string = '';
  let workinghourData: string = '';
  let driverlicenseData: string = '';
  const { data: nationalitiesData } = nationalityStore.getAll();
  const { data: drivingLincenseData } = drivingLicenseStore.getAll();
  const { data: employmentTerms } = employmentTermStore.getAll();
  const { data: employmentTypes } = employmentTypeStore.getAll();
  const { data: workingWeeks } = workingWeekStore.getAll();

  if (props.employee) {
    nationalitiesData?.data?.result?.map((item: any) => {
      if (item.id === props.employee.nationalityId) {
        nationality = item.name;
      }
    })
    employmentTerms?.data?.result?.map((item: any) => {
      if (item.id === props.employee.employmentTermId) {
        termData = item.name;
      }
    })
    employmentTypes?.data?.result.map((item: any) => {
      if (item.id === props.employee.employmentTypeId) {
        typeData = item.name;
      }
    })
    workingWeeks?.data?.result.map((item: any) => {
      if (item.id === props.employee.workingWeekId) {
        workinghourData = item.name;
      }
    })
    drivingLincenseData?.data?.result.map((item: any) => {
      if (item.id === props.employee.drivingLicenseCategoryId) {
        driverlicenseData = item.name;
      }
    })
  }
  const { data: employeeRoles } = employeeRoleStore.getAll();
  if (employeeRoles?.data && props.employee) {
    employeeRoles?.data?.result?.map((item: any) => {
      if (item.id === props.employee.employeeRoleId) {
        roleData = item.name;
      }
    })
  }

  const handleClickConfirm = async () => {
    const toastId = toast.loading('Saving ....');
    mutateAsync(props.employee.id, {
      async onSuccess(_data) {
        toast.success('Employee was Deleted successfully', { id: toastId });
        queryClient.invalidateQueries(['employees']);
        navigate(`/dashboard/employees`);
      },
      onError(error: any) {
        toast.error(error.response.data.message || 'error occurred please try again', {
          id: toastId,
        });
      },
    });
    setIsRemoveModalOpen(false);
  };

  let basicInfo = {},
    workingCondition = {},
    residenceInfo = {},
    drivingLicense = {},
    otherInfo = {},
    contactInfo = {};
  if (props.employee && employeeRoles) {
    basicInfo = {
      "Grafiko Nr.": props.employee?.personalEmail,
      "Sutarties Nr.": props.employee?.contractNumber,
      "Sodros Nr.": props.employee?.socialSecurityNumber,
      "Šalis": nationality,
      "Asmens kodas": props.employee?.socialSecurityNumber,
      "Darbuotojas":
        props.employee.firstName.toUpperCase() +
        " " +
        props.employee.lastName.toUpperCase(),
      "Statusas": props.employee.isActive ? "Aktyvus" : "Atleistas",
    };

    workingCondition = {
      "Pareigos": roleData,
      "Įdarbinimo pradžia": props.employee.signedOn,
      "Pirmoji darbo diena": props.employee.startOn,
      "Įdarbinimo pabaiga": props.employee.endOn,
      "Sutarties tipas": termData,
      "Etatas": typeData,
      "Darbo savaitės trukmė": props.employee.workingWeekId
        ? workinghourData
        : "Nėra duomenų",
      "Atlyginimas": `${props.employee.salary} €`,
    };

    residenceInfo = {
      Adresas: `${props.employee.address}, ${props.employee.postalCode} ${props.employee.city}, ${props.employee.country}`,
    };

    drivingLicense = {
      // Vairuotojo pažymėjimas
      Numeris: "Nėra duomenų",
      Kategorija: driverlicenseData,
    };

    contactInfo = {
      Telefonas: props.employee.phone,
      "El. paštas": props.employee.email,
      "Asmieninis paštas": props.employee.personalEmail,
      "Asmeninis telefonas": props.employee.personalPhone,
    };
  }

  return (
    <React.Fragment>
      {props.employee ? (
        <div className="py-4 px-5 bg-white">
          <div className="p-2 border d-inline-block">
            <div className="w-20 h-20 border rounded-circle text-center text-sm">
              {/* Photo placeholder */}
              <img
                src={props.employee?.profileUrl! || '/assets/images/avatar.png'}
                className="d-block w-20 h-20 rounded-circle"
                alt="Profile url"
              />
            </div>
          </div>
          <div className="action py-3 row">
            <div className="col-3 mr-3">
              <Button
                onClick={() => setRightModalShow(true)}
                className="text-capitalize b-radius"
              >
                Redaguoti
              </Button>
            </div>
            <div className="col-3 ml-3">
              <Button
                className="text-capitalize b-radius light"
                onClick={() => setisDismissModalOpen(true)}
              >
                Atleisti
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <Details title="Duomenys" data={basicInfo} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Darbo sąlygos" data={workingCondition} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Kontaktiniai duomenys" data={contactInfo} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Gyvenamoji vieta" data={residenceInfo} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Vairuotojo pažymėjimas" data={drivingLicense} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Kita info" data={otherInfo} />
            </div>
          </div>

          <AddNewEmployeeModal
            handleSuccess={() => setisSuccessModalOpen(true)}
            show={rightModalShow}
            className={"side-modal"}
            setShow={setRightModalShow}
            onHide={() => setRightModalShow(false)}
            employeeId={props.employee.id}
            isUpdating={true}
          />

          <SuccessModal
            isUpdate={true}
            show={isSuccessModalOpen}
            onHide={() => setisSuccessModalOpen(false)}
            setShow={setisSuccessModalOpen}
          />

          <DismissEmployeeModal
            handleSuccess={() => setisDismissModalOpen(true)}
            show={isdismissModalOpen}
            className={"side-modal"}
            data={props.employee}
            setShow={setisDismissModalOpen}
            onHide={() => setisDismissModalOpen(false)}
          />

          <RemoveModal
            handleClickConfirm={() => handleClickConfirm()}
            show={isRemoveModalOpen}
            onHide={() => setIsRemoveModalOpen(false)}
            setShow={setIsRemoveModalOpen}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
}
