<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Valores Predeterminados de Autenticación
    |--------------------------------------------------------------------------
    | Controla cuál es el "guardia" principal y el sistema de contraseñas.
    |
    | Esta opción define el "guardia" de autenticación predeterminado y el
    | "broker" de restablecimiento de contraseña para tu aplicación. Puedes
    | cambiar estos valores según sea necesario, pero son un comienzo
    | perfecto para la mayoría de las aplicaciones.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Guardias de Autenticación
    |--------------------------------------------------------------------------
    | Define cómo se mantiene la sesión (normalmente mediante cookies de sesión).
    |
    | A continuación, puedes definir cada guardia de autenticación para tu
    | aplicación. Por supuesto, se ha definido una gran configuración
    | predeterminada para ti que utiliza el almacenamiento de sesión
    | más el proveedor de usuarios de Eloquent.
    |
    | Todos los guardias de autenticación tienen un proveedor de usuarios, 
    | que define cómo se recuperan realmente los usuarios de tu base de 
    | datos u otro sistema de almacenamiento. Típicamente, se utiliza Eloquent.
    |
    | Soportado: "session"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Proveedores de Usuarios
    |--------------------------------------------------------------------------
    | Indica a Laravel de dónde sacar los datos (de la tabla 'users' vía Eloquent).
    |
    | Todos los guardias de autenticación tienen un proveedor de usuarios,
    | que define cómo se recuperan realmente los usuarios de tu base de 
    | datos u otro sistema de almacenamiento utilizado por la aplicación.
    | Típicamente, se utiliza Eloquent.
    |
    | Si tienes múltiples tablas de usuarios o modelos, puedes configurar
    | múltiples proveedores para representar el modelo / tabla. Estos
    | proveedores pueden luego ser asignados a cualquier guardia extra.
    |
    | Soportado: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Restablecimiento de Contraseñas
    |--------------------------------------------------------------------------
    | Configura el tiempo de vida de los enlaces de recuperación y la seguridad.
    |
    | Estas opciones de configuración especifican el comportamiento de la
    | funcionalidad de restablecimiento de contraseña de Laravel, incluyendo
    | la tabla utilizada para el almacenamiento de tokens y el proveedor de
    | usuarios que se invoca para recuperar realmente a los usuarios.
    |
    | El tiempo de expiración es el número de minutos que cada token de
    | restablecimiento será considerado válido. Esta característica de seguridad
    | mantiene los tokens con vida corta para que tengan menos tiempo de ser adivinados.
    |
    | El ajuste de 'throttle' es el número de segundos que un usuario debe esperar
    | antes de generar más tokens de restablecimiento de contraseña. Esto evita
    | que el usuario genere rápidamente una gran cantidad de tokens.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Tiempo de Espera de Confirmación de Contraseña
    |--------------------------------------------------------------------------
    | Define cuánto tiempo dura la "autorización" tras poner la clave.
    |
    | Aquí puedes definir el número de segundos antes de que una ventana de
    | confirmación de contraseña expire y se pida a los usuarios que vuelvan
    | a ingresar su contraseña a través de la pantalla de confirmación.
    | Por defecto, el tiempo de espera dura tres horas.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];