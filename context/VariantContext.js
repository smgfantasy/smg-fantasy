'use client';

import { createContext, useState, useContext } from "react";

const VariantContext = createContext();

export function VariantProvider({ children }) {
    const [variant, setVariant] = useState("default");

    return (
        <VariantContext.Provider value={{ variant, setVariant }}>
            {children}
        </VariantContext.Provider>
    );
}

export function useVariant() {
    const context = useContext(VariantContext);
    if (!context) {
        throw new Error("useVariant must be used within a VariantProvider");
    }
    return context;
}