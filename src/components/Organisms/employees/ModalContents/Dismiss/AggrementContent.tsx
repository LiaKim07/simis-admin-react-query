import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';


const AggrementContent = ((subdata: any) => {
    const subData = subdata.subdata;
    let today = new Date();


    return (
        <div className='mt-5'>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {subData.name + ", " + "ĮM.KODAS " + subData.number + " " + subData.address + " " + subData.city}
            </Heading>
            <Br />
            <div>
                <h5>
                    {"Direktoriui: " + subData.managerId}
                </h5>
            </div>
            <Br />
            <Heading fontSize="xl" className='text-center'>
                {"SUTIKIMAS"}
            </Heading>
            <div className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()}
            </div>
            <div className='text-center'>
                {"CompanyCity"}
            </div>
            <Br />
            <div>
                <h6>
                    {"Aš " + subData.firstName + " " + subData.lastName + "gim d. [bornDate?], nusprendžiu savo noru išeiti iš darbo, UAB „A.R.S.A. project“,  nuo " + subData.endDate + ". " + " Įmonės direktorius " + subData.managerId + "patvirtina darbuotojo prašymą, nereikalaujant dirbti, DK 55 straipsnyje 1 dalyje, numatytam dvidešimt kalendorinių dienų laikotarpiui, nuo rašytinio prašymo pateikimo. Patvirtinu, kad su manimi " + subData.firstName + " " + subData.lastName + ", " + " buvo visiškai atsiskaityta. Komandiruotes dienpinigiai, atlyginimas, kompensacija už nepanaudotas atostogas buvo išmokėta. Pretenzijų dėl atsisakitymo neturiu ir neturėsiu. Su išmokėtu atsiskaitymu sutinku"}
                </h6>
            </div>
            <Br />
            <Heading fontSize="xl" className='text-center'>
                {"ŠALIŲ PARAŠAI"}
            </Heading>
            <Br />
            <div>
                <h6>
                    Я ознакомился с текстом, текст мне был переведен на русский язык устно.
                </h6>
            </div>
            <Br />
            <div>
                <h6>
                    Susipažinau, supratau / ознакомился и понял /     ________________________________________
                </h6>
            </div>
            <Br />
            <div>
                <h6>
                    {subData.name}
                </h6>
            </div>
            <div>
                <h6>
                    {"Direktorius " + subData.managerId}
                </h6>
            </div>
            <Br />
            <div>
                <h6>
                    _____________________________________________
                </h6>
            </div>
        </div>
    );
});

export default AggrementContent;
