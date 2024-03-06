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
      <div className={theme === 'dark' ? 'dark' : ''}>
        {/* rest of your component */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {user && (
            <>
              <div className="rounded-lg bg-gray-200 p-4 dark:bg-rose-500">
                <p className="text-2xl font-bold text-gray-800">
                  {user.username}
                </p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">
                  Created: {new Date(user.created_at).toLocaleString('fi-FI')}
                </p>
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
            </>
          )}

          <table className="w-full border-collapse">
            <thead className="text-xl text-white">
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
      </div>
    </>
  );
};

export default Profile;
