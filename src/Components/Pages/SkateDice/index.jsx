import { useState } from 'react';

import './Style/skatedice-style.scss';

function SkateDice() {

    const [dices, setDices] = useState({
        flips: null,
        shoveit: null,
        rotation: null,
        stance: null,
        direction: null,
    });

    const DiceFaces = {
        flips: ['Kickflip', 'Heelflip', 'Kickflip', 'Heelflip', "⛭", "∅"],
        shoveit: ['Shove it', '360 Shove it', '⛭', "⛭", '∅', "∅"],
        rotation: ['180', '360', '⛭', "⛭", '∅', "∅"],
        stance: ['Regular', 'Switch', 'Fakie', 'Nollie', "⛭", "⛭"],
        direction: ['Frontside', 'Backside', 'Frontside', 'Backside', "⛭", "⛭"],
    };

    const rollDice = () => {
        const randomResults = {
            flips: DiceFaces.flips[Math.floor(Math.random() * 6)],
            shoveit: DiceFaces.shoveit[Math.floor(Math.random() * 6)],
            rotation: DiceFaces.rotation[Math.floor(Math.random() * 6)],
            stance: DiceFaces.stance[Math.floor(Math.random() * 6)],
            direction: DiceFaces.direction[Math.floor(Math.random() * 6)],
        };
        setDices(randomResults);

        const shakeElements = document.querySelectorAll('.shake-elem');
        shakeElements.forEach(element => {
            element.classList.add('shake');
            setTimeout(() => {
                element.classList.remove('shake');
            }, 500);
        });
    };


    return (
        <>
            <section className="skatedice-ctn">
                <h2 className="skatedice-title">Skate Dice</h2>

                <div className='dices'>
                    <div className='flips-div shake-elem'><p className='flips'>{dices.flips}</p></div>
                    <div className='shoveit-div shake-elem'><p className='shoveit'>{dices.shoveit}</p></div>
                    <div className='rotation-div shake-elem'><p className='rotation'>{dices.rotation}</p></div>
                    <div className='direction-div shake-elem'><p className='direction'>{dices.direction}</p></div>
                    <div className='stance-div shake-elem'><p className='stance'>{dices.stance}</p></div>
                </div>

                <button className='go' onClick={rollDice}>Lancer les dés</button>

                <article className='skatedice-rule'>

                    <h3 className="skatedice-title">Règles du jeu</h3>

                    <p>L'objectif de Skate Dice est de mettre à l'épreuve ses performances en Skate. Lorsque vous cliquez sur "Lancé les dés" chaque dé affichera une caractéristique de la figure a exécuter.</p>

                    <p><span className='mauve'>- Le dé mauve </span> indique si le trick comporte un kickflip, un heeflip, si vous avez le choix ou aucune de ses variations.</p>

                    <p><span className='jaune'>- Le dé jaune </span>indique si le trick comporte un shoveit, un 360 shoveit, si vous avez le choix ou aucune de ces variations. Le sens du shovit est au choix, mais la deuxième fois que la même variation est définie il faut le faire dans l'autre sens. Exemple : Si le dé mauve affiche kickflip et le déjaune affiche shovit, la première fois il est possible de faire varialflip, mais la deuxième fois il faut faire hardflip. La fois d'après ce tirage est ignoré et il faut relancer les dé.</p>

                    <p><span className='vert'>- Le dé vert </span>indique si le trick comporte une rotation 180°, 360°, si vous avez le choix ou aucune de ces variations.</p>

                    <p><span className='noir'>- Le dé noir </span>indique le sens de rotation du corps si le dé vert vous indique 180 ou 360.</p>

                    <p><span className='rouge'>- Le dé rouge </span>indique la position dans lequel le trick doit être effectué, regual/goofy, switch, Nollie ou Fakie ou si vous avez le choix de la position.</p>

                    <p>⛭ signifie que vous pouvez faire la variation de votre choix parmi les options de ce dé</p>

                    <p>∅ signifie que ce dé n'est pas pris en compte pour la définition du trick</p>

                    <p>Il se peut que des figures trop dures ou incohérente soient définie, si cela arrive il vous suffit de relancer les dés.</p>

                    <p>Pour un plus grand défi jouez avec un ami sous la forme d'un Game of S.K.A.T.E.</p>

                </article>

            </section>
        </>
    )
};

export default SkateDice;