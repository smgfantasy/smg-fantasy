'use client';

import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [variant, setVariant] = useState("default");
    const [switchMode, setSwitchMode] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [players, setPlayers] = useState([
        { id: 0, name: 'Mitaka', points: 10, team: 'Team A', position: 'gk' },
        { id: 1, name: 'Gesha', points: 15, team: 'Team B', position: 'def' },
        { id: 2, name: '', points: '', team: '' },
        { id: 3, name: 'Krischo', points: 18, team: 'Team C', position: 'def' },
        { id: 4, name: '', points: null, team: '' },
        { id: 5, name: 'Vuljaka', points: 8, team: 'Team A', position: 'mid' },
        { id: 6, name: '', points: null, team: '' },
        { id: 7, name: 'Kunchev', points: 20, team: 'Team B', position: 'fwd' },
        { id: 8, name: '', points: null, team: '' },
        { id: 9, name: 'Niki', points: 9, team: 'Team A', position: 'fwd' },
        { id: 10, name: 'Vancho', points: 13, team: 'Team B', position: 'def' },
        { id: 11, name: 'Momchi', points: 17, team: 'Team A', position: 'mid' },
        { id: 12, name: 'Popeto', points: 11, team: 'Team C', position: 'fwd' },
    ]);
    const [selectedSlotPos, setSelectedSlotPos] = useState(null);
    const [formation, setFormation] = useState('2-1-2');

    const swapPlayers = (index1, index2, callback) => {
        console.log(index1, index2);
        if (index1 === 0 || index2 === 0) return;
        const array = [...players];
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        setPlayers(array); // Update state with the new array
        if (callback) callback(array); // Pass the updated array to the callback
    };

    return (
        <AppContext.Provider value={{ variant, setVariant, switchMode, setSwitchMode, selectedSlot, setSelectedSlot, players, setPlayers, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a VariantProvider");
    }
    return context;
}