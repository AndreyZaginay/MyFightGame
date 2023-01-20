export type Character = {
    className: string;
    minDmg: number;
    maxDmg: number;
    sound: string;
    img: string;
    hp: number;
}

export  const  Knight  = {
    className: 'Knight',
    minDmg: 5,
    maxDmg: 10,
    sound: '../assets/sounds/heavy-sword.mp3',  
    img: '../assets/img/knight.jpg',
    hp: 100
}

export  const Archer = {
    className: 'Archer',
    minDmg: 9,
    maxDmg: 19,
    sound: '../assets/sounds/arrow.mp3',
    img: '../assets/img/archer.jpg',
    hp: 60
}

export  const Warrior = {
    className: 'Warrior',
    minDmg: 7,
    maxDmg: 13,
    sound: '../assets/sounds/sword.mp3',
    img: '../assets/img/warrior.jpg',
    hp: 75
}

export interface GameState {
    yourState: {
        className: string;
        minDmg: number;
        maxDmg: number;
        yourHp: number;
        img: string;
        sound: string
    };
    enemyState: {
        className: string;
        minDmg: number;
        maxDmg: number;
        enemyHp: number;
        img: string;
    };
    outputMsg: string[],
    isGameEnd: boolean,
}