<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortField = request('sort_field', 'created_at');
        $sortDir = request('sort_dir', 'desc');
        if (request('name')) {
            $query->where('name', 'LIKE', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDir)->paginate(10)->onEachSide(1);
        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        /** @var \Illuminate\Http\UploadedFile|null $image */
        $image = $data['image'] ?? null;
        if($image) {
            $data['image'] = $image->store('projects/'. Str::random(), 'public');
        }
        Project::create($data);
        return to_route('project.index')
            ->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();


        $sortField = request('sort_field', 'created_at');
        $sortDir = request('sort_dir', 'desc');

        if ($sortField !== 'project_name') {
            $query->orderBy($sortField, $sortDir);
        }
        if (request('name')) {
            $query->where('tasks.name', 'LIKE', '%' . request('name') . '%');
        }

        // Filter by task status
        if (request('status')) {
            $query->where('tasks.status', request('status'));
        }

        if (request('priority')) {
            $query->where('tasks.priority', request('priority'));
        }

        // Paginate the results
        $tasks = $query->paginate(10);

        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();
        return to_route('project.index')
            ->with('success', 'Project deleted successfully');
    }
}
