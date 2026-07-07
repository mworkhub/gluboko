"use client";

import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/forms/lead-modal-context";

export function GiftCtaButton() {
  const { open } = useLeadModal();
  return <Button onClick={() => open()}>Замовити послугу</Button>;
}
