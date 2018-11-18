<?php

    namespace App;

    use Illuminate\Database\Eloquent\Model;

    class Jogos extends Model
    {

        protected $fillable = ['id', 'id_categorias', 'nome', 'ano_lancamento', 'desenvolvedora'];

        protected $hidden = [];

    }