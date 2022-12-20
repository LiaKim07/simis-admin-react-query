import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ValueType } from "../../../types";
import { filterType, TableActionsType } from "../../../types/props";
import Dropdown from "../../Atoms/custom/Dropdown";
import Heading from "../../Atoms/Heading";
import Icon from "../../Atoms/Icon";
import Switch from "../../Atoms/Form/Switch";
import Button from "../../Molecules/Button/Button";
import Filter from "../../Molecules/custom/Filter";
import Pagination from "../../Molecules/custom/Pagination";
import TableRow from './PrintTableRow'

const showEntriesOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
];

interface TableProps<T> {
    data: T[];
    subdata?: T[];
    uniqueCol: keyof T;
    hide?: (keyof T)[];
    showNumbering?: boolean;
    isPagenation?:boolean;
    dismiss?:boolean;
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

export default function Table<T>({
    data,
    subdata,
    //   uniqueCol,
    hide = [],
    showNumbering = true,
    dismiss = false,
    isPagenation = true,
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

    const defaultState: any = {
        imageUrl: '',
        name: '',
    };

    const [checked, setChecked] = useState(false); 
    const [values, setvalues] = useState<any>({ ...defaultState });

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
            <Filter handleFilter={filterData} data={data[0]} />
            <div className="border rounded">
                <table className="table table-responsive my-0" id="myTable">
                    <tbody>
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
                                        <TableRow
                                            subdata={subdata}
                                            dismiss={dismiss}
                                            row={row}
                                            key={key}
                                            indexData={key}
                                        />
                                    ))}
                                {actions && (
                                    <td className="">
                                        <Dropdown
                                            header={
                                                <Button className="no-styles">
                                                    <Icon
                                                        name={"more"}
                                                        size={24}
                                                        styles={{ marginTop: "-9px" }}
                                                    />
                                                </Button>
                                            }
                                        >
                                            {actions.map((action) => (
                                                <div
                                                    key={action.name}
                                                    className="w-100 bg-white shadow p-0"
                                                    onClick={() => action.handleAction(row)}
                                                >
                                                    <button className="btn col-3 w-100 border-bottom drop-content-btn text-capitalize p-0" onClick={() => console.log('action click')}>
                                                        {/* <Icon name={action.icon} size={13} /> */}
                                                        <span className="px-2 text-xs">
                                                            {action.name.toLowerCase()}
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </Dropdown>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="col-3 mr-2 mt-3 float-end">
                <Button className="text-capitalize b-radius d-flex align-items-center justify-content-center" onClick={onClickAddNewButton}>
                    <Icon name="save" />
                    <span>&nbsp;Print selected</span>
                </Button>
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
