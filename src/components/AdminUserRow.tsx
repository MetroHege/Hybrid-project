type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

const AdminUserRow = (props: {user: User}) => {
  const {user} = props;
  return (
    <tr className="user-row shadow-md">
      <td>{user.user_id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{String(user.created_at)}</td>
      <td className="p-4">
        <div className="mb-2"></div>
        <div>
          <button
            className="block rounded-md bg-gradient-to-r from-rose-600 to-rose-900 p-2"
            onClick={() => console.log('delete', user)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminUserRow;
