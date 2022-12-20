import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';


const DismissOrderContent = ((subdata: any) => {
    const subData = subdata.subdata;
    let today = new Date();


    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl">
                {"UAB “" + subData.name + "”"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"Direktorius"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"ĮSAKYMAS NR. [number]?"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"DĖL ATLEIDIMO IŠ DARBO"}
            </Heading>
            <Br />
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-center'>
                {subData.city}
            </div>
            <Br />
            <Br />
            <Br />
            <div className='text-center'>
                {"Atsižvelgdamas į " + "firstName" + " " + "lastName" + " " + "end" + "? prašymą, atleidžiu jį iš darbo nuo " + "end" + ", " + " pagal LR DK 55 str. 1 dalį. "}
            </div>
            <Br />
            <Br />
            <div>
                <h6>
                    {"Direktoriui: " + subData.managerId}
                </h6>
            </div>
        </div>
    );
});

export default DismissOrderContent;
