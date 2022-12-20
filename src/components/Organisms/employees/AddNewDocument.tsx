import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';

interface IModalProps extends ModalProps {
    isUpdating?: boolean;
    handleSuccess: () => void;
}

export default function AddNewWDocument({
    setShow,
    isUpdating = false,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };

    const [values, setvalues] = useState<any>({});
    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    const handleChangeString = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };


    const handleSubmit = async () => {
        closeModal();
        resetForm();
        handleSuccess();
    };

    const resetForm = () => {
        setvalues({});
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const uploadImages = async (attachments: any) => {
        const toastId = toast.loading('Uploading ....');
        const formData = new FormData();
        const cloudinaryResponse = [];
        for (let i = 0; i < attachments.length; i++) {
            formData.append('file', attachments[i].file);
            formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
            formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
            const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            }).then(res => res.json());

            toast.success('Uploaded successfully', { id: toastId });
            cloudinaryResponse.push(response.url);
        }
        return cloudinaryResponse;
    };

    async function handleOnChange(event: any) {
        const files = event.target.files;
        let attachments: any = [];
        Object.entries(files).forEach(([key, file]: any) => {
            attachments.push({
                file,
                previewUrl: URL.createObjectURL(file),
            });
        });
        await uploadImages(attachments);
    }

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {isUpdating ? 'Update Docment' : 'New Docment'}
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
                        <Collapsible isOpen={true} title="Info">
                            <div className="p-3 row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeString}
                                        placeholder="Document name *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2" >
                                    <Input
                                        className="mr-3"
                                        type="string"
                                        name="name"
                                        handleChange={handleChangeString}
                                        placeholder="Date of expiry *"
                                        value={values.name}
                                    />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-12 p-2" >
                                    <div className="col-6">
                                        <Button className="text-capitalize b-radius light" >
                                            <label
                                                style={{ 'width': '100%', 'color': '#9E41D6' }}
                                                htmlFor="profileUrl"
                                                className=" b-radius light cursor-pointer col-6 rounded-2 text-center">
                                                <span>+ Add attachment</span>
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
                </Modal.Body >
            </Modal >
        </div >
    );
}
