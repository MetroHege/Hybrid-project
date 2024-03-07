import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {User, UserWithNoPassword} from '../types/DBTypes';

// This component is used to display the user rows in the admin view

const AdminUserRow = ({user}: {user: UserWithNoPassword}) => {
  const {getAllUsers, deleteUser} = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  // handleDelete is used to delete the user

  const handleDelete = async (user_id: number, token: string) => {
    await deleteUser(user_id, token);
    setUsers(users.filter((user) => user.user_id !== user_id));
  };

  const token = localStorage.getItem('token');

  // This is the row that will be displayed in the admin view

  return (
    <>
      <tr key={user.user_id} className="">
        <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
        <td className="whitespace-nowrap px-6 py-4">
          {String(user.created_at)}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
          <button
            className="rounded-md bg-gradient-to-r from-rose-600 to-rose-900 px-4 py-2 text-white"
            onClick={() => handleDelete(user.user_id, token ?? '')}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default AdminUserRow;
