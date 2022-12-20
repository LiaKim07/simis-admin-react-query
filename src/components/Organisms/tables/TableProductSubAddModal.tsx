import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";

import { ValueType } from "../../../types";
import { filterType, TableActionsType } from "../../../types/props";
import Filter from "../../Molecules/custom/ModalFilter";
import InputSmall from '../../Atoms/Form/InputSmall';

interface TableProps<T> {
    data: T[];
    uniqueCol: any;
    hide?: any;
    actions?: TableActionsType<T>[];
    handleClickRow?: (_row: any) => void;
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

export default function TableProductSubModal<T>({
    data,
    //   uniqueCol,
    hide = [],
    handleClickRow,
    //pagination
    rowsPerPage = 5,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
    // add new button
    onClickAddNewButton,
}: //   ,
    TableProps<T>) {
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);
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
            <div className="border rounded">
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
                                            className="text-capitalize font-bold px-2 text-sm headerclick"
                                        >
                                            {mapdata}
                                        </td>
                                    ))}
                        </tr>
                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows align-middle"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <td key={key} className={key === "Warehouse" || key === "Warehousekeeper" ? "text-xs px-2 product-subtable-col-color text-decoration-underline" : "text-xs px-2"}>
                                            {
                                                key === "Options" ? (
                                                    <>
                                                        <img src='/icons/import.svg' alt='import' width={26} />
                                                        <img src='/icons/export.svg' alt='import' width={20} />
                                                    </>
                                                ) :
                                                    row[key]
                                            }
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
