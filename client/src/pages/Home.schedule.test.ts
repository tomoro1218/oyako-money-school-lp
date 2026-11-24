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
  it("lists only the two requested dates and venues in chronological order", () => {
    expect(homeSource).toContain('const HERO_SCHEDULE = [');
    expect(homeSource).toContain('"11/29 刈谷"');
    expect(homeSource).toContain('"12/12 岡崎"');
    expect(homeSource).not.toContain("11/28");
    expect(homeSource).not.toContain("11月28");
    expect(homeSource).not.toContain('name: "岡崎市民会館"');
    expect(homeSource).toContain('name: "刈谷産業振興センター"');
    expect(homeSource).toContain('dates: ["2026年11月29日（日） 9:30〜12:00"]');
    expect(homeSource).toContain('name: "竜美丘会館"');
    expect(homeSource).toContain('dates: ["2026年12月12日（土） 13:30〜16:00"]');
    expect(homeSource.match(/mapEmbedUrl:/g)).toHaveLength(2);
  });

  it("prioritizes the upcoming Sunday Kariya event in the hero", () => {
    expect(homeSource).toContain("今週日曜開催！");
    expect(homeSource).toContain("11/29（日）刈谷産業振興センター");
    expect(homeSource).toContain('value: "11/29・12/12"');
    expect(homeSource).toContain('note: "午前1回・午後1回開催"');
  });

  it("uses the requested event and parent-facing wording", () => {
    expect(homeSource).toContain("つくる・売る・お金をもらうを、まるごと体験");
    expect(homeSource).toContain("お子さまのおこづかいや、成長に合わせたお金との向き合い方");
    expect(homeSource).not.toContain("つくる・売る・買うを、まるごと体験");
    expect(homeSource).not.toContain("マネーセミナー");
  });

  it("keeps the current public application form and phone number", () => {
    expect(homeSource).toContain(publicFormUrl);
    expect(homeSource).toContain("href={FORM_URL}");
    expect(homeSource).toContain('href="tel:08036250463"');
    expect(homeSource).toContain("080-3625-0463");
  });

  it("updates metadata and removes the cancelled event from production-facing files", () => {
    expect(indexSource).toContain("2026年11月29日・12月12日");
    expect(indexSource).toContain("刈谷産業振興センター、竜美丘会館");
    expect(indexSource).not.toMatch(/11月28|岡崎市民会館/);
    expect(styleSource).toContain(".hero__urgent");
  });

  it("keeps the venue cards equal-width when the layout stacks", () => {
    expect(styleSource).toContain("grid-template-columns: repeat(2, minmax(0, 1fr));");
    expect(styleSource).toContain("@media (max-width: 1080px) {");
    expect(styleSource).toContain("grid-template-columns: 1fr;");
    expect(styleSource).not.toContain("width: min(100%, 560px)");
  });
});
