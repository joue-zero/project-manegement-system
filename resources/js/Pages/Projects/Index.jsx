import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constans.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import TableHeading from "@/Components/TableHeading.jsx";
import Modal from "@/Components/Modal";
export default function Index({ success = null, projects = [], queryParams }) {
  // console.log(projects)
  queryParams = queryParams || {};

  const onFieldChanged = (e) => {
    if (e.target.value) {
      queryParams[e.target.name] = e.target.value;
    } else {
      delete queryParams[e.target.name];
    }
    router.get(route('project.index'), queryParams);
  }

  const order = (field) => {
    if (field === queryParams.sort_field) {
      queryParams.sort_dir = queryParams.sort_dir === 'desc' ? 'asc' : 'desc';
    } else {
      queryParams.sort_field = field;
    }
    router.get(route('project.index'), queryParams);
  }

  const deleteProject = (e, id) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this project?')) {
      router.delete(route('project.destroy', id));
    }
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert"> {success} </div>}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table
                  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap mb-2 border-b-2 border-gray-500">
                      <th className='px-3 py-3' onClick={() => order('id')} >
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="id" >
                          ID
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3'>Image</th>
                      <th className='px-3 py-3' onClick={() => order('name')}>
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="name" >
                          Name
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3' onClick={() => order('status')}>
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="status">
                          Status
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3' onClick={() => order('due_date')}>
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="due_date">
                          Due Date
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3' onClick={() => order('created_by')}>
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="created_by">
                          Created By
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3' onClick={() => order('updated_by')}>
                        <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="updated_by">
                          Updated By
                        </TableHeading>
                      </th>
                      <th className='px-3 py-3 text-right'>
                        Actions
                      </th>
                    </tr>
                    <tr>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'>
                        <TextInput
                          defaultValue={queryParams.name}
                          name="name"
                          placeholder="Project Name"
                          isFocused={false}
                          onBlur={(e) => onFieldChanged(e)}
                          onKeyPress={(e) => e.key === 'Enter' && onFieldChanged(e)}

                        />
                      </th>
                      <th className='px-3 py-3'>
                        <SelectInput
                          defaultValue={queryParams.status}
                          name="status"
                          className="w-full"
                          onChange={(e) => onFieldChanged(e)}>
                          <option value="">All</option>
                          <option value="in_progress">In Progress</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3 text-right'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects && projects.data.map(project => (
                      <tr key={project.id} className="">
                        <th className="px-3 py-2">{project.id}</th>
                        <td className="px-3 py-2">
                          {/*<img src={project.image} alt="Project Image" className="w-20" />*/}
                          <img
                            src={project.image}
                            alt="Project Image" className="w-20" />
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link href={route('project.show', project.id)}>{project.name}</Link>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <span
                            className={`px-2 py-1 font-semibold text-xs rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                        <td className="px-3 py-2 text-nowrap">{project.created_by.name}</td>
                        <td className="px-3 py-2 text-nowrap">{project.updated_by.name}</td>
                        <td className="px-3 py-2">
                          <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                          <button onClick={(e) => deleteProject(e, project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
