<?php

use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Para validar que no haya cedula o correo repetido
Route::get('/client/getclient/{ced}/{email?}', [ClientController::class, 'getclient']);

