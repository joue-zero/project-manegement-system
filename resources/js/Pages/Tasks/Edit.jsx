import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm, usePage} from "@inertiajs/react";

export default function Show({projects, users, task}) {
    const {data, setData, post, errors, reset} = useForm({
        name: task.name || "",
        description: task.description || "",
        project_id: task.project_id || "",
        image: task.image || "",
        status: task.status || "",
        priority: task.priority || "",
        due_date: task.due_date || "",
        assigned_to: task.assigned_to || "",
    });
    console.log(errors);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("data");
        post(route("task.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create new task
                    </h2>
                </div>
            }
        >
            <Head title="Tasks"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex justify-center p-5">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg md:w-8/12"
                        >
                            <div className='mb-4'>
                                <img src={task.image} alt={task.name} className='w-1/2 mx-auto'/>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project"
                                    value="Project"
                                />
                                <SelectInput
                                    className="mt-1 block w-full"
                                    name="project"
                                    id="project"
                                    defaultValue={task.project_id}
                                    onChange={(e) => setData("project_id", e.target.value)}
                                >
                                    <option value="">Select Project</option>
                                    {projects.map(e => <option key={e.id} value={e.id}>{e.id} - {e.name}</option>)}
                                </SelectInput>
                                <InputError message={errors.project_id} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_name" value="Task Name"/>

                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                />

                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />

                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />

                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />

                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status"/>

                                <SelectInput
                                    name="status"
                                    id="task_status"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="priority" value="Priority"/>

                                <SelectInput
                                    name="priority"
                                    id="priority"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("priority", e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>

                                <InputError message={errors.priority} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="user" value="Assign To"/>
                                <SelectInput
                                    name="user"
                                    id="user"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("assigned_to", e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.map(e => <option key={e.id} value={e.id}>{e.id} - {e.name}</option>)}
                                </SelectInput>

                                <InputError message={errors.assigned_to} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
