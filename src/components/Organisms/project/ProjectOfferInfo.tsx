import React, { useState } from "react";

import Button from "../../Molecules/Button/Button";
import Details from "../../Molecules/custom/Details";
import SuccessModal from "../Modals/SuccessModal";
import AddNewProjectModal from "./AddNewOffer";
import Collapsible from '../../Molecules/Modal/Collapsible';
import SubTable from '../../Organisms/tables/TableSum';
import SubTable1 from '../../Organisms/tables/TableSumRentOrder';

export default function ProjectOfferInfo(props: { project: any }) {
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    let orderInfo = {};
    orderInfo = {
        "Object": "object-1:",
        "Series agreement attachment no:": 5,
        "Date of creation": "2022.05.05",
        "Contact person": "Inžiinierius Giedrius Lubys - 860722237",
        "Products": "1, value: 187,15Є",
        "Services": "1, total: 1,36 Є/day",
        "Transport": "UAB SIMIS 300904595 - Nerijus Norkus ",
        "Additional information": "Additional information about order...",
    }

    const tablemockData1 = [
        {
            'Item code': 'e286508',
            'Name': {
                'name': 'Product Nr1',
                'otherInfo': 'Amount',
            },
            'Weight (kg)': {
                'name': 296,
                'otherInfo': 'Sum',
            },
            'Area (m2)': {
                'name': 5,
                'otherInfo': 'Sum',
            },
            'Value': 1913,
            'Discount (%)': 5,
            'Value 1 psc': '1913 $',
            'Totla value': {
                'name': 5,
                'otherInfo': 'Sum',
            },
            'Quantity': {
                'name': 5,
                'otherInfo': 'Sum',
            },
            'Rent': {
                'name': 1943,
                'otherInfo': 'Sum',
            },
        },
    ]

    const tablemockData2 = [
        {
            'Item code': 'e286508',
            'Name': {
                'name': 'Service1',
                'otherInfo': 'Amount',
            },
            'Quantity': 5,
            'Measuring units': 'psc',
            'Time units': 'd',
            'Value ': 5,
            'Discount (%)': 5,
            'Vaule 1': '5',
            'Total': {
                'name': 55,
                'otherInfo': 'Sum',
            },
            'Execution': 5,
            'Min. term (d)': 30,
        },
    ]
    const onChangePage = (_page: number) => {
        return {};
    };

    return (
        <React.Fragment>
            {props.project ? (
                <div className="py-4 px-5 bg-white">
                    <div className="action py-3 row">
                        <div className="col-3 mr-3">
                            <Button
                                onClick={() => setRightModalShow(true)}
                                className="text-capitalize b-radius"
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="col-3 ml-3">
                            <Button
                                className="text-capitalize b-radius light"
                            // onClick={() => setPopupModalShow(true)}
                            >
                                Archieve
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Details title="Order information" data={orderInfo} />
                        </div>
                        <div className="mb-5">
                            <Collapsible isOpen={true} title="Products">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <SubTable
                                                data={tablemockData1 || []}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => { }}
                                                onChangePage={onChangePage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible isOpen={true} title="Services">
                                <div className="p-3 row">
                                    <div className="mb-5">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-2" >
                                            <SubTable1
                                                data={tablemockData2 || []}
                                                uniqueCol="id"
                                                hide={['id']}
                                                handleClickRow={() => console.log('')}
                                                onChangePage={onChangePage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                        </div>
                    </div>

                    <AddNewProjectModal
                        handleSuccess={() => setisSuccessModalOpen(true)}
                        show={rightModalShow}
                        className={"side-modal"}
                        setShow={setRightModalShow}
                        onHide={() => setRightModalShow(false)}
                        projectOfferId={props.project.id}
                        isUpdating={true}
                    />

                    <SuccessModal
                        isUpdate={true}
                        show={isSuccessModalOpen}
                        onHide={() => setisSuccessModalOpen(false)}
                        setShow={setisSuccessModalOpen}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}
