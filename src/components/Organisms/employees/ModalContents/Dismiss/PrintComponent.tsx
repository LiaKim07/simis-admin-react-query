import React, { useRef, useState } from 'react';

import { ValueType } from '../../../../../types';
import { ModalProps } from '../../../../../types/props';
import AggrementContent from "./AggrementContent";
import ReqContent from "./ReqContent";
import ReleaseContent from "./ReleaseContent";
import BailiffContent from "./BailiffContent";
import DismissOrderContent from "./DismissOrderContent";

interface IModalProps extends ModalProps {
    show?: boolean;
    testdata?: string;
    subdata?: any;
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
                        testdata === "Sutikimas del atsiskaitymo" ?
                            <AggrementContent subdata={subdata} /> :
                        testdata === "Prašymas dėl atleidimo" ?
                            <ReqContent subdata={subdata} /> :
                        testdata === "Priedas prie sutarties_atleidimas" ?
                            <ReleaseContent subdata={subdata} /> :
                        testdata === "Artūro Žičkaus antstoliui" ?
                            <BailiffContent subdata={subdata} /> :
                            <DismissOrderContent subdata={subdata} />
                    }
                </div>}
        </div>
    );
});

export default PrintComponent;
