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

export default function EcommerceOrderTableProduct<T>({
    data,
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

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [num, setNum] = useState(0);
    const [amountData, setAmountData] = useState(0);
    const [pvmData, setPvmData] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [amountDataRental, setAmountDataRental] = useState(0);
    const [pvmDataRental, setPvmDataRental] = useState(0);
    const [totalDataRental, setTotalDataRental] = useState(0);
    const [quantityData, setQuantityData] = useState(0);

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
        let table: any,
            sort: any,
            rows: any,
            switching,
            i,
            x,
            y,
            shouldSwitch,
            dir,
            switchcount = 0;
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

    useEffect(() => {
        let amount: number = 0;
        let pvm: number = 0;
        let total: number = 0;
        let quantity: number = 0;
        let amountRental: any = 0;
        let pvmRental: any = 0;
        let totalRental: any = 0;
        rowsToDisplay?.map((item: any) => {
            amount = amount + Number(item['Vnt Vertė']);
            pvm = pvm + (Number(item['Vnt Vertė'] * 0.21));
            total = total + (Number(item['Vnt Vertė']) * 1.21);
            amountRental = amountRental + Number(item['Visų kaina dienai']);
            pvmRental = pvmRental + (Number(item['Visų kaina dienai']) * 0.21);
            totalRental = totalRental + (Number(item['Visų kaina dienai']) * 1.21);
            quantity = quantity + item.Kiekis;
        })
        setAmountData((amount));
        setPvmData(pvm);
        setTotalData(total);
        setAmountDataRental(amountRental.toFixed(2));
        setPvmDataRental(pvmRental.toFixed(2));
        setTotalDataRental(totalRental.toFixed(2));
        setQuantityData(quantity);
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
                        {rowsToDisplay.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {showNumbering && <td className="text-xs">{index + 1}</td>}
                                {Object.keys(row)
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
                                    ))}
                            </tr>
                        ))}
                        {rowsToDisplay.length > 0 &&
                            <tr className="my-2">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <p className="m-0">{quantityData}</p>
                                </td>
                                <td>
                                    <div>
                                        <p className="m-0">Suma:</p>
                                        <p className="m-0">PVM:</p>
                                        <p className="m-0">Suma su PVM:</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p className="m-0">{amountDataRental}</p>
                                        <p className="m-0">{pvmDataRental}</p>
                                        <p className="m-0">{totalDataRental}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p className="m-0">{amountData.toFixed(2)}</p>
                                        <p className="m-0">{pvmData.toFixed(2)}</p>
                                        <p className="m-0">{totalData.toFixed(2)}</p>
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
