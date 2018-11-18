<?php

    namespace App\Http\Controllers;


    use App\Categorias;
    use App\Jogos;
    use Illuminate\Http\Request;


    class JogosController extends Controller
    {

        public function AllJogos()
        {
            return response()->json(Jogos::all());
        }

        public function OneJogos($id)
        {
            return response()->json(Jogos::find($id));
        }

        public function create(Request $request)
        {
            $author = Jogos::create($request->all());

            return response()->json($author, 201);
        }

        public function update($id, Request $request)
        {
            $author = Jogos::findOrFail($id);
            $author->update($request->all());

            return response()->json($author, 200);
        }

        public function delete($id)
        {
            Jogos::findOrFail($id)->delete();
            return response('Deletado com sucesso', 200);
        }
    }