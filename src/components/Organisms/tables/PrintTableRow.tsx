import "../../../styles/components/Organisms/Table.scss";
import React, { useState } from 'react';
import Icon from "../../Atoms/Icon";
import Switch from "../../Atoms/Form/SwitchNormal";
import PrintModalForm from "../../Organisms/employees/PrintFrom";
import PrintModal from "../../Organisms/employees/PrintDismiss";
import SuccessModal from '../../Organisms/Modals/SuccessModal';

interface TableRowProps<T> {
    row: any;
    subdata: any;
    indexData: any;
    dismiss?: boolean;
};

export default function TableRow<T>({ row, indexData, subdata, dismiss }: TableRowProps<T>) {
    const [open, setOpen] = useState(row.active);
    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    return (
        <>
            <td>
                {
                    typeof row[indexData] === "boolean" && <Icon
                        name={"doc"}
                        styles={{ marginLeft: "5px" }}
                        size={35}
                    />
                }
            </td>
            <td className="text-xs px-2">
                {/* @ts-ignore */}
                {typeof row[indexData] !== "boolean" ? (
                    row[indexData]
                ) : (
                    <></>
                )}
            </td>
            <td>
                {
                    typeof row[indexData] === "boolean" && <Icon
                        className="svg_hover"
                        name={"copy"}
                        styles={{ marginLeft: "5px" }}
                        size={35}
                        onClickAddNewButton={() => { open && setisAddNewModalOpen(true), open && setIsShow(true) }} />
                }
            </td>
            <td>
                {
                    typeof row[indexData] === "boolean" &&
                    <Switch checked={open} onClick={() => setOpen(!open)} title="" />
                }
            </td>
            {dismiss ?
                <PrintModal
                    handleSuccess={() => setisSuccessModalOpen(true)}
                    show={isAddNewModalOpen}
                    setShow={setisAddNewModalOpen}
                    className={'side-modal'}
                    testdata={row.Name}
                    subdata={subdata}
                    setPrintShow={setIsShow}
                    onHide={() => { setisAddNewModalOpen(false), setIsShow(false) }}
                    isShow={isShow}
                /> :
                <PrintModalForm
                    handleSuccess={() => setisSuccessModalOpen(true)}
                    show={isAddNewModalOpen}
                    setPrintShow={setIsShow}
                    setShow={setisAddNewModalOpen}
                    onHide={() => { setisAddNewModalOpen(false), setIsShow(false) }}
                    className={'side-modal'}
                    isShow={isShow}
                    testdata={row.Name}
                    subdata={subdata}
                />
            }

            <SuccessModal
                show={isSuccessModalOpen}
                onHide={() => setisSuccessModalOpen(false)}
                setShow={setisSuccessModalOpen}
                handleClickAddAnother={() => {
                    setisSuccessModalOpen(false);
                    setisAddNewModalOpen(true);
                }}
            />
        </>
    )
}
