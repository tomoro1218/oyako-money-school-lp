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

const publicFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSc005BG2ueuMSLm3ApIpcAjm7YOsUmDLcprwnMf9VL8nrcyXA/viewform?usp=dialog";

describe("single Anjo event content", () => {
  it("lists the October 31 Anjo event only", () => {
    expect(homeSource).toContain('note: "10月31日（土）午後開催"');
    expect(homeSource).toContain('value: "13:30〜16:00"');
    expect(homeSource).toContain('value: "定員10組"');
    expect(homeSource).toContain('area: "安城会場"');
    expect(homeSource).toContain('name: "アンフォーレ"');
    expect(homeSource).toContain('address: "安城市御幸本町504番地1"');
    expect(homeSource).toContain('dates: ["2026年10月31日（土） 13:30〜16:00"]');
    expect(homeSource).not.toContain('className="hero__event-details"');
    expect(homeSource).toContain("10月31日（土）");
    expect(homeSource).toContain("安城・アンフォーレ");

    expect(homeSource.match(/mapEmbedUrl:/g)).toHaveLength(1);
    expect(homeSource).not.toMatch(
      /刈谷会場|刈谷産業振興センター|刈谷市相生町|KARIYA|10\/10\(土\)|10月10|岡崎会場|竜美丘会館|岡崎市東明大寺町|OKAZAKI|10\/3(?!\d)|10月3(?!\d)|10月30/,
    );
  });

  it("uses single-event wording without unverified availability", () => {
    expect(homeSource).not.toMatch(/残席わずか|満席間近|availability:\s*"/);
    expect(homeSource).not.toMatch(/各会場|ご希望の日程|各回10組|各回 10組/);
    expect(homeSource).toContain("定員10組・参加無料");
  });

  it("shows the fixed remaining-slot message in the hero and final application area", () => {
    expect(homeSource).toContain(
      'const AVAILABILITY_MESSAGE = "開催間近！ 残り3枠限定"',
    );
    expect(homeSource).toContain('className="hero__availability"');
    expect(homeSource).toContain('className="final-cta__availability"');
    expect(homeSource.match(/AVAILABILITY_MESSAGE/g)).toHaveLength(3);
    expect(homeSource).not.toMatch(/残り3名|本日締切|申込急増/);
  });

  it("keeps the one Anjo map and current public application form", () => {
    expect(homeSource).toContain(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.912842906398",
    );
    expect(homeSource).toContain(
      "https://www.google.com/maps/search/?api=1&query=%E3%82%A2%E3%83%B3%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AC",
    );
    expect(homeSource).toContain(publicFormUrl);
    expect(homeSource).toContain("href={FORM_URL}");
  });

  it("shows the current inquiry phone number with a callable tel link", () => {
    expect(homeSource).toContain('href="tel:08036250463"');
    expect(homeSource).toContain("080-3625-0463");
    expect(homeSource).not.toContain("052-304-7480");
  });

  it("uses metadata for the October 31 Anjo event without past venue names", () => {
    expect(indexSource).toContain("2026年10月31日（土）13:30〜16:00、安城・アンフォーレ");
    expect(indexSource).toContain("10月31日（土）安城開催");
    expect(indexSource).not.toMatch(/刈谷|岡崎|竜美丘|10月10|10月3(?!\d)|10月30/);
  });
});
