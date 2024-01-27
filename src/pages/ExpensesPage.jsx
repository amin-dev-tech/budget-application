// rrd imports
import { useLoaderData } from "react-router-dom";

// helper functions
import { deleteItem, fetchData } from "../helper";

// components
import Table from "../components/Table";

// library import
import { toast } from "react-toastify";

// loader
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

// action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (err) {
      throw new Error("There was a problem deleting your expense!", err);
    }
  }
}

function ExpensesPage() {
  const { expenses } = useLoaderData("expenses");
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
}

export default ExpensesPage;
