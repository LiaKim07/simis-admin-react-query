import "../../../styles/components/Organisms/Table.scss";
import React, { useState, useEffect } from 'react';
import Icon from "../../Atoms/Icon";
import SubTable from './SubTable';
import { TableActionsType } from "../../../types/props";
import AddNewAttachmentModal from "../project/AddNewAttachment";

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { companyContacts } from '../../../store/company-contacts.store';
import { invoicePaymentsStore } from '../../../store/invoicePayments.store';
import EditClientSubModal from "../../../pages/sales/EditClientSubModal";
import { userStore } from '../../../store/user.store';

interface TableRowProps<T> {
    row: any;
    index: number;
    showNumbering: boolean;
    hide: any[];
    handleClickRow?: (_row: any) => void;
    showIcon: boolean;
    isArray?: boolean;
    uniqueCol: keyof T;
    subhide: any[];
    actions?: TableActionsType<T>[];

};

export default function TableRow<T>({ row, index, showNumbering, hide, handleClickRow, showIcon, uniqueCol, subhide, isArray }: TableRowProps<T>) {
    const token = localStorage.getItem('tokenId');
    let tokenData = '';
    if (token) {
        tokenData = token;
    }
    const [open, setOpen] = useState(false);
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalDala, setModalData] = useState('');
    const [subData, setSubData] = useState<any>([]);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [sendData, setSendData] = useState('');
    const [isOnclick, setIsOnclick] = useState<boolean>(false);
    const { data: companyContracts } = companyContacts.getAll();

    const { data: company } = companyContacts.getAll();
    const { data: invoicePayment } = invoicePaymentsStore.getAll();

    let userData: any = [];
    if (tokenData !== "9196bf5d-aef0-4d36-a604-45e396ca69da") {
        userData = userStore.getById(tokenData);
    }
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
    let subTableData: any = [];
    if (row.tableType === 'customer') {
        invoicePayment?.data?.result.map((item: any) => {
            if (item.invoiceId === row.id) {
                // let tempData: string = '';
                // company?.data?.result.map((company: any) => {
                //     if (company.id === item.createdBy) {
                //         tempData = company.firstName + ' ' + company.lastName;
                //     }
                // })
                subTableData.push({
                    'id': item.id,
                    'Data': item.createdOn,
                    'ĮRAŠĖ': createdByData,
                    'SUMA': item.amountPayed,
                    'tableType': 'customer',
                })
            }
        })
    } else {
        const { data: projectOrder } = projectsOrdersStore.getLastThree(row?.id as string);
        projectOrder?.data?.result.map((item: any) => {
            subTableData.push({
                'id': item.id,
                'Tipas': item.type === 'sales' ? 'Pardavimai' : item.type === 'loans' ? 'Nuoma' : item.type === 'returns' ? 'Grąžinimai' : '',
                'Pavadinimas': item.number,
                'Sukūrimo Data': item.createdOn,
                'Aktyvavimo Data': item.activatedOn,
            })
        })
    }
    // setSubData(projectOrder?.data?.result);
    const handleClickRows = (row: any) => {
        if (row.tableType === 'customer') {
            setIsOnclick(true);
            setSendData(row.id);
            setIsEditModalOpen(true);
        } else {
            if (isArray) {
                setModalData(row);
                setIsShow(true);
                setisAddNewModalOpen(true);
            }
        }
    };

    // useEffect(() => {
    // if (open) {
    //     setSubData(projectOrder?.data?.result);
    // } else {
    //     setSubData([]);
    // }
    // }, [open]);

    return (
        <>
            <tr
                className="contentrows align-middle"
                style={row?.activated || row?.isPayed || row?.projectOrderState ? { background: "linear-gradient(135deg, rgb(66, 230, 149) 0%, rgb(59, 178, 184) 100%)" } : row.activated === 2 ? { background: "linear-gradient(135deg, rgb(250, 217, 97) 0%, rgb(247, 107, 28) 100%)" } : { background: "linear-gradient(135deg, rgb(245, 78, 162) 0%, rgb(255, 118, 118) 100%)" }}
            >
                {/* {showNumbering && <td className="text-xs">{index + 1}</td>} */}
                {Object.keys(row)
                    .filter((key) => !hide.includes(key as keyof T))
                    .map((key) => (
                        <td key={key} className="text-xs px-2" onClick={() => handleClickRow && handleClickRow(row)}>
                            {/* @ts-ignore */}
                            {typeof row[key] !== "boolean" ? (
                                row[key]
                            ) : (
                                <span>
                                    <span
                                        className={
                                            row[key] ? "circle-success" : "circle-fail"
                                        }
                                    ></span>
                                    <span>Active</span>
                                </span>
                            )}
                        </td>
                    ))}
                {
                    showIcon && <th>
                        <button className="btn w-auto" onClick={() => setOpen(!open)}>
                            <Icon name={open ? 'arrow-up-black' : 'arrow-down-dark'} size={20} />
                        </button>
                    </th>
                }
            </tr>
            {open ? (
                <tr>
                    <td className="subtableTd" colSpan={Object.keys(row)
                        .filter((key) => !hide.includes(key as keyof T)).length + 2}>
                        <div id="subtable" className="">
                            <SubTable
                                data={subTableData}
                                isArray={isArray}
                                handleClickRows={handleClickRows}
                                uniqueCol={uniqueCol}
                                hide={subhide}
                                onChangePage={() => console.log('change')}
                            />
                        </div>
                    </td>
                </tr>
            ) : <></>}

            {
                isOnclick &&
                <AddNewAttachmentModal
                    handleSuccess={() => console.log('')}
                    show={isAddNewModalOpen}
                    isShow={isShow}
                    setShow={setisAddNewModalOpen}
                    setPrintShow={setIsShow}
                    onHide={() => { setisAddNewModalOpen(false), setIsShow(false) }}
                    className={'side-modal-mid'}
                    data={modalDala}
                    projectOrder={row}
                />
            }

            <EditClientSubModal
                handleSuccess={() => { }}
                show={isEditModalOpen}
                className={"side-modal"}
                setShow={setIsEditModalOpen}
                onHide={() => setIsEditModalOpen(false)}
                sendData={sendData}
                isUpdating={true}
            />
        </>
    )
}
