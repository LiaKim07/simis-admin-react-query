import '../../../styles/components/Organisms/Modal.scss';

import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { ModalProps } from '../../../types/props';
import Button from '../../Molecules/Button/Button';

interface IProps extends ModalProps {
    isUpdate?: boolean;
    handleClickConfirm?: () => void;
    handleSuccess?: () => void;
}

export default function RemoveConfirmModal(props: IProps) {
    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div className="modal-content-area pt-4 pb-2">
                    <img src={'/icons/remove.svg'} width={50} alt="success" />
                </div>
                <p className="text-align-center message mb-4">
                    Are you sure?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div
                    className={`d-flex w-100 m-0 }`}>

                    <div className="col-6">
                        <Button
                            className={'whitish curved-border-left'}
                            onClick={() =>
                                props.handleClickConfirm && props.handleClickConfirm()
                            }>
                            Yes
                        </Button>
                    </div>

                    <div className="col-6">
                        <Button
                            className={`blueish ${props.isUpdate ? '' : 'curved-border-right'}`}
                            onClick={props.onHide}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
