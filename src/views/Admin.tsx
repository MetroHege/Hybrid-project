import {useEffect, useState} from 'react';
import AdminMediaRow from '../components/AdminMediaRow';
import AdminUserRow from '../components/AdminUserRow';
import {useMedia, useUser} from '../hooks/apiHooks';
import {User} from '../types/DBTypes';

const Admin = () => {
  const {mediaArray} = useMedia();
  const {getAllUsers, deleteUser} = useUser();
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const {getUserByToken} = useUser();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsersArray(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user_id: number) => {
    await deleteUser(user_id);
    setUsersArray(usersArray.filter((user) => user.user_id !== user_id));
  };

  useEffect(() => {
    const levelName = localStorage.getItem('level_name');
    console.log('level_name:', levelName);

    if (levelName) {
      setRole(levelName);
    }
  }, []);

  return (
    <>
      {role === 'Admin' ? (
        <>
          <h1 className="mb-6 text-center text-5xl font-bold underline">
            Application users
          </h1>
          <div className="flex justify-center">
            <table className="w-80%">
              <tbody>
                {usersArray.map((user: User) => (
                  <AdminUserRow
                    key={user.user_id}
                    user={user}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* AdminMediaRow */}
          <h1 className="mb-6 text-center text-5xl font-bold  underline">
            Media items in the application
          </h1>
          <table className="w-full border-collapse">
            <thead className="">
              <tr>
                <th className="px-4 py-2">Thumbnail</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              {mediaArray.map((item) => (
                <AdminMediaRow key={item.media_id} item={item} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="h-9/10 flex w-4/5 items-center justify-center rounded-lg bg-red-500 p-10 text-center text-white shadow-xl">
              <h1 className="text-4xl font-bold">
                !!! YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE !!!
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default {Admin, useUser};
