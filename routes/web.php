<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get( '/', function () use ($router) {
    return $router->app->version();
} );

$router->get( '/jogos', 'JogosController@AllJogos' );

$router->get( '/jogos/{id}', 'JogosController@OneJogos' );

$router->post( '/jogos', 'JogosController@create' );

$router->delete( '/jogos/{id}', 'JogosController@delete' );

$router->put( '/jogos/{id}', 'JogosController@update' );

$router->get( '/categorias', 'CategoriasController@AllCategorias' );
$router->get( '/categorias/{id}', 'CategoriasController@OneCategorias' );