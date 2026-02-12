<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta las migraciones.
     * * Crea las tablas necesarias para usar la base de datos como sistema de almacenamiento rápido (Caché).
     * * Run the migrations.
     */
    public function up(): void
    {
        // Tabla principal de caché
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary(); // La "llave" o nombre del dato guardado
            $table->mediumText('value');      // El contenido del dato (puede ser mucho texto)
            $table->integer('expiration')->index(); // Cuándo debe borrarse automáticamente
        });

        // Tabla para bloqueos de caché (Locks)
        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary(); // Identificador del bloqueo
            $table->string('owner');          // Quién (qué proceso) tiene el candado
            $table->integer('expiration')->index(); // Cuándo se libera el candado si algo falla
        });
    }

    /**
     * Revierte las migraciones.
     * * Elimina las tablas de caché si decides resetear el sistema.
     * * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};