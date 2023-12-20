<?php

use App\Http\Controllers\AbonosController;
use App\Http\Controllers\CajaController;
use App\Http\Controllers\CarterasController;
use App\Http\Controllers\CateGastosController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\InformesController;
use App\Http\Controllers\ListasController;
use App\Http\Controllers\PrestamosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TotalesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SessionController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/clientes/destroy/{ced}', [ClientController::class, 'eliminarCliente'])->name('client.delete');
    Route::get('/clientes/list/{cartera}', [ClientController::class, 'getClientesByCartera']);
    Route::get('/clientes/{state?}', [ClientController::class, 'listar'])->name('client.list');
    Route::post('/client/actualizar/{id}', [ClientController::class, 'actualizar'])->name('client.actualizar');
    Route::resource('/client', ClientController::class);
    Route::resource('/abonos', AbonosController::class);
    Route::post('/abonos/deleteone', [AbonosController::class, 'eliminarAbono'])->name('abonos.deleteone');
    Route::get('/getabonos/listByDateShow/{cartera}', [AbonosController::class, 'listByDateShow'])->name('getabonos.listByDateShow');
    Route::post('/getabonos/listByDate', [AbonosController::class, 'getParamsForListByDate']);
    Route::resource('/prest', PrestamosController::class);
    Route::post('/prest/edit', [PrestamosController::class, 'actualizarPrestamo'])->name('prest.edit');
    Route::get('/prest/show/{id}', [PrestamosController::class, 'showJson']);
    Route::get('/getPrest/listByDateShow/{cartera}', [PrestamosController::class, 'listByDateShow'])->name('getprest.listByDateShow');
    Route::post('/getPrest/listByDate', [PrestamosController::class, 'getParamsForListByDate']);
    Route::post('/user/actualizar', [UserController::class, 'actualizar'])->name('user.actualizar');
    Route::get('/user/list/{state?}', [UserController::class, 'listar'])->name('user.list');
    Route::resource('/user', UserController::class);
    Route::resource('/spend', GastosController::class);
    Route::get('/spend/list/{cartera}/{state?}', [GastosController::class, 'listar'])->name('spend.list');
    Route::resource('/cateSpend', CateGastosController::class);
    Route::get('/spend/list/bydate/{finicial}/{ffinal}/{cartera}/{category?}', [GastosController::class, 'listByDate']);
    Route::get('/informes/list/{state?}', [InformesController::class, 'listar'])->name('informes.list');
    Route::resource('/informes', InformesController::class);
    Route::get('/carteras/list/{state?}', [CarterasController::class, 'listar'])->name('cartera.list');
    Route::post('/carteras/prede', [CarterasController::class, 'carteraPrede'])->name('cartera.prede');
    Route::resource('/carteras', CarterasController::class);
    Route::resource('/totales', TotalesController::class);
    Route::resource('/caja', CajaController::class);
    Route::resource('/listas', ListasController::class);
});



require __DIR__.'/auth.php';
