import '../../styles/pages/Signin.scss';

import React from 'react';
import Heading from '../../components/Molecules/Text/Heading';
import SignInForm from '../../components/Organisms/Forms/auth/SignInForm';

export default function Signin() {

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
                  <Heading text={'Prisijungimas'} color={'dark-blue'} weight={'bold'} />
                </div>
              </div>
              <div className="body mt-4">
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
