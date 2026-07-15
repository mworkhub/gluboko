function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Best-effort notification: a Telegram outage must never block a lead from
// being saved, so this only logs on failure instead of throwing.
export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("sendTelegramMessage skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      console.error("sendTelegramMessage failed", res.status, await res.text());
    }
  } catch (error) {
    console.error("sendTelegramMessage failed", error);
  }
}

export function formatLeadTelegramMessage(params: {
  categoryLabel: string;
  name: string;
  phone: string;
  comment?: string | null;
  serviceType?: string | null;
  sourcePage: string;
}) {
  const lines = [
    `<b>Нова заявка: ${escapeHtml(params.categoryLabel)}</b>`,
    `Ім'я: ${escapeHtml(params.name)}`,
    `Телефон: ${escapeHtml(params.phone)}`,
  ];

  if (params.serviceType) {
    lines.push(`Послуга: ${escapeHtml(params.serviceType)}`);
  }
  if (params.comment) {
    lines.push(`Коментар: ${escapeHtml(params.comment)}`);
  }
  lines.push(`Сторінка: ${escapeHtml(params.sourcePage)}`);

  return lines.join("\n");
}
