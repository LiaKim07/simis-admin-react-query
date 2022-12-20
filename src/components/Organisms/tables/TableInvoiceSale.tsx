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
    onChangeInput?: (e: any) => void;
    onChangeInputMarkUp?: (e: any) => void;
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

export default function TableInvoiceSale<T>({
    data,
    //   uniqueCol,
    hide = [],
    handleClickRow,
    onChangeInput,
    onChangeInputMarkUp,
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

    const [rowsToDisplay, setrowsToDisplay] = useState<any>([]);
    const [rowsAvailable, setrowsAvailable] = useState(data);
    const [values, setvalues] = useState<number>(0);

    const [amountData, setAmountData] = useState(0);
    const [pvmData, setPvmData] = useState(0);
    const [totalData, setTotalData] = useState(0);

    // const handleChange = (e: ValueType) => {
    //     setvalues({ ...values, [e.name]: e.value });
    // };

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
        rowsToDisplay?.map((item: any) => {
            if (!isNaN(Number((item['Suma'])))) {
                amount = amount + Number(item['Suma']);
                pvm = pvm + (Number(item['Suma'] * 0.21));
                total = total + (Number(item['Suma']) * 1.21);
            }
        })
        setAmountData(((100 - Number(rowsToDisplay[0]?.disAmount)) / 100) * ((100 + Number(rowsToDisplay[0]?.disAmountMark)) / 100) * amount);
        setPvmData(((100 - Number(rowsToDisplay[0]?.disAmount)) / 100) * ((100 + Number(rowsToDisplay[0]?.disAmountMark)) / 100) * pvm);
        setTotalData(((100 - Number(rowsToDisplay[0]?.disAmount)) / 100) * ((100 + Number(rowsToDisplay[0]?.disAmountMark)) / 100) * total);
    }, [rowsToDisplay])

    const onChangeDiscount = (e: any) => {
        {/* @ts-ignore */ }
        onChangeInput(e.target.value);
    }
    const onChangeMarkUp = (e: any) => {
        {/* @ts-ignore */ }
        onChangeInputMarkUp(e.target.value);
    }

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
                        {rowsToDisplay.map((row: any, index: number) => (
                            <tr
                                key={index}
                                className="contentrows align-middle"
                                onClick={() => handleClickRow && handleClickRow(row)}
                            >
                                {Object.keys(row)
                                    .filter((key) => !hide.includes(key as keyof T))
                                    .map((key) => (
                                        <td key={key} className="text-xs px-2">
                                            {
                                                key === "Quantity (continuous)" || key === "Discount" || key === "Discounted price" || key === "Min. term" ? (
                                                    <div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
                                                        <input
                                                            placeholder={row[key]}
                                                            type={'string'}
                                                            spellCheck="true"
                                                            style={{ color: '#212529' }}
                                                            autoComplete="off"
                                                            className={`bg-styles input-small`}
                                                        />
                                                    </div>
                                                ) :
                                                    row[key]
                                            }
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
                                {/* <td></td>
                                <td></td> */}
                                <td>
                                    <div>
                                        {/* <p className="m-0">Antkainis:</p> */}
                                        <p className="m-0">Nuolaida:</p>
                                        <p className="m-0">Suma:</p>
                                        <p className="m-0">PVM:</p>
                                        <p className="m-0">Viso:</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {/* <div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
                                            <input
                                                type={'number'}
                                                spellCheck="true"
                                                style={{ color: '#212529' }}
                                                autoComplete="off"
                                                className={`bg-styles input-small`}
                                                onChange={(e) => onChangeMarkUp(e)}
                                            />
                                        </div> */}
                                        <div className='d-flex align-middle' style={{ 'background': "#EEF1F4", 'width': '60px' }}>
                                            <input
                                                type={'number'}
                                                spellCheck="true"
                                                style={{ color: '#212529' }}
                                                autoComplete="off"
                                                className={`bg-styles input-small`}
                                                onChange={(e) => onChangeDiscount(e)}
                                            />
                                        </div>
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
        </div>
    );
}
