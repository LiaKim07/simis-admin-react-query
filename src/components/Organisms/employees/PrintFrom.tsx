import React, { useRef } from 'react';

import { Modal } from 'react-bootstrap';
import { PrintModalProps } from '../../../types/tableProps/table.props';
import Heading from '../../Atoms/Heading';
import { useReactToPrint } from "react-to-print";
import AppContent from "./ModalContents/FormGen/AppContents";
import ContractContent from "./ModalContents/FormGen/ContractContents";
import NPDContent from "./ModalContents/FormGen/NPDContents";
import ProtectionContent from "./ModalContents/FormGen/ProtectionContents";
import PrintContent from "./ModalContents/FormGen/PrintContents";

import { companyStore } from '../../../store/company.store';

interface IModalProps extends PrintModalProps {
    testdata?: any;
    subdata?: any;
    isShow?: boolean;
    isupdate?: boolean;
    handleSuccess: () => void;
}

export default function PrintForm({
    testdata,
    subdata,
    isupdate = false,
    isShow = false,
    setShow,
    setPrintShow,
    handleSuccess,
    ...props
}: IModalProps) {

    const closeModal = () => {
        setPrintShow(false);
        setShow(false);
    };

    const onPrint = () => {
        handlePrint();
    }
    const { data: companyData } = companyStore.getAll();
    let propsData: any = [];
    if (companyData?.data) {
        propsData = companyData?.data?.result;
    }

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint(
        {
            content: () => componentRef.current
        });

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-end">
                        <Heading fontWeight="bold" fontSize="xl">
                            {''}
                        </Heading>

                        <button className="close-icon btn w-auto" type="button" onClick={() => { onPrint() }}>
                            <img
                                src={'/icons/print-page.svg'}
                                className="cursor-pointer"
                                width={30}
                                alt="close-icon"
                            />
                        </button>

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
                        {
                            testdata === "Prašymas priimti į darbą" ?
                                <AppContent subdata={subdata} comapnyData={propsData} /> :
                                testdata === "Darbo sutartis" ?
                                    <ContractContent subdata={subdata} comapnyData={propsData} /> :
                                    testdata === "NPD prašymas" ?
                                        <NPDContent subdata={subdata} comapnyData={propsData} /> :
                                        <ProtectionContent subdata={subdata} comapnyData={propsData} />
                        }
                    </div>
                </Modal.Body>
            </Modal>

            <PrintContent
                show={isShow}
                setShow={() => { }}
                setPrintShow={() => { }}
                onHide={() => props.onHide}
                className={props.className}
                testdata={testdata}
                subdata={subdata}
                comapnyData={propsData}
                ref={componentRef}
            />
        </div>
    );
}
