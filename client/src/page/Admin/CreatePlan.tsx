import CreatePlanForm from "@/components/Admin/CreatePlanForm";


export default function CreatePlan() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Create Payment Plan</h1>
          <CreatePlanForm />
      </div>
    </div>
  )
}
