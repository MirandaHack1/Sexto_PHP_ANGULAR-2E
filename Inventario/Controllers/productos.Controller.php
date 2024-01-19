<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../Models/productos.model.php');
$stocks = new Clase_Productos;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $stocks->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_producto = $_POST["ID_producto"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $stocks->uno($ID_producto); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $ID_tienda = $_POST["ID_tienda"];
        $Nombre_producto = $_POST["Nombre_producto"];
        $Precio = $_POST["Precio"];
        $Stock = $_POST["Stock"];
        $datos = array(); //defino un arreglo
        $datos = $stocks->insertar($ID_tienda, $Nombre_producto, $Precio, $Stock); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_producto = $_POST["ID_producto"];
        $ID_tienda = $_POST["ID_tienda"];
        $Nombre_producto = $_POST["Nombre_producto"];
        $Precio = $_POST["Precio"];
        $Stock = $_POST["Stock"];
        $datos = array(); //defino un arreglo
        $datos = $stocks->actualizar($ID_producto, $ID_tienda, $Nombre_producto, $Precio, $Stock); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_producto = $_POST["ID_producto"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $stocks->eliminar($ID_producto); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}