import React, { useRef, useState } from 'react';

import { ValueType } from '../../../types';
import Heading from '../../Atoms/Heading';
import { ModalProps } from '../../../types/props';
import { employeeStore } from '../../../store/employees.store';
import { customerAgreements } from '../../../store/cutomer-agreement.store';
import { companyStore } from '../../../store/company.store';
import { customerContacts } from '../../../store/customer-contacts.store';
import { clientsStore } from '../../../store/clients.store';
import { text } from "./modaltext";

interface IModalProps extends ModalProps {
    show?: boolean;
    testdata?: string;
    subdata?: any;
    agreementId?: any;
    isupdate?: boolean;
    handleSuccess?: () => void;
}
const PrintComponent = React.forwardRef(({
    setShow,
    show,
    testdata,
    subdata,
    isupdate = false,
    handleSuccess,
    agreementId,
    ...props
}: IModalProps,
    ref?: any,) => {

    const [values, setvalues] = useState<any>('');
    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };
    const [type1, setType1] = useState<string>('string');
    const { data: employee } = employeeStore.getAll();
    const { data: company } = companyStore.getAll();
    const { data: customerContact } = customerContacts.getAll();
    const { data: client } = clientsStore.getAll();
    const { data: customerAgreement } = customerAgreements.getById(agreementId as string);
    let managerName: string = '';
    let companyTypePrefix: string = '';
    let customerName: string = '';
    let customerNumber: string = '';
    let customerContactName: string = '';
    let customerData: any = {};

    employee?.data?.result.map((item: any) => {
        if (item.id === company?.data?.result.managerId) {
            managerName = item.firstname + ' ' + item.lastName;
        }
    })

    client?.data?.result.map((item: any) => {
        if (item.id === customerAgreement?.data?.result.customerId) {
            companyTypePrefix = item.companyTypePrefix;
            customerName = item.name;
            customerNumber = item.number;
            customerData = item;

            customerContact?.data?.result.map((contact: any) => {
                if (contact.id === item.managerId) {
                    customerContactName = contact.firstName + ' ' + contact.lastName;
                }
            })
        }
    })

    return (
        <div className="bg-gray-200 p-6" ref={ref} style={{ 'marginTop': '80px' }}>
            {show &&
                <div className="body-content px-4 modal-border">
                    <div className="col-12 col-md-4">
                        <img
                            src={"/assets/images/simis-logo.png"}
                            width={185}
                            alt="Logo"
                        />
                    </div>
                    <div className="body-content px-4">
                        <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                            {`NUOMOS SUTARTIS ${customerAgreement?.data?.result.prefix} ${customerAgreement?.data?.result.number}`}
                        </Heading>
                        <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                            {`${company?.data?.result.city}`}
                        </Heading>
                        <Heading fontSize="xl" className='text-center'>
                            {` ${customerAgreement?.data?.result.createdOn}`}
                        </Heading>

                        <Heading fontSize="xl" className='text-justify mt-3'>
                            {`Uždaroji akcinė bendrovė "${company?.data?.result.name}", juridinio asmens kodas ${company?.data?.result.number}, atstovaujama bendrovės direktoriaus ${managerName}, toliau vadinama Nuomotoju, iš vienos pusės, ir ${companyTypePrefix} „${customerName}“ įmonės kodas ${customerNumber}, atstovaujama direktoriaus ${customerContactName}, toliau vadinama Nuomininku, iš kitos pusės, sudarėme šią sutartį`}
                        </Heading>

                        {
                            text?.map((item: any, key: number) => (
                                <div key={key}>
                                    <Heading fontWeight="bold" fontSize="xl" className='text-start mt-4'>
                                        {`${item.id}     ${item.name}`}
                                        {
                                            item.subItems.map((sub: any) => (
                                                sub?.map((data: any) => (
                                                    < Heading fontWeight="bold" fontSize="sm" className='text-justify mt-3' >
                                                        {`${data.id}    ${data.name}`}
                                                        {
                                                            data.nestedItems?.map((nest: any) => (
                                                                <Heading fontSize="sm" className='text-justify mt-3'>
                                                                    {`${nest.id}    ${nest.name}`}
                                                                </Heading>
                                                            ))
                                                        }
                                                    </Heading>
                                                ))
                                            ))
                                        }
                                    </Heading>
                                </div>
                            ))
                        }
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-6 col-sm-12 col-md-6 col-lg-6 p-2">
                                <Heading fontWeight="bold" fontSize="sm">
                                    {`NUOMOTOJAS`}
                                </Heading>
                                <p className='m-0 p-0'>{`${company?.data?.result.name}`}</p>
                                <p className='m-0 p-0'>{`Buveinė: ${company?.data?.result.address} ${company?.data?.result.postalCode} ${company?.data?.result.city}`}</p>
                                <p className='m-0 p-0'>{`Tel:  ${company?.data?.result.phone}`}</p>
                                <p className='m-0 p-0'>{`el. p.: ${company?.data?.result.email}`}</p>
                                <p className='m-0 p-0'>{`Juridinio asmens kodas: ${company?.data?.result.number}`}</p>
                                <p className='m-0 p-0'>{`PVM mokėtojo kodas:  ${company?.data?.result.vatNumber}`}</p>
                                {/* <p className='m-0 p-0'>{`A.s. ${company?.data?.result.bankAccount}`}</p> */}
                                <p className='m-0 p-0'>{`Bankas: ${company?.data?.result.bankName} `}</p>
                                <p className='m-0 p-0'>{`B.K: ${company?.data?.result.bankCode}`}</p>
                                <br />
                                <p className='m-0 p-0'>{`Direktorius `}</p>
                                <p className='m-0 p-0'>{`${managerName}`}</p>
                            </div>

                            <div className="col-6 col-sm-12 col-md-6 col-lg-6 p-2">
                                <Heading fontWeight="bold" fontSize="sm">
                                    {`NUOMININKAS`}
                                </Heading>
                                <p className='m-0 p-0'>{`${customerData.companyTypePrefix} ${customerData.name}`}</p>
                                <p className='m-0 p-0'>{`Buveinė: ${customerData.address} ${customerData.postalCode} ${customerData.city}`}</p>
                                <p className='m-0 p-0'>{`Tel: ${customerData.phone}`}</p>
                                <p className='m-0 p-0'>{`el. p.: ${customerData.email}`}</p>
                                <p className='m-0 p-0'>{`Įmonės kodas: ${customerData.number}`}</p>
                                <p className='m-0 p-0'>{`PVM mokėtojo kodas:  ${customerData.vatNumber}`}</p>
                                {/* <p className='m-0 p-0'>{`A.s. ${customerData.bankAccount}`}</p> */}
                                <p className='m-0 p-0'>{`Bankas: ${customerData.bankName} `}</p>
                                <p className='m-0 p-0'>{`B.K: ${customerData.bankAccount}`}</p>
                                <br />
                                <p className='m-0 p-0'>{`Direktorius `}</p>
                                <p className='m-0 p-0'>{`${customerContactName}`}</p>
                            </div>
                        </div>
                        <br />

                    </div>
                </div>}
        </div>
    );
});

export default PrintComponent;
