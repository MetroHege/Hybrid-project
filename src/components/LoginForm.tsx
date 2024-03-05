import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {Navigate} from 'react-router';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {username: '', password: ''};

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  // TODO: create a function that checks if the user_level is 2, then redirect to /admin

  const doAdmin = () => {
    handleLogin(inputs);
    if (inputs.username === 'AdminUser') {
      return <Navigate to="/admin" />;
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="rounded p-8 shadow-lg">
      <h3 className="mb-8 text-center text-3xl font-bold">LOGIN</h3>
      <form onSubmit={handleSubmit} className="flex flex-col text-center">
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="UserWithLevelname">
            Username
          </label>
          <input
            className="m-3 w-2/3 rounded border border-slate-500 p-2 text-slate-950"
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="m-3 w-2/3 rounded border border-slate-500 p-2 text-slate-950"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-4/5 justify-center">
          <button
            className="m-3 w-1/3 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
