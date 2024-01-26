// helper functions
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helper";

// components
import Intro from "../components/Intro";
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`welcome ${formData.userName}`);
  } catch (err) {
    throw new Error("There was a problem creating your account!", err);
  }
}

function Dashboard() {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
}

export default Dashboard;
