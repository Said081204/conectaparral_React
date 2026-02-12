<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Lógica para cargar el Manifest según el subdominio --}}
        @php
            $host = $_SERVER['HTTP_HOST'];
            $manifest = 'manifest_public.json'; // Por defecto

            if (str_contains($host, 'vendor.')) {
                $manifest = 'manifest_vendor.json';
            } elseif (str_contains($host, 'admin.')) {
                $manifest = 'manifest_admin.json';
            }
        @endphp

        <link rel="manifest" href="/{{ $manifest }}">
        <meta name="theme-color" content="#1E3A8A">

        {{-- Favicons --}}
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon-32.png') }}?v=1">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon-16.png') }}?v=1">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/apple-touch-icon.png') }}">
        
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        {{-- Registro del Service Worker para que la PWA sea instalable --}}
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('ServiceWorker registrado con éxito: ', registration.scope);
                    }, function(err) {
                        console.log('Fallo en el registro del ServiceWorker: ', err);
                    });
                });
            }
        </script>


        <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
            }
        </script>
    </body>
</html>