import "../../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ValueType } from "../../../../types";
import { filterType, TableActionsType } from "../../../../types/props";
import Heading from "../../../Atoms/Heading";
import Icon from "../../../Atoms/Icon";
import Button from "../../../Molecules/Button/Button";
import Filter from "../../../Molecules/custom/Filter";
import DateFilter from "../../../Molecules/custom/DateFilter";
import Pagination from "../../../Molecules/custom/Pagination";

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
    showNumbering?: boolean;
    actions?: TableActionsType<T>[];
    handleClickRow?: (_row: any) => void;
    statusColumn?: string;
    dateFilter?: boolean;
    isFilter?: boolean;
    printBtn?: boolean;
    isPagenation?: boolean;
    printButtonText?: string;
    isSubtitle?: boolean;
    subtitle?: string;

    //pagination
    rowsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
    onChangePage: (_page: number) => void;
    onChangePageSize?: (_size: number) => void;

    // add new item button
    onClickAddNewButton?: () => void;
    onClickAddNewItemButton?: (_row: any) => void;
    addNewButtonText?: string;
    showAddNewButton?: boolean;
}

export default function Table<T>({
    data,
    //   uniqueCol,
    hide = [],
    showNumbering = true,
    isFilter = true,
    isPagenation = true,
    actions,
    handleClickRow,
    //pagination
    rowsPerPage = 50,
    // totalPages = 1,
    currentPage = 0,
    onChangePage,
    onChangePageSize,
    // add new button
    onClickAddNewButton,
    onClickAddNewItemButton,
    addNewButtonText = "Pridėti naują",
    printButtonText = "Print selected",
    subtitle = "Active orders",
    isSubtitle = false,
    showAddNewButton = true,
    printBtn = false,
}: //   ,
    TableProps<T>) {
    let iniData: any = [];
    data.map((item) => {
        iniData.push(false);
    })
    const [_currentPage, setcurrentPage] = useState(currentPage);
    const [_rowsPerPage, setrowsPerPage] = useState(rowsPerPage);

    const [rowsToDisplay, setrowsToDisplay] = useState<T[]>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);

    const [isActive, setIsActive] = useState(false);
    const [num, setNum] = useState(iniData);

    //filter data using column, filter and filterType
    const filterData = (
        val: any
    ) => {
        let nameData: string = val?.name?.toLowerCase();
        let typeData: string = val?.type?.toLowerCase();
        let groupData: string = val?.group?.toLowerCase();
        let searchData: string = val?.search?.toLowerCase();
        if (typeData?.toString().length > 0 || groupData?.toString().length > 0 || nameData?.toString().length > 0) {
            let initialData: any = data;
            const filteredData = initialData.filter((item: any) => {
                console.log('item dta', item)
                if (searchData === 'type') {
                    const currentType: any = (item.Tipas).toLowerCase();
                    return currentType.includes(typeData);
                } else if (searchData === 'group') {
                    const currentGroup: any = (item.Grupė).toLowerCase();
                    return currentGroup.includes(groupData);
                } else if (searchData === 'name') {
                    const currentName: any = (item.Pavadinimas).toLowerCase();
                    return currentName.includes(nameData);
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

    const onActive = (index: number) => {
        let arr: any = num;
        arr[index] = !arr[index];
        setNum([...arr]);
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
            {isSubtitle && (
                <Heading fontSize="lg" fontWeight="bold" >
                    {subtitle}
                </Heading>
            )}
            {
                isFilter ?
                    <DateFilter handleFilter={filterData} data={data} />
                    // <Filter handleFilter={filterData} data={data[0]} /> 
                    : <></>
            }
            <div className="border rounded">
                <table className="table table-responsive my-0" id="myTable">
                    <tbody>
                        <tr className="rounded bg-light">
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
                            <td></td>
                            {actions && <th className="text-center text-xs">Opt.</th>}
                        </tr>
                        {/* Table body */}
                        {rowsToDisplay.map((row: any, index) => (
                            <tr
                                key={index}
                                className="contentrows"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {showNumbering && <td className="text-xs align-middle">{index + 1}</td>}
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <>
                                            <td key={key} className="text-xs px-2 align-middle" >
                                                {/* @ts-ignore */}
                                                {
                                                    key !== "Grupė" ? (
                                                        row[key]
                                                    ) : (
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            {row[key]}
                                                            {num[index] ? (
                                                                <button id={'id' + index} className="btn w-auto text-end" onClick={() => {
                                                                    onClickAddNewItemButton && onClickAddNewItemButton(row);
                                                                    setIsActive(false);
                                                                    onActive(index);
                                                                }
                                                                }>
                                                                    {
                                                                        <Icon name={"add"} styles={{ marginLeft: "5px" }} size={24} />
                                                                    }
                                                                </button>) : (
                                                                <button id={'id' + index} className="btn w-auto text-end" onClick={() => {
                                                                    onClickAddNewItemButton && onClickAddNewItemButton(row);
                                                                    setIsActive(true);
                                                                    onActive(index);
                                                                }
                                                                }>
                                                                    {
                                                                        <Icon name={"add-deactive"} styles={{ marginLeft: "5px" }} size={24} />
                                                                    }
                                                                </button>)
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </td>
                                        </>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {printBtn && <div className="col-3 mr-2 mt-3 float-end">
                <Button className="text-capitalize b-radius d-flex align-items-center justify-content-center" onClick={onClickAddNewButton}>
                    <Icon name="save" />
                    <span>&nbsp;{printButtonText}</span>
                </Button>
            </div>}
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
