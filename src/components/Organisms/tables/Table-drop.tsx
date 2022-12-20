import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ValueType } from "../../../types";
import { filterType, TableActionsType } from "../../../types/props";
import SubTable from './SubTable';
import Heading from "../../Atoms/Heading";
import Icon from "../../Atoms/Icon";
import Filter from "../../Molecules/custom/Filter";
import Pagination from "../../Molecules/custom/Pagination";
import TableRow from './TableRow';

const showEntriesOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
];

interface TableProps<T> {
    showIcon: boolean,
    showTitle: boolean,
    data: T[];
    additional?: boolean;
    colorVal?: any;
    isOpen?: boolean;
    isSubOpen?: boolean;
    uniqueCol: keyof T;
    hide?: (keyof T)[];
    subuniqueCol: keyof T;
    subhide?: (keyof T)[];
    showNumbering?: boolean;
    isArray?: boolean;
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
    onClickAdditionalButton?: () => void;
    addNewButtonText?: string;
    showAddNewButton?: boolean;
    isShowAddtionalBtn?: boolean;
}

export default function TableDropdown<T>({
    showIcon = true,
    showTitle = true,
    data,
    additional = false,
    //   uniqueCol,
    hide = [],
    subuniqueCol,
    subhide = [],
    showNumbering = true,
    isArray = false,
    // actions,
    isOpen = false,
    isSubOpen = false,
    handleClickRow,
    colorVal,
    //pagination
    rowsPerPage = 5,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
    // add new button
    onClickAddNewButton,
    onClickAdditionalButton,
    addNewButtonText = "Pridėti naują",
    showAddNewButton = true,
    isShowAddtionalBtn = false,
}: //   ,
    TableProps<T>) {
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [num, setNum] = useState(0);
    const [open, setOpen] = React.useState(isOpen);

    const toogleOpen = () => {
        setOpen(!open);
    };
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
    const actions: any = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('dsfadsfa', item);
            },
        },
    ];

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
            {showTitle && showAddNewButton && (
                <div className="page-head d-flex">
                    {
                        isShowAddtionalBtn && !additional && (
                            <Heading fontSize="md" fontWeight="bold" >
                                {addNewButtonText}
                                <button className="btn w-auto" onClick={onClickAddNewButton}>
                                    <Icon name={"add"} styles={{ marginLeft: "5px" }} size={35} />
                                </button>
                            </Heading>
                        )
                    }
                    {
                        isShowAddtionalBtn && additional && (
                            <Heading fontSize="md" fontWeight="bold" >
                                {"Papildoma"}
                                <button className="btn w-auto" onClick={onClickAdditionalButton}>
                                    <Icon name={"add"} styles={{ marginLeft: "5px" }} size={35} />
                                </button>
                            </Heading>
                        )
                    }
                </div>
            )}
            <Filter handleFilter={filterData} data={data[0]} />
            <div className="border rounded overflow-auto">
                <table className="table table-responsive my-0" id="myTable">
                    <tbody>

                        {/* @ts-ignore */}
                        {!data[0]?.subData && <tr className="rounded bg-light">
                            {showNumbering && <th>#</th>}
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
                        </tr>}
                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index) => (
                            <TableRow
                                key={index}
                                row={row}
                                index={index}
                                isSubOpen={isSubOpen}
                                showNumbering={showNumbering}
                                hide={hide}
                                isArray={isArray}
                                handleClickRow={handleClickRow}
                                showIcon={showIcon}
                                uniqueCol={subuniqueCol}
                                subhide={subhide}
                                actions={actions}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=" my-2">
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
        </div>
    );
}
