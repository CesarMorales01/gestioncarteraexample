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
        $this->globalVars->urlRoot = "https://carteraexample.tupaginaweb.site/history/";

        // $this->globalVars->myUrl="https://xxxx.bellohogar.online/";
        $this->globalVars->myUrl = "https://carteraexample.tupaginaweb.site/";

        // $this->globalVars->tablaCarteras="Carteras";
        $this->globalVars->tablaCarteras="carteras";

        //$nombreApp="carteraTrabajarMejor";
       // $this->globalVars->dirImagenes = "C:\/laragon\www\/".$nombreApp."\/public\Images\/Clients\/";
          $this->globalVars->dirImagenes = "/home/u629086351/domains/tupaginaweb.site/public_html/carteraexample/public/Images/Clients/";

        $this->globalVars->dirCedulas = "/home/u629086351/domains/tupaginaweb.site/public_html/carteraexample/public/Images/Cedulas/";
        $this->globalVars->urlCedulas =  $this->globalVars->myUrl."Images/Cedulas/";
 
        $this->globalVars->urlImagenes =  $this->globalVars->myUrl."Images/Clients/";
        // $this->globalVars->urlImagenes="https://heladeria.online/Images/Products/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
