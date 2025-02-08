<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['completed', 'in_progress', 'pending']),
            'image' => $this->faker->imageUrl(),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
