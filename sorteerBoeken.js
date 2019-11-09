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
    sorteerBoekObj.voegJSdatumIn();
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
  let datum = new Date(mjArray[1], geefMaandNummer(mjArray[0]));
  return datum;
}

const maakOpsomming = (array) => {
  let string = "";
  for (let i = 0; i < array.length; i++) {
    switch (i) {
      case array.length - 1:
        string += array[i];
        break
      case array.length - 2:
        string += array[i] + " en ";
        break;
      default:
        string += array[i] + ", ";

    }
  }
  return string;
}


const keerTekstOm = (string) => {
  if(string.indexOf(',') != -1){
let array = string.split(',');
string = array[1] + ' '+array[0];
}
return string;
}








let sorteerBoekObj = {
  data: "",

  kenmerk: "titel",

  oplopend: 1,

  voegJSdatumIn: function() {
    this.data.forEach((item) => {
      item.jsDatum = maakJSdatum(item.uitgave);
    })

  },

  sorteren: function() {
    this.data.sort((a, b) => a[this.kenmerk] > b[this.kenmerk] ? 1 * this.oplopend : -1 * this.oplopend);
    this.uitvoeren(this.data);
  },
  uitvoeren: function(data) {
    document.getElementById('uitvoer').innerHTML = "";

    data.forEach(boek => {
      let sectie = document.createElement('section');
      sectie.className = 'boekSelectie';

      let main = document.createElement('main');
      main.className = 'boekSelectie__main';


      let afbeelding = document.createElement('img');
      afbeelding.className = 'boekselectie__cover';
      afbeelding.setAttribute('src', boek.cover);
      afbeelding.setAttribute('alt', keerTekstOm(boek.titel));

      let titel = document.createElement('h3');
      titel.className = 'boekSelectie__titel';
      titel.textContent = keerTekstOm(boek.titel);

      let prijs = document.createElement('div');
      prijs.className = 'boekSelectie__prijs';
      prijs.textContent = '€ ' + boek.prijs;

      sectie.appendChild(afbeelding);
      main.appendChild(titel);
      sectie.appendChild(main);
      sectie.appendChild(prijs);
      document.getElementById('uitvoer').appendChild(sectie);
    });


  }
}

document.getElementById('kenmerk').addEventListener('change', (e) => {
  sorteerBoekObj.kenmerk = e.target.value;
  sorteerBoekObj.sorteren();
});
document.getElementsByName('oplopend').forEach((item) => {
  item.addEventListener('click', (e) => {
    sorteerBoekObj.oplopend = parseInt(e.target.value);
    sorteerBoekObj.sorteren();
  })
})
