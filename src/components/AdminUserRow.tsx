import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {User, UserWithNoPassword} from '../types/DBTypes';

const AdminUserRow = ({user}: [user: UserWithNoPassword]) => {
  const {getAllUsers, deleteUser} = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user_id: number, token: string) => {
    await deleteUser(user_id, token);
    setUsers(users.filter((user) => user.user_id !== user_id));
  };

  const token = localStorage.getItem('token');

  return (
    <div>
      <div key={user.user_id}>
        <p>{user.username}</p>
        <button
          className="block rounded-md bg-gradient-to-r from-rose-600 to-rose-900 p-2"
          onClick={() => handleDelete(user.user_id, token ?? '')}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminUserRow;
