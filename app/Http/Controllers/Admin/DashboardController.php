<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Esto busca: resources/js/Pages/Admin/Dashboard.jsx
        return Inertia::render('Admin/Dashboard');
    }
}