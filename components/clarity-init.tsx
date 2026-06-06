"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

interface ClarityInitProps {
  projectId: string;
  customId?: string;
  customSessionId?: string;
  customPageId?: string;
  friendlyName?: string;
  tags?: Record<string, string | string[]>;
}

export function ClarityInit({
  projectId,
  customId,
  customSessionId,
  customPageId,
  friendlyName,
  tags,
}: ClarityInitProps) {
  useEffect(() => {
    if (!projectId || typeof window === "undefined") {
      return;
    }

    Clarity.init(projectId);

    if (customId) {
      Clarity.identify(customId, customSessionId, customPageId, friendlyName);
    }

    if (tags) {
      Object.entries(tags).forEach(([key, value]) => {
        Clarity.setTag(key, value);
      });
    }
  }, [projectId, customId, customSessionId, customPageId, friendlyName, tags]);

  return null;
}
