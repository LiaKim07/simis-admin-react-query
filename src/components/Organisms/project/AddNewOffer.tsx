import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { employeeStore } from '../../../store/employees.store';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import CustomSelect from '../../Atoms/Form/Select';
import Textarea from '../../Atoms/Form/Textarea';
import { SelectData, ValueType } from '../../../types';
import Collapsible from '../../Molecules/Modal/Collapsible';
import AddNewRentOrderModal1 from "./AddNewRentOrderModal1";
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    projectOfferId?: string;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const defaultState: any = {
    id: '',
    name: '',
    plateNumber: '',
    milage: '',
    insurance: '',
    service: '',
    inspection: '',
    employeeId: '',
    type: '',
    liftingCapacity: '',
    manufactory: ''
};

export default function AddNewOffer({
    setShow,
    projectOfferId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };


    const [values, setvalues] = useState<any>({ ...defaultState });
    const [isAddNewModalOpen1, setisAddNewModalOpen1] = useState(false);

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };
    const handleChangenumber = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const offType = [
        {
            'id': 1,
            'name': 'offer1',
        },
        {
            'id': 2,
            'name': 'offer2',
        },
    ]
    const { data: employee } = employeeStore.getAll();
    let empData: any = [];
    if (employee?.data) {
        empData = employee?.data;
    }

    const handleSubmit = async () => {
        console.log('data clicked')
        // save order information data part.        
        closeModal();
        resetForm();
        setisAddNewModalOpen1(true)
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    return (
        <div className="side-modal height-0">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Offer' : 'New Offer'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
                                Close
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
                        <Collapsible isOpen={true} title="Offer information">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                                    <CustomSelect
                                        name="nationalityId"
                                        handleChange={handleChange}
                                        placeholder="Offer type"
                                        value={values.name}
                                        options={
                                            offType.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">

                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-2 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Nr *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="plateNumber"
                                        handleChange={handleChange}
                                        placeholder="Date of creation *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="type"
                                        handleChange={handleChange}
                                        placeholder="Compiler"
                                        value={values.name}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="note"
                                        handleChange={handleChange}
                                        placeholder="Additional information"
                                        value={values.name}
                                    />
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                    <div className="body-modal-footer row px-4 my-4">
                        <div className="col-3 mr-2">
                            <Button className="text-capitalize b-radius d-flex align-items-center" onClick={() => handleSubmit()}>
                                <Icon name="save" />
                                <span>&nbsp;Next</span>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <AddNewRentOrderModal1
                handleSuccess={() => console.log('')}
                show={isAddNewModalOpen1}
                setShow={setisAddNewModalOpen1}
                onHide={() => setisAddNewModalOpen1(false)}
                className={'side-modal'}
                tableType={'Offer'}
            />
        </div>
    );
}
