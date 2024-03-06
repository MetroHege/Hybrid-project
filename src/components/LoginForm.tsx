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
    <div className="rounded p-8 shadow-lg">
      <h3 className="mb-8 text-center text-3xl font-bold">LOGIN</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex w-2/5 flex-col">
          <label className="text-left font-bold" htmlFor="UserWithLevelname">
            Username
          </label>
          <input
            className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex w-2/5 flex-col">
          <label className="text-left font-bold" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="w-3/5">
          <button
            className="m-3 mx-auto flex w-1/3 justify-center rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
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
