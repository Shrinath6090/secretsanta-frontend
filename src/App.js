import { useEffect, useState } from "react";
import "./App.css";
import {
  getAvailableNumbers,
  submitNomination,
  getBudgetSummary
} from "./api/api";

import Popup from "./components/Popup";
import NumberSelector from "./components/NumberSelector";
import BudgetSummary from "./components/BudgetSummary";

export default function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    selectedNumber: null,
    preferences: ["", "", ""],
    budget: ""
  });

  const [numbers, setNumbers] = useState([]);
  const [summary, setSummary] = useState({});
  const [popup, setPopup] = useState("");

  useEffect(() => {
    loadNumbers();
    loadSummary();
  }, []);

  const loadNumbers = async () => {
    setNumbers(await getAvailableNumbers());
  };

  const loadSummary = async () => {
    setSummary(await getBudgetSummary());
  };

  const handlePreference = (i, value) => {
    const updated = [...form.preferences];
    updated[i] = value;
    setForm({ ...form, preferences: updated });
  };

  const handleSubmit = async () => {
    const res = await submitNomination(form);

    if (res.message === "Successfully submitted") {
      setPopup("Successfully Submitted!");
      setForm({
        firstName: "",
        lastName: "",
        selectedNumber: null,
        preferences: ["", "", ""],
        budget: ""
      });
      await loadNumbers();
      await loadSummary();
      return;
    }

    if (res.code === "NUMBER_TAKEN") {
      setPopup("Number already taken. Please select another.");
      await loadNumbers();
      setForm({ ...form, selectedNumber:null});
      return;
    }

    setPopup(res.message || "Something went wrong");
  };

  const isDisabled =
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.selectedNumber ||
    !form.preferences[0].trim() ||
    !form.preferences[1].trim() ||
    !form.budget;

  return (
    <>
      <Popup message={popup} onClose={() => setPopup("")} />

      <div className="container">
        <h1>🎅 Secret Santa Nomination</h1>

        <div>
          <label>First Name</label>
          <input
          placeholder="First Name"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
        />
        </div>

        <div>
          <label>Last Name</label>
          <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
        />
        </div>

        <h3>Select Number</h3>
        <NumberSelector
          numbers={numbers}
          selected={form.selectedNumber}
          onSelect={n => setForm({ ...form, selectedNumber: n })}
        />

        <div className="selected-box">
          Selected Number:
          <div>
            <button className="SelectedNumberBtn">{<strong>{form.selectedNumber || "-"}</strong>}</button>
          </div>
        </div>

        <h3>Gift Preferences</h3>
        {form.preferences.map((p, i) => (
          <div className="preLabel" key={i}>
            <label>{`Preference ${i + 1}${i < 2 ? " *" : ""}`}</label>
            <input
            key={i}
            placeholder={`Preference ${i + 1}`}
            value={p}
            onChange={e => handlePreference(i, e.target.value)}
          />
          </div>
        ))}

        <h3>Gift Budget</h3>
        {["300-500", "500-700", "700-1000"].map(b => (
            <label className='diDiv' key={b}>
              <input
              type="radio"
              name="budget"
              value={b}
              checked={form.budget === b}
              onChange={e => setForm({ ...form, budget: e.target.value })}
            />
            <span className="budgetLabel">{b}</span>
            </label>
            
        ))}
        <BudgetSummary data={summary} />
        <button className="submitBtn" disabled={isDisabled} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
