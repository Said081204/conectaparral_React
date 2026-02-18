<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
        /**
         * Run the migrations.
         */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            // Relación con el usuario (si borras al usuario, se borran sus direcciones)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->string('alias');          // Ej: Mi Casa
            $table->string('name');           // Nombre del destinatario
            $table->string('phone', 10);      // Limitado a 10 para México
            $table->string('cp', 5);          // Limitado a 5 para México
            $table->string('city');
            $table->string('state');
            $table->string('colonia');
            $table->string('address');        // Calle y número
            $table->string('between_streets')->nullable();
            $table->text('references')->nullable();
            $table->boolean('is_default')->default(false); // Para saber si es la principal
            $table->timestamps();
        });
    }
};
