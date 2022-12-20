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
    discountData?: any;
    // uniqueCol: keyof T;
    // hide?: (keyof T)[];
    isTheader?: boolean;
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
    onChangePage?: (_page: number) => void;
    onChangePageSize?: (_size: number) => void;

    // add new item button
    onClickAddNewButton?: () => void;
    addNewButtonText?: string;
    showAddNewButton?: boolean;
}

export default function TableProjectInvoice<T>({
    data,
    discountData,
    //   uniqueCol,
    hide = [],
    showNumbering = true,
    dateFilter = false,
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

    const [rowsToDisplay, setrowsToDisplay] = useState<any>([])
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [num, setNum] = useState(0);

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

    const sortTable = (n: number) => {
        let table: any, sort: any, rows: any, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        setNum(n);
        if (num !== n) {
            let oldsort: any = document.getElementById("sort" + n);
            oldsort.classList.add("sorteddesc");
            sort = document.getElementById("sort" + num);
            sort.classList.remove("sorteddesc");
            sort.classList.remove("sortedasc");
            table = document.getElementById("myTable");
            switching = true;
            dir = "asc";
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < rows.length - 1; i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n + 1];
                    y = rows[i + 1].getElementsByTagName("TD")[n + 1];
                    if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            oldsort.classList.remove("sortedasc");
                            oldsort.classList.add("sorteddesc");
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            oldsort.classList.remove("sorteddesc");
                            oldsort.classList.add("sortedasc");
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        } else {
            table = document.getElementById("myTable");
            sort = document.getElementById("sort" + n);
            sort.classList.add("sorteddesc");
            switching = true;
            dir = "asc";
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < rows.length - 1; i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n + 1];
                    y = rows[i + 1].getElementsByTagName("TD")[n + 1];
                    if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            sort.classList.remove("sortedasc");
                            sort.classList.add("sorteddesc");
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            sort.classList.remove("sorteddesc");
                            sort.classList.add("sortedasc");
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
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
                            {showNumbering && <th>#</th>}
                            {data[0] &&
                                Object.keys(data[0])
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((mapdata, key) => (
                                        <td
                                            key={key}
                                            id={"sort" + key}
                                            className="text-capitalize font-bold px-2 text-sm headerclick"
                                            onClick={() => sortTable(key)}
                                        >
                                            {mapdata}
                                        </td>
                                    ))}
                        </tr>}
                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index: number) => (
                            <tr
                                key={index}
                                className="contentrows"
                                onClick={() => handleClickRow && handleClickRow(row)}
                                style={row?.isPayed ? { background: "linear-gradient(135deg, rgb(66, 230, 149) 0%, rgb(59, 178, 184) 100%)" } : row.activated === 2 ? { background: "linear-gradient(135deg, rgb(250, 217, 97) 0%, rgb(247, 107, 28) 100%)" } : { background: "linear-gradient(135deg, rgb(245, 78, 162) 0%, rgb(255, 118, 118) 100%)" }}
                            >
                                {showNumbering && <td className="text-xs">{index + 1}</td>}
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <td key={key} className="text-xs px-2">
                                            {row[key]}
                                        </td>
                                    ))}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                discountData && rowsToDisplay.length > 0 &&
                <tr className="my-2 float-end" style={{ marginRight: '60px' }}>
                    <td>
                        <div>
                            <p className="m-0 me-3">Antkainis:</p>
                            <p className="m-0 me-3">Nuolaida:</p>
                            <p className="m-0 me-3">Viso:</p>
                        </div>
                    </td>
                    <td >
                        <div>
                            <p className="m-0">{rowsToDisplay[0].markUp}</p>
                            <p className="m-0">{rowsToDisplay[0].discount}</p>
                            <p className="m-0">{rowsToDisplay[0].total}</p>
                        </div>
                    </td>
                </tr>
            }
            {
                isPagenation && <div className=" my-2">
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
                </div>
            }
        </div >
    );
}
