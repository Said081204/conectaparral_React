<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta las migraciones.
     * * Crea las tablas base de ConectaParral: usuarios, tokens y sesiones.
     * * Run the migrations.
     */
    public function up(): void
    {
        // Crea la tabla de 'users' (usuarios) UNIFICADA
        Schema::create('users', function (Blueprint $table) {
            $table->id(); 
            
            // --- Datos de Identidad ---
            $table->string('name'); // Nombre(s)
            $table->string('last_name')->nullable(); // Apellidos (Unificado aquí)
            
            // --- Contacto y Seguridad ---
            $table->string('email')->unique(); 
            $table->string('phone')->nullable(); // Teléfono (Unificado aquí)
            $table->timestamp('email_verified_at')->nullable(); 
            $table->string('password'); 

            // --- Control de Roles y Estado ---
            // 'customer', 'vendor', 'admin'
            $table->string('role')->default('customer'); // Rol (Unificado aquí)
            $table->boolean('is_active')->default(true); // Estado (Unificado aquí)

            // --- Tokens y Tiempos ---
            $table->rememberToken(); 
            $table->timestamps(); 
        });

        // Crea la tabla para recuperar contraseñas olvidadas
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); 
            $table->string('token'); 
            $table->timestamp('created_at')->nullable(); 
        });

        // Crea la tabla para gestionar las sesiones activas (Carrito, login, etc)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); 
            $table->foreignId('user_id')->nullable()->index(); 
            $table->string('ip_address', 45)->nullable(); 
            $table->text('user_agent')->nullable(); 
            $table->longText('payload'); 
            $table->integer('last_activity')->index(); 
        });
    }

    /**
     * Revierte las migraciones (Borra todo).
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};