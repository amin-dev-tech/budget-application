// helper functions
import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, waait } from "../helper";

// components
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "newUser": {
      try {
        // throw new Error("HEY DUDE");
        localStorage.setItem("userName", JSON.stringify(values.userName));
        return toast.success(`welcome ${values.userName}`);
      } catch (err) {
        throw new Error("There was a problem creating your account!", err);
      }
    }
    case "createBudget": {
      try {
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount,
        });
        return toast.success("Budget created!");
      } catch (err) {
        throw new Error("There was a problem creating your budget!", err);
      }
    }
  }
}

function Dashboard() {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grin-sm">
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default Dashboard;
