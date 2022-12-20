import React, { useState } from "react";

import Button from "../../components/Molecules/Button/Button";
import Details from "../../components/Molecules/custom/Details";
import SuccessModal from "../../components/Organisms/Modals/SuccessModal";
import EditEmpContract from "../../components/Organisms/companyprofile/EditEmpContract";

export default function EmpContractDetail(props: { data: any }) {
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    let mockData = {
        "Nr.1": "Company name",
        "Nr.1.1": "Jonas Jonaitis - 86816285",
        "Nr.1.2": "300541512",
        "Nr.1.3": "Jonas Jonaitis",
        "Nr.2": "+37068162354",
        "Nr.3": "info@company.lt",
        "Nr.4": "LT100124765213",
        "Nr.5": "Address",
        "Nr.5.1": "City",
        "Nr.5.2": "Post code: LT-99856",
        "Nr.6": "Country:Country",
    }

    return (
        <React.Fragment>
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
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <Details title="Contract clouses" data={mockData} />
                    </div>
                </div>

                <EditEmpContract
                    handleSuccess={() => setisSuccessModalOpen(true)}
                    show={rightModalShow}
                    className={"side-modal"}
                    setShow={setRightModalShow}
                    onHide={() => setRightModalShow(false)}
                />

                <SuccessModal
                    isUpdate={true}
                    show={isSuccessModalOpen}
                    onHide={() => setisSuccessModalOpen(false)}
                    setShow={setisSuccessModalOpen}
                />
            </div>
        </React.Fragment>
    );
}
