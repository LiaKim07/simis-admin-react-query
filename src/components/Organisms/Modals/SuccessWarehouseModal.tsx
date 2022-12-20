import '../../../styles/components/Organisms/Modal.scss';

import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { ModalProps } from '../../../types/props';
import Button from '../../Molecules/Button/Button';

interface IProps extends ModalProps {
    isUpdate?: boolean;
    text?: string;
    handleClickAddAnother?: () => void;
}

export default function SuccessWarehouseModal(props: IProps) {
    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div className="modal-content-area pt-4 pb-2">
                    <img src={'/icons/success.svg'} width={50} alt="success" />
                </div>
                <p className="text-align-center message mb-4">
                    {/* Wearhouse added
                    <span className="font-weight-bold px-2">successfully </span> */}
                    {props.text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div
                    className={`d-flex w-100 m-2`}>
                    <div className="col-12">
                        <Button
                            className={`blueish`}
                            onClick={props.onHide}>
                            Uždaryti
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
