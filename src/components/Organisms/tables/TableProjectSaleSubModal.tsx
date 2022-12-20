import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";

import Icon from "../../Atoms/Icon";
import { ValueType } from "../../../types";
import CheckboxInput from '../../Atoms/Form/CheckboxInput';
import InputSmall from '../../Atoms/Form/InputSmall';

interface TableProps<T> {
    data: T[];
    uniqueCol: any;
    hide?: any;
    // uniqueCol: keyof T;
    // hide?: (keyof T)[];
    handleClickRow?: (_row: any) => void;
    onClickMinusButton?: (_row: any) => void;
    onChangeInputSale?: (e: any, _row: any, key: any) => void;
    statusColumn?: string;

    //pagination
    rowsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
    onChangePage: (_page: number) => void;
    onChangePageSize?: (_size: number) => void;

    // add new item button
    onClickAddNewButton?: () => void;
    addNewButtonText?: string;
    showAddNewButton?: boolean;
}

export default function ProjectSaleSubModalTable<T>({
    data,
    //   uniqueCol,
    hide = [],
    handleClickRow,
    onClickMinusButton,
    onChangeInputSale,
    //pagination
    rowsPerPage = 5,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
    // add new button
}: //   ,
    TableProps<T>) {
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [num, setNum] = useState(0);
    const [values, setvalues] = useState<any>('');
    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    function handleChangeRowsPerPage(e: ValueType) {
        setcurrentPage(0);
        setrowsPerPage(Number(e.value));
        if (onChangePageSize) onChangePageSize(parseInt(e.value + ""));
    }

    function handlePageChange(e: number) {
        setcurrentPage(e);
        if (onChangePage) onChangePage(e);
    }

    useEffect(() => {
        setrowsAvailable(data);
    }, [data]);

    useEffect(() => {
        const startingPoint = _currentPage * _rowsPerPage;
        setrowsToDisplay(
            rowsAvailable.slice(startingPoint, startingPoint + _rowsPerPage)
        );
    }, [_currentPage, _rowsPerPage, rowsAvailable]);

    return (
        <div>
            <div className="border rounded mt-4 overflow-auto">
                <table className="table table-responsive my-0" id="myTable">
                    <tbody>
                        <tr className="rounded bg-light">
                            {data[0] &&
                                Object.keys(data[0])
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((mapdata, key) => (
                                        <td
                                            key={key}
                                            id={"sort" + key}
                                            className={mapdata === "Value 1 psc (discounted)" ? `text-capitalize font-bold px-2 text-sm headerclick table-caption` : `text-capitalize font-bold px-2 text-sm headerclick`}
                                        >
                                            {mapdata}
                                        </td>
                                    ))}
                            <td> </td>
                        </tr>
                        {/* Table body */}
                        {data.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows align-middle"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <td key={key} className="text-xs px-2">
                                            {/* @ts-ignore */}
                                            {
                                                key === "Nuolaida" || key === "Kiekis" ? (
                                                    <div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
                                                        <input
                                                            placeholder={row[key] === 0 ? '' : row[key]}
                                                            type={'number'}
                                                            spellCheck="true"
                                                            style={{ color: '#212529' }}
                                                            autoComplete="off"
                                                            className={`bg-styles input-small`}
                                                            onChange={(e) => onChangeInputSale && onChangeInputSale(e, row.id, key)}
                                                        />
                                                    </div>
                                                ) :
                                                    row[key]
                                            }
                                        </td>
                                    ))}
                                <button className="btn w-auto" onClick={() => onClickMinusButton && onClickMinusButton(row)}>
                                    <Icon name={"minus"} styles={{ marginLeft: "5px" }} size={35} />
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
