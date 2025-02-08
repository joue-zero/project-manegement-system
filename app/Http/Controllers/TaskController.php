<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortField = request('sort_field', 'created_at');
        $sortDir = request('sort_dir', 'desc');

        // Filter by task name
        // Handle sorting by project name
        if ($sortField === 'project_name') {
            $query->join('projects', 'tasks.project_id', '=', 'projects.id')
                ->orderBy('projects.name', $sortDir)
                ->select('tasks.*'); // Ensure only task columns are selected
        } else {
            // Default sorting by task fields
            $query->orderBy($sortField, $sortDir);
        }
        if (request('name')) {
            $query->where('tasks.name', 'LIKE', '%' . request('name') . '%');
        }

        // Filter by task status
        if (request('status')) {
            $query->where('tasks.status', request('status'));
        }

        if(request('priority')) {
            $query->where('tasks.priority', request('priority'));
        }


        // Eager load the `project` relationship to avoid N+1 queries
        $query->with('project');

        // Paginate the results
        $tasks = $query->paginate(10);

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
