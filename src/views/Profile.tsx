import ReactSwitch from 'react-switch';
import MediaRow from '../components/MediaRow';
import {useTheme} from '../contexts/ThemeContext';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const Profile = () => {
  const {mediaArray} = useMedia();
  const {user} = useUserContext();
  const {theme, toggleTheme} = useTheme();

  return (
    <>
      <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4">
        {user && (
          <div className="flex w-full items-center justify-between rounded-lg p-4">
            <div>
              <p className="text-2xl font-bold ">{user.username}</p>
              <p className="">Email: {user.email}</p>
              <p className="">
                Created: {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </div>
            <div>
              <p>Switch to {theme === 'dark' ? 'light' : 'dark'} theme</p>
              <ReactSwitch
                onChange={toggleTheme}
                checked={theme === 'dark'}
                offColor="#767577"
                onColor="#f4f3f4"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
            </div>
          </div>
        )}
        <table className="w-full border-collapse">
          <thead className="text-xl">
            <tr>
              <th className="px-4 py-2">Thumbnail</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Owner</th>
            </tr>
          </thead>
          <tbody>
            {mediaArray
              .filter((item) => item.user_id === user?.user_id)
              .map((item) => (
                <MediaRow key={item.media_id} item={item} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
