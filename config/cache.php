<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Almacenamiento de Caché Predeterminado
    |--------------------------------------------------------------------------
    | Define qué sistema de memoria se usará por defecto en ConectaParral.
    |
    | Esta opción controla el almacén de caché predeterminado que será utilizado
    | por el framework. Esta conexión se utiliza si no se especifica otra
    | explícitamente al ejecutar una operación de caché dentro de la aplicación.
    |
    */

    'default' => env('CACHE_STORE', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Almacenes de Caché
    |--------------------------------------------------------------------------
    | Aquí se definen todos los "depósitos" de memoria disponibles y sus drivers.
    |
    | Aquí puedes definir todos los "almacenes" de caché para tu aplicación, así
    | como sus controladores (drivers). Incluso puedes definir múltiples almacenes
    | para el mismo controlador para agrupar tipos de elementos guardados.
    |
    | Controladores soportados: "array", "database", "file", "memcached",
    |                           "redis", "dynamodb", "octane",
    |                           "failover", "null"
    |
    */

    'stores' => [

        'array' => [
            'driver' => 'array',
            'serialize' => false,
        ],

        'database' => [
            'driver' => 'database',
            'connection' => env('DB_CACHE_CONNECTION'),
            'table' => env('DB_CACHE_TABLE', 'cache'),
            'lock_connection' => env('DB_CACHE_LOCK_CONNECTION'),
            'lock_table' => env('DB_CACHE_LOCK_TABLE'),
        ],

        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
            'lock_path' => storage_path('framework/cache/data'),
        ],

        'memcached' => [
            'driver' => 'memcached',
            'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
            'sasl' => [
                env('MEMCACHED_USERNAME'),
                env('MEMCACHED_PASSWORD'),
            ],
            'options' => [
                // Memcached::OPT_CONNECT_TIMEOUT => 2000,
            ],
            'servers' => [
                [
                    'host' => env('MEMCACHED_HOST', '127.0.0.1'),
                    'port' => env('MEMCACHED_PORT', 11211),
                    'weight' => 100,
                ],
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => env('REDIS_CACHE_CONNECTION', 'cache'),
            'lock_connection' => env('REDIS_CACHE_LOCK_CONNECTION', 'default'),
        ],

        'dynamodb' => [
            'driver' => 'dynamodb',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
            'endpoint' => env('DYNAMODB_ENDPOINT'),
        ],

        'octane' => [
            'driver' => 'octane',
        ],

        'failover' => [
            'driver' => 'failover',
            'stores' => [
                'database',
                'array',
            ],
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Prefijo de la Llave de Caché
    |--------------------------------------------------------------------------
    | Evita que los datos de esta app se mezclen con otros en el mismo servidor.
    |
    | Al utilizar almacenes de caché como APC, base de datos, memcached, Redis 
    | y DynamoDB, podría haber otras aplicaciones usando el mismo caché. Por
    | esa razón, puedes prefijar cada llave de caché para evitar colisiones.
    |
    */

    'prefix' => env('CACHE_PREFIX', Str::slug((string) env('APP_NAME', 'laravel')).'-cache-'),

];