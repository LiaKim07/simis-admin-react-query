import React, { useState } from "react";
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { useNavigate } from 'react-router-dom';
import { ClientsDto } from "../../../types/services/clients.type";

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewClientsModal from "./AddNewClientsModal";
import RemoveModal from "../Modals/RemoveConfirmModal";
import { customerAgreements } from '../../../store/cutomer-agreement.store';
import { clientsStore } from "../../../store/clients.store";
import { customertypesStore } from "../../../store/customer-types.store";
import { customersolvenciesStore } from "../../../store/customer-solvencies.store";
import { customerstatusesStore } from "../../../store/customer-statuses.store";
import { customerContacts } from "../../../store/customer-contacts.store";
import { customerSettings } from "../../../store/customer-settings.store";
import { companyContacts } from '../../../store/company-contacts.store';
import { userStore } from '../../../store/user.store';

export default function ClientsInfo(props: { clients: any }) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const navigate = useNavigate();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const { data: customeragreementsData } = customerAgreements.getAll();
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const { mutateAsync } = clientsStore.removeById();
    const { data: customerType } = customertypesStore.getAll();
    const { data: customerSolvency } = customersolvenciesStore.getAll();
    const { data: customerStatus } = customerstatusesStore.getAll();
    const { data: customerContact } = customerContacts.getAll();
    const { data: customerSetting } = customerSettings.fetchAll();
    const { data: companyContracts } = companyContacts.getAll();
    // const { data: user } = userStore.getAll();
    // const { data: getUserData } = userStore.getById(user?.data?.result[0]?.id);
    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }

    const handleClickConfirm = async () => {
        const toastId = toast.loading('Saving ....');
        mutateAsync(props.clients.id, {
            async onSuccess(_data) {
                toast.success('Employee was created successfully', { id: toastId });
                queryClient.invalidateQueries(['employees-roles']);
                navigate(`/dashboard/customers`);
            },
            onError(error: any) {
                toast.error(error.response.data.message || 'error occurred please try again', {
                    id: toastId,
                });
            },
        });
        setIsRemoveModalOpen(false);
    };
    const customeData: any = customeragreementsData?.data;
    let clientsInfo = {};
    let contractInfo = {};
    let managerInfo = {};
    let finannceInfo = {};
    let discountsInfo = {};
    let typeData: string = '';
    let statusData: string = '';
    let solvencyData: string = '';
    if (props.clients) {
        customerType?.data?.result.map((item: any) => {
            if (item.id === props.clients?.customerTypeId) {
                typeData = item.name;
            }
        })
        customerSolvency?.data?.result.map((item: any) => {
            if (item.id === props.clients?.customerSolvencyId) {
                statusData = item.name;
            }
        })
        customerStatus?.data?.result.map((item: any) => {
            if (item.id === props.clients?.customerStatusId) {
                solvencyData = item.name;
            }
        })
        let createdByData: string = '';
        if (tokenData === "9196bf5d-aef0-4d36-a604-45e396ca69da") {
            createdByData = "Sistemos administratorius";
        } else {
            companyContracts?.data?.result.map((item: any) => {
                if (item.id === userData?.data?.data?.result.companyContactId) {
                    createdByData = item.firstName + ' ' + item.lastName;
                }
            })
        }
        clientsInfo = {
            "Pavadinimas": props.clients?.name,
            "Įmonės kodas": props.clients?.number,
            "PVM kodas": props.clients?.vatNumber,
            "Adresas": props.clients?.address,
            "Miestas": props.clients?.city,
            "Pašto kodas": props.clients?.postalCode,
            "Telefonas": props.clients?.phone,
            "Statusas": statusData,
            "Elektroninis paštas": props.clients?.email,
            "Internetinis puslapis": props.clients?.website,
            "Tipas": typeData,
            "Mokumas": solvencyData,
            // "noteForRentOrders": props.clients?.noteForRentOrders,
            // "noteForReturnOrders": props.clients?.noteForReturnOrders,
            // "noteForAgreementAnnex": props.clients?.noteForAgreementAnnex,
        }

        customeragreementsData?.data?.result.map((item: any) => {
            if (item.customerId === props.clients?.id) {
                let dueTerm: string = '';
                let agreementTermination: string = '';
                customerSetting?.data?.result.map((setting: any) => {
                    if (item.customerPaymentDueTermId === setting.id) {
                        dueTerm = setting.name;
                    }
                    if (item.customerAgreementTerminationTermId === setting.id) {
                        agreementTermination = setting.name;
                    }
                })

                contractInfo = {
                    "Sutarties numeris": item.prefix + ' ' + item.number,
                    "Pasirašymo data": item.createdOn,
                    // "Mokėjimo terminai (d)": dueTerm,
                    // "Nutraukimo pranešimas": agreementTermination,
                    // "Pranešimas apie nutraukimą": item.validUntil,
                    // "Sudaryta": customeData?.paymentTerm,
                    "Pasirašyta": createdByData,
                }

                finannceInfo = {
                    "Mokėtojas": props.clients.payee,
                    // "Mokėjimo būdas": dueTerm,
                    "Sąskaita": props.clients.bankAccount,
                    "Maksimali skola €": item.maxOrderValue,
                    // "Skolos terminas (mėnesiais)": props.clients.creditTerm,
                    "Skola": item.advancedPaymentAmount,
                }
            }
        })

        customerContact?.data?.result.map((item: any) => {
            if (item.customerId === props.clients?.id) {
                managerInfo = {
                    "Vardas": item.firstName,
                    "Pavardė": item.lastName,
                    "Telefonas": item.phone,
                    "Elektroninis paštas": item.email,
                }
            }
        })

        // discountsInfo = {
        //     "Antkainis %": props.clients.margin,
        //     "Duolaida %": props.clients.discount,
        // }
    }

    return (
        <React.Fragment>
            {props.clients ? (
                <div className="py-4 px-5 bg-white">
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
                                onClick={() => setIsRemoveModalOpen(true)}
                            >
                                Ištrinti
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Informacija" data={clientsInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Sutartis" data={contractInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Vadovas" data={managerInfo} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Details title="Finansai" data={finannceInfo} />
                        </div>
                        {/* <div className="col-12 col-md-6">
                            <Details title="Kaina" data={discountsInfo} />
                        </div> */}
                    </div>

                    <AddNewClientsModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        clientsId={props.clients.id}
                        isUpdating={true}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
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
