<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'ConectaParral') }}</title>

    {{-- Favicons --}}
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon-32.png') }}?v=3">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon-16.png') }}?v=3">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/apple-touch-icon.png') }}?v=3">

    {{-- Fuentes --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @routes

    {{-- ✅ SOLO EN LOCAL: React Refresh --}}
    @if(app()->environment('local'))
        @viteReactRefresh
    @endif

    {{-- ✅ SIEMPRE: Solo app.jsx --}}
    @vite(['resources/js/app.jsx'])

    @inertiaHead

    {{-- ✅ PWA/MANIFEST SOLO EN PRODUCCIÓN (opcional) --}}
    @if(app()->environment('production'))
        @php
            $host = $_SERVER['HTTP_HOST'] ?? '';
            $manifest = 'manifest_public.json';

            if (str_contains($host, 'vendor.')) {
                $manifest = 'manifest_vendor.json';
            } elseif (str_contains($host, 'admin.')) {
                $manifest = 'manifest_admin.json';
            }
        @endphp

        <link rel="manifest" href="/{{ $manifest }}">
        <meta name="theme-color" content="#1E3A8A">
    @endif
</head>

<body class="font-sans antialiased">
    @inertia

    {{-- ✅ Service Worker SOLO EN PRODUCCIÓN (opcional) --}}
    @if(app()->environment('production'))
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
                        .then(function (reg) {
                            reg.update();
                            console.log('SW registrado:', reg.scope);
                        })
                        .catch(function (err) {
                            console.log('Fallo SW:', err);
                        });
                });
            }
        </script>
    @endif
</body>
</html>