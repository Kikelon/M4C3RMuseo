console.clear();
let mysql= require("mysql2");
let connection = mysql.createConnection
(
    {
        host : "localhost",
        user: "root",
        password: "1234567",
        database:"museo"
    }
);

connection.connect(function(error)
{
    if (error)
        console.log(error);
    else 
        console.log("Conexion correcta")
});

let queryList = ["SELECT  piezas.nombre AS pieza, piezas_propietarios.fecha_devolucion AS devolución, expositores.nombre AS expositor, propietarios.nombre AS propietario, propietarios.email FROM propietarios, piezas, expositores, piezas_propietarios WHERE piezas.id_pieza = piezas_propietarios.id_pieza AND propietarios.id_propietario = piezas_propietarios.id_propietario AND expositores.id_expositor = piezas.id_expositor AND piezas_propietarios.propio = false", 
                 "SELECT COUNT(*), expositores.tipo FROM piezas, expositores WHERE piezas.id_expositor = expositores.id_expositor GROUP BY expositores.tipo ORDER BY COUNT(*) DESC"];

for (let i = 0; i < queryList.length; i++){
    let sql = queryList[i];
    connection.query(sql,function(err,res)
    {
        if (err)
            throw err;
        else 
        console.log("Query realizada con éxito");
        console.log(res);
    });
}

connection.end();
