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
        $this->globalVars->urlRoot = "https://carteraexample.tupaginaweb.site/";

        // $this->globalVars->myUrl="https://xxxx.bellohogar.online/";
        $this->globalVars->myUrl = "http://carteraexample.test/";

        // $this->globalVars->tablaCarteras="Carteras";
        $this->globalVars->tablaCarteras="carteras";

        $nombreApp="carteraexample";
        $this->globalVars->dirImagenes = "C:\/laragon\www\/".$nombreApp."\/public\Images\/Clients\/";
        //  $this->globalVars->dirImagenes = "/home/u629086351/domains/heladeria.online/public_html/Images/Products/";

        $this->globalVars->dirCedulas = "C:\/laragon\www\/".$nombreApp."\/public\Images\/Cedulas\/";
        $this->globalVars->urlCedulas =  $this->globalVars->myUrl."Images/Cedulas/";
 
        $this->globalVars->urlImagenes =  $this->globalVars->myUrl."Images/Clients/";
        // $this->globalVars->urlImagenes="https://heladeria.online/Images/Products/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
