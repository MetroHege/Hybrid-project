import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      {user && (
        <>
          <p className="pacifico-regular bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold italic text-transparent">
            {user.username}
          </p>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </>
  );
};

export default Profile;
