let table = document.getElementById("tableBody")
let congressData = data.results[0].members
let checkboxes = document.querySelectorAll("input[type='checkbox']")
let selecting = document.getElementById("selectState")
let options = document.querySelectorAll('select')

// ---------------------------------------------------------------------------------

//Table: pinto la tabla con la info completa
congressData.forEach(member => {
    let rows = document.createElement("tr")
    rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
    table.appendChild(rows)
})

// ---------------------------------------------------------------------------------
//por cada checkbox,previamente extraído, escucho un click y ejecuto
checkboxes.forEach(checkbox => checkbox.addEventListener("change",handleCheck))
//creo función para el click
function handleCheck() {
    //la tabla se reinicia al volver al "no click"
    table.innerHTML = "";
    //creo variable donde guardo en un array los checkbox chequeados filtrados 
    let chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked)
    //creo array donde guardo los valores de los chequeados
    let valoresChequeados = chequeados.map(chequeado => chequeado.value)
    //condiciono a los valores de los chequeados 
    //si no hay valores chequeados
    if (valoresChequeados.length === 0) {
        //vueldo a mostrar la tabla
        congressData.forEach(member => {
            let rows = document.createElement("tr")
            rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
            table.appendChild(rows)
        })
        //si los valores estan chequeados
    } else if (valoresChequeados.length > 0){
        //por cada valor chequeado
        valoresChequeados.forEach(chequeado =>{
            //y por cada miembro
            congressData.forEach(member =>{
                //verifico si el partido es el checkbox chequeado
                if(chequeado == member.party) {
                    //si sí muestro tabla con info del partido chequeado
                    render(member);
                }
            })
        })
    }
}
//función con el renderizado de la tabla según sean sus miembros
function render(member){
    let rows = document.createElement("tr")
    rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
    table.appendChild(rows)
}

// ---------------------------------------------------------------------------------
//creo un array vacío donde colocaré los estados sin repetirse
let statesArray = [];
//recorro los miembros 
congressData.forEach(member =>{
    //hay miembros no incluidos?
    if (statesArray.includes(member.state) === false) {
        //los ubicos en el array
        statesArray.push(member.state)
    }
})
//recorro el array con los estados y creo option por cada estado 
statesArray.forEach(state => {
    let option = document.createElement("option")
    option.innerHTML = `${state}`
    option.value = `${state}`
    selecting.appendChild(option)
})

// function funcion () {
//     let valueOption = document.getElementById("selectState").value;
//     return valueOption
// }



//recorro todos los option del select extraído y escucho un click y ejecuto
options.forEach(option => option.addEventListener("click",function(){
    //creo array con checkbox filtrados segun sean chequeados
    let chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked)
    //si no hay chequeados
    if(chequeados.length === 0) {
        //creo array con los estados 
        let opciones = Array.from(options).map(option => option.value)
        //si el estado es "Elegir un estado" pinto la tabla
        if(/*option*/this.value == "chooseState") {
            congressData.forEach(member => {
                let rows = document.createElement("tr")
                rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
                table.appendChild(rows)
            })
            //si los estados incluyen a ese estado clickeado
        } else if (opciones.includes(/*option*/this.value)) {
            //desaparezco la tabla
            table.innerHTML = "";
            //y pinto otra con los estados clickeados
            renderState(/*option*/this.value)
            //si tengo mas de un checkbox chequeado
        } else if (chequeados.length > 0) {
            //desaparezco la tabla
            table.innerHTML = "";
            //recorro los miembros
            congressData.forEach(member => {
                //si se cumplen las dos condiciones pinto tabla
                if(member.party === chequeados.value && /*funcion()*/option.value == member.state) {
                    console.log(member.party)
                    let rows = document.createElement("tr")
                    rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
                    table.appendChild(rows)
                }
            })
        }
    }
    
}))

//creo funcion para los estados
function renderState(state){
    //recorro los miembros
    congressData.forEach(member =>{
        //si el estado es el mismo al que pertenece el miembro pinto tabla
        if(member.state == state) {
            let rows = document.createElement("tr")
            rows.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
            table.appendChild(rows)
        }
    })
}