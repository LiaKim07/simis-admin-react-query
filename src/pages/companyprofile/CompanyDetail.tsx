import React, { useState } from "react";

import Button from "../../components/Molecules/Button/Button";
import Icon from '../../components/Atoms/Icon';
import Details from "../../components/Molecules/custom/Details";
import SuccessModal from "../../components/Organisms/Modals/SuccessModal";
import EditCompanyProfile from "../../components/Organisms/companyprofile/EditCompanyProfile";

export default function CompanyDetail(props: { data: any }) {
    const [rightModalShow, setRightModalShow] = useState(false);
    const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

    let companyData: any = {};
    if (props.data) {
        companyData = {
            "Company Name": props.data.name,
            "Registration number": props.data.number,
            "Head of company": props.data.managerId,
            "Phone": props.data.phone,
            "E-mail": props.data.email,
            "VAT code": props.data.vatNumber,
            "Address": props.data.address,
            "City": props.data.city,
            "Post code": props.data.postalCode,
            "Country": props.data.country,
            "website": props.data.website,
            "payee": props.data.payee,
            "bankName": props.data.bankName,
            "bankCode": props.data.bankCode,
            "bankAccount": props.data.bankAccount,
            "companyTypePrefix": props.data.companyTypePrefix,
            "Sutarties priedo pastaba": props.data.agreementNote,
            "Grąžinimo pastaba": props.data.transferNote,
            "Perdavimo priedo pastaba": props.data.returnNote,
        }
    }

    return (
        <React.Fragment>
            <div className="py-4 px-5 bg-white">
                <div className="d-flex">
                    <div className="p-2 border d-inline-block me-3">
                        <div className="w-20 h-20 border rounded-circle text-center text-sm">
                            <div className="profile-pic w-20 h-20">
                                <label
                                    htmlFor="profileUrl"
                                    className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                                    <Icon name="plus" size={28} />
                                    <p className="text-xxs">Pridėti nuotrauką</p>
                                </label>
                            </div>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                name="profileUrl"
                                id="profileUrl"
                                onChange={(_e) => {
                                    // const file = e.target.files[0];
                                    // if (file) {
                                    //   const reader = new FileReader();
                                    //   reader.onloadend = () => {
                                    //     setvalues((prev) => ({ ...prev, profileUrl: reader.result }));
                                    //   };
                                    //   reader.readAsDataURL(file);
                                    // }
                                }}
                                hidden
                            />
                        </div>
                    </div>
                    <img src={props.data?.companyLogoUrl} width={'150'} height={150} alt="Logo" />
                </div>
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
                        <Details title="DATA" data={companyData} />
                    </div>
                </div>

                <EditCompanyProfile
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
