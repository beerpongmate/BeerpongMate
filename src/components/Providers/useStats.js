import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";

const initialStats = {
    matchCount: 0,
    matchWins: 0,
    matchLosses: 0,
    throwCount: 0,
    hitCount: 0
};

const useStats = (userId, matchId) => {
    const [stats, setStats] = useState(undefined);
    const statsRef = firestore()
            .collection('Stats')
            .doc(userId);

    const fetchStats = () => {
        statsRef.get().then(
                ref => {
                    if (ref.exists) {
                        setStats(ref.data());
                    } else {
                        statsRef.set(
                            initialStats
                        ).then(fetchStats).catch(console.log);
                    }
                 }).catch(console.log);
    };

    const processMatch = async (matchData) => {
        console.log("Process Match")
        const matchStatRef = statsRef.collection('MatchStats').doc(matchId);

        if (!matchStatRef.exists) {
            const playerTeam = matchData?.players.find(({ uid }) => uid === userId)?.team;
            const win = matchData?.winningTeam === playerTeam;
            const teamThrows = matchData?.data?.throws[playerTeam]
            const playerThrows = teamThrows.filter(({ playerId }) => playerId === userId);
            const playerHits = playerThrows.filter(({ type }) => type === 'HIT');
            const winInc = win ? 1 : 0;
            const lossInc = win ? 0 : 1;
        
            const { hitCount, matchCount, matchLosses, matchWins, throwCount } = stats;
            await statsRef.update({
                hitCount: hitCount + playerHits.length,
                matchCount: matchCount + 1,
                matchLosses: matchLosses + lossInc,
                matchWins: matchWins + winInc,
                throwCount: throwCount + playerThrows.length
            });
            await matchStatRef.set({ teamThrows, win });
        }
    };

    useEffect(() => { 
        fetchStats();
    }, []);

    

  return { stats, fetchStats, processMatch };
};

export default useStats;
