import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ValueType } from "../../../types";
import { filterType, TableActionsType } from "../../../types/props";
import Dropdown from "../../Atoms/custom/Dropdown";
import Heading from "../../Atoms/Heading";
import Icon from "../../Atoms/Icon";
import Button from "../../Molecules/Button/Button";
import Filter from "../../Molecules/custom/Filter";
import Pagination from "../../Molecules/custom/Pagination";

const showEntriesOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
];

interface TableProps<T> {
    data: T[];
    uniqueCol: any;
    hide?: any;
    // uniqueCol: keyof T;
    // hide?: (keyof T)[];
    isTheader?: boolean;
    isPrint?: boolean;
    showNumbering?: boolean;
    dateFilter?: boolean;
    isFilter?: boolean;
    isPagenation?: boolean;
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

export default function SubTableRentProduct<T>({
    data,
    //   uniqueCol,
    hide = [],
    showNumbering = true,
    dateFilter = false,
    isPrint = false,
    isFilter = true,
    isPagenation = true,
    isTheader = true,
    actions,
    handleClickRow,
    //pagination
    rowsPerPage = 5,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
    // add new button
    onClickAddNewButton,
    addNewButtonText = "Pridėti naują",
    showAddNewButton = true,
}: //   ,
    TableProps<T>) {
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [num, setNum] = useState(0);
    const [amountData1, setAmountData1] = useState(0);
    const [amountData2, setAmountData2] = useState(0);
    const [amountData3, setAmountData3] = useState(0);
    const [amountData4, setAmountData4] = useState(0);
    const [amountData5, setAmountData5] = useState(0);

    //filter data using column, filter and filterType
    const filterData = (
        column: keyof T,
        filterType: filterType,
        searchValue: string
    ) => {
        if (column?.toString().length > 0 && searchValue.length > 0) {
            const filteredData = data.filter((item) => {
                const currentItem = (item[column] as unknown as string).toLowerCase();
                searchValue = searchValue.toLowerCase();
                if (column) {
                    if (filterType === "equals") {
                        return currentItem === searchValue;
                    } else if (filterType === "contains") {
                        return currentItem.includes(searchValue);
                    } else if (filterType === "startsWith") {
                        return currentItem.startsWith(searchValue);
                    } else if (filterType === "endsWith") {
                        return currentItem.endsWith(searchValue);
                    }
                } else {
                    return true;
                }
            });
            setrowsAvailable(filteredData);
        } else {
            if (rowsAvailable.length !== data.length) {
                setrowsAvailable(data);
            }
        }
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

    useEffect(() => {
        let amount1: number = 0;
        let amount2: number = 0;
        let amount3: number = 0;
        let amount4: number = 0;
        let amount5: number = 0;
        rowsToDisplay?.map((item: any) => {
            amount1 = amount1 + Number(item['Kiekis']);
            amount2 = amount2 + Number(item['Viso kg']);
            amount3 = amount3 + Number(item['Viso vertė € be pvm']);
            amount4 = amount4 + Number(item['Svoris kg']);
            amount5 = amount5 + Number(item['Vnt vertė €']);
        })
        setAmountData1((amount1));
        setAmountData2((amount2));
        setAmountData3((amount3));
        setAmountData4((amount4));
        setAmountData5((amount5));
    }, [rowsToDisplay])

    return (
        <div>
            {showAddNewButton && (
                <div className="page-head">
                    <Heading fontSize="md" fontWeight="bold" >
                        {addNewButtonText}
                        <button className="btn w-auto" onClick={onClickAddNewButton}>
                            <Icon name={"add"} styles={{ marginLeft: "5px" }} size={35} />
                        </button>
                    </Heading>
                </div>
            )}
            {
                isFilter &&
                <Filter handleFilter={filterData} data={data[0]} />
            }
            <div className="border rounded overflow-auto">
                <table className="table table-responsive my-0" id="myTable">
                    <tbody>
                        {isTheader && <tr className="rounded bg-light">
                            {showNumbering && <th style={{ fontSize: isPrint ? '8px' : '' }}>#</th>}
                            {data[0] &&
                                Object.keys(data[0])
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((mapdata, key) => (
                                        <td
                                            key={key}
                                            id={"sort" + key}
                                            style={{ fontSize: isPrint ? '8px' : '' }}
                                            className="text-capitalize font-bold px-2 text-sm headerclick"
                                        // onClick={() => sortTable(key)}
                                        >
                                            {mapdata}
                                        </td>
                                    ))}
                        </tr>}
                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {showNumbering && <td style={{ fontSize: isPrint ? '8px' : '' }} className="text-xs">{index + 1}</td>}
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <td key={key} className="text-xs px-2" style={{ fontSize: isPrint ? '8px' : '' }}>
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
                            </tr>
                        ))}
                        {rowsToDisplay.length > 0 &&
                            <tr style={{ fontSize: isPrint ? '8px' : '' }} className="my-2">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <p style={{ fontSize: isPrint ? '8px' : '' }} className="m-0">{amountData1.toFixed(2)}</p>
                                </td>
                                <td><p style={{ fontSize: isPrint ? '8px' : '' }} className="m-0">{amountData4.toFixed(2)}</p></td>
                                <td>
                                    <p style={{ fontSize: isPrint ? '8px' : '' }} className="m-0">{amountData2.toFixed(2)}</p>
                                </td>
                                <td><p style={{ fontSize: isPrint ? '8px' : '' }} className="m-0">{amountData5.toFixed(2)}</p></td>
                                <td>
                                    <div>
                                        <p style={{ fontSize: isPrint ? '8px' : '' }} className="m-0">{amountData3.toFixed(2)}</p>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            {isPagenation && <div className=" my-2">
                <div className="d-flex align-items-center py-2">
                    <span className="px-3 text-xs">Rodyti</span>
                    <Select
                        className="text-xs"
                        name="rowstoDisplay"
                        value={showEntriesOptions.find(
                            (option) => option.value === _rowsPerPage + ""
                        )}
                        styles={{
                            menu: (provided) => ({
                                ...provided,
                                padding: "0px 0px 60px 0px",
                            }),
                        }}
                        // @ts-ignore
                        onChange={handleChangeRowsPerPage}
                        options={showEntriesOptions}
                    />
                </div>
                <Pagination
                    totalElements={data.length}
                    paginate={handlePageChange}
                    currentPage={_currentPage}
                    totalPages={Math.ceil(data.length / _rowsPerPage)}
                />
            </div>}
        </div>
    );
}
