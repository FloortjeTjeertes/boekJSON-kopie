
let xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
   if(this.readyState == 4 && this.status == 200){
     console.log("readyState:" + this.readyState);
     console.log("status:" + this.status);
     sorteerBoekObj.data = JSON.parse(this.responseText);
     sorteerBoekObj.sorteren();
   }

 }
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();




const maakTabelKop = (arr) => {
let kop = "<table><tr>";
arr.forEach((item) =>{
  kop += "<th>" + item + "</th>"
});
kop += "<tr>";
return kop;
}

const maakTabelRij = (arr) => {
let rij = "<tr>";
arr.forEach((item) =>{
  rij += "<td>" + item + "</td>"
});
rij += "<tr>";
return rij;
}





let sorteerBoekObj =  {
  data: "",

  sorteren: function(){
    this.data.sort( (a,b) => a.titel > b.titel ? 1 : -1);
    this.uitvoeren(this.data);
  },

  uitvoeren: function(data){
    let uitvoer = maakTabelKop(["titel", "auter(s)", "cover", "uitgave","bladzijden", "taal","EAN"]);
    for(let i=0; i<data.length; i++){
      let imgElement ="<img src='" + data[i].cover + "' width=100 alt='"+ data[i].titel +"'>";
      uitvoer += maakTabelRij([data[i].titel, data[i].titel, imgElement ,data[i].uitgave,data[i].paginas,data[i].taal,data[i].ean])
    }
    document.getElementById('uitvoer').innerHTML = uitvoer;

  }
}
