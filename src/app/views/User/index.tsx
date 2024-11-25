import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface User {
  username: string;
  // Adicione outros campos do usuário, se necessário
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get<User[]>('/users', {
          signal: controller.signal
        });

        if (isMounted) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>
      {users.length ? (
        <ul className="list-disc pl-5 space-y-2 w-full max-w-md">
          {users.map((user, index) => (
            <li key={index} className="p-2 bg-white shadow rounded">
              {user?.username}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No users to display</p>
      )}
    </>
  );
};

export default Users;
