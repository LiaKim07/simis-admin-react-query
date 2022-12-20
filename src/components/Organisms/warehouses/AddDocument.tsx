import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";

import { queryClient } from '../../../plugins/react-query';
import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';

import { customAttachmentStore } from '../../../store/customAttachment.store';

interface IModalProps extends ModalProps {
    producttypeId?: string;
    isUpdating?: boolean;
    docType: string;
    handleSuccess: () => void;
}

const token = localStorage.getItem('tokenId');
let tokenData = '';
if (token) {
    tokenData = token;
}

const defaultState: any = {
    customerId: '',
    customFileName: '',
    createdBy: tokenData,
    data: ''
};

export default function AddNewWDocument({
    setShow,
    producttypeId,
    isUpdating = false,
    docType,
    handleSuccess,
    ...props
}: IModalProps) {
    const { id } = useParams();
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({ ...defaultState });
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const { mutateAsync } = customAttachmentStore.create();

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: any) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const handleSubmit = async () => {
        if (producttypeId && isUpdating) {
            closeModal();
            handleSuccess();
        } else {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const token = localStorage.getItem('jwt_info');
            if (token) {
                const toastId = toast.loading('Uploading ....');
                const jwtInfo = JSON.parse(token);
                let url: string = '';
                if (docType === 'employee') {
                    url = `https://www.simis.itvs.lt/api/v1/${docType}-attachments?attachmentType=${values.attachmentType}&${docType}Id=${id}&customFileName=${values.customFileName}&expiresOn=${values.expiresOn}&createdBy=${values.createdBy}`
                } else if (docType === 'vehicle') {
                    url = `https://www.simis.itvs.lt/api/v1/${docType}-attachments?${docType}Id=${id}&customFileName=${values.customFileName}&expiresOn=${values.expiresOn}&createdBy=${values.createdBy}`
                } else {
                    url = `https://www.simis.itvs.lt/api/v1/${docType}-attachments?${docType}Id=${id}&customFileName=${values.customFileName}&createdBy=${values.createdBy}`
                }
                fetch(url, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${jwtInfo.result?.token}`
                    },
                })
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.statusCode === 201) {
                            toast.success('Uploaded successfully', { id: toastId });
                            queryClient.invalidateQueries(['vehicleAttachment']);
                            queryClient.invalidateQueries(['customerAttachment']);
                            queryClient.invalidateQueries(['warehouseAttachment']);
                            queryClient.invalidateQueries(['employeeAttachment']);
                            closeModal();
                            resetForm();
                        } else {
                            toast.error(result.message, {
                                id: toastId,
                            });
                        }
                    })
                    .catch((error) => {
                        toast.error('error occurred please try again', {
                            id: toastId,
                        });
                    });
            }
        }
    };

    const resetForm = () => {
        setvalues({ ...defaultState });
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    async function handleOnChange(event: any) {
        setSelectedFile(event.target.files[0]);
        event.target.files[0] && setIsFilePicked(true);
    }
    const [type1, setType1] = useState<string>('string');

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('date')
    }

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Docment' : 'Naujas Dokumentas'}
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
                                        name="customFileName"
                                        handleChange={handleChangeString}
                                        placeholder="Pavadinimas"
                                        value={values.customFileName}
                                    />
                                </div>
                                {
                                    (docType === 'vehicle' || docType === 'employee') &&
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type={type1}
                                            onFocus={onFocus1}
                                            onBlur={onBlurtype1}
                                            name="expiresOn"
                                            handleChange={handleChange}
                                            placeholder="Galiojimo data"
                                            value={values.expiresOn}
                                        />
                                    </div>
                                }
                                {
                                    docType === 'employee' &&
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                        <Input
                                            className="mr-3"
                                            type={'string'}
                                            name="attachmentType"
                                            handleChange={handleChange}
                                            placeholder="Tipas"
                                            value={values.attachmentType}
                                        />
                                    </div>
                                }
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <div className="col-6">
                                        <Button className="text-capitalize b-radius light" >
                                            <label
                                                style={{ 'width': '100%', 'color': '#9E41D6' }}
                                                htmlFor="profileUrl"
                                                className=" b-radius light cursor-pointer col-6 rounded-2 text-center">
                                                <span>+ Prideti dokumenta</span>
                                            </label>
                                        </Button>
                                    </div>
                                    <input
                                        onChange={handleOnChange}
                                        type="file"
                                        accept=".pdf, .txt"
                                        name="profileUrl"
                                        id="profileUrl"
                                        hidden
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
