import React from 'react';

import Heading from '../../../../Atoms/Heading';
import Br from '../../../../Atoms/Form/Br';
import { companyStore } from '../../../../../store/company.store';


const ContractContent = ((subdata: any) => {
    const subData = subdata.subdata;
    const { data: companyData } = companyStore.getAll();
    let propsData: any = [];
    if (companyData?.data) {
        propsData = companyData?.data?.result;
    }
    let today = new Date();
    return (
        <div>
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"Darbo sutartis"}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-center'>
                {String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear() + ' ' + "sutarties sudarymo Nr.  " + subData.contractNumber}
            </Heading>
            <Heading fontSize="xl" className='text-center'>
                {"Company City"}
            </Heading>
            <Heading fontSize="xl" className='text-center'>
                {"darbo sutarties sudarymo vieta"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {`Darbdavys ${propsData.name}, ${propsData.number}, ${propsData.address}, ${propsData.country}, tel.: ${propsData.phone}, ${propsData.email}`}
            </Heading>
            <Heading fontSize="sm" className='text-center'>
                {"darbdavio pavadinimas, kodas, registruotos buveinės adresas, telefono numeris ir elektroninio pašto adresas"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"atstovaujamas pagal įgaliojimą - Edita Snarskienė, personalo vadovė   "}
            </Heading>
            <Heading fontSize="sm" className='text-center'>
                {"darbdaviui atstovaujančio asmens vardas ir pavardė, pareigos, atstovavimo pagrindas"}
            </Heading>
            <Br />
            <Heading fontWeight="bold" fontSize="xl" className='text-center'>
                {"ir priimamas į darbą asmuo (toliau vadinama – darbuotojas)" + subData.firstName + subData.lastName + " ID Nr." + subData.personalIdentificationNumber + ", a.k." + subData.socialSecurityNumber + "," + subData.address + ", " + subData.city + ", " + subData.country + ", " + subData.phone + ", " + subData.email}
            </Heading>
            <Heading fontSize="sm" className='text-center mb-4'>
                {"vardas ir pavardė; paso ar asmens tapatybės kortelės duomenys (jei nėra šių dokumentų – duomenys iš kitų asmens tapatybę patvirtinančių dokumentų) – asmens kodas, jeigu jo nėra – gimimo data; gyvenamoji vieta; telefono numeris ir elektroninio pašto adresas"}
            </Heading>
            <Heading fontWeight="bold" fontSize="xl" className='text-start'>
                {"sudarė šią darbo sutartį:"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"1. " + subData.firstName + ' ' + subData.lastName + " priimamas dirbti šiomis būtinosiomis darbo sutarties sąlygomis:"}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-start'>
                {`  1.1 ${propsData.name}, ${propsData.address}, ${propsData.city} ${propsData.postalCode}   `}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {" Darbovietė (darbdavio veiklą vykdantis struktūrinis organizacinis darinys (filialas, atstovybė ar kitas struktūrinis,  gamybinis, prekybinis ar kitos veiklos padalinys, jo adresas). Darbo vietos adresas."}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"  1.2. " + subData.employeeRoleId + " pareigose  "}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"  (darbo funkcijos apibūdinimas ar aprašymas arba darbo (pareigybės arba pareigų, profesijos specialybės) pavadinimas ir, jeigu nustatyta – jos hierarchinis ir (arba) kvalifikacijos ar sudėtingumo lygis (laipsnis)"}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"2. Sudaroma " + subData.employmentTypeId + "."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"  (nurodoma darbo sutarties rūšis – neterminuota darbo sutartis, terminuota darbo sutartis, laikinojo darbo sutartis, pameistrystės darbo sutartis, projektinio darbo sutartis, darbo vietos dalijimosi darbo sutartis; darbo keliems darbdaviams sutartis, sezoninio darbo sutartis – įrašyti reikiamus žodžius; "}
            </Heading>

            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"3. Darbdavys įsipareigoja mokėti darbuotojui šį darbo užmokestį: " + subData.salary + " Eur.(vienas tūkstantis šešiasdešimt eurų 00 ct.).  Darbo užmokestis, darbuotojui mokamas vieną kartą per mėnesį (atsižvelgiant į darbuotojo prašymą)."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {" (darbo užmokestis (mėnesio alga arba valandinis atlygis) ir jo sudedamosios dalys, priedai, priemokos, premijos ar kitoks papildomas apmokėjimas; mokėjimo tvarka ir terminai)"}
            </Heading>

            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"4. Nustatomas išbandymo laikotarpis 3 mėnesiai; "}
            </Heading>

            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"5. Nustatoma darbo dienos (pamainos, darbo savaitės (darbo norma)) trukmė: Nustatoma trukmė. 40 val. per savaitę. Dirbama nekintančiu darbo dienos režimu.  "}
            </Heading>

            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"6. Kitos darbo sutarties bei darbo santykių sąlygos, dėl kurių šalys sulygsta:"}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.1. Darbuotojas sutinka būti siunčiamas dirbti į komandiruotes užsienio valstybėse. Darbuotojaspilnai supranta, kad šia darbo sutartimi sulygtas darbo funkcijas vykdys komandiruotėse, užsienio valstybėse. "}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.2. Darbuotojui pasiųstam komandiruotei į užsienio valstybę, mokamas 50 procentų, norminiais teisės aktais nustatytas, dienpinigių dydis. Darbdavys turi teisę, pasibaigus darbuotojo komandiruotei, rašytiniu įsakymu konkrečios komandiruotės laikotarpiui padidinti dienpinigių dydį nuo 50 proc. iki 100 proc., teisės aktuose nustatyto maksimalaus dienpinigių dydžio."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.3. Darbo sutarties šalys sutaria, kad komandiruojant darbuotoją, iki komandiruotės pradžios darbuotojui dienpinigių avansas nemokamas. Su komandiruote susiję dienpinigiai darbuotojui išmokami kartu su darbo užmokesčiu."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.4. Darbo sutarties šalys sutaria, kad darbo sutarties šalies kitai darbo sutarties šaliai DK ir kitų darbo teisės normų ar sutarčių nustatytais atvejais perduodami dokumentai (pranešimai, prašymai, sutikimai, prieštaravimai ir kita) ir kit     a informacija turi būti pateikiami raštu. Dokumentų ir informacijos tinkamu pateikimu raštu laikomi tie atvejai, kada duomenys perduodami įprastai naudojamomis informacinių technologijų priemonėmis - darbuotojo elektroniniu paštu, kuris nurodomas darbo sutartyje, taip pat bendravimo programomis „Viber“, „WhatsApp“, „Messenger“ su sąlyga, kad įmanoma nustatyti informacijos turinį, jos pateikėją, pateikimo faktą ir laiką, taip pat sudarytos protingos galimybės ją išsaugoti."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.4.1. UAB „A.R.S.A. project“ darbuotojui, informaciją (darbuotojui pateikiama informacija apie darbuotojui apskaičiuotas, išmokėtas ir išskaičiuotas sumas (atsiskaitymo lapeliai), informacija apie dirbto darbo laiko trukmę, įmonės įsakymus, darbuotojų darbo grafikus, atostogų grafikus, įspėjimus/įsakymus dėl atleidimo iš darbo, reikalavimus pasiaiškinti, pasiūlymus dėl darbo sutarties nutraukimo šalių susitarimu ir kita) siunčia iš elektroninio pašto info@arsaproject.lt taip pat bendravimo programomis „Viber“, „WhatsApp“, „Messenger“."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.4.2. UAB „A.R.S.A. project“ darbuotojas, informaciją darbdaviui (prašymus dėl atleidimo iš darbo, prašymus dėl atostogų, pasiaiškinimus dėl darbo drausmės pažeidimų, prašymus dėl darbo laiko perkėlimo ir kita) siunčia el. paštu, taip pat bendravimo programomis „Viber“, „WhatsApp“, „Messenger“."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.4.3. Darbuotojo elektroninio pašto adresas bei telefono numeris (kurie naudojami tarpusavio abipusiam informavimui) nurodomi darbuotojo darbo sutartyje."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"6.5. Šalys susitaria, kad darbo sutarčiai pasibaigus, visos darbuotojo su darbo santykiais susijusios išmokos išmokamos, ne vėliau kaip per dešimt darbo dienų nuo darbo sutarties nutraukimo dienos."}
            </Heading>
            <Br />
            <Heading fontSize="sm" className='text-start'>
                {"7. Kasmetinių atostogų suteikimo tvarka, jų trukmė ir apmokėjimo sąlygos nustatomos pagal Lietuvos Respublikos darbo kodekso 126–130 straipsnių nuostatas."}
            </Heading>
            <Br />
            <Heading fontSize="sm" className='text-start'>
                {"8. Kiti darbdavio įsipareigojimai, kurie neprivalomi pagal teisės aktus, bet jiems neprieštarauja, ir kurių nereglamentuoja kolektyvinė sutartis.  "}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.   Asmens duomenys: Darbdavys darbuotojo asmens duomenis tvarko darbdavio teisinių prievolių vykdymo tikslu ir užtikrina, kad darbdavio vykdomas darbuotojo asmens duomenų tvarkymas atitiktų 2016 m. balandžio 27 d. Europos Parlamento ir Tarybos reglamento (ES) 2016/679 dėl fizinių asmenų apsaugos tvarkant asmens duomenis ir dėl laisvo tokių duomenų judėjimo ir kuriuo panaikinama Direktyva 95/46/EB (Bendrasis duomenų apsaugos reglamentas) (OL 2016 L 119, p. 1) bei Lietuvos Respublikos asmens duomenų teisinės apsaugos įstatymo nuostatas."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.1. Darbuotojo asmens duomenys tvarkomi darbdavio vidaus administravimo tikslais (įskaitant, bet nebeapsiribojant, tinkamos komunikacijos su darbuotojais, tinkamų darbo sąlygų užtikrinimo ir darbo sutarties vykdymo tikslais (atsižvelgiant į klientų pageidaujamas darbuotojų savybes): darbuotojų darbo teisių ir pareigų įgyvendinimą; darbdavio darbo teisių ir pareigų įgyvendinimą ir kt.);"}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.2. Kiekvienu tikslu tvarkomų asmens duomenų kategorijos ir saugojimo terminai yra nurodyti Asmens duomenų tvarkymo taisyklėse."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.3.  Darbdavys asmens duomenis renka iš Darbuotojo ir trečiųjų asmenų."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.4. Pasirašydamas darbo sutartį  Darbuotojas leidžia Darbdaviui atlikti visus duomenų tvarkymo veiksmus automatiniu  ir / ar neautomatiniu būdu, įskaitant, bet neapsiribojant registruoti, elektroniniu būdu.    "}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.5. Vidaus administravimo tikslais arba teisės aktų nustatytais pagrindais, Darbdavys gali suteikti asmens duomenis: "}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.5.1. šalims, teikiančioms paslaugas Bendrovei (buhalterines, teisines, darbuotojų saugos ir sveikatos, mokymų ir kitas paslaugas teikiančioms įmonėms);"}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.5.2.  kontroliuojančioms institucijoms."}
            </Heading>
            <Heading fontSize="sm" className='text-start'>
                {"8.1.6. Darbuotojų teisės asmens duomenų apsaugos srityje yra išdėstytos asmens duomenų saugojimo politikoje ir įgyvendinimo priemonėse, su kuriomis Darbuotojas privalo pasirašytinai susipažinti. "}
            </Heading>
            <Br />
            <Heading fontSize="sm" className='text-start'>
                {"8.1.7. Darbuotojas nedelsdamas privalo informuoti Darbdavį apie savo asmeninius juridinius duomenis ir situaciją, susijusius su darbo teisėmis ir pareigomis, bei jų pasikeitimus (pvz. gyvenamoji vieta, telefonas susisiekimui, vardas, pavardė ir pan.). Šia darbo sutartimi darbuotojas leidžia darbdaviui naudoti darbuotojo asmeninius duomenis, kurie yra reikalingi darbdavio darbo teisių ir pareigų įgyvendinimui.(papildomos garantijos, kompensacijos ir kita)"}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"9. Darbuotojo įsipareigojimai, kurių nereglamentuoja kolektyvinė sutartis ir kurie neprivalomi pagal teisės aktus, bet jiems neprieštarauja:"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.1. Darbuotojas įsipareigoja vykdyti darbo funkcijas, numatytas darbuotojo pareiginėse bei darbo saugos instrukcijose, laikytis Lietuvos Respublikos teises aktų, Bendrovės darbo tvarkos taisyklių ir kitų Bendrovės lokalinių aktų, su kuriais jis supažindinamas pasirašytinai ar kai tokie aktai buvo paskelbti Bendrovės Darbuotojams per Bendrovės elektroninį paštą; sąžiningai ir dorai dirbti bendrovės naudai, laikytis darbo drausmės ir etikos normų, bei saugos darbe reikalavimų; laiku ir tiksliai vykdyti Darbdavio ar jo įgaliotų atstovų nurodymus ir pavedimus. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.1.1. Darbdavys turi teisę nutraukti darbo sutartį be įspėjimo ir nemokėti išeitinės išmokos, jeigu Darbuotojas dėl savo kalto veikimo ar neveikimo padaro darbo pareigų, kurias nustato darbo teisės normos ar darbo sutartis, pažeidimą. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"Priežastis nutraukti darbo sutartį gali būti:"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"1) šiurkštus Darbuotojo darbo pareigų pažeidimas;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"2) per paskutinius dvylika mėnesių darbuotojo padarytas antras toks pat darbo pareigų pažeidimas."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"Šiurkščiu darbo pareigų pažeidimu gali būti laikomas:"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"1) neatvykimas į darbą visą darbo dieną ar pamainą be pateisinamos priežasties;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"2) pasirodymas neblaiviam ar apsvaigusiam nuo narkotinių, toksinių ar psichotropinių medžiagų darbo metu darbo vietoje, išskyrus atvejus, kai tokį apsvaigimą sukėlė profesinių pareigų vykdymas;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"3) atsisakymas tikrintis sveikatą, kai toks tikrinimas pagal darbo teisės normas privalomas;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"4) priekabiavimas dėl lyties ar seksualinis priekabiavimas, diskriminacinio pobūdžio veiksmai ar garbės ir orumo pažeidimas kitų darbuotojų ar trečiųjų asmenų atžvilgiu darbo metu ar darbo vietoje; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"5) tyčia padaryta turtinė žala darbdaviui ar bandymas tyčia padaryti jam turtinės žalos;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"6) darbo metu ar darbo vietoje padaryta nusikaltimo požymių turinti veika;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"7) kiti pažeidimai, kuriais šiurkščiai pažeidžiamos darbuotojo darbo pareigos. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.2. Laiku neatvykus į darbą nedelsiant, t. y. ne vėliau kaip per 1 valandą, pranešti administracijai apie neatvykimo faktą bei priežastis telefonu +370 608 28699, arba el. paštu – info@arsaproject.lt."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.3. Nedelsiant, t.y. ne vėliau kaip per 1 valandą pranešti bendrovės administracijai telefonu +370 608 28699 arba el. paštu – info@arsaproject.lt, apie bet kokias ypatingas ar kitaip svarbias aplinkybes, kurios gali paveikti Bendrovę, jos veiklą, turtą ar personalą."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.4. Darbuotojas įsipareigoja nenaudoti jam perduoto turto jokiai kitai veiklai, išskyrus darbo funkcijų vykdymui. Darbdaviui pareikalavus arba nutraukus šią darbo sutartį, darbuotojas privalo grąžinti darbdaviui visą darbdavio ar kitą jam perduotą turtą, kuris privalo būti geros būklės (atsižvelgiant į normalų susidėvėjimą)."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.5. Jeigu darbuotojas atsisako vykti į darbo vietą užsienyje, po jo išankstinio sutikimo,  arba pavėluoja į bet kokią darbdavio užsakytą transporto priemonę, darbuotojas privalo atlyginti darbdaviui visas išlaidas už nupirktus kelionės bilietus ir vizos įforminimą. Šios lėšos išskaičiuojamos iš darbuotojui apskaičiuoto darbo užmokesčio bei kitų, su darbo santykiais susijusių išmokų."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.6. Remiantis LR DK 37 str., jeigu darbo sutartis nutraukiama darbdavio iniciatyva dėl darbuotojo kaltės arba darbuotojo iniciatyva be svarbių priežasčių, darbuotojas įsipareigoja atlyginti darbdaviui, darbdavio turėtas darbuotojo mokymo ar kvalifikacijos tobulinimo išlaidas susijusios su darbuotojo žinių ar gebėjimų, viršijančių darbo veiklai keliamus reikalavimus, suteikimu. Atlygintos turi būti tik darbdavio turėtos išlaidos per paskutinius dvejus metus iki darbo sutarties pasibaigimo. Į mokymo ar kvalifikacijos tobulinimo išlaidas įskaičiuojamos kitos komandiruotės išlaidos (kelionės, nakvynės ir kita)."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.7. Darbuotojas privalo nedelsiant grąžinti turtą darbdaviui pareikalavus, tačiau visais atvejais ne vėliau kaip tarp darbdavio ir darbuotojo sudarytos darbo sutarties nutraukimo (pasibaigimo) dieną."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.8. Jeigu darbo sutartis buvo sudaryta, tačiau neįsigaliojo dėl darbuotojo kaltės – darbuotojui iš anksto neinformavus darbdavio prieš tris darbo dienas iki sutartos darbo pradžios, darbuotojas privalo atlyginti darbdaviui padarytą žalą, kurios dydis ne didesnis, negu darbuotojo darbo užmokestis už sulygtą darbo laikotarpį, tačiau ne ilgesnį negu dvi savaitės."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.9. Neterminuota darbo sutartis ir terminuota darbo sutartis, sudaryta ilgesniam kaip vieno mėnesio laikotarpiui, gali būti nutraukta darbuotojo rašytiniu pareiškimu, apie tai įspėjus darbdavį ne vėliau kaip prieš dvidešimt kalendorinių dienų."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.10. Darbuotojas darbo sutarties vykdymo metu ir pasibaigus darbo sutarčiai asmeniniais ar komerciniais tikslais nenaudos ir kitiems asmenims neatskleis tam tikros iš darbdavio ar dėl atliktos darbo funkcijos gautos informacijos, kurią darbo sutarties šalys savo susitarime dėl konfidencialios informacijos apsaugos įvardys konfidencialia. Konfidencialia informacija negali būti laikomi duomenys, kurie viešai prieinami, taip pat duomenys, kurie pagal teisės aktus ar pagal jų paskirtį negali būti laikomi konfidencialiais ar kurių apsaugai darbdavys nesiima protingų priemonių. Konfidencialios informacijos atskleidimo draudimas netaikomas, kai informacija teikiama valstybės ar savivaldybės institucijai ar įstaigai apie darbdavio daromus darbo ar kitų teisės normų pažeidimus, taip pat kai informacija teikiama teismui ar kitam ginčus nagrinėjančiam organui."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.11. Išskaitos iš darbuotojo darbo užmokesčio gali būti daromos šias atvejais."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"1) grąžinti perduotoms ir darbuotojo nepanaudotoms pagal paskirtį darbdavio pinigų sumoms;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"2) grąžinti sumoms, permokėtoms dėl skaičiavimo klaidų; :"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"3) atlyginti žalai, kurią darbuotojas dėl savo kaltės padarė darbdaviui;"}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"4) išieškoti atostoginiams už suteiktas atostogas, viršijančias įgytą teisę į visos trukmės ar dalies kasmetines atostogas, darbo sutartį nutraukus darbuotojo iniciatyva be svarbių priežasčių (LR DK 55 straipsnis) arba dėl darbuotojo kaltės darbdavio iniciatyva (LR DK 58 straipsnis)."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"Darbdavys turi teisę duoti nurodymą padaryti išskaitą ne vėliau kaip per vieną mėnesį nuo tos dienos, kurią darbdavys sužinojo ar galėjo sužinoti apie atsiradusį išskaitos pagrindą. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12. Darbuotojas privalo atlyginti visą turtinę ir neturtinę žalą darbdaviui, kilusią dėl jo kaltės, įskaitant atvejus, kai Darbuotojas neorganizuoja ar netinkamai organizuoja Darbdavio interesų, įskaitant turtą, apsaugą.  "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"Darbuotojas privalo atlyginti visą žalą šiais atvejais: "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.1. žala padaryta tyčia; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.2. žala padaryta jo veikla, turinčia nusikaltimo požymių; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.3. žala padaryta neblaivaus ar apsvaigusio nuo narkotinių, toksinių ar psichotropinių medžiagų darbuotojo; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.4. žala padaryta pažeidus pareigą saugoti konfidencialią informaciją, susitarimą dėl nekonkuravimo; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.5. darbdaviui padaryta neturtinė žala; "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.6. kai visiško žalos atlyginimo atvejis numatytas kolektyvinėje sutartyje. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.12.7. Išskyrus Darbo kodekse ir kituose įstatymuose numatytus atvejus, darbuotojas privalo atlyginti visą padarytą turtinę žalą, bet ne daugiau kaip jo trijų vidutinių darbo užmokesčių dydžio, o jeigu turtinė žala padaryta dėl darbuotojo didelio neatsargumo, – ne daugiau kaip jo šešių vidutinių darbo užmokesčių dydžio. "}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.13. Darbuotojo padaryta ir jo gera valia šalių susitarimu natūra arba pinigais neatlyginta žala gali būti išskaitoma iš darbuotojui priklausančio darbo užmokesčio darbdavio rašytiniu nurodymu. Tokios išskaitos dydis negali viršyti vieno mėnesio darbuotojo vidutinio darbo užmokesčio dydžio net ir tuo atveju, jeigu buvo padaryta didesnė žala. Darbdavio nurodymas išieškoti šią žalą gali būti priimtas ne vėliau kaip per tris mėnesius nuo žalos paaiškėjimo dienos."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.14. Darbuotojui darbo metu draudžiama užsiimti pašaliniais darbais nesusijusiais su darbo funkcijų atlikimu, tokiais kaip – kalbėti mobiliuoju telefonu (išskyrus neatidėliotinus atvejus), naršyti internete, bendrauti socialiniuose tinkluose, skaityti knygas, žurnalus ir kt., pasikviesti į darbo vietą savo giminaičius ar draugus bei su jais bendrauti. Visas darbuotojo darbo laikas bei pastangos turi būti skiriamos išimtinai darbo funkcijų atlikimui."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"9.15. Ši Darbo sutartis yra galutinis Šalių susitarimas, kuris pakeičia ir turi viršenybę prieš visas ankstesnes tiek žodines, tiek rašytines Šalių sudarytas darbo sutartis, kitus susitarimus bei supratimus, susijusius su šios Darbo sutarties dalyku ir Šalis siejančiais darbo santykiais, nebent kitaip nustatyta šioje Darbo sutartyje.  "}
            </Heading>
            <Br />

            <Heading fontSize="xl" className='text-start'>
                {"10. Įspėjimo terminas, kai darbo sutartis nutraukiama darbdavio ar darbuotojo iniciatyva arba kitais atvejais, nustatomas pagal Lietuvos Respublikos darbo kodekso 55–57, 59, 61 ir 62, 69 straipsnių nuostatas."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"11. Įmonėje galioja kolektyvinė sutartis / kolektyvine sutartimi susipažinau: Kolektyvinės sutarties nėra."}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"12. Ši darbo sutartis įsigalioja " + subData.registered}
            </Heading>
            <Heading fontSize="xl" className='text-start'>
                {"13. Darbuotojas pradeda dirbti " + subData.start}
            </Heading>
            <Br />
            <Heading fontSize="xl" className='text-start'>
                {"14. Ginčai dėl šios darbo sutarties nagrinėjami Lietuvos Respublikos darbo kodekso nustatyta tvarka. Ši darbo sutartis gali būti nutraukta Lietuvos Respublikos darbo kodekso nustatytais pagrindais. Ši darbo sutartis sudaroma dviem egzemplioriais: vienas lieka darbdaviui, kitas – įteikiamas darbuotojui."}
            </Heading>

            <Br />

        </div>
    );
});

export default ContractContent;
