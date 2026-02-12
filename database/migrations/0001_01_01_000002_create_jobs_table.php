<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta las migraciones.
     * * Crea las tablas necesarias para gestionar tareas en segundo plano.
     * * Run the migrations.
     */
    public function up(): void
    {
        // Tabla de tareas individuales (Jobs)
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index(); // Nombre de la fila (ej. 'default' o 'emails')
            $table->longText('payload');      // Los datos y la lógica de la tarea encriptada
            $table->unsignedTinyInteger('attempts'); // Cuántas veces se ha intentado ejecutar
            $table->unsignedInteger('reserved_at')->nullable(); // Cuándo se tomó para procesar
            $table->unsignedInteger('available_at'); // Cuándo puede empezar a ejecutarse
            $table->unsignedInteger('created_at');   // Cuándo se creó la tarea
        });

        // Tabla para grupos de tareas (Batches)
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');    // Total de tareas en el grupo
            $table->integer('pending_jobs');  // Tareas que faltan por terminar
            $table->integer('failed_jobs');   // Tareas que dieron error
            $table->longText('failed_job_ids'); // IDs de las que fallaron
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        // Tabla de tareas que fallaron definitivamente
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique(); // Identificador único universal
            $table->text('connection');       // Qué conexión usaba (ej. 'database')
            $table->text('queue');            // En qué cola estaba
            $table->longText('payload');      // Los datos originales de la tarea
            $table->longText('exception');    // El error técnico de por qué falló
            $table->timestamp('failed_at')->useCurrent(); // Fecha y hora del fallo
        });
    }

    /**
     * Revierte las migraciones.
     * * Borra las tablas de gestión de tareas.
     * * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};