'use client';

import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [variant, setVariant] = useState("default");
    const [switchMode, setSwitchMode] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [players, setPlayers] = useState([
        { id: 1, name: 'Mitaka', points: 10, team: 'Team A', position: 'gk' },
        { id: 2, name: 'Gesha', points: 15, team: 'Team B', position: 'def' },
        { id: 3, name: '', points: '', team: '' },
        { id: 4, name: 'Krischo', points: 18, team: 'Team C', position: 'def' },
        { id: 5, name: '', points: null, team: '' },
        { id: 6, name: 'Kunchev', points: 8, team: 'Team A', position: 'mid' },
        { id: 7, name: '', points: null, team: '' },
        { id: 8, name: 'Vuljaka', points: 20, team: 'Team B', position: 'fwd' },
        { id: 9, name: '', points: null, team: '' },
        { id: 10, name: 'Tony', points: 9, team: 'Team A', position: 'fwd' },
        { id: 11, name: 'Vancho', points: 13, team: 'Team B', position: 'def' },
        { id: 12, name: 'Avrama', points: 17, team: 'Team A', position: 'mid' },
        { id: 13, name: 'Popeto', points: 11, team: 'Team C', position: 'fwd' },
    ]);
    const [selectedSlotPos, setSelectedSlotPos] = useState(null);
    const [formation, setFormation] = useState('2-1-2');

    const swapPlayers = (index1, index2) => {
        if (index1 === 0 || index2 === 0) return;
        const array = [...players]; // Create a shallow copy of the players array
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        setPlayers(array); // Update state with the new array
        console.log(array); // Log the updated array
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