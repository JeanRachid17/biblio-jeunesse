const natural = require("natural");
const Utils = require("./utils.js");
const fs = require("fs");
let data;
let intermarcRoles = { 
  "4010":"Ancien possesseur",
  "4020":"Auteur de l'envoi",
  "4030":"Collectionneur",
  "4040":"Donateur",
  "4050":"Doreur",
  "4060":"Inventeur",
  "4070":"Parapheur",
  "4080":"Destinataire de l'envoi",
  "4090":"Ancien détenteur",
  "4100":"Fondateur de waqf",
  "4110":"Administrateur de waqf",
  "4120":"Lecteur",
  "4130":"Musmi?",
  "4140":"Relieur",
  "4150":"Vendeur",
  "4160":"Bénéficiaire de waqf",
  "4170":"Annotations manuscrites",
  "4180":"Auteur de la pièce jointe",
  "4190":"Destinataire de la pièce jointe",
  "4200":"Illustrateur de l'exemplaire",
  "4210":"Déposant",
  "4220":"Intermédiaire commercial",
  "4230":"Mécène",
  "4240":"Commanditaire de la reliure",
  "4980":"Intervenant sur l'exemplaire (autre)",
  "4990":"Intervenant sur l'exemplaire",
  "9990":"Fonction indéterminée",
  "0010":"Adaptateur",
  "0011":"Adaptateur présumé",
  "0013":"Adaptateur prétendu",
  "0020":"Agence de publicité",
  "0021":"Agence de publicité présumée",
  "0023":"Agence de publicité prétendue",
  "0024":"Agence de publicité pour le document reproduit",
  "0030":"Agence photographique",
  "0031":"Agence photographique présumée",
  "0033":"Agence photographique prétendue",
  "0034":"Agence photographique pour le document reproduit",
  "0040":"Annotateur",
  "0041":"Annotateur présumé",
  "0043":"Annotateur prétendu",
  "0050":"Arrangeur",
  "0051":"Arrangeur présumé",
  "0053":"Arrangeur prétendu",
  "0060":"Notice bibliographique",
  "0070":"Auteur du texte",
  "0071":"Auteur présumé du texte",
  "0072":"Auteur adapté",
  "0073":"Auteur prétendu du texte",
  "0080":"Auteur de l'argument",
  "0081":"Auteur présumé de l'argument",
  "0083":"Auteur prétendu de l'argument",
  "0090":"Auteur de l'animation",
  "0091":"Auteur présumé de l'animation",
  "0093":"Auteur prétendu de l'animation",
  "0100":"Auteur de l'idée originale",
  "0101":"Auteur présumé de l'idée originale",
  "0103":"Auteur prétendu de l'idée originale",
  "0110":"Auteur de lettres",
  "0111":"Auteur présumé de lettres",
  "0113":"Auteur prétendu de lettres",
  "0120":"Auteur du commentaire",
  "0121":"Auteur présumé du commentaire",
  "0123":"Auteur prétendu du commentaire",
  "0126":"Auteur de la conférence",
  "0130":"Auteur du matériel d'accompagnement",
  "0140":"Calligraphe",
  "0141":"Calligraphe supposé",
  "0143":"Calligraphe prétendu",
  "0144":"Calligraphe du document reproduit",
  "0150":"Cartographe",
  "0151":"Cartographe présumé",
  "0152":"Cartographe du modèle",
  "0153":"Cartographe prétendu",
  "0154":"Cartographe du document reproduit",
  "0160":"Chorégraphe",
  "0161":"Chorégraphe présumé",
  "0163":"Chorégraphe prétendu",
  "0170":"Collaborateur",
  "0171":"Collaborateur présumé",
  "0173":"Collaborateur prétendu",
  "0180":"Collecteur",
  "0190":"Commanditairedu contenu",
  "0200":"Commissaire d'exposition",
  "0210":"Compilateur",
  "0220":"Compositeur",
  "0221":"Compositeurprésumé",
  "0222":"Compositeur de l'œuvre adaptée",
  "0223":"Compositeur prétendu",
  "0230":"Concepteur",
  "0240":"Chef de projet informatique",
  "0250":"Conseiller scientifique",
  "0260":"Continuateur",
  "0261":"Continuateur présumé",
  "0263":"Continuateur prétendu",
  "0270":"Copiste",
  "0271":"Copiste présumé",
  "0273":"Copiste prétendu",
  "0280":"Correcteur",
  "0290":"Dédicataire",
  "0300":"Dédicateur",
  "0310":"Dessinateur",
  "0311":"Dessinateur présumé",
  "0312":"Dessinateur du modèle",
  "0313":"Dessinateur prétendu",
  "0314":"Dessinateur de l'œuvre reproduite",
  "0320":"Destinataire de lettres",
  "0321":"Destinataire de lettres présumé",
  "0330":"Directeur de publication",
  "0340":"Dialoguiste",
  "0341":"Dialoguiste présumé",
  "0343":"Dialoguiste prétendu",
  "0350":"Dramaturge",
  "0360":"Éditeur scientifique",
  "0365":"Expert",
  "0370":"Autorité émettrice de monnaie",
  "0371":"Autorité émettricede monnaie présumée",
  "0375":"Émetteur",
  "0376":"Émetteur douteux",
  "0380":"Graphiste",
  "0390":"Géodésien",
  "0400":"Géomètre-arpenteur",
  "0410":"Graveur",
  "0411":"Graveur présumé",
  "0412":"Graveur du modèle",
  "0413":"Graveur prétendu",
  "0414":"Graveur de l'œuvre reproduite",
  "0420":"Graveur en lettres",
  "0421":"Graveur en lettres présumé",
  "0422":"Graveur en lettres du modèle",
  "0423":"Graveur en lettres prétendu",
  "0424":"Graveur en lettres de l'œuvre reproduite",
  "0430":"Harmonisateur",
  "0440":"Illustrateur",
  "0441":"Illustrateur présumé",
  "0443":"Illustrateur prétendu",
  "0450":"Interviewer",
  "0460":"Reportage",
  "0470":"Librettiste",
  "0471":"Librettiste présumé",
  "0473":"Librettiste prétendu",
  "0480":"Lithographe",
  "0481":"Lithographe présumé",
  "0483":"Lithographe prétendu",
  "0484":"Lithographe de l'œuvre reproduite",
  "0485":"Sérigraphe",
  "0490":"Médailleur",
  "0500":"Metteur en scène",
  "0505":"Assistant metteur en scène",
  "0506":"Direction du doublage",
  "0510":"Parolier",
  "0520":"Peintre",
  "0521":"Peintre présumé",
  "0522":"Peintre du modèle",
  "0523":"Peintre prétendu",
  "0524":"Peintre de l'œuvre reproduite",
  "0530":"Photographe",
  "0531":"Photographe présumé",
  "0532":"Photographe, auteur du modèle",
  "0533":"Photographe prétendu",
  "0534":"Photographe de l'œuvre reproduite",
  "0540":"Postfacier",
  "0550":"Préfacier",
  "0560":"Présentateur",
  "0570":"Producteur artistique",
  "0580":"Producteur de fonds d'archives",
  "0590":"Développeur",
  "0600":"Programmeur",
  "0610":"Réalisateur",
  "0611":"Réalisateur présumé",
  "0613":"Réalisateur prétendu",
  "0620":"Rédacteur",
  "0630":"Scénariste",
  "0640":"Sculpteur",
  "0641":"Sculpteur présumé",
  "0642":"Sculpteur du modèle",
  "0643":"Sculpteur prétendu",
  "0644":"Sculpteur de l'œuvre reproduite",
  "0650":"Signataire",
  "0660":"Technicien graphique",
  "0670":"Testeur",
  "0680":"Traducteur",
  "0690":"Créateur de spectacle",
  "0700":"Auteur de la collation",
  "0710":"Enlumineur",
  "0711":"Enlumineur présumé",
  "0712":"Enlumineur du modèle",
  "0713":"Enlumineur prétendu",
  "0714":"Enlumineur de l'œuvre reproduite",
  "0720":"Auteur de la recension",
  "0730":"Transcripteur",
  "0740":"Monétaire",
  "0750":"Orfèvre",
  "0760":"Graveurde coin",
  "0770":"Réalisation de la basse continue",
  "0780":"Orchestrateur",
  "0790":"Auteur de la réduction musicale",
  "0800":"Auteur du slogan",
  "0804":"Auteur du slogan de l'œuvre reproduite",
  "0810":"Directeur d'atelier",
  "0820":"Rubricateur",
  "0830":"Lettriste",
  "0840":"Secrétaire",
  "0850":"Notaire, tabellion",
  "0860":"Greffier",
  "0870":"Fondateur de la publication",
  "0891":"Plasticien",
  "0900":"Programmateur",
  "0910":"Chef de la mission",
  "0980":"Auteur ou responsable intellectuel (autre)",
  "0990":"Auteur ou responsable intellectuel"
}
intermarcRoles = Object.keys(intermarcRoles).map(e => {
  return { code:e, label:intermarcRoles[e] };
});

let findMoreSimilar = (needle,haystack,attribute,results=1) => {
  return haystack.filter(e => typeof e.used === "undefined").map(e => {
    try {
      e.score = natural.JaroWinklerDistance(needle,e[attribute].normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    } catch {
      e.score = 0;
    }
    return e;
  }).sort((a,b) => {return b.score - a.score}).slice(0,results);
}

let getRole = (string) => {
  return findMoreSimilar(string,intermarcRoles,"label")[0].code;
}

let findAuthor = (author) => {
  let ids = ["isniId","BnFId","babelioLink"];
  if (typeof author === "string") {
    let normalizedA = author.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return data.authors
      .find(e => (
        (e.preferredName == author)
        || (e.preferredName == normalizedA)
        || e.otherNames.includes(author)
        || e.otherNames.includes(normalizedA)));
  } else {
    let normalizedA = author.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (data.authors.find(e => {
      return ids.some(id => {
        if (typeof e[id] === "undefined") {
          return false;
        } else {
          return ((e[id].length > 0) && (e[id] == author[id]));
        }
      });
    }) || data.authors
      .find(e => (
        (e.preferredName == author.name)
        || (e.preferredName == normalizedA)
        || e.otherNames.includes(author.name)
        || e.otherNames.includes(normalizedA))))
  }
}

let authorExists = (author) => {
  let auth = findAuthor(author);
  auth = (typeof auth === "undefined") ? false:auth;
  if (auth === false) {
    let matchingNameAuthor = findMoreSimilar((author.name || author),data.authors,"preferredName")
      .filter(r => r.score > 0.97)[0];
    if (typeof matchingNameAuthor !== "undefined") {
      auth = data.authors
        .find(auteur => 
          auteur.preferredName == matchingNameAuthor.preferredName);
    } else {
      return false;
    }
  }
  return (typeof auth === "undefined") ? false:auth;
}

let addName = (name,author) => {
  if ((name != author.preferredName) && (!author.otherNames.includes(name))) {
    author.otherNames.push(name);
  }
  return author;
}

let addContribution = (bookId,role,author,source) => {
  if (isNaN(parseInt(role))) {
    role = ("main_author") ? getRole("Auteur du texte"):getRole(role);
  }
  if (!author.contributions.some(e => e.bookId == bookId)) {
    author.contributions.push({bookId,role});
  } else if (source == "bnf") {
    author.contributions.find(e => e.bookId == bookId).role = role;
  }
  return author;
}

let mkMergedAuthor = (sourceAuth,targetAuth,source,book,rawName="") => {
  if (typeof targetAuth === "string") {
    targetAuth = {
      preferredName:  "",
      otherNames:     [],
      isniId:         "",
      BnFId:          "",
      babelioLink:    "",
      dates:          "",
      contributions:  []
    };
  }
  if (rawName.length > 0) {
    if (targetAuth.preferredName !== "") {
      targetAuth = addName(rawName,targetAuth);
    } else {
      targetAuth.preferredName = rawName;      
    }
  }
  if (source !== null) {
    if (source == "babelio") {
      if (targetAuth.babelioLink.length == 0) {
          targetAuth.babelioLink = sourceAuth.babelioLink;
        }
      } else {
        if (targetAuth.isniId.length == 0) {
          targetAuth.isniId = sourceAuth.isni;
        }
        if (targetAuth.BnFId.length == 0) {
          targetAuth.BnFId = sourceAuth.bnf_id;
        }
        if (targetAuth.dates.length == 0) {
          targetAuth.dates = sourceAuth.dates;
        }
      }
    targetAuth = addContribution(book.id,sourceAuth.role,targetAuth,source);
    targetAuth = addName(sourceAuth.name,targetAuth);
  } else {
    targetAuth = addContribution(book.id,"Auteur du texte",targetAuth,source);
  }
  return targetAuth;
}

let enrichAuthors = (input,books) => {
  data = input;
  for (let i in books) {
    let auteurs = books[i].auteurs;
    let enriched = [
      { 
        "source": "babelio",
        "authors": books[i].enrichments.Babelio.enrichedAuthors
      },
      {
        "source": "bnf",
        "authors": books[i].enrichments.BNF.enrichedAuthors
      }
    ];
    try {
      enriched[1].authors = enriched[1].authors.map(e => {
          e.name = Utils.normalize(e.first+" "+e.last);
          return e;
      });
    } catch (err) { }
    enriched = enriched.filter(e => typeof e.authors !== "undefined");
    auteurs.map(a => {
      let enrichedDone = false;
      for (e of enriched) {
        r = findMoreSimilar(a,e.authors,"name").filter(r => r.score >= 0.6)[0];
        if (typeof r !== "undefined") {
          let existingAuthor = (authorExists(r) || authorExists(a));
          let author;
          if (existingAuthor !== false) {
            author = mkMergedAuthor(r,existingAuthor,e.source,books[i],a);
            existingAuthor = author;
          } else {
            author = mkMergedAuthor(r,"",e.source,books[i],a);
            data.authors.push(author);
          }
          enrichedDone = true;
          r.used = true;
        }
      }
      if (!enrichedDone) {
        let existingAuthor = authorExists(a);
        if (existingAuthor !== false) {
          author = mkMergedAuthor({},existingAuthor,null,books[i],a);
          existingAuthor = author;
        } else {
          author = mkMergedAuthor({},"",null,books[i],a);
          data.authors.push(author);
        }
      }
    });
    enriched.map(e => {
      e.authors.filter(a => typeof a.used === "undefined")
        .map(a => {
          let existingAuthor = authorExists(a);
          let author;
          if (existingAuthor !== false) {
            author = mkMergedAuthor(a,existingAuthor,e.source,books[i],a.name);
            existingAuthor = author;
          }
          else {
            author = mkMergedAuthor(a,"",e.source,books[i],a.name);
            data.authors.push(author);
          }
        });
    });
    try {
      delete books[i].enrichments.BNF.enrichedAuthors;
    } catch {}
    try {
      delete books[i].enrichments.Babelio.enrichedAuthors;
    } catch {}
  }
  data.authors = data.authors.map(e => { delete e.score; return e; });
  return data;
}
module.exports = enrichAuthors;
