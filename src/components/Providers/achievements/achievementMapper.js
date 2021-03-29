const condition0 = ({ matchData }) => {
    if (matchData) {
        return { unlocked: true }
    }
    return null;
 }

export default [
    { 
        id: 0,
        name: 'Welcome to the Cup',
        description: 'Play your first online match.',
        condition: condition0
    }
];