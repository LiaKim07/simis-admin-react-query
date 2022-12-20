import '../../../styles/components/Molecules/Avatar/Avatar.scss';

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../../contexts/UserContext';
import useAuthenticator from '../../../hooks/useAuthenticator';
import { queryClient } from '../../../plugins/react-query';
import Dropdown from '../../Atoms/custom/Dropdown';

export default function Avatar() {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('jwt_info');
    localStorage.removeItem('compare_token');
    setUser(undefined);
    navigate('/login');
    queryClient.clear();
  };

  return (
    <div className="avatar d-flex">
      {/* <span className="circle" /> */}
      <img
        src={user?.profileUrl || '/assets/images/avatar.png'}
        className="rounded-profile"
        alt="avatar"
      />
      <Dropdown
        header={
          <p
            className="mb-0"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {user?.username}
          </p>
        }>
        <div className="d-flex flex-column px-3 py-2 shadow rounded bg-white">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={'/change-password'}
            className="text-sm text-black text-decoration-none">
            <span className="f-password">Keisti slaptažodį</span>
          </Link>
          <a
            href=""
            onClick={handleLogout}
            className="text-sm text-black text-decoration-none">
            Atsijungti
          </a>
        </div>
      </Dropdown>
    </div>
  );
}
