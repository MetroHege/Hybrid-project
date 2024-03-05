import {useEffect, useState} from 'react';
import AdminMediaRow from '../components/AdminMediaRow';
import AdminUserRow from '../components/AdminUserRow';
import {useMedia, useUser} from '../hooks/apiHooks';
import {User} from '../types/DBTypes';

const Admin = () => {
  const {mediaArray} = useMedia();
  const {getAllUsers, deleteUser} = useUser();
  const [usersArray, setUsersArray] = useState<User[]>([]);

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

  return (
    <>
      <h1 className="mb-6 text-center text-5xl font-bold text-white underline">
        Users
      </h1>
      <table className="w-full border-collapse">
        <thead className="text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">User level</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>
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
      {/* AdminMediaRow */}
      <h1 className="mb-6 text-center text-5xl font-bold text-white underline">
        Media
      </h1>
      <table className="w-full border-collapse">
        <thead className="text-white">
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
  );
};

export default {Admin, useUser};
