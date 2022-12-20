import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ValueType } from "../../../types";
import { filterType, TableActionsType } from "../../../types/props";

interface TableProps<T> {
    data: T[];
    uniqueCol: keyof T;
    hide?: (keyof T)[];
    showNumbering?: boolean;
    isArray?: boolean;
    actions?: TableActionsType<T>[];
    handleClickRows?: (_row: any) => void;
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

export default function Table<T>({
    data,
    //   uniqueCol,
    hide = [],
    isArray = false,
    handleClickRows,
    //pagination
    rowsPerPage = 5,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
}: //   ,
    TableProps<T>) {
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

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
                    <tbody className={isArray ? "" : "subtable-center"} >
                        {
                            isArray ?
                                <></> :
                                <tr className="rounded bg-light"
                                    style={{ background: "linear-gradient(#8b9da9, #fff6e4)" }}>
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
                        }

                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows"
                                onClick={() => handleClickRows && handleClickRows(row)}
                            >
                                {isArray ?
                                    <td>{row}</td> :
                                    Object.keys(row)
                                        .filter((key) => !hide.includes(key as keyof T))
                                        .map((key) => (
                                            <td key={key} className="text-xs px-2">
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
                                        ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
