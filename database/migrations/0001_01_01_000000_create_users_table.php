<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); 
            
            // --- Datos de Identidad ---
            $table->string('name'); 
            $table->string('last_name')->nullable(); 
            
            // --- Contacto y Seguridad ---
            $table->string('email')->unique(); 
            // Añadimos nullable() porque Google no da el teléfono
            $table->string('phone')->nullable()->unique(); 
            $table->timestamp('email_verified_at')->nullable(); 
            // Añadimos nullable() porque el login de Google no usa contraseña de tu sitio
            $table->string('password')->nullable(); 

            // --- Campos para Login Social ---
            // Guardamos el ID único de Google para reconocer al usuario siempre
            $table->string('google_id')->nullable()->unique();

            // --- Control de Roles y Estado ---
            $table->string('role')->default('customer'); 
            $table->boolean('is_active')->default(true); 

            // --- Tokens y Tiempos ---
            $table->rememberToken(); 
            $table->timestamps(); 
        });

        // Tabla de contraseñas (Sin cambios)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); 
            $table->string('token'); 
            $table->timestamp('created_at')->nullable(); 
        });

        // Tabla de sesiones (Sin cambios)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); 
            $table->foreignId('user_id')->nullable()->index(); 
            $table->string('ip_address', 45)->nullable(); 
            $table->text('user_agent')->nullable(); 
            $table->longText('payload'); 
            $table->integer('last_activity')->index(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};