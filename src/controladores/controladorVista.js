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



controlador.buscarIngrediente = (req, res) =>
{
    const data = req.body;
    query = `Select IdIngrediente from ingrediente where `;
    dataID = "";
    const { id } = req.params;

    req.getConnection((err, connection) =>
    {
        for(let i = 0; i < data.ingName.length; ++i)
        {
            query += `Nombre like '${data.ingName[i]}%' ||`;
        }
        query = query.slice(0, -2);
        connection.query(query, (err, ID) => 
        {
            query = `SELECT Nombre, IdCoctel FROM shakyshaky.ingredientecoctel natural join coctel where `;
            dataID = ID;
        
            for(let i = 0; i < dataID.length; ++i)
            {
                query += `IdIngrediente = '${dataID[i].IdIngrediente}' ||`;
            }

            query = query.slice(0, -2);
            query = query + `and (IdUsuario = ${id} || IdUsuario = 1) group by Nombre`;
            console.log(query);
            connection.query(query, (err, cocteles) => 
            {
                res.render("paginaResultados", 
                {
                    dataSelect: cocteles,   
                });
            });

        });

    });
}


controlador.cargarIngredientes =(req, res) =>
{
    const { id } = req.params;

    req.getConnection((err, connection) =>
    {
        const query = `select * from ingrediente natural join ingredientecoctel where IdCoctel = ${id}`;
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


controlador.insertarCoctel =(req, res) =>
{
    const { id } = req.params;
    const dataInsert = req.body;
    console.log(dataInsert, id);


    req.getConnection((err, connection) =>
    {
        query = `Insert into coctel (nombre, idUsuario) values ('${dataInsert.coctelName}', ${id})`
        connection.query(query, (err, cliente) => 
        {
            
        });

        for(let i = 0; i < dataInsert['insName'].length; ++i)
        {
            query = `Insert into ingrediente (nombre) values ('${dataInsert['insName'][i]}')`;
            console.log(query);
            connection.query(query, (err, cliente) => 
            {
                
            });
        }

        query = `Select idCoctel from coctel where Nombre = '${dataInsert.coctelName}'`
        connection.query(query, (err, idC) => 
        {
            query = `Select idIngrediente from ingrediente where `
            console.log(idC[0].idCoctel);
            for(let i = 0; i < dataInsert['insName'].length; ++i)
            {
                query += `Nombre = ('${dataInsert['insName'][i]}') ||`;
            }
            query = query.slice(0, -2);

            connection.query(query, (err, idI) => 
            {
                console.log(idI);
                for(let i = 0; i < idI.length; ++i)
                {
                    query = `Insert into ingredientecoctel (IdIngrediente,IdCoctel,CantidadUnidad,IdUnidad) values(${idI[i].idIngrediente}, ${idC[0].idCoctel}, ${dataInsert['insCantidad'][i]}, ${dataInsert['insUnidad'][i]})`;
                    console.log(query);
                    connection.query(query, (err, idIngredientes) => 
                    {

                    });
                }
            });
            res.send("Coctel insertado");
            
        });

        
    });
};


controlador.borrarCoctel = (req, res) =>
{
    const { id } = req.params;
    req.getConnection((err, connection) =>
    {
        const query = `Delete from coctel where idCoctel = ${id}`;
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
        const { id } = req.params;
        const query = `select * from Coctel where Nombre like '${req.body.coctelName}%' and (IdUsuario = ${id} || IdUsuario = 1)`;
        connection.query(query, (err, cocteles) =>
        {
            if(err)
            {
                res.json(err);
            }
            res.render("paginaResultados", 
            {
                dataSelect: cocteles,
                IdUsuario: id
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