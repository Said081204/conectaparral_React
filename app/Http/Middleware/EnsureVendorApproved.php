<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVendorApproved
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user) abort(401);

        $profile = $user->vendorProfile;

        if (!$profile || $profile->status !== 'approved') {
            abort(403, 'Tu cuenta de vendedor aún no está aprobada.');
        }

        return $next($request);
    }
}
