import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { clientsStore } from '../../../store/clients.store';
import { customerSettings } from '../../../store/customer-settings.store';
import { customerContacts } from '../../../store/customer-contacts.store';
import { ValueType, SelectData } from '../../../types';
import { ModalProps } from '../../../types/props';
import { ICreateClient } from '../../../types/interface';
import Input from '../../Atoms/Form/Input';
import Textarea from '../../Atoms/Form/Textarea';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import AddNewContractModal from '../clients/AddNewContractModal';
import AddNewPeopleModal from '../clients/AddNewPeopleModal';
import SuccessModal from '../../../components/Organisms/Modals/SuccessModal';
import SuccessPeopleModal from '../../../components/Organisms/Modals/SuccessModal';
import { v4 as uuidv4 } from 'uuid';
// const idData = uuidv4();

interface IModalProps extends ModalProps {
    clientsId?: any;
    isUpdating?: boolean;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: ICreateClient = {
    "name": '',
    "number": '',
    "vatNumber": '',
    "address": '',
    "postalCode": '',
    "city": '',
    "country": '',
    "phone": '',
    "email": '',
    "website": '',
    "payee": '',
    "bankName": '',
    "bankCode": '',
    "bankAccount": '',
    "managerId": '',
    "isActive": true,
    "customerTypeId": '',
    "customerStatusId": '',
    "customerSolvencyId": '',
    "note": '',
    "createdBy": tokenData,
    "companyTypePrefix": "",
    "noteForRentOrders": '',
    "noteForReturnOrders": '',
    "noteForAgreementAnnex": '',
};

export default function AddNewClientsModal({
    setShow,
    clientsId,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };
    const [values, setvalues] = useState<ICreateClient>({ ...defaultState });
    const [isAddNewContractModalOpen, setisAddNewContractModalOpen] = useState(false);
    const [isAddNewPeopleModalOpen, setisAddNewPeopleModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isSuccessPeopleModalOpen, setisSuccessPeopleModalOpen] = useState(false);
    const [contractdata, setContractdata] = useState('');
    const [peopledata, setPeopledata] = useState('');

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
        // setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };


    const { data: typeData } = customerSettings.fetchType();
    const { data: statusData } = customerSettings.fetchStatus();
    const { data: solvencyData } = customerSettings.fetchSolvency();
    const { data: customerContreact } = customerContacts.getAll();

    const { mutateAsync } = clientsStore.createClients();
    const { mutateAsync: updateMutation } = clientsStore.updateClients();
    const { data: clients } = clientsStore.getById(clientsId);

    // let customertypesData: any = [];
    // let customersolvenciesData: any = [];
    let customerstatusesData: any = [];
    // let paymentmethodsData: any = [];

    let statuseData = '';
    if (clients) {
        if (customerstatusesData) {
            for (const clientdata of customerstatusesData) {
                if (clients.data.customerStatusId === clientdata.id) {
                    statuseData = clientdata.name;
                }
            }
        }
    }

    useEffect(() => {
        if (clients?.data) {
            setvalues((prev) => ({
                ...prev,
                name: clients.data.result.name,
                number: clients.data.result.number,
                vatNumber: clients.data.result.vatNumber,
                address: clients.data.result.address,
                postalCode: clients.data.result.postalCode,
                city: clients.data.result.city,
                country: clients.data.result.country,
                phone: clients.data.result.phone,
                email: clients.data.result.email,
                website: clients.data.result.website,
                payee: clients.data.result.payee,
                bankName: clients.data.result.bankName,
                bankCode: clients.data.result.bankCode,
                bankAccount: clients.data.result.bankAccount,
                isActive: clients.data.result.isActive,
                managerId: clients.data.result.managerId,
                note: clients.data.result.note,
                createdBy: clients.data.result.createdBy,
                customerTypeId: clients.data.result.customerTypeId,
                customerStatusId: clients.data.result.customerStatusId,
                customerSolvencyId: clients.data.result.customerSolvencyId,
                companyTypePrefix: clients.data.result.companyTypePrefix,
                "noteForRentOrders": clients.data.result.noteForRentOrders,
                "noteForReturnOrders": clients.data.result.noteForReturnOrders,
                "noteForAgreementAnnex": clients.data.result.noteForAgreementAnnex,
            }));
        }
    }, [clients]);

    useEffect(() => {
        queryClient.invalidateQueries(['contract']);
    }, [contractdata]);

    const handleSubmit = async () => {
        const toastId = toast.loading('Saving ....');
        if (clientsId && isUpdating) {
            updateMutation(
                { ...values, id: clientsId },
                {
                    async onSuccess(_data) {
                        toast.success('ProductType was updated successfully', { id: toastId });
                        queryClient.invalidateQueries(['clientById', clientsId]);
                        queryClient.invalidateQueries(['clients']);
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
                    toast.success('ProductType was created successfully', { id: toastId });
                    queryClient.invalidateQueries(['clients']);
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

    let managerData: any = [];
    customerContreact?.data?.result.map((item: any) => {
        if (item.customerId === clientsId) {
            managerData.push(item);
        }
    })

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Atnaujinti kliento informaciją' : 'New Client'}
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
                        <Collapsible isOpen={true} title="Informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChange}
                                        placeholder="Pavadinimas *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="companyTypePrefix"
                                        handleChange={handleChange}
                                        placeholder="Teisinė forma"
                                        value={values.companyTypePrefix}
                                    />
                                </div>
                            </div>

                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="address"
                                        handleChange={handleChange}
                                        placeholder="Adresas *"
                                        value={values.address}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="city"
                                        handleChange={handleChange}
                                        placeholder="Miestas"
                                        value={values.city}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="postalCode"
                                        handleChange={handleChange}
                                        placeholder="Pašto kodas"
                                        value={values.postalCode}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="number"
                                        handleChange={handleChange}
                                        placeholder="Įmonės kodas"
                                        value={values.number}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="phone"
                                        handleChange={handleChange}
                                        placeholder="Telefonas *"
                                        value={values.phone}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="vatNumber"
                                        handleChange={handleChange}
                                        placeholder="PVM kodas"
                                        value={values.vatNumber}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="email"
                                        handleChange={handleChange}
                                        placeholder="El. paštas *"
                                        value={values.email}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerTypeId"
                                        handleChange={handleChange}
                                        placeholder="Tipas "
                                        value={values.customerTypeId}
                                        options={
                                            typeData?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="website"
                                        handleChange={handleChange}
                                        placeholder="Internetinis puslapis"
                                        value={values.website}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerSolvencyId"
                                        handleChange={handleChange}
                                        placeholder="Mokėjimas "
                                        value={values.customerSolvencyId}
                                        options={
                                            solvencyData?.data?.result?.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <CustomSelect
                                        name="customerStatusId"
                                        handleChange={handleChange}
                                        placeholder="Statusas "
                                        value={values.customerStatusId}
                                        options={
                                            statusData?.data?.result.map((n: any) => ({
                                                value: n.id,
                                                label: n.name,
                                            })) as SelectData[]
                                        }
                                    />
                                </div>
                            </div>

                        </Collapsible>
                        {
                            isUpdating && (
                                <Collapsible isOpen={true} title="Vadovas">
                                    <div className="p-3 row">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                            <CustomSelect
                                                name="managerId"
                                                handleChange={handleChange}
                                                placeholder="Vadovas "
                                                value={values.managerId}
                                                options={
                                                    managerData?.map((n: any) => ({
                                                        value: n.id,
                                                        label: n.firstName + " " + n.lastName,
                                                    })) as SelectData[]
                                                }
                                            />
                                        </div>
                                    </div>
                                </Collapsible>
                            )
                        }
                        <Collapsible isOpen={true} title="Mokėjimo informacija">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="payee"
                                        handleChange={handleChange}
                                        placeholder="Mokėtojas *"
                                        value={values.payee}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="bankAccount"
                                        handleChange={handleChange}
                                        placeholder="Banko paskyra *"
                                        value={values.bankAccount}
                                    />
                                </div>
                            </div>
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="bankName"
                                        handleChange={handleChange}
                                        placeholder="Banko pavadinimas"
                                        value={values.bankName}
                                    />
                                </div>
                                {/* <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="noteForRentOrders"
                                        handleChange={handleChange}
                                        placeholder="noteForRentOrders"
                                        value={values.noteForRentOrders}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="noteForReturnOrders"
                                        handleChange={handleChange}
                                        placeholder="noteForReturnOrders"
                                        value={values.noteForReturnOrders}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="noteForAgreementAnnex"
                                        handleChange={handleChange}
                                        placeholder="noteForAgreementAnnex"
                                        value={values.noteForAgreementAnnex}
                                    />
                                </div> */}
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

            <AddNewContractModal
                handleSuccessContract={(data_p: any) => setContractdata(data_p)}
                show={isAddNewContractModalOpen}
                setShow={setisAddNewContractModalOpen}
                onHide={() => setisAddNewContractModalOpen(false)}
                className={'side-modal'}
                idData={clientsId}
            />

            <SuccessModal
                isUpdate={false}
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessModalOpen(false);
                    setisAddNewContractModalOpen(true);
                }}
            />

            <AddNewPeopleModal
                handleSuccessPeople={(data_p: any) => setPeopledata(data_p)}
                show={isAddNewPeopleModalOpen}
                setShow={setisAddNewPeopleModalOpen}
                onHide={() => setisAddNewPeopleModalOpen(false)}
                className={'side-modal'}
                idData={clientsId}
            />

            <SuccessPeopleModal
                isUpdate={false}
                show={isSuccessPeopleModalOpen}
                onHide={() => setisSuccessPeopleModalOpen(false)}
                setShow={setisSuccessPeopleModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessPeopleModalOpen(false);
                    setisAddNewPeopleModalOpen(true);
                }}
            />
        </div>
    );
}
