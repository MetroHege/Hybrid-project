import { useState } from 'react';
import {useForm} from '../hooks/FormHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);


  const initValues = {username: '', password: '', email: ''};

  const doRegister = async () => {
    try {
      if (usernameAvailable && emailAvailable) {
      await postUser(inputs);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  const {getUsernameAvailable, getEmailAvailable} = useUser();

  const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailBlur = async () => {
    // can also be used like this
    const result = await getEmailAvailable(inputs.email);
    setEmailAvailable(result.available);
  };

  console.log(usernameAvailable, emailAvailable);

  return (
    <div className='shadow-lg p-8 rounded'>
      <h3 className='text-3xl mb-8 text-center font-bold'>REGISTER</h3>
      <form onSubmit={handleSubmit} className='flex flex-col text-center'>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="username">Username</label>
          <input
            className='text-slate-950 m-3 w-2/3 rounded border border-slate-500 p-2'
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        {!usernameAvailable && (
          <div className='flex w-4/5 justify-end pr-4'>
            <p className='text-rose-500'>Username not available!</p>
          </div>
        )}
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="password">Password</label>
          <input
            className='text-slate-950 m-3 w-2/3 rounded border border-slate-500 p-2'
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="email">Email</label>
          <input
            className='text-slate-950 m-3 w-2/3 rounded border border-slate-500 p-2'
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        {!emailAvailable && (
          <div className='flex w-4/5 justify-end pr-4'>
            <p className='text-rose-500'>Email not available!</p>
          </div>
        )}
        <div className='flex w-4/5 justify-center'>
        <button className='m-3 w-1/3 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 hover:font-bold text-black' type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
