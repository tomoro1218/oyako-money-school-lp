import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(
  fileURLToPath(new URL("./Home.tsx", import.meta.url)),
  "utf8",
);
const indexSource = readFileSync(
  fileURLToPath(new URL("../../index.html", import.meta.url)),
  "utf8",
);
const styleSource = readFileSync(
  fileURLToPath(new URL("../index.css", import.meta.url)),
  "utf8",
);

const publicFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdK2yiiqNHZUaM9D0Zvh-jSSPCK4kLv9zjF4GH_2VGxj_PiOw/viewform?usp=header";

describe("November–December 2026 event content", () => {
  it("lists exactly the three requested dates and venues in chronological order", () => {
    expect(homeSource).toContain('const HERO_SCHEDULE = [');
    expect(homeSource).toContain('"11/28 岡崎"');
    expect(homeSource).toContain('"11/29 刈谷"');
    expect(homeSource).toContain('"12/12 岡崎"');
    expect(homeSource).toContain('area: "岡崎会場"');
    expect(homeSource).toContain('name: "岡崎市民会館"');
    expect(homeSource).toContain('address: "岡崎市六供町字出崎15番地1"');
    expect(homeSource).toContain('dates: ["2026年11月28日（土） 9:30〜12:00"]');
    expect(homeSource).toContain('area: "刈谷会場"');
    expect(homeSource).toContain('name: "刈谷産業振興センター"');
    expect(homeSource).toContain('address: "刈谷市相生町1丁目1番地6"');
    expect(homeSource).toContain('dates: ["2026年11月29日（日） 9:30〜12:00"]');
    expect(homeSource).toContain('name: "竜美丘会館"');
    expect(homeSource).toContain('address: "岡崎市東明大寺町5番地1"');
    expect(homeSource).toContain('dates: ["2026年12月12日（土） 13:30〜16:00"]');
    expect(homeSource.match(/mapEmbedUrl:/g)).toHaveLength(3);
    expect(homeSource).not.toMatch(/10月31|安城|アンフォーレ|残り3枠限定|残り3組限定|開催間近/);
  });

  it("uses multi-date overview wording without a single-event time", () => {
    expect(homeSource).toContain('label: "開催日程"');
    expect(homeSource).toContain('value: "11/28・11/29・12/12"');
    expect(homeSource).toContain('note: "午前2回・午後1回開催"');
    expect(homeSource).not.toContain('10月31日（土）午後開催');
    expect(homeSource).not.toContain('const AVAILABILITY_MESSAGE');
    expect(homeSource).not.toContain('className="final-cta__availability"');
  });

  it("keeps the current public application form and phone number", () => {
    expect(homeSource).toContain(publicFormUrl);
    expect(homeSource).toContain("href={FORM_URL}");
    expect(homeSource).toContain('href="tel:08036250463"');
    expect(homeSource).toContain("080-3625-0463");
  });

  it("updates title, description, and social preview metadata", () => {
    expect(indexSource).toContain("11・12月 岡崎・刈谷開催");
    expect(indexSource).toContain("2026年11月28日・11月29日・12月12日");
    expect(indexSource).toContain('property="og:title"');
    expect(indexSource).toContain('property="og:description"');
    expect(indexSource).not.toMatch(/10月31|安城|アンフォーレ|残り3枠限定|残り3組限定|開催間近/);
  });

  it("keeps the three venue cards equal-width when the layout stacks", () => {
    expect(styleSource).toMatch(/\.venue-list\s*\{\s*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
    expect(styleSource).toContain("@media (max-width: 1080px) {");
    expect(styleSource).toMatch(/\.venue-list\s*\{\s*grid-template-columns: 1fr;\s*\}/);
    expect(styleSource).not.toContain("width: min(100%, 560px)");
  });
});
