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
    const [currBudget, setCurrBudget] = useState(60);
    const [playerPickerPos, setPlayerPickerPos] = useState(false);
    const [points, setPoints] = useState(0);
    const [benchPos, setBenchPos] = useState(['', '', '']);
    const [originalPlayers, setOriginalPlayers] = useState(['', '', '']);
    const [madeTransfers, setMadeTransfers] = useState(0);
    const [originalTransfers, setOriginalTransfers] = useState(null);
    const [isPlayerMatchMenuOpen, setIsPlayerMatchMenuOpen] = useState(false);
    const [selectedPlayerMatchMenu, setSelectedPlayerMatchMenu] = useState(false);

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
        <AppContext.Provider value={{ variant, setVariant, switchMode, setSwitchMode, selectedSlot, setSelectedSlot, players, setPlayers, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation, isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen, playerPickerPos, setPlayerPickerPos, currBudget, setCurrBudget, benchPos, setBenchPos, points, setPoints, isPlayerMatchMenuOpen, setIsPlayerMatchMenuOpen, originalPlayers, setOriginalPlayers, madeTransfers, setMadeTransfers, originalTransfers, setOriginalTransfers, selectedPlayerMatchMenu, setSelectedPlayerMatchMenu }}>
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