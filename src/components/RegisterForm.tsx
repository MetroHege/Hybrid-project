import {useState} from 'react';
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
        alert('User registered, please login to use the application');
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

  const handleUsernameBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
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
    <div className="rounded p-8 shadow-lg">
      <h3 className="mb-8 text-center text-3xl font-bold">REGISTER</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex w-2/5 flex-col">
          <label className="text-left font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        {!usernameAvailable && (
          <div className="flex w-2/5 justify-end pr-4">
            <p className="font-bold text-rose-500">Username not available!</p>
          </div>
        )}
        <div className="flex w-2/5 flex-col">
          <label className="text-left font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-2/5 flex-col">
          <label className="text-left font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        {!emailAvailable && (
          <div className="flex w-3/5 justify-end pr-4">
            <p className="text-rose-500">Email not available!</p>
          </div>
        )}
        <div className="w-3/5">
          <button
            className=" m-3 mx-auto flex w-1/3 justify-center rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
