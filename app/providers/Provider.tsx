"use client";

import React from "react";

import { RadiosProvider } from "../context/RadioContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <RadiosProvider>{children}</RadiosProvider>;
};
