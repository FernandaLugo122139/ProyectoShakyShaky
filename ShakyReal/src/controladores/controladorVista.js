const controlador = {};

controlador.cargarLogin = (req, res) =>
{
    console.log("Cargando Login");
    res.render("login");
};

controlador.validar = (req, res) =>
{
    usuarioValidado = false;
    req.getConnection((err, connection) =>
    {
        console.log("Validando");
        console.log(req.body);
        const query = "Select clave from usuario where username = '" + req.body.userEmail + "'|| correo = '" + req.body.userEmail + "'"

        connection.query(query, (err, clave) =>
        {
            if(err)
            {
                res.json(err);
            }

            usuarioValidado = clave.length > 0 && clave[0].clave == req.body.password;
            
            if(usuarioValidado)
            {
                res.render("Pagina principal");
            }
            else
            {
                res.render("login");
            }
        });
    });
};

module.exports = controlador