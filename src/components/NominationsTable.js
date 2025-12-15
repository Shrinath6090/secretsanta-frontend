import { useEffect, useState } from "react";
import "./table.css";

export default function NominationsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://secretsanta-backend.vercel.app/api/all")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="table-container">
      <h2>Secret Santa Nominations</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number</th>
            <th>Gift Preference</th>
            <th>Budget</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No nominations found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <span className="number-box">{item.selectedNumber}</span>
                </td>
                <td className="preferenceSpan">
                    {item.preferences.map((p,i)=>(
                        <span key={i+1}>{`${i+1}. `}{p}</span>
                    ))}
                </td>
                <td>
                  <span className={`budget ${item.budget}`}>
                    {item.budget}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
