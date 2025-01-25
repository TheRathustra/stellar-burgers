import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/user/actions';
import { useNavigate } from 'react-router-dom';
import { getTextError } from '../../services/user/slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorText = useSelector(getTextError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
