let congressData = data.results[0].members

let statistics = {
    'objetoAuxiliar':{
        'most_loyal': tenPercent(ordenarDatos(congressData,"votes_with_party_pct",false)), 
        'least_loyal': tenPercent(ordenarDatos(congressData,"votes_with_party_pct",true)),
        'most_engaged': tenPercent(ordenarDatos(congressData,"missed_votes_pct",false)),
        'least_engaged': tenPercent(ordenarDatos(congressData,"missed_votes_pct",true))
    },
    'general': [
{
            'number': totalPartyMembers("R"),
            'name': 'republican',
            'voted_with_party_avg':porcentajesDeVotos("R"),
        },
{
            'number': totalPartyMembers("D"),
            'name':'democrat',
            'voted_with_party_avg':porcentajesDeVotos("D"),
        },
{
            'number': totalPartyMembers("ID"),
            'name': 'independent',
            'voted_with_party_avg':porcentajesDeVotos("ID"),
        },
{
            'number': totalPartyMembers("D") + totalPartyMembers("R") + totalPartyMembers("ID"),
            'name': 'total',
            'voted_with_party_avg':100,
        }],
    'most_loyal':0,
    'least_loyal':0,
    'most_engaged':0,
    'least_engaged':0,
}



// let republican = congressData.filter(member => {return member.party === "R"})
// let democrat = congressData.filter(member => {return member.party === "D"})
// let independent = congressData.filter(member => {return member.party === "ID"})

// function avgVoted(array){
//     if (array.length == 0) {
//         return 0;
//     }
//     let suma = 0;
//     for (let element of array) {
//         suma += element.votes_with_party_pct;
//     }
//     return suma / array.length;
// }

//creo funcion donde cuento cantidad de miembros del partido
function totalPartyMembers(party) {
    let cont = 0;
    let miembros = congressData
    miembros.forEach(miembro => {
        if(miembro.party === party) {
            cont++;
        }
    })
    return cont;
}

//funcion para pintar tabla general con parametros
function renderTable(array,idTable){
    //extraído el id del html
    let tableId = document.querySelector(idTable)
    //por cada objeto del array pinto tabla
    array.forEach(objeto => {
        let rows = document.createElement("tr")
        rows.innerHTML = `<td>${objeto.name}</td><td>${objeto.number || "0"}</td><td>%${objeto.voted_with_party_avg || "0"}</td>`
        tableId.appendChild(rows)
    })
}

//le paso los parámetros del array de estadística y el id del html de table
renderTable(statistics.general,"#tableBody")

//creo función para sacar % de votos de cada partido
function porcentajesDeVotos(party){
    let cont = 0;
    congressData.forEach(member =>{
        //si el miembro pertenece a ese partido
        if(member.party === party) {
            //a contador le sumo el total de votos de ese miembro
            cont+=member.total_votes; 
        }
    })
    // a contador lo multiplico por 100 y lo divido por el total de su partido
    return (cont * 100 / contarVotosTotales()).toFixed(2) //pongo dos decimales
}

//función para contar total de votos del partido
function contarVotosTotales(){
    cont = 0;
    congressData.forEach(party =>{
        //a contador le sumo el total de votos del partido del miembro
        cont+=party.total_votes;
    })
    return cont;
}

//------------------------------------------------------------------------------

function ordenarDatos(array,propiedad,esAscendente){
    let arrayAux = [...array]
    arrayAux.sort((a,b) =>{
        if (a[propiedad] < b[propiedad]){
            if(esAscendente){
                return -1
            } else{
                return 1
            }
        }
        if (a[propiedad] > b[propiedad]){
            if(esAscendente){
                return 1
            } else {
                return -1
            }
        }
        return 0;
    })
    return arrayAux;
}

function tenPercent(array){
    let long = Math.round(array.length * 0.1)
    let arrayAux = array.splice(0,long + 1) //slice?
    return arrayAux;
}

function pintarTabla(array,idTable,propiedad){
    let tableId = document.querySelector(idTable)
    if(tableId != null && propiedad == "votes_with_party_pct"){
        array.forEach(member =>{
            let row = document.createElement("tr")
            if(member[propiedad] > 0){
                row.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${(member.total_votes * member.votes_with_party_pct / 100).toFixed(2)}</td><td>${member.votes_with_party_pct}</td>`
                tableId.appendChild(row)
            }
        })
    } else if(tableId != null && propiedad == "missed_votes_pct"){
        array.forEach(member => {
            let row = document.createElement("tr")
            if(member[propiedad] > 0) {
                row.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</td><td>${(member.total_votes * member.missed_votes_pct / 100).toFixed(2)}</td><td>${member.missed_votes_pct}</td>`
                tableId.appendChild(row)
            }
        })
    }
}

pintarTabla(statistics.objetoAuxiliar.most_loyal,'#most-loyal','votes_with_party_pct')
pintarTabla(statistics.objetoAuxiliar.least_loyal,'#least-loyal','votes_with_party_pct')
pintarTabla(statistics.objetoAuxiliar.least_loyal,'#most-engaged','missed_votes_pct')
pintarTabla(statistics.objetoAuxiliar.least_loyal,'#least-engaged','missed_votes_pct')





// //ordeno ascendente
// let increaseLoyalty = (a,b) => a.votes_with_party_pct - b.votes_with_party_pct
// let increaseAttendance = (a,b) => a.missed_votes_pct - b.missed_votes_pct
// //ordeno descendente
// let decreaseLoyalty = (a,b) => b.votes_with_party_pct - a.votes_with_party_pct
// let decreaseAttendance = (a,b) => b.missed_votes_pct - a.missed_votes_pct


// //creo funcion de 10%
// function tenPercent (array,propiedad) {
//     //declaro variable donde asgino el 10% del array de miembros
//     let posicionDiezPorciento = parseInt(array.length * 0.1)
//     //declaro variable con el array filtrado por miembros con mas de un voto
//     // let arrayAux = array.filter(member => member.total_votes != 0);
//     let arrayAux = [];
//     array.forEach(member => {
//         if(member.total_votes != 0) {
//             arrayAux.push(member)
//         }
//     })
//     //ordeno el array según la propiedad
//     arrayAux.sort(propiedad);
//     //devuelvo el 10% del array
//     return arrayAux.slice(0,posicionDiezPorciento)
// }

// statistics.least_engaged = tenPercent(congressData, decreaseAttendance)
// statistics.most_engaged = tenPercent(congressData, increaseAttendance)
// statistics.least_loyal = tenPercent(congressData, decreaseLoyalty)
// statistics.most_loyal = tenPercent(congressData, increaseLoyalty)


// let lEngagedTable = document.querySelector('#least-engaged')
// let mEngagedTable = document.querySelector('#most-engaged')
// let lLoyalTable = document.querySelector('#least-loyal')
// let mLoyalTable = document.querySelector('#most-loyal')

// function attendanceData(array,element) {
//     for(member of array){
//         let row = document.createElement('tr')
//         row.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>`
//         row.innerHTML = `<td>${congressData.missed_votes}</td>`
//         row.innerHTML = `<td>% ${congressData.missed_votes_pct}</td>`
//         element.appendChild(row)
//     }
// }

// function loyaltyData(array,element) {
//     for(member of array) {
//         let row = document.createElement('tr')
//         let votesWithParty = parseInt(member.voted_with_party_avg * member.total_votes / 100)
//         row.innerHTML = `<td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>`
//         row.innerHTML = `<td>${votesWithParty}</td>`
//         row.innerHTML = `<td>% ${member.votes_with_party_pct}</td>`
//         element.appendChild(row)
//     }
// }

// //llamo a las funciones
// if (lEngagedTable) {
//     attendanceData(statistics.least_engaged, lEngagedTable)
//     attendanceData(statistics.most_engaged, mEngagedTable)
// }

// if(lLoyalTable) {
//     loyaltyData(statistics.least_loyal, lLoyalTable)
//     loyaltyData(statistics.most_loyal, mLoyalTable)
// }




// statistics.general.republican.number = republican.length;
// statistics.general.democrat.number = democrat.length;
// statistics.general.independent.number = independent.length;
// statistics.general.total.number = congressData.length;

// statistics.general.republican.voted_with_party_avg = avgVoted(republican)
// statistics.general.democrat.voted_with_party_avg = avgVoted(democrat)
// statistics.general.independent.voted_with_party_avg = avgVoted(independent)
// statistics.general.total.voted_with_party_avg = avgVoted(congressData)// let tBody = document.querySelector('#tableBody')

// //party es la propiedad y statisticas el objeto
// for(party of statistics.general) { //general: objeto con objetos interiores
//     let row = document.createElement('tr')
//     row.innerHTML = `<td>${party}</td><td>${member}</td><td>${statistics.general[party].voted_with_party_avg.toFixed(0)}`
//     tBody.appendChild(row)
// }
// function avgVoted(array) {
//     if(array.length == 0) {
//         return 0
//     }
//     let suma = 0;
//     array.forEach(element =>{
//         suma += element.votes_with_party_pct
//     })
//     return (suma/array.length)
// }