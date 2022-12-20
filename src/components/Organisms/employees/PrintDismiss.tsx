import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { PrintModalProps } from '../../../types/tableProps/table.props';
import Heading from '../../Atoms/Heading';
import { useReactToPrint } from "react-to-print";
import AggrementContent from "./ModalContents/Dismiss/AggrementContent";
import ReqContent from "./ModalContents/Dismiss/ReqContent";
import ReleaseContent from "./ModalContents/Dismiss/ReleaseContent";
import BailiffContent from "./ModalContents/Dismiss/BailiffContent";
import DismissOrderContent from "./ModalContents/Dismiss/DismissOrderContent";
import PrintComponent from "./ModalContents/Dismiss/PrintComponent";

import { companyStore } from '../../../store/company.store';

interface IModalProps extends PrintModalProps {
    testdata?: any;
    subdata?: any;
    isShow?: boolean;
    isupdate?: boolean;
    handleSuccess: () => void;
}
export default function PrintDismiss({
    setShow,
    testdata,
    subdata,
    isupdate = false,
    isShow = false,
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
    const propsData = companyData?.data?.result;

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
                            testdata === "Sutikimas del atsiskaitymo" ?
                                <AggrementContent subdata={propsData} /> :
                                testdata === "Prašymas dėl atleidimo" ?
                                    <ReqContent subdata={propsData} /> :
                                    testdata === "Priedas prie sutarties_atleidimas" ?
                                        <ReleaseContent subdata={propsData} /> :
                                        testdata === "Artūro Žičkaus antstoliui" ?
                                            <BailiffContent subdata={propsData} /> :
                                            <DismissOrderContent subdata={propsData} />
                        }
                    </div>
                </Modal.Body>
            </Modal>

            <PrintComponent
                show={isShow}
                setShow={() => { }}
                setPrintShow={() => { }}
                onHide={() => props.onHide}
                className={props.className}
                testdata={testdata}
                subdata={propsData}
                ref={componentRef}
            />
        </div>
    );
}
