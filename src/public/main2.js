const btn = document.querySelector(".add");

const formIng = document.querySelector(".formIng");

const btnInsert = document.querySelector(".addInsert");

const formIns = document.querySelector(".formIns");

btn.addEventListener("click", agregarIngrediente);

btnInsert.addEventListener("click", agregarIngredienteInsertar);

function agregarIngrediente()
{
    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Nombre de Ingrediente";
    name.name = "ingName";
    name.style ="margin: 5px";

    const flex = document.createElement("div");
    flex.className = "flex";

    formIng.appendChild(flex);
    flex.appendChild(name);
}

function agregarIngredienteInsertar()
{
    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Nombre de Ingrediente";
    name.name = "insName";
    name.style ="margin: 5px";

    const cantidad = document.createElement("input");
    cantidad.type = "text";
    cantidad.placeholder = "Cantidad";
    cantidad.name = "insCantidad";
    cantidad.style ="margin: 5px";

    const unidad = document.createElement("input");
    unidad.type = "text";
    unidad.placeholder = "Id Unidad";
    unidad.name = "insUnidad";
    unidad.style ="margin: 5px";

    const flex = document.createElement("div");
    flex.className = "flexInsertar";

    formIns.appendChild(flex);
    flex.appendChild(name);
    flex.appendChild(cantidad);
    flex.appendChild(unidad);
}