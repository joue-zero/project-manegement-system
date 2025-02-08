import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TaskTable from "./TaskTable";
import {Head} from "@inertiajs/react";
export default function Index({ tasks, queryParams }) {
  // console.log(tasks)
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable
                tasks={tasks}
                queryParams={queryParams}
                path={route("task.index")}
                showProjectName={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
