import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ValueType } from '../../../types';
import { ModalProps } from '../../../types/props';
import Input from '../../Atoms/Form/Input';
import Heading from '../../Atoms/Heading';
import Textarea from '../../Atoms/Form/Textarea';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';
import { v4 as uuidv4 } from 'uuid';

interface IModalProps extends ModalProps {
    data?: any;
    handleSuccess: () => void;
}

export default function EditEmpContract({
    setShow,
    data,
    handleSuccess,
    ...props
}: IModalProps) {
    const closeModal = () => {
        setShow(false);
    };

    let ArrData: any = [
        {
            id: 1,
            description: 'UAB SIMI',
            subItems: [
                {
                    id: '1-1',
                    description: 'Jonas Jonaitis'
                },
                {
                    id: '1-2',
                    description: 'Address'
                }
            ]
        },
        {
            id: 2,
            description: 'SIMIS',
            subItems: [
                {
                    id: '2-1',
                    description: 'Jonas Jonaitis'
                },
            ]
        },
        {
            id: 3,
            description: 'UAB SIMIS',
            subItems: []
        },
    ]

    const [values, setvalues] = useState<any>(ArrData);
    const [clauserValue, setClauserValue] = useState<any>(ArrData);
    const [addNewClauseValue, setAddNewClauseValue] = useState<any>('');
    const [addNewSubClauseValue, setAddNewSubClauseValue] = useState<any>('');

    const handleChange = (e: ValueType, id: any) => {
        if (typeof (id) === "number") {
            let initialData = clauserValue;
            initialData[id - 1].description = e.value;
            setClauserValue([...initialData]);
        } else {
            let arr = id.split("-");
            let initialData = clauserValue;
            initialData[arr[0] - 1].subItems[arr[1] - 1].description = e.value;
            setClauserValue([...initialData]);
        }
    };

    const handleSubmit = async () => {
        closeModal();
        resetForm();
        handleSuccess();

    };

    const resetForm = () => {
        setvalues('');
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    const addNewSubClauseChange = async (e: any) => {
        setAddNewSubClauseValue(e.value);
    };

    const addNewClauseChange = async (e: any) => {
        setAddNewClauseValue(e.value);
    };

    const removeClause = async (item: any) => {
        if (typeof (item.id) === "number") {
            let initialData = clauserValue;
            initialData.map((data: any, index: number) => {
                if (data.id === item.id) {
                    initialData.splice(index, 1);
                }
            })
            setClauserValue([...initialData]);
        } else {
            let arr = item.id.split("-");
            let initialData = clauserValue;
            initialData.map((data: any, index: number) => {
                data.subItems.map((sub: any, key: number) => {
                    if (sub.id === item.id) {
                        initialData[arr[0] - 1].subItems.splice(key, 1);
                    }
                })
            })
            setClauserValue([...initialData]);
        }
    }

    const addNewSubClause = async (item: any, index: number) => {
        if (addNewSubClauseValue) {
            let iniData = clauserValue[index].subItems;
            iniData.push(
                {
                    id: index + 1 + "-" + iniData.length,
                    description: addNewSubClauseValue
                }
            )
            clauserValue[index].subItems = iniData;
            let finalData = clauserValue;
            setClauserValue(finalData);
            setAddNewSubClauseValue('');
        }
    };

    const addNewClause = async () => {
        if (addNewClauseValue) {
            let iniData = clauserValue;
            iniData.push(
                {
                    'id': clauserValue.length,
                    'description': addNewClauseValue,
                    'subItems': [],
                }
            )
            setClauserValue(iniData);
            setAddNewClauseValue('');
        }
    };

    return (
        <div className="side-modal">
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="body-header p-4 mb-2 d-flex justify-content-between">
                        <Heading fontWeight="bold" fontSize="xl">
                            {'Edit Employment contract clouses'}
                        </Heading>
                        <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
                            <span className="close-txt font-bold text-capitalize tracking-0">
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
                        <Collapsible isOpen={true} title="DATA">
                            <div className="p-3 row">
                                {clauserValue &&
                                    clauserValue.map((item: any, index: number) => (
                                        <div key={index}>
                                            <div className="col-2 col-sm-2 col-md-2 col-lg-1 p-2 d-flex align-items-center" >
                                                <p className='text-center m-0 px-1 py-2' style={{ 'border': '1px solid #E7E7E7' }}>{'Nr' + (index + 1)}</p>
                                                <div onClick={() => { removeClause(item) }}><Icon name="minus" size={26} className='sub-data-plus' /></div>
                                            </div>
                                            <div className="col-10 col-sm-10 col-md-10 col-lg-11 p-2" >
                                                <Textarea
                                                    style={{ 'background': 'white' }}
                                                    className="mr-3 textarea"
                                                    type="string"
                                                    name={"description"}
                                                    handleChange={(event) => { handleChange(event, item.id) }}
                                                    value={item.description}
                                                />
                                            </div>
                                            {
                                                item.subItems?.map((subData: any, key: number) => (
                                                    <div key={key}>
                                                        <div className="col-1 col-sm-2 col-md-2 col-lg-1 p-2" ></div>
                                                        <div className="col-1 col-sm-2 col-md-2 col-lg-1 p-2 d-flex align-items-center" >
                                                            <p className='text-center m-0 px-1 py-2' style={{ 'border': '1px solid #E7E7E7' }}>{'Nr' + (index + 1) + "." + (key + 1)}</p>
                                                            <div onClick={() => { removeClause(subData) }}><Icon name="minus" size={26} className='sub-data-plus' /></div>
                                                        </div>
                                                        <div className="col-10 col-sm-8 col-md-8 col-lg-10 p-2" >
                                                            <Textarea
                                                                style={{ 'background': 'white' }}
                                                                className="mr-3 textarea"
                                                                type="string"
                                                                name="description"
                                                                handleChange={(event) => { handleChange(event, subData.id) }}
                                                                value={subData.description}
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="col-1 col-sm-2 col-md-2 col-lg-1 p-2" ></div>
                                            <div className="col-1 col-sm-2 col-md-2 col-lg-1 p-2" onClick={() => addNewSubClause(item, index)}>
                                                <Icon name="sub-plus" size={26} className='sub-data-plus' />
                                            </div>
                                            <div className="col-10 col-sm-8 col-md-8 col-lg-10 p-2" >
                                                <Textarea
                                                    className="mr-3 textarea"
                                                    type="string"
                                                    name={'name' + index}
                                                    handleChange={addNewSubClauseChange}
                                                    placeholder='Add new sub-clause'
                                                    value={addNewSubClauseValue}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="col-2 col-sm-2 col-md-2 col-lg-1 p-2" onClick={() => addNewClause()}>
                                    <Icon name="sub-plus" size={32} className='sub-data-plus' />
                                </div>
                                <div className="col-10 col-sm-10 col-md-10 col-lg-11 p-2" >
                                    <Textarea
                                        className="mr-3 textarea"
                                        type="string"
                                        name="description"
                                        handleChange={addNewClauseChange}
                                        placeholder='Add new clause'
                                        value={addNewClauseValue}
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
