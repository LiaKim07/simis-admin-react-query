import "../../../styles/components/Organisms/Table.scss";
import React, { useState, useEffect } from 'react';
import Icon from "../../Atoms/Icon";
import SubTable from './SubTable';
import { TableActionsType } from "../../../types/props";
import Switch from "../../Atoms/Form/Switch";

interface TableRowProps<T> {
    row: any;
    initialData: any;
    index: number;
    showNumbering: boolean;
    hide: any[];
    handleClickRow?: (_row: any, checked: any) => void;
    handleClickSwitchRow?: (_row: any, index: any) => void;
    isArray?: boolean;
    actions?: TableActionsType<T>[];

};

export default function TableRowInvoiceOrder<T>({ row, index, showNumbering, hide, initialData, handleClickRow, handleClickSwitchRow }: TableRowProps<T>) {

    const [checked, setChecked] = useState(false);
    const [lLength, setLength] = useState('');

    useEffect(() => {
        if (initialData.length !== lLength) {
            setChecked(false);
        }
    }, [initialData]);

    const onChangeCheck = () => {
        setChecked(!checked);
    }
    const onChangeCheckedInput = (checkInput: any, row: any) => {
        setLength(initialData.length);
        setChecked(!checked);
    }
    return (
        <tr
            key={index}
            className="contentrows align-middle"
        >
            {showNumbering && <td className="text-xs">{index + 1}</td>}
            {Object.keys(row)
                .filter((key) => !hide.includes(key as keyof T))
                .map((key) => (
                    <>
                        <td key={key} className="text-xs px-2" onClick={() => handleClickRow && handleClickRow(row, !checked)}>
                            {/* @ts-ignore */}
                            {key !== "Adresas" ? (
                                row[key]
                            ) : (
                                <span className="d-flex justify-content-between align-items-center" onClick={() => handleClickSwitchRow && handleClickSwitchRow(row, index)}>
                                    {row[key]}
                                    <Switch title="" row={row} checked={checked} onChangeCheckedInput={onChangeCheckedInput} />
                                    {/* <Checkbox title="" onClick={() => { onChangeCheck() }} row={row} onChangeCheckedInput={onChangeCheckedInput} /> */}
                                </span>
                            )}
                        </td>
                    </>
                ))}
        </tr>
    )
}
