import '../../../styles/components/Organisms/Modal.scss';

import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { ModalProps } from '../../../types/props';
import Button from '../../Molecules/Button/Button';

interface IProps extends ModalProps {
  isUpdate?: boolean;
  handleClickAddAnother?: () => void;
}

export default function SuccessModal(props: IProps) {
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="modal-content-area pt-4 pb-2">
          <img src={'/icons/success.svg'} width={50} alt="success" />
        </div>
        <p className="text-align-center message mb-4">
          Darbuotojas {props.isUpdate ? 'atnaujinta' : 'pridėtas'}
          <span className="font-weight-bold px-2">sėkmingai </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div
          className={`d-flex w-100 m-0 ${
            props.isUpdate ? 'justify-content-center' : ''
          }`}>
          {!props.isUpdate && (
            <div className="col-6">
              <Button
                className={'whitish curved-border-left'}
                onClick={() =>
                  props.handleClickAddAnother && props.handleClickAddAnother()
                }>
                Kurti naują
              </Button>
            </div>
          )}
          <div className="col-6">
            <Button
              className={`blueish ${props.isUpdate ? '' : 'curved-border-right'}`}
              onClick={props.onHide}>
              Uždaryti
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
