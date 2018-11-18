<?php

    namespace App\Http\Controllers;


    use App\Categorias;
    use App\Jogos;
    use Illuminate\Http\Request;


    class CategoriasController extends Controller
    {
        public function AllCategorias()
        {
            return response()->json(Categorias::all());
        }

        public function OneCategorias($id)
        {
            return response()->json(Categorias::find($id));
        }
    }