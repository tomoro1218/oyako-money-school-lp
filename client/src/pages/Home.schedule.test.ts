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

describe("December 2026 event content", () => {
  it("lists only the requested December 12 venue and date", () => {
    expect(homeSource).not.toContain("11/29");
    expect(homeSource).not.toContain("11月29");
    expect(homeSource).not.toContain("刈谷");
    expect(homeSource).not.toContain("刈谷産業振興センター");
    expect(homeSource).toContain('name: "竜美丘会館"');
    expect(homeSource).toContain('address: "岡崎市東明大寺町5番地1"');
    expect(homeSource).toContain('dates: ["2026年12月12日（土） 13:30〜16:00"]');
    expect(homeSource.match(/mapEmbedUrl:/g)).toHaveLength(1);
  });

  it("shows the December date and venue in the hero without the past-event alert", () => {
    expect(homeSource).toContain("12月12日（土）");
    expect(homeSource).toContain("13:30〜16:00｜竜美丘会館");
    expect(homeSource).not.toContain("12月12日 岡崎開催");
    expect(homeSource).not.toContain("hero__schedule-summary");
    expect(homeSource).not.toContain("今週日曜開催！");
    expect(homeSource).not.toContain("hero__urgent");
    expect(homeSource).toContain("hero__venue-highlight");
    expect(homeSource).toContain('value: "12/12"');
    expect(homeSource).toContain('note: "13:30〜16:00開催"');
  });

  it("keeps the requested event wording and public application form", () => {
    expect(homeSource).toContain("つくる・売る・お金をもらうを、まるごと体験");
    expect(homeSource).toContain("お子さまのおこづかいや、成長に合わせたお金との向き合い方");
    expect(homeSource).not.toContain("マネーセミナー");
    expect(homeSource).toContain(publicFormUrl);
    expect(homeSource).toContain("href={FORM_URL}");
  });

  it("updates page metadata and removes past dates and venues", () => {
    expect(indexSource).toContain("2026年12月12日（土）13:30〜16:00");
    expect(indexSource).toContain("竜美丘会館");
    expect(indexSource).not.toMatch(/11月29|刈谷|刈谷産業振興センター/);
    expect(styleSource).toContain(".hero__venue-highlight");
    expect(styleSource).not.toContain(".hero__urgent");
  });

  it("keeps the single venue card responsive", () => {
    expect(styleSource).toContain(".venue-list");
    expect(styleSource).toContain("grid-template-columns: repeat(2, minmax(0, 1fr));");
    expect(styleSource).toContain("grid-template-columns: 1fr;");
  });
});
