import firestore from "@react-native-firebase/firestore";
import React, { useState, useContext, useEffect } from 'react';
import achievementMapper from "./achievements/achievementMapper";
import { useUser } from "./WithUser";


const AchievementContext = React.createContext({});

export const useAchievements = () => useContext(AchievementContext);

const initialAchievements = {
    0: {
        unlocked: false
    },
    1: {
        unlocked: false
    },
    2: {
        unlocked: false
    },
    3: {
        unlocked: false
    }
};

const WithAchievements = ({ children }) => {
    const { user } = useUser();
    const [achievements, setAchievements] = useState(undefined);
    const userId = user?.uid;
    const achievementRef = userId ? firestore()
            .collection('Achievements')
        .doc(userId) : null;
    
    const achievementData = achievements ? achievementMapper.map(data => ({ ...data, ...achievements[data?.id] })) : undefined;

    const fetchAchievements = () => {
        achievementRef.get().then(
                ref => {
                    if (ref.exists) {
                        setAchievements(ref.data());
                    } else {
                        achievementRef.set(
                            initialAchievements
                        ).then(fetchAchievements).catch(console.log);
                    }
                 }).catch(console.log);
    };

    useEffect(() => { 
        if (userId) {
            fetchAchievements();
        }
    }, [userId]);

    const processMatch = (matchData) => {
        const newState = {};
        achievementMapper.forEach(({ id, condition }) => {
            const result = condition({ matchData });
            if (result !== null) {
                newState[id] = result;
            }
        });
        achievementRef.update(newState).then(fetchAchievements).catch(console.log);
    };

    return (
      <AchievementContext.Provider value={{ achievementData, processMatch }}>
        {children}
      </AchievementContext.Provider>
);
}
 
export default WithAchievements;