import { format } from "date-fns-tz";

// paramétres de la mise en local d'élément avec un délai d'expiration

export const setItemWithExpiration = (key, value, expirationInMinutes) => {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000; // Convertir les minutes en millisecondes

    const item = {
        value: value,
        expiration: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiration = (key) => {
    const itemString = localStorage.getItem(key);

    if (!itemString) {
        return null;
    }

    const item = JSON.parse(itemString);
    const now = new Date().getTime();

    if (now > item.expiration) {
        // Les données ont expiré, supprimez-les et renvoyez null
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

// Exemple d'utilisation
// const key = 'myData';
// const value = 'someValue';
// const expirationInMinutes = 30; // Expiration dans 30 minutes

// Enregistrez les données avec expiration
// setItemWithExpiration(key, value, expirationInMinutes);

// Récupérez les données (elles seront null si elles ont expiré)
// const retrievedValue = getItemWithExpiration(key);
// console.log(retrievedValue);


export const timeElapsed = (publicationDate) => {
    const now = Date.now();
    const timestamp = new Date(publicationDate).getTime();
    const diff = now - timestamp;

    const realDate = format(new Date(publicationDate), "dd-MM-yyyy", {
      timeZone: "auto",
    });

    const secondes = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (secondes > 1 && secondes < 60) {
      return {
        times: "il y a quelques secondes",
      };
    } else if (minutes > 1 && minutes < 60) {
      return {
        times: "il y a " + minutes + " minutes",
      };
    } else if (hours > 1 && hours < 24) {
      return {
        times: "il y a " + hours + " heures",
      };
    } else if (days > 1 && days < 7) {
      return {
        times: "il y a " + days + " jours",
      };
    } else {
      return {
        times: realDate,
      };
    }
};