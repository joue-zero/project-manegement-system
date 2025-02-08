import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constans.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
export default function TaskTable({ queryParams, tasks = [], path, showProjectName = false }) {
    queryParams = queryParams || {};

    const onFieldChanged = (e) => {
        if (e.target.value) {
            queryParams[e.target.name] = e.target.value;
        } else {
            delete queryParams[e.target.name];
        }
        router.get(path, queryParams);
    }

    const order = (field) => {
        if (field === queryParams.sort_field) {
            queryParams.sort_dir = queryParams.sort_dir === 'desc' ? 'asc' : 'desc';
        } else {
            queryParams.sort_field = field;
        }
        router.get(path, queryParams);
    }
    return (
        <>
            <div className="overflow-auto">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight mb-3 text-center">
                    Tasks
                </h2>
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
                            {showProjectName && <th className='px-3 py-3' onClick={() => order('project_name')}>
                                <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="project_name" >
                                    Project Name
                                </TableHeading>
                            </th>}
                            <th className='px-3 py-3' onClick={() => order('name')}>
                                <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="name" >
                                    Task Name
                                </TableHeading>
                            </th>
                            <th className='px-3 py-3' onClick={() => order('status')}>
                                <TableHeading sortField={queryParams.sort_field} sortDir={queryParams.sort_dir} field="status">
                                    Status
                                </TableHeading>
                            </th>
                            <th className='px-3 py-3'>
                                Priority
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
                            {showProjectName && <th className='px-3 py-3'></th>}
                            <th className='px-3 py-3'>
                                <TextInput
                                    defaultValue={queryParams.name}
                                    name="name"
                                    placeholder="Task Name"
                                    isFocused={false}
                                    onBlur={(e) => onFieldChanged(e)}
                                    onKeyPress={(e) => e.key === 'Enter' && onFieldChanged(e)}

                                />
                            </th>
                            <th className='px-3 py-3'>
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    name="status"
                                    className=""
                                    onChange={(e) => onFieldChanged(e)}>
                                    <option value="">All</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className='px-3 py-3'>
                                <SelectInput
                                    defaultValue={queryParams.priority}
                                    name="priority"
                                    className=""
                                    onChange={(e) => onFieldChanged(e)}>
                                    <option value="">All</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Meduim</option>
                                    <option value="high">high</option>
                                </SelectInput>
                            </th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3 text-right'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.data.map(task => (
                            <tr key={task.id} className="">
                                <th className="px-3 py-2">{task.id}</th>
                                <td className="px-3 py-2">
                                    {/*<img src={task.image} alt="Project Image" className="w-20" />*/}
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK8cu1CSWR5Olmpms_4WnF6FIiItNMjQP4BA&s"
                                        alt="Project Image" className="w-20" />
                                </td>
                                {showProjectName && <td className="px-3 py-2 text-nowrap">
                                    <Link href={route('project.show', task.project.id)}>{task.project.name}</Link>
                                </td>}
                                <td className="px-3 py-2 text-nowrap">{task.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <span
                                        className={`px-2 py-1 font-semibold text-xs rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    <span
                                        className={`px-2 py-1 font-semibold text-xs rounded text-white ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}>
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                <td className="px-3 py-2 text-nowrap">{task.created_by.name}</td>
                                <td className="px-3 py-2 text-nowrap">{task.updated_by.name}</td>
                                <td className="px-3 py-2">
                                    <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                    <Link href={route('task.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}
