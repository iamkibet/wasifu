import { useEffect, useState } from "react";

export default function Users() {
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(false);

  async function fetchAllUsers() {
    try {
      setLoading(true);
        const apiResponse = await fetch("https://dummyjson.com/users");
        
        
      const result = await apiResponse.json();

      if (result.users) {
        setUsersList(result?.users);
        setLoading(false);
      } else {
        setUsersList([]);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFetchUsers() {
    fetchAllUsers();
  }

  //   useEffect(() => {
  //     fetchAllUsers();
  //   }, []);

  console.log(usersList);

  if (loading) return <h1>Fetching Users...</h1>;

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleFetchUsers}>Fetch Users</button>
      <ul>
        {usersList && usersList.length > 0 ? (
          usersList.map((userItem) => (
            <li key={userItem?.id}>
              {userItem?.firstName} {userItem?.lastName}
            </li>
          ))
        ) : (
          <h1>No Users Found</h1>
        )}
      </ul>
    </div>
  );
}
