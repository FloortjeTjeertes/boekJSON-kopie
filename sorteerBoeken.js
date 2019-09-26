document.getElementById('kenmerk').addEventListener('change', (e) => {
  sorteerBoekObj.kenmerk = e.target.value;
  sorteerBoekObj.sorteren();
});






let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log("readyState:" + this.readyState);
    console.log("status:" + this.status);
    sorteerBoekObj.data = JSON.parse(this.responseText);
    sorteerBoekObj.sorteren();
  }

}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();




const maakTabelKop = (arr) => {
  let kop = "<table class='boekselectie'><tr>";
  arr.forEach((item) => {
    kop += "<th>" + item + "</th>"
  });
  kop += "</tr>";
  return kop;
}

const maakTabelRij = (arr) => {
  let rij = "<tr class='boekselectie__rij'>";
  arr.forEach((item) => {
    rij += "<td class='boekselectie__data-cel'>" + item + "</td>"
  });
  rij += "</tr>";
  return rij;
}
const geefMaandNummer = (maand) => {
  let nummer;
  switch (maand) {
    case "januari":
      nummer = 0;
      break;
    case "februari":
      nummer = 1;
      break;
    case "maart":
      nummer = 2;
      break;
    case "april":
      nummer = 3;
      break;
    case "mei":
      nummer = 4;
      break;
    case "junie":
      nummer = 5;
      break;
    case "julie":
      nummer = 6;
      break;
    case "augustus":
      nummer = 7;
      break;
    case "september":
      nummer = 8;
      break;
    case "oktober":
      nummer = 9;
      break;
    case "november":
      nummer = 10;
      break;
    case "december":
      nummer = 11;
      break;
    default:
      nummer = 0

  }
  return nummer;
}

const maakJSdatum = (maandJaar) => {
  let mjArray = maandJaar.split(" ");
  return mjArray;
}


let sorteerBoekObj = {
  data: "",

  kenmerk: "titel",

  sorteren: function() {
    this.data.sort((a, b) => a[this.kenmerk] > b[this.kenmerk] ? 1 : -1);
    this.uitvoeren(this.data);
  },

  uitvoeren: function(data) {
    let uitvoer = maakTabelKop(["titel",
      "auter(s)",
      "cover",
      "uitgave",
      "bladzijden",
      "taal",
      "EAN"
    ]);
    for (let i = 0; i < data.length; i++) {
      let imgElement = "<img src='" +
        data[i].cover +
        "' class='boekselectie__cover' alt='" +
        data[i].titel +
        "'>";
      uitvoer += maakTabelRij(
        [data[i].titel,
          data[i].auteur[0],
          imgElement,
          data[i].uitgave,
          data[i].paginas,
          data[i].taal,
          data[i].ean
        ])
    }
    document.getElementById('uitvoer').innerHTML = uitvoer;

  }
}
