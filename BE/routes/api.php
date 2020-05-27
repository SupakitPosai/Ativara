<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('Users', 'Api\UserController');
Route::resource('RoomType', 'Api\RoomTypeController');

Route::get('message', function () {
    $message['name'] = "Juan Perez";
    $message['message'] =  "Prueba mensaje desde Pusher";
    $success = event(new App\Events\NewMessage($message));
    return $success;
});