import React, { useState } from 'react';

import { customerSettings } from '../../../store/customer-settings.store';
import AddNewContractModal from './AddNewContractModal';
import SuccessModal from '../Modals/SuccessWarehouseModal';
import InvoicePrintModal from './PrintModal';
import Editmodal from './Editmodal';
import Table from '../../../components/Organisms/tables/Table';
import { customerAgreements } from '../../../store/cutomer-agreement.store';
import { contractTableProps, TableActionsType } from '../../../types/tableProps/table.props';
import { ContractTableDto } from '../../../types/services/contract.types';
import { ClientsDto } from "../../../types/services/clients.type";
let clientIdData: string = '';

export default function ContractInfo(props: { clients: ClientsDto }) {
    clientIdData = props.clients?.id;
    const { data: contractData } = customerAgreements.getAll();
    const { data: customerPaymentMethod } = customerSettings.fetchPaymentMethod();
    const { data: customerAgreementTerm } = customerSettings.fetchAgreementTerm();

    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isPrintOpen, setisPrintModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [agreementId, setAgreementId] = useState('');
    const [isShow, setIsShow] = useState<boolean>(false);

    const contracts: any = [];
    if (contractData) {
        for (const contractsData of contractData?.data?.result) {
            if (props.clients) {
                if (contractsData.customerId === props.clients.id) {
                    let paymentData, agreementData = '';
                    if (customerPaymentMethod) {
                        for (const paymentMethod of customerPaymentMethod.data?.result) {
                            if (paymentMethod.id === contractsData.customerPaymentMethodId) {
                                paymentData = paymentMethod.name;
                            }
                        }
                    }
                    if (customerAgreementTerm) {
                        for (const AgreementTerm of customerAgreementTerm.data?.result) {
                            if (AgreementTerm.id === contractsData.customerAgreementTerminationTermId) {
                                agreementData = AgreementTerm.name;
                            }
                        }
                    }
                    contracts.push({
                        "id": contractsData.id,
                        "Sutarties Nr.": contractsData.prefix + '-' + contractsData.number,
                        "Pasirašymo data": contractsData.createdOn,
                        // "Mokėjimo būdas": paymentData,
                        // "Pranešimas apie nutraukimą": agreementData,
                        "Maksimali užsakymų vertė": contractsData.maxOrderValue,
                        "Galioja iki": contractsData.validUntil,
                    });
                }
            }
        }
    }

    const onClickRow = (row: any) => {
        setAgreementId(row.id);
        setIsShow(true)
        setisPrintModalOpen(true);
    }

    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <div className="px-3">
                <div className="mt-4">
                    <Table
                        data={contracts || []}
                        uniqueCol="id"
                        hide={['id']}
                        handleClickRow={onClickRow}
                        onChangePage={onChangePage}
                        addNewButtonText={contracts.length === 0 ? "Registruoti naują" : "Redaguoti"}
                        onClickAddNewButton={
                            () => {
                                if (contracts.length === 0) {
                                    setisAddNewModalOpen(true);
                                } else {
                                    setIsEdit(true);
                                }
                            }
                        }
                    />
                    {/* <Table
                    /> */}
                </div>
                <AddNewContractModal
                    handleSuccessContract={() => setisSuccessModalOpen(true)}
                    show={isAddNewModalOpen}
                    setShow={setisAddNewModalOpen}
                    className={'side-modal'}
                    onHide={() => setisAddNewModalOpen(false)}
                    idData={clientIdData}
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
                <InvoicePrintModal
                    handleSuccessContract={() => { }}
                    show={isPrintOpen}
                    setShow={setisPrintModalOpen}
                    className={'side-modal-mid'}
                    onHide={() => { setisPrintModalOpen(false), setIsShow(false) }}
                    agreementId={agreementId}
                    setPrintShow={setIsShow}
                    isShow={isShow}
                />
                <Editmodal
                    handleSuccessContract={() => { }}
                    show={isEdit}
                    setShow={setIsEdit}
                    className={'side-modal-mid'}
                    onHide={() => { setIsEdit(false) }}
                    contracts={contracts[0]?.id}
                />
            </div>
        </div>
    );
}

