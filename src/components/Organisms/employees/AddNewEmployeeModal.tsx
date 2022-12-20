import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { employeeRoleStore } from '../../../store/employee-role.store';
import { employeeStore } from '../../../store/employees.store';
import { nationalityStore } from '../../../store/nationality.store';
import { drivingLicenseStore } from '../../../store/driving-license.store';
import { employmentTermStore } from '../../../store/employment-term.store';
import { employmentTypeStore } from '../../../store/employment-type.store';
import { workingWeekStore } from '../../../store/working-week.store';

import CustomSelect from '../../Atoms/Form/Select';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateEmployee } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
interface IModalProps extends ModalProps {
  employeeId?: string;
  isUpdating?: boolean;
  handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
  tokenData = token;
}

const defaultState: ICreateEmployee = {
  profileUrl: 'https://res.cloudinary.com/jsanbderg/image/upload/v1652029488/image_odfnts.png',
  "firstName": "",
  "lastName": "",
  "phone": "",
  "email": "",
  "socialSecurityNumber": "",
  "nationalityId": "",
  "personalIdentificationNumber": "",
  "personalEmail": "",
  "personalPhone": "",
  "address": "",
  "postalCode": "",
  "city": "",
  "country": "",
  "bankCode": "",
  "bankAccountNumber": "",
  "drivingLicenseCategoryId": "",
  "isActive": true,
  "contractNumber": "",
  "employeeRoleId": "",
  "employmentTypeId": "",
  "employmentTermId": "",
  "workingWeekTypeId": "",
  "salary": '',
  "signedOn": "",
  "startOn": "",
  "endOn": "",
  "inactivatedOn": null,
  "inactivatedBy": "",
  "note": "",
  "createdBy": tokenData,
};

export default function AddNewEmployeeModal({
  setShow,
  employeeId,
  isUpdating = false,
  handleSuccess,
  ...props
}: IModalProps) {
  const closeModal = () => {
    setShow(false);
  };


  const [values, setvalues] = useState<ICreateEmployee>({ ...defaultState });
  const [data1, setData1] = useState<any>([{ id: 'id', size: 'size' }]);
  const [type1, setType1] = useState<string>('string');
  const [type2, setType2] = useState<string>('string');
  const [type3, setType3] = useState<string>('string');

  const handleChange = (e: ValueType) => {
    setvalues({ ...values, [e.name]: e.value });
  };

  const onBlurtype1 = (e: any) => {
    if (e.target.value === "") {
      setType1('string')
    }
  }

  const onBlurtype2 = (e: any) => {
    if (e.target.value === "") {
      setType2('string')
    }
  }

  const onBlurtype3 = (e: any) => {
    if (e.target.value === "") {
      setType3('string')
    }
  }

  const onFocus1 = (e: any) => {
    setType1('date')
  }

  const onFocus2 = (e: any) => {
    setType2('date')
  }

  const onFocus3 = (e: any) => {
    setType3('date')
  }

  const { data: nationalitiesData } = nationalityStore.getAll();
  const { data: drivingLincenseData } = drivingLicenseStore.getAll();
  const { data: employmentTerms } = employmentTermStore.getAll();
  const { data: employmentTypes } = employmentTypeStore.getAll();
  const { data: workingWeekType } = workingWeekStore.getAll();
  let nationalities: any = [];
  if (nationalitiesData) {
    nationalities = nationalitiesData?.data?.result;
  }
  let drivingLicenses: any = [];
  if (drivingLincenseData) {
    drivingLicenses = drivingLincenseData?.data?.result;
  }
  let workingWeeks: any = [];
  const { data: employee } = employeeStore.getById(employeeId);
  const { data: employeeRoles } = employeeRoleStore.getAll();

  const { mutateAsync } = employeeStore.createEmployee();
  const { mutateAsync: updateMutation } = employeeStore.updateEmployee();

  useEffect(() => {
    if (employee?.data) {
      setvalues((prev) => ({
        ...prev,
        profileUrl: employee.data?.result.profileUrl || '',
        firstName: employee.data?.result.firstName,
        contractNumber: employee.data?.result.contractNumber,
        lastName: employee.data?.result.lastName,
        socialSecurityNumber: employee.data?.result.socialSecurityNumber,
        nationalityId: employee.data?.result.nationalityId,
        personalIdentificationNumber: employee.data?.result.personalIdentificationNumber,
        employeeRoleId: employee.data?.result.employeeRoleId,
        employmentTypeId: employee.data?.result.employmentTypeId,
        employmentTermId: employee.data?.result.employmentTermId,
        workingWeekId: employee.data?.result.workingWeekId,
        salary: employee.data?.result.salary,
        phone: employee.data?.result.phone,
        email: employee.data?.result.email,
        address: employee.data?.result.address,
        postalCode: employee.data?.result.postalCode,
        city: employee.data?.result.city,
        country: employee.data?.result.country,
        bankCode: employee.data?.result.bankCode,
        bankAccountNumber: employee.data?.result.bankAccountNumber,
        id: employee.data?.result.id,
        isActive: employee.data?.result.isActive,
        "personalEmail": employee.data?.result.personalEmail,
        "personalPhone": employee.data?.result.personalPhone,
        "drivingLicenseCategoryId": employee.data?.result.drivingLicenseCategoryId,
        "workingWeekTypeId": employee.data?.result.workingWeekTypeId,
        "signedOn": employee.data?.result.signedOn,
        "startOn": employee.data?.result.startOn,
        "endOn": employee.data?.result.endOn,
        "inactivatedOn": employee.data?.result.inactivatedOn,
        "inactivatedBy": employee.data?.result.inactivatedBy,
        "note": employee.data?.result.note,
        "createdBy": employee.data?.result.createdBy,
      }));
    }
  }, [employee?.data]);

  const handleSubmit = async () => {
    const toastId = toast.loading('Saving ....');
    if (employeeId && isUpdating) {
      let sub_data: ICreateEmployee;
      sub_data = { ...values }; console.log('submit data', values)
      updateMutation(
        { ...sub_data, id: employeeId },
        {
          async onSuccess(_data) {
            toast.success('Employee was updated successfully', { id: toastId });
            queryClient.invalidateQueries(['employeeById', employeeId]);
            closeModal();
            handleSuccess();
          },
          onError(error: any) {
            toast.error(
              error.response.data.message || 'error occurred please try again',
              { id: toastId },
            );
          },
        },
      );
    } else {
      mutateAsync(values, {
        async onSuccess(_data) {
          toast.success('Employee was created successfully', { id: toastId });
          queryClient.invalidateQueries(['employees']);
          closeModal();
          resetForm();
          handleSuccess();
        },
        onError(error: any) {
          toast.error(error.response.data.message || 'error occurred please try again', {
            id: toastId,
          });
        },
      });
    }
  };

  const uploadImages = async (attachments: any) => {
    const formData = new FormData();
    const cloudinaryResponse = [];
    for (let i = 0; i < attachments.length; i++) {
      formData.append('file', attachments[i].file);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
      cloudinaryResponse.push(response.url);
      setvalues({ ...values, profileUrl: response.url });
    }
    return cloudinaryResponse;
  };

  async function handleOnChange(event: any) {
    const files = event.target.files;
    let attachments: any = [];
    Object.entries(files).forEach(([key, file]: any) => {
      attachments.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });
    await uploadImages(attachments);
  }

  const resetForm = () => {
    setvalues({ ...defaultState });
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  return (
    <div className="side-modal">
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div className="body-header p-4 mb-2 d-flex justify-content-between">
            <Heading fontWeight="bold" fontSize="xl">
              {isUpdating ? 'Esamo darbuotojo duomenų keitimas' : 'Naujo darbuotojo registravimas'}
            </Heading>
            <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
              <span className="close-txt font-bold text-capitalize tracking-0">
                Uždaryti
              </span>
              <img
                src={'/icons/close-icon.svg'}
                className="cursor-pointer"
                width={30}
                alt="close-icon"
              />
            </button>
          </div>
          <div className="body-content px-4">
            <Collapsible isOpen={true} title="Duomenys">
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <div className="profile-pic w-20 h-20">
                    <label
                      htmlFor="profileUrl"
                      className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                      <Icon name="plus" size={28} />
                      <p className="text-xxs">Pridėti nuotrauką</p>
                      <img
                        src={values.profileUrl ? values.profileUrl : '/icons/prev-img.svg'}
                        className={`rounded-profile w-20 h-20 position-relative ${values.profileUrl ? '' : 'opacity-0'}`}
                        style={{ 'right': '9px', 'bottom': '98px' }}
                        alt="avatar"
                      />
                    </label>
                  </div>
                  <input
                    onChange={handleOnChange}
                    type="file"
                    accept="image/png, image/jpeg"
                    name="profileUrl"
                    id="profileUrl"
                    hidden
                  />

                  <div className="profile-info w-100 row px-3">
                    {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        name="personalEmail"
                        handleChange={handleChange}
                        placeholder="Grafiko Nr. *"
                        value={values.personalEmail}
                      />
                    </div> */}
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        className="mr-3"
                        name="contractNumber"
                        handleChange={handleChange}
                        placeholder="Sutarties Nr. *"
                        value={values.contractNumber}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        name="socialSecurityNumber"
                        handleChange={handleChange}
                        placeholder="Sodros Nr."
                        value={values.socialSecurityNumber}
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <CustomSelect
                        name="nationalityId"
                        handleChange={handleChange}
                        placeholder="Pilietybė *"
                        value={values.nationalityId}
                        options={
                          nationalities.map((n: any) => ({
                            value: n.id,
                            label: n.name,
                          })) as SelectData[]
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="personalIdentificationNumber"
                      handleChange={handleChange}
                      placeholder="Asmens kodas *"
                      value={values.personalIdentificationNumber}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="firstName"
                      handleChange={handleChange}
                      placeholder="Vardas *"
                      value={values.firstName}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="lastName"
                      handleChange={handleChange}
                      placeholder="Parvardė *"
                      value={values.lastName}
                    />
                  </div>
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Darbo sąlygos">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employeeRoleId"
                    handleChange={handleChange}
                    placeholder="Pareigos *"
                    value={values.employeeRoleId}
                    options={
                      typeof (employeeRoles?.data) !== 'string' ?
                        employeeRoles?.data?.result.map((n: any) => ({
                          value: n.id,
                          label: n.name,
                        })) as SelectData[] :
                        [{ id: '', name: '' }].map((n) => ({
                          value: n.id,
                          label: n.name,
                        })) as SelectData[]
                    }
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                  <Input
                    className="mr-3"
                    type={type1}
                    onFocus={onFocus1}
                    onBlur={onBlurtype1}
                    name="signedOn"
                    handleChange={handleChange}
                    placeholder="Įdarbinimo data *"
                    value={values.signedOn}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="startOn"
                    type={type2}
                    onFocus={onFocus2}
                    onBlur={onBlurtype2}
                    handleChange={handleChange}
                    placeholder="Pirmoji darbo diena *"
                    value={values.startOn}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="endOn"
                    type={type3}
                    onFocus={onFocus3}
                    onBlur={onBlurtype3}
                    handleChange={handleChange}
                    placeholder="Paskutinė darbo diena"
                    value={values.endOn}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employmentTermId"
                    handleChange={handleChange}
                    placeholder="Sutarties tipas *"
                    value={values.employmentTermId}
                    options={
                      employmentTerms?.data?.result.map((n: any) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employmentTypeId"
                    handleChange={handleChange}
                    placeholder="Etatas *"
                    value={values.employmentTypeId}
                    options={
                      employmentTypes?.data?.result.map((n: any) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="workingWeekTypeId"
                    handleChange={handleChange}
                    placeholder="Darbo savaitė *"
                    value={values.workingWeekTypeId}
                    options={
                      workingWeekType?.data?.result?.map((n: any) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="salary"
                    type="number"
                    handleChange={handleChange}
                    placeholder="Atlyginimas"
                    value={values.salary}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Kontaktiniai duomenys">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    name="phone"
                    type="tel"
                    handleChange={handleChange}
                    placeholder="Telefonas *"
                    value={values.phone}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    className="mr-3"
                    name="email"
                    handleChange={handleChange}
                    placeholder="El. paštas *"
                    value={values.email}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    className="mr-3"
                    name="personalEmail"
                    type="email"
                    handleChange={handleChange}
                    placeholder="Asmieninis paštas"
                    value={values.personalEmail}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    type="tel"
                    className="mr-3"
                    name="personalPhone"
                    handleChange={handleChange}
                    placeholder="Asmeninis telefonas"
                    value={values.personalPhone}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Gyvenamoji vieta">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="address"
                    handleChange={handleChange}
                    placeholder="Adresas"
                    value={values.address}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    className="mr-3"
                    name="postalCode"
                    handleChange={handleChange}
                    placeholder="Pašto kodas"
                    value={values.postalCode}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="city"
                    handleChange={handleChange}
                    placeholder="Miestas"
                    value={values.city}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="country"
                    handleChange={handleChange}
                    placeholder="Valstybė"
                    value={values.country}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Banko rekvizitai">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="bankCode"
                    handleChange={handleChange}
                    placeholder="Banko rekvizitai"
                    value={values.bankCode}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    className="mr-3"
                    name="bankAccountNumber"
                    handleChange={handleChange}
                    placeholder="Sąskaitos numeris"
                    value={values.bankAccountNumber}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Vairuotojo pazymejimas">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    className="mr-3"
                    name="drivingLicenseCategoryId"
                    handleChange={handleChange}
                    placeholder="Kategorija"
                    value={values.drivingLicenseCategoryId}
                    options={
                      drivingLicenses?.map((n: any) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>
              </div>
            </Collapsible>
            {/* <Collapsible isOpen={true} title="Avalynės ir drabužių dydžiai">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2 d-flex flex-wrap gap-2">
                  {Object.keys(clothings).map((item) => (
                    <CustomSelect
                      key={item}
                      name={`clothings.${item}`}
                      handleChange={handleChangeClothing}
                      placeholder={item}
                      value={isUpdating && data1.find((ditem: { id: string; }) => clothings[item].find(citem => citem.id === ditem.id) !== undefined)?.id}
                      options={
                        clothings[item]?.map((n) => ({
                          value: n.id,
                          label: n.size,
                        })) as SelectData[]
                      }
                    />
                  ))}
                </div>
              </div>
            </Collapsible> */}
            <Collapsible isOpen={true} title="Kita info">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2">
                  <Input
                    name="note"
                    handleChange={handleChange}
                    placeholder="Kita info"
                    value={values.note}
                  />
                </div>
              </div>
            </Collapsible>
          </div>
          <div className="body-modal-footer row px-4">
            <div className="col-3 mr-2">
              <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                <Icon name="save" />
                <span>&nbsp;Išsaugoti</span>
              </Button>
            </div>
            <div className="col-3">
              <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                Atšaukti
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
