<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class VendorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Vendor/Dashboard');
    }
}