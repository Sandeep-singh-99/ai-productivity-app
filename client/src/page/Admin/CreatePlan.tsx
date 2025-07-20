import { useGetPlans } from "@/api/planApi";
import CreatePlanForm from "@/components/Admin/CreatePlanForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setPlans } from "@/redux/slice/planSlice";
import { useEffect } from "react";


export default function CreatePlan() {
  const { data: planData } = useGetPlans();

  const dispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state.plans);

  useEffect(() => {
     if (planData && planData.data) {
    dispatch(setPlans(planData.data)); 
  }
  }, [planData, dispatch]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Create Payment Plan</h1>
          <CreatePlanForm />
      </div>

      {
        plans && plans.length > 0 ? (
          <ul>
            {plans.map((plan) => (
              <li key={plan.id}>{plan.planName}</li>
            ))}
          </ul>
        ) : (
          <p>No plans available</p>
        )}
    </div>
  )
}
