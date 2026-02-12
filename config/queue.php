<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Nombre de la Conexión de Cola Predeterminada
    |--------------------------------------------------------------------------
    | Define qué sistema usará ConectaParral para manejar tareas en segundo plano.
    |
    | El sistema de colas de Laravel admite una variedad de backends a través de 
    | una API única y unificada. El valor predeterminado se define abajo.
    |
    */

    'default' => env('QUEUE_CONNECTION', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Conexiones de Cola
    |--------------------------------------------------------------------------
    | Aquí configuras dónde se guardarán físicamente las tareas pendientes.
    |
    | Aquí puedes configurar las opciones de conexión para cada backend de cola 
    | utilizado por tu aplicación. Se proporciona un ejemplo para cada uno.
    |
    | Drivers: "sync", "database", "beanstalkd", "sqs", "redis",
    |          "deferred", "background", "failover", "null"
    |
    */

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'connection' => env('DB_QUEUE_CONNECTION'),
            'table' => env('DB_QUEUE_TABLE', 'jobs'),
            'queue' => env('DB_QUEUE', 'default'),
            'retry_after' => (int) env('DB_QUEUE_RETRY_AFTER', 90),
            'after_commit' => false,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => env('BEANSTALKD_QUEUE_HOST', 'localhost'),
            'queue' => env('BEANSTALKD_QUEUE', 'default'),
            'retry_after' => (int) env('BEANSTALKD_QUEUE_RETRY_AFTER', 90),
            'block_for' => 0,
            'after_commit' => false,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'default'),
            'suffix' => env('SQS_SUFFIX'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'after_commit' => false,
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => env('REDIS_QUEUE_CONNECTION', 'default'),
            'queue' => env('REDIS_QUEUE', 'default'),
            'retry_after' => (int) env('REDIS_QUEUE_RETRY_AFTER', 90),
            'block_for' => null,
            'after_commit' => false,
        ],

        'deferred' => [
            'driver' => 'deferred',
        ],

        'background' => [
            'driver' => 'background',
        ],

        'failover' => [
            'driver' => 'failover',
            'connections' => [
                'database',
                'deferred',
            ],
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Procesamiento por Lotes (Job Batching)
    |--------------------------------------------------------------------------
    | Configura la tabla para rastrear grupos de tareas que se ejecutan juntas.
    |
    | Las siguientes opciones configuran la base de datos y la tabla que 
    | almacenan la información del procesamiento por lotes de tareas.
    |
    */

    'batching' => [
        'database' => env('DB_CONNECTION', 'sqlite'),
        'table' => 'job_batches',
    ],

    /*
    |--------------------------------------------------------------------------
    | Tareas de Cola Fallidas
    |--------------------------------------------------------------------------
    | Define dónde se anotan las tareas que no pudieron completarse (ej. error de red).
    |
    | Estas opciones configuran el comportamiento del registro de tareas fallidas 
    | para que puedas controlar cómo y dónde se almacenan.
    |
    | Drivers soportados: "database-uuids", "dynamodb", "file", "null"
    |
    */

    'failed' => [
        'driver' => env('QUEUE_FAILED_DRIVER', 'database-uuids'),
        'database' => env('DB_CONNECTION', 'sqlite'),
        'table' => 'failed_jobs',
    ],

];