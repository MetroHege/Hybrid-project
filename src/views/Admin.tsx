import {useEffect, useState} from 'react';
import AdminMediaRow from '../components/AdminMediaRow';
import AdminUserRow from '../components/AdminUserRow';
import {useMedia, useUser} from '../hooks/apiHooks';
import {UserWithNoPassword} from '../types/DBTypes';

const Admin = () => {
  const {mediaArray} = useMedia();
  const {getAllUsers, deleteUser} = useUser();
  const [usersArray, setUsersArray] = useState<UserWithNoPassword[]>([]);
  const {getUserByToken} = useUser();
  const [user, setUser] = useState<UserWithNoPassword | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsersArray(fetchedUsers);
    };

    fetchUsers();
  }, []);

  // handleDelete is used to delete a user from the database

  const handleDelete = async (user_id: number, token: string) => {
    await deleteUser(user_id, token);
    setUsersArray(usersArray.filter((user) => user.user_id !== user_id));
  };

  // getUser is used to get the user from the token in local storage

  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userResponse = await getUserByToken(token);
      setUser(userResponse.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user?.level_name === 'Admin' ? (
        <>
          <h1 className="mb-6 text-center text-5xl font-bold underline">
            Application users
          </h1>
          <div className="flex justify-center">
            <table className="w-80%">
              <tbody>
                {usersArray.map((user) => (
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
