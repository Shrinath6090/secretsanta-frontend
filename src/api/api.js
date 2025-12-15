// const BASE_URL = "http://localhost:5000/api";
 const BASE_URL = "https://secretsanta-backend.vercel.app/api";

export const getAvailableNumbers = async () => {
  const res = await fetch(`${BASE_URL}/available-numbers`);
  return res.json();
};

export const submitNomination = async (data) => {
  const res = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getBudgetSummary = async () => {
  const res = await fetch(`${BASE_URL}/budgetSummary`);
  return res.json();
};
