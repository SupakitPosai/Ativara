<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    //
    protected $table = 'room_type';
    protected $primaryKey = 'id_room_type';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'int';
}
