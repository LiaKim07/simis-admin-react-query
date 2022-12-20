import "../../../styles/components/Organisms/Table.scss";
import React, { useState, useEffect } from 'react';
import Icon from "../../Atoms/Icon";
import SubTable from './SubTable';
import { TableActionsType } from "../../../types/props";
import AddNewAttachmentModal from "../project/AddNewAttachment";

interface TableRowProps<T> {
    row: any;
    index: number;
    showNumbering: boolean;
    hide: any[];
    handleClickRow?: (_row: any) => void;
    showIcon: boolean;
    isArray?: boolean;
    isSubOpen?: boolean;
    uniqueCol: keyof T;
    subhide: any[];
    actions?: TableActionsType<T>[];

};

export default function TableRow<T>({ row, index, showNumbering, hide, handleClickRow, showIcon, uniqueCol, subhide, isArray, isSubOpen }: TableRowProps<T>) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (isSubOpen) {
            setOpen(true);
        }
    }, [isSubOpen]);
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [modalDala, setModalData] = useState('');
    const [isShow, setIsShow] = useState<boolean>(false);
    const handleClickRows = (row: any) => {
        if (isArray) {
            setModalData(row);
            setIsShow(true);
            setisAddNewModalOpen(true);
        }
    };
    return (
        <>
            {!row.subData && <tr
                className="contentrows align-middle"
                style={row.Statusas ? { background: "linear-gradient(135deg, rgb(66, 230, 149) 0%, rgb(59, 178, 184) 100%)" } : row.activated === 2 ? { background: "linear-gradient(135deg, rgb(250, 217, 97) 0%, rgb(247, 107, 28) 100%)" } : { background: "linear-gradient(135deg, rgb(245, 78, 162) 0%, rgb(255, 118, 118) 100%)" }}
            >
                {showNumbering && <td className="text-xs">{index + 1}</td>}
                {Object.keys(row)
                    .filter((key) => !hide.includes(key as keyof T))
                    .map((key) => (
                        <td key={key} className="text-xs px-2" onClick={() => handleClickRow && handleClickRow(row)}>
                            {/* @ts-ignore */}
                            {typeof row[key] !== "boolean" ? (
                                row[key]
                            ) : (
                                row[key] ? <span>
                                    <span
                                        className={
                                            row[key] ? "circle-success" : "circle-fail"
                                        }
                                    ></span>
                                    <span>
                                        Aktyvus
                                    </span>
                                </span> :
                                    <span>
                                        <span
                                            className={
                                                row[key] ? "circle-success" : "circle-fail"
                                            }
                                        ></span>
                                        <span>Neaktyvus</span>
                                    </span>
                            )}
                        </td>
                    ))}
                {
                    !isSubOpen && showIcon && <th>
                        <button className="btn w-auto" onClick={() => setOpen(!open)}>
                            <Icon name={open ? 'arrow-up-black' : 'arrow-down-dark'} size={20} />
                        </button>
                    </th>
                }
            </tr>}
            {open ? (
                <tr>
                    <td className="subtableTd" colSpan={Object.keys(row)
                        .filter((key) => !hide.includes(key as keyof T)).length + 2}>
                        <div id="subtable" className="">
                            <SubTable
                                data={row.subData}
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
        </>
    )
}
