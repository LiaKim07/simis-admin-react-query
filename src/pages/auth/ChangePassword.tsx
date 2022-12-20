import '../../styles/pages/Signin.scss';
import React, { useEffect } from 'react';

import Heading from '../../components/Molecules/Text/Heading';
import ChangePasswordForm from '../../components/Organisms/Forms/auth/ChangePasswordForm';
import { useSearchParams } from 'react-router-dom';

export default function ChangePassword() {

  let [searchUsername, setSearchUsername] = useSearchParams();
  let [searchToken, setSearchToken] = useSearchParams();
  useEffect(() => {
    searchUsername.get("username");
  }, [searchUsername]);

  useEffect(() => {
    searchToken.get("token");
  }, [searchToken]);

  return (
    <React.Fragment>
      <div className="container-fluid bg-purple">
        <div className="page-container">
          <div className="content bg-white col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="form-container">
              <div className="header">
                <div className="image-container">
                  <img src={'/assets/images/simis-logo.png'} width={'100'} alt="Logo" />
                </div>
                <div className="form-title mt-4">
                  <Heading text={'Naujo slaptažodžio sukūrimas'} color={'dark-blue'} weight={'bold'} />
                </div>
              </div>
              <div className="body mt-4">
                <ChangePasswordForm changePasswordData={{ name: searchUsername.get("username"), token: searchToken.get("token") }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
