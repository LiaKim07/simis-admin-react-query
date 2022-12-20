import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { warehouseStore } from '../../../store/warehouse.store';
import { SelectData, ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateWarehouse } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { employeeStore } from '../../../store/employees.store';

interface IModalProps extends ModalProps {
  warehouseId?: string;
  isUpdating?: boolean;
  handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
  tokenData = token;
}

const defaultState: ICreateWarehouse = {
  "name": "",
  "address": "",
  "postalCode": "",
  "city": "",
  "country": "",
  "email": "",
  "phone": "",
  "employeeId": "",
  "createdBy": tokenData,
};

export default function AddNewWarehouseModal({
  setShow,
  warehouseId,
  isUpdating = false,
  handleSuccess,
  ...props
}: IModalProps) {
  const closeModal = () => {
    setShow(false);
  };


  const [values, setvalues] = useState<ICreateWarehouse>({ ...defaultState });

  const handleChange = (e: ValueType) => {
    setvalues({ ...values, [e.name]: e.value });
  };

  const { data: employeeData } = employeeStore.getAll();

  const { mutateAsync } = warehouseStore.createWarehouse();
  const { mutateAsync: updateMutation } = warehouseStore.updateWarehouse();
  const { data: warehouse } = warehouseStore.getById(warehouseId);

  useEffect(() => {
    if (warehouse?.data) {
      setvalues((prev) => ({
        ...prev,
        name: warehouse.data.result.name,
        address: warehouse.data.result.address,
        phone: warehouse.data.result.phone,
        email: warehouse.data.result.email,
        city: warehouse.data.result.city,
        country: warehouse.data.result.country,
        postalCode: warehouse.data.result.postalCode,
        employeeId: warehouse.data.result.employeeId,
      }));
    }
  }, [warehouse?.data]);

  const handleSubmit = async () => {
    const toastId = toast.loading('Saving ....');
    if (warehouseId && isUpdating) {
      updateMutation(
        { ...values, id: warehouseId },
        {
          async onSuccess(_data) {
            toast.success('Warehouse was updated successfully', { id: toastId });
            queryClient.invalidateQueries(['warehouseById', warehouseId]);
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
          toast.success('Warehouse was created successfully', { id: toastId });
          queryClient.invalidateQueries(['warehouses']);
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
              {isUpdating ? 'Sandėlio redagavimas' : 'Naujo sandėlio registravimas'}
            </Heading>
            <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
              <span className="close-txt font-bold text-capitalize tracking-0">
              </span>
              <img
                src={'/icons/close-icon.svg'}
                className="cursor-pointer"
                width={30}
                alt="close-icon"
              />
            </button>
          </div>
          <div className="body-content px-4 modal-border">
            <Collapsible isOpen={true} title="Bendra sandėlio informacija">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-5 col-lg-7 p-2" >
                  <Input
                    className="mr-3"
                    type="string"
                    name="name"
                    handleChange={handleChange}
                    placeholder="Sandėlio pavadinimas *"
                    value={values.name}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-7 col-lg-5 p-2" >
                  <CustomSelect
                    name="employeeId"
                    handleChange={handleChange}
                    placeholder="Atsakingas už sandėlį *"
                    value={values.employeeId}
                    options={
                      employeeData?.data?.result.map((n: any) => ({
                        value: n.id,
                        label: n.firstName + " " + n.lastName,
                      })) as SelectData[]
                    }
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                  <Input
                    className="mr-3"
                    type="string"
                    name="phone"
                    handleChange={handleChange}
                    placeholder="Telefonas"
                    value={values.phone}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                  <Input
                    className="mr-3"
                    type="string"
                    name="email"
                    handleChange={handleChange}
                    placeholder="El. paštas"
                    value={values.email}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                  <Input
                    className="mr-3"
                    type="string"
                    name="address"
                    handleChange={handleChange}
                    placeholder="Adresas"
                    value={values.address}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                  <Input
                    className="mr-3"
                    type="string"
                    name="postalCode"
                    handleChange={handleChange}
                    placeholder="Pašto"
                    value={values.postalCode}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    className="mr-3"
                    type="string"
                    name="city"
                    handleChange={handleChange}
                    placeholder="Miestas/ Gyvenvietė"
                    value={values.city}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                  <Input
                    className="mr-3"
                    type="string"
                    name="country"
                    handleChange={handleChange}
                    placeholder="Šalis"
                    value={values.country}
                  />
                </div>
              </div>
            </Collapsible>

          </div>
          <div className="body-modal-footer row px-4 my-4">
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
