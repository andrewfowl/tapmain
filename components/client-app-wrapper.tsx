"use client";

import type { ReactNode } from "react";
import { ClarityInit } from "@/components/clarity-init";
import { WelcomeChat } from "@/components/welcome-chat";

interface ClientAppWrapperProps {
  children: ReactNode;
}

export default function ClientAppWrapper({ children }: ClientAppWrapperProps) {
  return (
    <>
      <ClarityInit projectId="fvy5wscm05" />
      {children}
      <WelcomeChat />
    </>
  );
}
