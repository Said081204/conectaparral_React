<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Controlador de Sesión Predeterminado
    |--------------------------------------------------------------------------
    | Define dónde se guardará la información temporal del usuario conectado.
    |
    | Esta opción determina el controlador de sesión predeterminado que se utilizará
    | para las solicitudes entrantes. Laravel admite varias opciones de 
    | almacenamiento. El almacenamiento en base de datos es una excelente opción.
    |
    | Soportado: "file", "cookie", "database", "memcached",
    |            "redis", "dynamodb", "array"
    |
    */

    'driver' => env('SESSION_DRIVER', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Tiempo de Vida de la Sesión
    |--------------------------------------------------------------------------
    | Cuánto tiempo (en minutos) puede estar un usuario inactivo antes de salir.
    |
    | Aquí puedes especificar el número de minutos que deseas que la sesión
    | permanezca inactiva antes de que caduque. Si deseas que caduquen 
    | inmediatamente al cerrar el navegador, usa la opción expire_on_close.
    |
    */

    'lifetime' => (int) env('SESSION_LIFETIME', 120),

    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),

    /*
    |--------------------------------------------------------------------------
    | Cifrado de Sesión
    |--------------------------------------------------------------------------
    | Determina si los datos de la sesión deben encriptarse para mayor seguridad.
    |
    | Esta opción te permite especificar fácilmente que todos los datos de tu
    | sesión deben cifrarse antes de almacenarse. Todo el cifrado se realiza
    | automáticamente por Laravel y puedes usar la sesión con normalidad.
    |
    */

    'encrypt' => env('SESSION_ENCRYPT', false),

    /*
    |--------------------------------------------------------------------------
    | Ubicación de Archivos de Sesión
    |--------------------------------------------------------------------------
    | Carpeta donde se guardan las sesiones si usas el driver "file".
    |
    | Al utilizar el controlador de sesión "file", los archivos se colocan en
    | el disco. La ubicación predeterminada se define aquí; sin embargo, 
    | eres libre de proporcionar otra ubicación diferente.
    |
    */

    'files' => storage_path('framework/sessions'),

    /*
    |--------------------------------------------------------------------------
    | Conexión de Base de Datos de Sesión
    |--------------------------------------------------------------------------
    | Especifica la conexión a usar si guardas sesiones en la base de datos.
    |
    | Al usar los controladores "database" o "redis", puedes especificar una
    | conexión que debe usarse para gestionar estas sesiones. Esto debe
    | corresponder a una conexión en tus opciones de configuración.
    |
    */

    'connection' => env('SESSION_CONNECTION'),

    /*
    |--------------------------------------------------------------------------
    | Tabla de Base de Datos de Sesión
    |--------------------------------------------------------------------------
    | Nombre de la tabla (normalmente 'sessions') donde se guardan los accesos.
    |
    | Al usar el controlador "database", puedes especificar la tabla que se
    | utilizará para almacenar las sesiones. Se define un valor predeterminado
    | sensato, pero eres libre de cambiarlo a otra tabla.
    |
    */

    'table' => env('SESSION_TABLE', 'sessions'),

    /*
    |--------------------------------------------------------------------------
    | Almacén de Caché de Sesión
    |--------------------------------------------------------------------------
    | Indica qué motor de caché usar si la sesión depende de uno.
    |
    | Al usar uno de los backends de sesión controlados por caché, puedes
    | definir el almacén de caché que debe usarse. Esto debe coincidir
    | con uno de tus almacenes de caché definidos.
    |
    | Afecta a: "dynamodb", "memcached", "redis"
    |
    */

    'store' => env('SESSION_STORE'),

    /*
    |--------------------------------------------------------------------------
    | Lotería de Limpieza de Sesiones
    |--------------------------------------------------------------------------
    | Probabilidad de que Laravel limpie sesiones viejas para ahorrar espacio.
    |
    | Algunos controladores deben limpiar manualmente su almacenamiento para
    | eliminar sesiones antiguas. Aquí están las probabilidades de que esto
    | ocurra en una solicitud. Por defecto, las probabilidades son 2 de 100.
    |
    */

    'lottery' => [2, 100],

    /*
    |--------------------------------------------------------------------------
    | Nombre de la Cookie de Sesión
    |--------------------------------------------------------------------------
    | El nombre del archivo temporal (cookie) que se guarda en el navegador.
    |
    | Aquí puedes cambiar el nombre de la cookie de sesión creada por el
    | framework. Normalmente, no deberías necesitar cambiar este valor, ya
    | que hacerlo no otorga una mejora de seguridad significativa.
    |
    */

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug((string) env('APP_NAME', 'laravel')).'-session'
    ),

    /*
    |--------------------------------------------------------------------------
    | Ruta de la Cookie de Sesión
    |--------------------------------------------------------------------------
    | Define en qué parte de la web está disponible la cookie (normalmente /).
    |
    | La ruta de la cookie determina para qué ruta estará disponible. 
    | Normalmente será la ruta raíz de tu aplicación, pero eres libre
    | de cambiar esto cuando sea necesario.
    |
    */

    'path' => env('SESSION_PATH', '/'),

    /*
    |--------------------------------------------------------------------------
    | Dominio de la Cookie de Sesión
    |--------------------------------------------------------------------------
    | Define el dominio (url) al que pertenece la sesión.
    |
    | Este valor determina el dominio y los subdominios para los que la cookie
    | está disponible. Por defecto, estará disponible para el dominio raíz
    | sin subdominios. Normalmente, esto no debe cambiarse.
    |
    */

    'domain' => env('SESSION_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | Cookies Solo para HTTPS
    |--------------------------------------------------------------------------
    | Si es true, la sesión solo funciona si la web tiene certificado SSL (seguro).
    |
    | Al establecer esta opción en true, las cookies de sesión solo se enviarán
    | de vuelta al servidor si el navegador tiene una conexión HTTPS. Esto
    | evita que la cookie se envíe cuando no se puede hacer de forma segura.
    |
    */

    'secure' => env('SESSION_SECURE_COOKIE'),

    /*
    |--------------------------------------------------------------------------
    | Acceso Solo por HTTP
    |--------------------------------------------------------------------------
    | Evita que virus o scripts maliciosos (JS) roben la sesión del usuario.
    |
    | Establecer este valor en true evitará que JavaScript acceda al valor
    | de la cookie. La cookie solo será accesible a través del protocolo
    | HTTP. Es poco probable que debas desactivar esta opción.
    |
    */

    'http_only' => env('SESSION_HTTP_ONLY', true),

    /*
    |--------------------------------------------------------------------------
    | Cookies de Mismo Sitio (Same-Site)
    |--------------------------------------------------------------------------
    | Protege contra ataques de falsificación de peticiones desde otros sitios.
    |
    | Esta opción determina cómo se comportan tus cookies cuando se realizan
    | solicitudes entre sitios y se usa para mitigar ataques CSRF. Por
    | defecto, estableceremos este valor en "lax" para permitir seguridad.
    |
    */

    'same_site' => env('SESSION_SAME_SITE', 'lax'),

    /*
    |--------------------------------------------------------------------------
    | Cookies Particionadas
    |--------------------------------------------------------------------------
    | Nueva tecnología de cookies para mayor privacidad en navegadores modernos.
    |
    | Establecer este valor en true vinculará la cookie al sitio de nivel
    | superior para un contexto de sitios cruzados. Se aceptan cuando están
    | marcadas como "secure" y el atributo Same-Site es "none".
    |
    */

    'partitioned' => env('SESSION_PARTITIONED_COOKIE', false),

];