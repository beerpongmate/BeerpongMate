const condition0 = ({ matchData }) => {
    if (matchData) {
        return { unlocked: true }
    }
    return null;
}
 
const imageWelcome = require('../../../../assets/images/achievements/welcome.png');
const imageBell = require('../../../../assets/images/achievements/bell.png');
const imageCarry = require('../../../../assets/images/achievements/carry.png');
const imageFire = require('../../../../assets/images/achievements/fire.png');



export default [
    { 
        id: 0,
        name: 'Welcome to the Cup',
        description: 'Play your first online match.',
        condition: condition0,
        image: imageWelcome
    },
    {
        id: 1,
        name: `I didn't hear no bell`,
        description: 'Win a game after being down to 1 cup, while the opponents have 6 or more.',
        condition: () => null,
        image: imageBell
    },
    {
        id: 2,
        name: `On Fire`,
        description: 'After being on fire, hit a cup with your extra throw.',
        condition: () => null,
        image: imageFire
    },
    {
        id: 3,
        name: `Carry the burden`,
        description: 'Score at least 8 cups and win the game in a four player match.',
        condition: () => null,
        image: imageCarry
    }
];