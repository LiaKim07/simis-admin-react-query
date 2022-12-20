import "../../../styles/components/Organisms/Table.scss";

import React, { useEffect, useState } from "react";

import { ValueType } from "../../../types";
import CheckboxInput from '../../Atoms/Form/CheckboxInput';
import InputSmall from '../../Atoms/Form/InputSmall';
import Checkbox from '../../Atoms/Form/Checkbox';

const showEntriesOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
];

interface TableProps<T> {
    data: any;
    uniqueCol: any;
    hide?: any;
    // uniqueCol: keyof T;
    // hide?: (keyof T)[];
    handleClickRow?: (_row: any) => void;
    onChangeInput?: (e: any, _row: any, key: any) => void;
    onChangeCheckbox?: (e: any, _row: any, key: any) => void;
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

export default function ProjectRentOrderTable<T>({
    data,
    //   uniqueCol,
    hide = [],
    handleClickRow,
    onChangeInput,
    onChangeCheckbox,
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
    const [values, setvalues] = useState<any>('');
    const [num, setNum] = useState(0);
    const [checked, setChecked] = useState(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    function handleChangeRowsPerPage(e: ValueType) {
        setcurrentPage(0);
        setrowsPerPage(Number(e.value));
        if (onChangePageSize) onChangePageSize(parseInt(e.value + ""));
    }

    function handlePageChange(e: number) {
        setcurrentPage(e);
        if (onChangePage) onChangePage(e);
    }

    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: e.value });
    };

    const onChangeCheck = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        setrowsAvailable(data);
        if (data[0]?.updateId) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [data]);

    useEffect(() => {
        const startingPoint = _currentPage * _rowsPerPage;
        setrowsToDisplay(
            rowsAvailable.slice(startingPoint, startingPoint + _rowsPerPage)
        );
    }, [_currentPage, _rowsPerPage, rowsAvailable]);

    const onChangeCheckedInput = (checkInput: any, row: any) => {
        {/* @ts-ignore */ }
        onChangeInput(checkInput, row.id, 'Neskaičiuoti');
    }
    const [type1, setType1] = useState<string>('string');

    const onBlurtype1 = (e: any) => {
        if (e.target.value === "") {
            setType1('string')
        }
    }

    const onFocus1 = (e: any) => {
        setType1('number');
    }

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
                                            className="text-capitalize font-bold px-2 text-sm headerclick"
                                        >
                                            {mapdata}
                                        </td>
                                    ))}
                        </tr>
                        {/* Table body */}
                        {data.map((row: any, index: number) => (
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
                                                key === "Neskaičiuoti" ? (
                                                    <Checkbox title="" onClick={() => { onChangeCheck() }} row={row} onChangeCheckedInput={onChangeCheckedInput} />
                                                    // <CheckboxInput value={row['Rent ()']} title="" row={row} o"nChangeCheckedInput={onChangeCheckedInput} /> 
                                                ) :
                                                    // (!isUpdate && (key === "Remonto kaina" || key === "Pastaba")) || key === "Kiekis(Grąžinta,)" ? (
                                                    (!isUpdate && (key === "Remonto kaina")) || key === "Kiekis(Grąžinta,)" ? (
                                                        < div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
                                                            <input
                                                                value={row[key] === 0 ? '' : row[key]}
                                                                placeholder={row[key]}
                                                                type={type1}
                                                                onFocus={onFocus1}
                                                                onBlur={onBlurtype1}
                                                                spellCheck="true"
                                                                style={{ 'color': "#212529", 'width': '60px' }}
                                                                // style={{ color: '#212529' }}
                                                                autoComplete="off"
                                                                className={`bg-styles input-small`}
                                                                onChange={(e) => onChangeInput && onChangeInput(e, row.id, key)}
                                                            />
                                                        </div>
                                                    ) :
                                                        (!isUpdate && (key === "Pastaba")) ? (
                                                            < div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '180px' }}>
                                                                <input
                                                                    value={row[key] === 0 ? '' : row[key]}
                                                                    placeholder={row[key]}
                                                                    type={'string'}
                                                                    onFocus={onFocus1}
                                                                    onBlur={onBlurtype1}
                                                                    spellCheck="true"
                                                                    style={{ 'color': "#212529", 'width': '180px' }}
                                                                    // style={{ color: '#212529' }}
                                                                    autoComplete="off"
                                                                    className={`bg-styles input-small`}
                                                                    onChange={(e) => onChangeInput && onChangeInput(e, row.id, key)}
                                                                />
                                                            </div>
                                                        )
                                                            :
                                                            row[key]
                                            }
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
