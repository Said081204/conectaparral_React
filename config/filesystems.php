<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Disco del Sistema de Archivos Predeterminado
    |--------------------------------------------------------------------------
    | Define qué "disco" o carpeta usará Laravel por defecto para guardar archivos.
    |
    | Aquí puedes especificar el disco del sistema de archivos predeterminado que
    | debe ser utilizado por el framework. El disco "local", así como una
    | variedad de discos basados en la nube, están disponibles para tu aplicación.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Discos del Sistema de Archivos
    |--------------------------------------------------------------------------
    | Aquí configuras los diferentes lugares de almacenamiento (Local, Nube, etc).
    |
    | A continuación puedes configurar tantos discos de sistema de archivos como
    | sea necesario, e incluso puedes configurar múltiples discos para el mismo
    | controlador. Se incluyen ejemplos de la mayoría de los controladores.
    |
    | Controladores soportados: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => rtrim(env('APP_URL', 'http://localhost'), '/').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Enlaces Simbólicos (Symbolic Links)
    |--------------------------------------------------------------------------
    | Conecta la carpeta interna de archivos con la carpeta pública de la web.
    |
    | Aquí puedes configurar los enlaces simbólicos que se crearán cuando se
    | ejecute el comando Artisan `storage:link`. Las claves del arreglo deben
    | ser las ubicaciones de los enlaces y los valores sus destinos.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];