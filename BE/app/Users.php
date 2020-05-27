<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    //
    protected $table = 'user';
    protected $primaryKey = 'id_user';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'int';
}
