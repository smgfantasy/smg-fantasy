'use client';

import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [variant, setVariant] = useState("default");
    const [switchMode, setSwitchMode] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [players, setPlayers] = useState([]);
    const [selectedSlotPos, setSelectedSlotPos] = useState(null);
    const [formation, setFormation] = useState('2-1-2');
    const [isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen] = useState(false);
    const [playerPickerPos, setPlayerPickerPos] = useState(false);
    const [currBudget, setCurrBudget] = useState(60);
    const [benchPos, setBenchPos] = useState(['', '', '']);
    const [points, setPoints] = useState(0);

    const swapPlayers = (index1, index2, callback) => {
        if (index1 === 0 || index2 === 0) return;
        const array = [...players];
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        setPlayers(array);
        if (callback) callback(array);
    };

    return (
        <AppContext.Provider value={{ variant, setVariant, switchMode, setSwitchMode, selectedSlot, setSelectedSlot, players, setPlayers, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation, isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen, playerPickerPos, setPlayerPickerPos, currBudget, setCurrBudget, benchPos, setBenchPos, points, setPoints }}>
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