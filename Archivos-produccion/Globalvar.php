<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use stdClass;

class Globalvar extends Model
{
    use HasFactory;

    public $globalVars;

    function __construct()
    {
        $this->globalVars = new stdClass();
        //$this->globalVars->urlRoot = "https://bellohogar.online/";
        $this->globalVars->urlRoot = "http://147.93.118.6/carteraexample/history/";

        // $this->globalVars->myUrl="https://xxxx.bellohogar.online/";
        $this->globalVars->myUrl = "http://147.93.118.6/carteraexample/";

        // $this->globalVars->tablaCarteras="Carteras";
        $this->globalVars->tablaCarteras="carteras";

        //$nombreApp="carteraTrabajarMejor";
       // $this->globalVars->dirImagenes = "C:\/laragon\www\/".$nombreApp."\/public\Images\/Clients\/";
          $this->globalVars->dirImagenes = "/var/www/carteraexample/public_html/public/Images/Clients/";

        $this->globalVars->dirCedulas = "/var/www/carteraexample/public_html/public/Images/Cedulas/";
        $this->globalVars->urlCedulas =  $this->globalVars->myUrl."Images/Cedulas/";
 
        $this->globalVars->urlImagenes =  $this->globalVars->myUrl."Images/Clients/";
        // $this->globalVars->urlImagenes="https://heladeria.online/Images/Products/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
