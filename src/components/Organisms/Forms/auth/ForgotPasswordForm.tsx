import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { authStore } from '../../../../store/auth.store';
import { ValueType } from '../../../../types';
import { ForgotPasswordInfo } from '../../../../types/services/auth.types';
import Input from '../../../Atoms/Form/Input';
import Button from '../../../Molecules/Button/Button';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [details, setDetails] = useState<ForgotPasswordInfo>({
    username: '',
  });

  const [error] = useState<string>('');

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  const { mutateAsync, isLoading } = authStore.forgotPassword();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submint data', details)

    await mutateAsync(details, {
      async onSuccess(data) {
        // localStorage.setItem('jwt_info', JSON.stringify(data.data));
        // console.log('compare token', data)
        // localStorage.setItem('compare_token', data.data.token);
        toast.success('El. paštas išsiųstas sėkmingai', { duration: 1200 });
        navigate('/reset-password');
      },
      onError(__error) {
        toast.error('Vartotojas nerastas!', { duration: 3000 });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-danger text-center"> {error ? error : null}</p>
      <div className="input-control mb-3">
        <Input
          placeholder={'Email'}
          name={'username'}
          handleChange={handleChange}
          value={details.username}
        />
      </div>
      <div className="mb-4">
        <Button type={'submit'}>Siųsti</Button>
      </div>
      <div className="text-center mb-3">
        <Link to={'/login'}>
          <span className="f-password">Prisiminėte slaptažodį?</span>
        </Link>
      </div>
    </form>
  );
}
