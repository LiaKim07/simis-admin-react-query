import React, { useState } from 'react';
import AddNewProductypetModal from "./AddNewInvoiceModal";
import { useParams } from "react-router-dom";

import Table from '../tables/TableInvoiceOrder'
import { TableActionsType } from '../../../types/tableProps/table.props';

import { projectsOrdersStore } from '../../../store/project-orders.store';
import { warehouseStore } from '../../../store/warehouse.store';
import { projectsStore } from '../../../store/projects.store';

export default function InvoiceOrder(props: { data: any }) {
    const { id } = useParams();
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [value, setValues] = useState([]);
    const [loanValue, setLoanValue] = useState([]);
    const [saleValue, setSaleValue] = useState([]);

    const { data: projectOrder } = projectsOrdersStore.getUninvoicedById(id as string);
    const { data: project } = projectsStore.getById(id as string);
    let idArr: string[] = [];
    projectOrder?.data?.result.map((item: any) => {
        if (item.type === 'loans' || item.type === 'returns') {
            idArr.push(item.id);
        }
    })
    const { data: projectOrderRentAggregate } = warehouseStore.getWarehosueProductOrdersByRentAggregate(idArr);
    let tableData: any = [];
    projectOrder?.data?.result.map((item: any) => {
        let endData: string = '';
        projectOrderRentAggregate?.data?.result.map((rentAggregate: any) => {
            if (item.id === rentAggregate.projectOrderId) {
                endData = rentAggregate.endDate;
            }
        })
        tableData.push({
            'id': item.id,
            "Numeris": item.number,
            "Pradžia": item.activatedOn,
            "Pabaiga": endData,
            "Tipas": item.type === "loans" ? "Nuoma" : item.type === "returns" ? "Grąžinimas" : item.type === "sales" ? "Pardavimas" : "",
            // "Status": "Returned",
            "Projektas": project?.data?.result?.name,
            "Adresas": project?.data?.result?.address + ', ' + project?.data?.result?.postalCode + ', ' + project?.data?.result?.city,
            "projectId": item.projectId,
            "type": item.type,
        })
    })
    const actions: TableActionsType<any>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: any) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: any) => {
                console.log('delete', item);
            },
        },
    ];

    const handleClickRow = (row: any, checkInfo: boolean) => {
        let data = value;
        let loanData = loanValue;
        let saleData = saleValue;
        if (checkInfo) {
            {/*@ts-ignore*/ }
            const index = data.indexOf(row.id);
            if (index < 0) {
                /* @ts-ignore */
                data.push(row.id)
            }
            {/*@ts-ignore*/ }
            const indexLoan = loanData.indexOf(row.id);
            if (indexLoan < 0 && (row.type === 'loans' || row.type === 'returns')) {
                /* @ts-ignore */
                loanData.push(row.id)
            }
            {/*@ts-ignore*/ }
            const indexSale = saleData.indexOf(row.id);
            if (indexSale < 0 && row.type === 'sales') {
                /* @ts-ignore */
                saleData.push(row.id)
            }
        } else {
            {/*@ts-ignore*/ }
            const index = data.indexOf(row.id);
            if (index > -1) {
                data.splice(index, 1);
            }
            {/*@ts-ignore*/ }
            const indexLoan = loanData.indexOf(row.id);
            if (indexLoan > -1) {
                loanData.splice(index, 1);
            }
            {/*@ts-ignore*/ }
            const indexSale = saleData.indexOf(row.id);
            if (indexSale > -1) {
                saleData.splice(index, 1);
            }
        }
        setValues([...data]);
        setLoanValue([...loanData]);
        setSaleValue([...saleData]);
        if (value.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };
    const onChangePage = (_page: number) => {
        return {};
    };
    const onOpenModal = () => {
        if (isChecked) {
            setRightModalShow(true);
        }
    };

    return (
        <div className="mb-5">
            <div className="mt-4">
                <Table
                    data={tableData || []}
                    uniqueCol="id"
                    hide={['id', 'projectId', 'type']}
                    actions={actions}
                    rowsPerPage={1000}
                    isPagination={false}
                    handleClickRow={handleClickRow}
                    onChangePage={onChangePage}
                    onClickAddNewButton={() => onOpenModal()}
                    handleClickSwitchRow={handleClickRow}
                />
            </div>

            <AddNewProductypetModal
                handleSuccess={() => { }}
                show={rightModalShow}
                orderData={''}
                className={"side-modal-invoice"}
                setShow={setRightModalShow}
                onHide={() => setRightModalShow(false)}
                idData={value}
                setData={setValues}
                setLoan={setLoanValue}
                setSale={setSaleValue}
                modalOpen={setIsChecked}
                idLoan={loanValue}
                idSale={saleValue}
            />
        </div>
    );
}

