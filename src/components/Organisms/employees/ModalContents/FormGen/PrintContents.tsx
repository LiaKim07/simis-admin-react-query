import React, { useRef, useState } from 'react';

import { ValueType } from '../../../../../types';
import { ModalProps } from '../../../../../types/props';
import AppContent from "./AppContents";
import ContractContent from "./ContractContents";
import NPDContent from "./NPDContents";
import ProtectionContent from "./ProtectionContents";

interface IModalProps extends ModalProps {
    show?: boolean;
    testdata?: string;
    subdata?: any;
    comapnyData?: any;
    isupdate?: boolean;
    handleSuccess?: () => void;
}
const PrintContent = React.forwardRef(({
    setShow,
    show,
    testdata,
    subdata,
    comapnyData,
    isupdate = false,
    handleSuccess,
    ...props
}: IModalProps,
    ref?: any,) => {

    const [values, setvalues] = useState<any>('');
    const handleChange = (e: ValueType) => {
        setvalues({ ...values, [e.name]: isNaN(Number((e.value as string))) ? e.value : Number((e.value as string)) });
    };

    return (
        <div className="bg-gray-200 p-6" ref={ref}>
            {show &&
                <div className="body-content px-4 modal-border">
                    {
                        testdata === "Prašymas priimti į darbą" ?
                            <AppContent subdata={subdata} comapnyData={comapnyData} /> :
                            testdata === "Darbo sutartis" ?
                                <ContractContent subdata={subdata} comapnyData={comapnyData} /> :
                                testdata === "NPD prašymas" ?
                                    <NPDContent subdata={subdata} comapnyData={comapnyData} /> :
                                    <ProtectionContent subdata={subdata} comapnyData={comapnyData} />
                    }
                </div>}
        </div>
    );
});

export default PrintContent;
