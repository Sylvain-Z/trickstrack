export const Play = document.addEventListener('DOMContentLoaded', () => {


    /* *********************************** DONNEES *************************************/
    const rollDicesButton = document.querySelector('.go');

    const diceElements = {
        flips: document.querySelector('.flips'),
        shoveit: document.querySelector('.shoveit'),
        rotation: document.querySelector('.rotation'),
        stance: document.querySelector('.stance'),
        direction: document.querySelector('.direction')
    };

    const elementsToShake = document.querySelectorAll('.shake-elem');

    /* ********************************** FONCTIONS ************************************/
    function rollDice(dice, face1, face2, face3, face4, face5, face6) {
        const roll = Math.floor(Math.random() * 6 + 1);

        switch (roll) {
            case 1:
                dice.innerHTML = face1;
                break;
            case 2:
                dice.innerHTML = face2;
                break;
            case 3:
                dice.innerHTML = face3;
                break;
            case 4:
                dice.innerHTML = face4;
                break;
            case 5:
                dice.innerHTML = face5;
                break;
            default:
                dice.innerHTML = face6;
                break;
        }
    };

    function shake(element) {
        element.classList.add('shake');

        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    /* ********************************** LANCEMENT DES FONCTIONS ************************************/

    rollDicesButton.addEventListener('click', () => {
        rollDice(diceElements.flips, 'Kickflip', 'Heelflip', 'Kickflip', 'Heelflip', "⛭", "∅");
        rollDice(diceElements.shoveit, 'Shove it', '360 Shove it', '⛭', "⛭", '∅', "∅");
        rollDice(diceElements.rotation, '180', '360', '⛭', "⛭", '∅', "∅");
        rollDice(diceElements.stance, 'Regular', 'Switch', 'Fakie', 'Nollie', "⛭", "⛭");
        rollDice(diceElements.direction, 'Frontside', 'Backside', 'Frontside', 'Backside', "⛭", "⛭");
        elementsToShake.forEach(element => {
            shake(element);
        });
    })





});