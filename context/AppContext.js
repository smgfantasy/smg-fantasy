'use client';

import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [variant, setVariant] = useState("default");
    const [switchMode, setSwitchMode] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [players, setPlayers] = useState([
        { id: 1, name: 'Mitaka 0', points: 10, team: 'Team A' },
        { id: 2, name: 'Gesha 1', points: 15, team: 'Team B' },
        { id: 3, name: 'a', points: '', team: '' },
        { id: 4, name: 'Krischo 3', points: 18, team: 'Team C' },
        { id: 5, name: 'Vuljaka 4', points: 20, team: 'Team B' },
        { id: 6, name: 'Kunchev 5', points: 8, team: 'Team A' },
        { id: 7, name: 'a', points: null, team: '' },
        { id: 8, name: 'a', points: null, team: '' },
        { id: 9, name: 'Tony 8', points: 9, team: 'Team A' },
        { id: 10, name: 'a', points: null, team: '' },
        { id: 11, name: 'Vancho 10', points: 13, team: 'Team B' },
        { id: 12, name: 'Avrama 11', points: 17, team: 'Team A' },
        { id: 13, name: 'Popeto 12', points: 11, team: 'Team C' },
    ]);

    const swapPlayers = (index1, index2) => {
        const array = [...players]; // Create a shallow copy of the players array
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        setPlayers(array); // Update state with the new array
        console.log(array); // Log the updated array
    };

    return (
        <AppContext.Provider value={{ variant, setVariant, switchMode, setSwitchMode, selectedSlot, setSelectedSlot, players, setPlayers, swapPlayers }}>
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