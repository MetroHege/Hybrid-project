import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {username: '', password: ''};

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className='shadow-lg p-8 rounded'>
      <h3 className='text-3xl mb-8 text-center font-bold'>LOGIN</h3>
      <form onSubmit={handleSubmit} className='flex flex-col text-center'>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="UserWithLevelname">Username</label>
          <input
            className='text-slate-950 m-3 w-2/3 rounded border border-slate-500 p-2'
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="loginpassword">Password</label>
          <input
            className='text-slate-950 m-3 w-2/3 rounded border border-slate-500 p-2'
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className='flex w-4/5 justify-center'>
          <button className='m-3 w-1/3 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 hover:font-bold text-black' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
