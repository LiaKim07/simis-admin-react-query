import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Table from '../../components/Organisms/tables/Table';
import TableDropdown from '../../components/Organisms/tables/ProjectTable';
import { ProjectTableProps, TableActionsType } from '../../types/tableProps/table.props';
import { ProductItemDto } from '../../types/services/product.types';
import { projectsStore } from '../../store/projects.store';
import { invoiceStore } from '../../store/invoice.store';
import { companyContacts } from '../../store/company-contacts.store';
import { clientsStore } from '../../store/clients.store';
import { invoicePaymentsStore } from '../../store/invoicePayments.store';
import EditClientSubModal from "./EditClientSubModal";
import Details from "../../components/Molecules/custom/Details";

export default function ClientInvoice(props: { clients: any }) {
    const { id } = useParams();

    const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);
    const [sendData, setSendData] = useState('');

    const { data: client } = clientsStore.getById(id as string);
    const { data: invoice } = invoiceStore.getAll();
    const { data: project } = projectsStore.getAll();
    const { data: company } = companyContacts.getAll();
    const { data: invoicePayment } = invoicePaymentsStore.getAll();
    let products: any = [];

    invoice?.data?.result.map((item: any) => {
        if (item.customerId === id) {
            let companyName: string = '', projectName: string = '', paymentData: number = 0, paymentId: string = '';
            // invoicePayment?.data?.result.map((invoicePayment: any) => {
            //     // if (invoicePayment.invoiceId === item.id) {
            //     paymentData = paymentData + invoicePayment.amountPayed;
            //     paymentId = invoicePayment.id;
            //     // }
            // })

            company?.data?.result.map((company: any) => {
                if (company.id === item.createdBy) {
                    companyName = company.firstName + ' ' + company.lastName;
                }
            })

            project?.data?.result.map((project: any) => {
                if (project.id === item.projectId) {
                    projectName = project.name;
                }
            })
            console.log('test data', invoicePayment?.data?.result)
            invoicePayment?.data?.result.map((invoicePayments: any) => {
                if (invoicePayments.invoiceId === item.id) {
                    paymentData = paymentData + invoicePayments.amountPayed;
                }
            })

            products.push({
                "Sąskaitos Nr.": item.invoiceNumber,
                "Išrašyta": companyName,
                "Klientas": client?.data?.result.name,
                "Projektas": projectName,
                "Data": item.createdOn,
                "Suma": Number(item.totalAmountExclVat * 1.21).toFixed(2),
                "Apmokėta": Number(paymentData).toFixed(2),
                "Liko": Number((item.totalAmountExclVat * 1.21 - paymentData)).toFixed(2),
                "Mokėjimas": item.isPayed ? "Apmokėta" : "Neapmokėta",
                "tableType": "customer",
                "isPayed": item.isPayed,
                "subData": [],
                "id": item.id
            })
        }
    })

    let clientsInfo = {};
    if (products.length > 0) {
        let suma: number = 0, apmokėta: number = 0, liko: number = 0
        products?.map((item: any) => {
            suma = suma + Number(item.Suma);
            apmokėta = apmokėta + Number(item.Apmokėta);
            liko = liko + Number(item.Liko);
        })
        clientsInfo = {
            'Apyvarta': suma.toFixed(2),
            'Sumokėta': apmokėta.toFixed(2),
            'Skola': liko.toFixed(2),
        }
    }


    const actions: TableActionsType<ProductItemDto>[] = [
        {
            name: 'View',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('add', item);
            },
        },
        {
            name: 'Edit',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log(item);
            },
        },
        {
            name: 'delete',
            icon: 'add',
            handleAction: (item: ProductItemDto) => {
                console.log('delete', item);
                // alert('deleted ' + item['id']);
            },
        },
    ];

    const handleClickRow = (row: any) => {
        setSendData(row.id);
        setisAddNewModalOpen(true)
        console.log('row data', row)
        // navigate(`/dashboard/warehouses/products/${row.id}`);
    };
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <div className="mb-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <Details title="Informacija" data={clientsInfo} />
                </div>
            </div>
            <CustomerTable
                data={products || []}
                uniqueCol="id"
                hide={['id', 'subData', 'tableType', 'isPayed']}
                subuniqueCol="id"
                subhide={['id', 'tableType']}
                showIcon={true}
                showTitle={true}
                actions={actions}
                handleClickRow={handleClickRow}
                onChangePage={onChangePage}
            />

            <EditClientSubModal
                handleSuccess={() => { }}
                show={isAddNewModalOpen}
                className={"side-modal"}
                setShow={setisAddNewModalOpen}
                onHide={() => setisAddNewModalOpen(false)}
                sendData={sendData}
            />
        </div>
    );
}

const CustomerTable = (props: ProjectTableProps) => {
    // const [isAddNewModalOpen, setisAddNewModalOpen] = useState(false);

    return (
        <div className="px-3">
            <div className="mt-4">
                <TableDropdown
                    data={props.data}
                    uniqueCol={props.uniqueCol}
                    hide={props.hide}
                    rowsPerPage={100}
                    subuniqueCol={props.subuniqueCol}
                    subhide={props.subhide}
                    actions={props.actions}
                    showAddNewButton={false}
                    showIcon={props.showIcon}
                    showTitle={props.showTitle}
                    handleClickRow={props.handleClickRow}
                    onChangePage={props.onChangePage}
                    addNewButtonText="Registruoti naują"
                    onClickAddNewButton={() => { }}
                />
            </div>
        </div>
    );
};
