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



const keerTekstOm = (string) => {
  if (string.indexOf(',') != -1) {
    let array = string.split(',');
    string = array[1] + ' ' + array[0];
  }
  return string;
}

let winkelwagen = {
  items: [],
  haalItemsOp: function() {
    let bestelling;
    if (localStorage.getItem('bestelBoeken') == null) {
      bestelling = [];
    } else {
      bestelling = JSON.parse(localStorage.getItem('bestelBoeken'));
      document.querySelector('.winkelwagen__aantal').innerHTML = bestelling.length;
    }
    bestelling.forEach(item =>{
this.items.push(item);
    })
    return bestelling;
  },


toevoegen:function(el){
this.items = this.haalItemsOp();
this.items.push(el);
localStorage.setItem('bestelBoeken', JSON.stringify(this.items));
document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
},



  uitvoeren: function(){
    document.getElementById('bestelling').innerHTML = "";
    this.items.forEach(boek => {
      let sectie = document.createElement('section');
      sectie.className = 'besteldBoek';

      let main = document.createElement('main');
      main.className = 'besteldBoek__main';


      let afbeelding = document.createElement('img');
      afbeelding.className = 'besteldBoek__cover';
      afbeelding.setAttribute('src', boek.cover);
      afbeelding.setAttribute('alt', keerTekstOm(boek.titel));

      let titel = document.createElement('h3');
      titel.className = 'besteldBoek__titel';
      titel.textContent = keerTekstOm(boek.titel);



      let overig = document.createElement('p');
      overig.className = 'besteldBoek__cover';
      overig.textContent = 'datum: ' + boek.uitgave + '| aantal paginas' + boek.paginas + '| taal' + boek.taal + '| ean ' + boek.ean;




      let prijs = document.createElement('div');
      prijs.className = 'besteldBoek__prijs';
      prijs.textContent = boek.prijs.toLocaleString('nl-NL', {
        currency: 'EUR',
        style: 'currency'
      });

      let verwijder = document.createElement('div');
      verwijder.className= ' besteldBoek__verwijder';


      sectie.appendChild(afbeelding);
      main.appendChild(titel);
      main.appendChild(overig);
      sectie.appendChild(main);
      sectie.appendChild(prijs);
      sectie.appendChild(verwijder);
      document.getElementById('bestelling').appendChild(sectie);
    });
  }



}

winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
