// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "../helper";

// rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budget",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((exp) => {
      deleteItem({
        key: "expenses",
        id: exp.id,
      });
    });
    toast.success("Budget deleted successfully!");
  } catch (err) {
    throw new Error("There was a problem deleting your budget!", err);
  }

  return redirect("/budget-application/");
}
