const controlador = {};

controlador.cargarLogin = (req, res) =>
{
    res.render("login");
};

controlador.registrarUsuario = (req, res) =>
{
    const dataInsert = req.body;
    req.getConnection((err, connection) =>
    {
        const query = `Insert into usuario (username, clave, Correo) values ('${dataInsert.user}', '${dataInsert.password}', '${dataInsert.email}')`
        console.log(query);
        connection.query(query, (err, cliente) => 
        {
            res.send("Usuario registrado");
        });
    });
}

controlador.borrarCoctel = (req, res) =>
{
    res.send("Borrando coctel");
};


controlador.cargarIngredientes =(req, res) =>
{
    const { id } = req.params;

    req.getConnection((err, connection) =>
    {
        const query = `select ingrediente.Nombre as nombreIngrediente, unidad.Nombre as nombreUnidad, cantidadUnidad from ingrediente natural join ingredientecoctel join unidad where IdCoctel = ${id}`
        connection.query(query, (err, ingredientes) =>
        {
            if(err)
            {
                res.json(err);
            }
            res.render("paginaIngredientes", 
            {
                dataSelect: ingredientes,
                idCoctel: id
            });
        });
    });
};

controlador.borrarCoctel = (req, res) =>
{
    const { id } = req.params;
    req.getConnection((err, connection) =>
    {
        const query = `Delete from coctel where idCoctel = ${id}`;
        console.log(query);
        connection.query(query, (err, cliente) => 
        {
            res.send("Coctel eliminado");
        })
    });
};

controlador.buscarNombre = (req, res) =>
{
    req.getConnection((err, connection) =>
    {
        const query = `select * from Coctel where Nombre = '${req.body.coctelName}'`;

        connection.query(query, (err, cocteles) =>
        {
            console.log(cocteles.length);
            if(err)
            {
                res.json(err);
            }
            res.render("paginaPrincipal", 
            {
                dataSelect: cocteles,
            });
        });
    });
};


controlador.validar = (req, res) =>
{
    usuarioValidado = false;
    req.getConnection((err, connection) =>
    {
        const query = "Select IdUsuario, Clave from usuario where username = '" + req.body.userEmail + "'|| correo = '" + req.body.userEmail + "'"

        connection.query(query, (err, data) =>
        {
            if(err)
            {
                res.json(err);
            }

            if(data.length == 0)
            {
                res.send("Usuario, Email o contraseña incorrecta");
                return;
            }

            usuarioValidado = data[0].Clave.length > 0 && data[0].Clave == req.body.password;
            
            if(usuarioValidado)
            {
                req.getConnection((err, connection) =>
                {
                    connection.query("Select * from coctel where IdUsuario = 1 || IdUsuario = " + data[0].IdUsuario, (err, cocteles) =>
                    {
                        if(err)
                        {
                            res.json(err);
                        }
                        res.render("paginaPrincipal", 
                        {
                            dataSelect: cocteles,
                            IdUsuario: data[0].IdUsuario
                        });
                    });
                });
            }
            else
            {
                res.send("Usuario, Email o contraseña incorrecta");
            }
        });
    });
};

module.exports = controlador