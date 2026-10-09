import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(
  fileURLToPath(new URL("./Home.tsx", import.meta.url)),
  "utf8",
);

describe("event schedule content", () => {
  it("lists only the Kariya and Anjo October events", () => {
    expect(homeSource).toContain('note: "10/10は午前、10/31は午後開催"');
    expect(homeSource).toContain('name: "刈谷産業振興センター"');
    expect(homeSource).toContain('address: "刈谷市相生町1丁目1-6"');
    expect(homeSource).toContain('dates: ["10/10(土) 9:30〜12:00"]');
    expect(homeSource).toContain('name: "アンフォーレ"');
    expect(homeSource).toContain('address: "安城市御幸本町504番地1"');
    expect(homeSource).toContain('dates: ["10/31(土) 13:30〜16:00"]');

    expect(homeSource.match(/availability: "残席わずか"/g)).toHaveLength(2);
    expect(homeSource).toContain('className="venue-card__availability"');

    expect(homeSource).not.toMatch(/岡崎会場|竜美丘会館|岡崎市東明大寺町|OKAZAKI/);
    expect(homeSource).not.toMatch(/10\/3\(土\)/);
  });

  it("keeps both maps and the existing application form route", () => {
    expect(homeSource.match(/mapEmbedUrl:/g)).toHaveLength(2);
    expect(homeSource).toContain(
      "https://docs.google.com/forms/d/e/1FAIpQLSc005BG2ueuMSLm3ApIpcAjm7YOsUmDLcprwnMf9VL8nrcyXA/viewform?usp=dialog",
    );
    expect(homeSource).toContain("href={FORM_URL}");
  });

  it("shows the current inquiry phone number with a callable tel link", () => {
    expect(homeSource).toContain('href="tel:08036250463"');
    expect(homeSource).toContain("080-3625-0463");
    expect(homeSource).not.toContain("052-304-7480");
  });
});
