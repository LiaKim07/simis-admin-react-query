import React, { useState } from "react";

import Button from "../../components/Molecules/Button/Button";
import Icon from '../../components/Atoms/Icon';
import Details from "../../components/Molecules/custom/Details";
import SuccessModal from "../../components/Organisms/Modals/SuccessModal";
import EditContractClouse from "../../components/Organisms/companyprofile/EditContractClouse";
import { agreementClausesStore } from '../../store/agreement-clauses.store';

export default function NoteDetail(props: { data: any }) {
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);
    const { data: agreementClausesData } = agreementClausesStore.getAll(); console.log('agreementClausesData', agreementClausesData)

    let companyData: any = {};
    if (agreementClausesData?.data) {
        companyData = {
            "Number": agreementClausesData?.data?.result[0].number,
            "Created On": agreementClausesData?.data?.result[0].createdOn,
            "description": agreementClausesData?.data?.result[0].description,
            "note": agreementClausesData?.data?.result[0].note,
            "CreatedBy": agreementClausesData?.data?.result[0].createdBy,
        }
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
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <Details title="Contract clouses" data={companyData} />
                    </div>
                </div>

                <EditContractClouse
                    handleSuccess={() => setisSuccessModalOpen(true)}
                    show={rightModalShow}
                    className={"side-modal"}
                    setShow={setRightModalShow}
                    onHide={() => setRightModalShow(false)}
                    data={props.data}
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
