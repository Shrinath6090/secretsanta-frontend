import { useEffect, useState } from "react";

function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/all")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div>
      <h2>Admin View</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.memberName} → {item.selectedNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
