<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Nombre de la Aplicación
    |--------------------------------------------------------------------------
    | Define cómo se llama tu proyecto. Se usa para correos electrónicos,
    | notificaciones y títulos en la interfaz.
    |
    | Este valor es el nombre de tu aplicación, el cual será utilizado cuando
    | el framework necesite colocar el nombre de la aplicación en una
    | notificación o cualquier otro elemento de la interfaz de usuario.
    |
    */
    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Entorno de la Aplicación
    |--------------------------------------------------------------------------
    | Indica si estás en modo 'local' (desarrollo) o 'production'. Ayuda a 
    | Laravel a saber qué tan estrictas deben ser las medidas de seguridad.
    |
    | Este valor determina el "entorno" en el que se está ejecutando actualmente
    | tu aplicación. Esto puede determinar cómo prefieres configurar varios
    | servicios que la aplicación utiliza. Establécelo en tu archivo ".env".
    |
    */
    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Modo de Depuración (Debug)
    |--------------------------------------------------------------------------
    | Si está en 'true', mostrará errores detallados cuando algo falle.
    | IMPORTANTE: En producción (cuando el sitio ya esté en vivo) debe ser 'false'
    | para no mostrar información sensible a los hackers.
    |
    | Cuando tu aplicación está en modo de depuración, se mostrarán mensajes
    | de error detallados con rastreos de pila en cada error que ocurra dentro
    | de tu aplicación. Si se desactiva, se muestra una página de error simple.
    |
    */
    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | URL de la Aplicación
    |--------------------------------------------------------------------------
    | Es la dirección web base de tu sitio. Se usa para generar enlaces 
    | correctos en los correos de recuperación de contraseña o notificaciones.
    |
    | Esta URL es utilizada por la consola para generar URLs correctamente al
    | usar la herramienta de línea de comandos Artisan. Debes establecer esto
    | a la raíz de tu aplicación para que esté disponible en los comandos.
    |
    */
    'url' => env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Zona Horaria
    |--------------------------------------------------------------------------
    | Define la hora oficial del sistema. Para Parral podrías cambiar 
    | 'UTC' por 'America/Chihuahua' si quieres que las ventas se registren
    | con la hora local exacta.
    |
    | Aquí puedes especificar la zona horaria predeterminada para tu aplicación,
    | la cual será utilizada por las funciones de fecha y hora de PHP. Por
    | defecto está configurada en "UTC", lo cual es adecuado para casi todos.
    |
    */
    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Configuración de Idioma (Locale)
    |--------------------------------------------------------------------------
    | 'locale' es el idioma principal (puedes cambiar 'en' por 'es').
    | 'fallback_locale' es el idioma de respaldo si una traducción no existe.
    | 'faker_locale' es el idioma para generar datos de prueba (nombres, teléfonos).
    |
    | El idioma de la aplicación determina el idioma predeterminado que será
    | utilizado por los métodos de traducción y localización de Laravel.
    | Puede configurarse para cualquier idioma que planees traducir.
    |
    */
    'locale' => env('APP_LOCALE', 'es'),

    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'es'),

    'faker_locale' => env('APP_FAKER_LOCALE', 'es_MX'),

    /*
    |--------------------------------------------------------------------------
    | Llave de Encriptación
    |--------------------------------------------------------------------------
    | Es el "alma" de la seguridad. Se usa para cifrar las sesiones y cookies.
    | Nunca debe compartirse y debe generarse una nueva para el servidor real.
    |
    | Esta clave es utilizada por los servicios de encriptación de Laravel y
    | debe ser una cadena aleatoria de 32 caracteres para asegurar que todos
    | los valores cifrados estén seguros. Haz esto antes de desplegar la app.
    |
    */
    'cipher' => 'AES-256-CBC',

    'key' => env('APP_KEY'),

    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    /*
    |--------------------------------------------------------------------------
    | Modo de Mantenimiento
    |--------------------------------------------------------------------------
    | Configura cómo se comporta el sitio cuando ejecutas el comando para 
    | ponerlo "fuera de servicio" por reparaciones.
    |
    | Estas opciones de configuración determinan el controlador utilizado para
    | determinar y gestionar el estado del "modo de mantenimiento" de Laravel.
    | El controlador "cache" permitirá controlar el modo desde varias máquinas.
    |
    */
    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],

];