/**
 * Design reminder: 「昭和レトロな児童向けチラシ × 現代のエディトリアルWeb」。
 * バターイエローの紙面、色鉛筆の多色文字、歪んだ紙片、ピンクのスタンプを一貫して使う。
 */
import { useEffect } from "react";
import {
  ArrowRight,
  Baby,
  Backpack,
  BookOpenCheck,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  Coins,
  ExternalLink,
  Flower2,
  HandCoins,
  HeartHandshake,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  Store,
  SunMedium,
  UsersRound,
} from "lucide-react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSekHAborWr6MwhxFu88mPBdMfCeDe2OGMrb8SMjVgXDF17NYA/viewform?usp=send_form";

const heroTitle = [
  { char: "お", color: "#d73572", rotate: "-4deg" },
  { char: "み", color: "#2e73a9", rotate: "3deg" },
  { char: "せ", color: "#5c8b55", rotate: "-2deg" },
  { char: "や", color: "#e7a927", rotate: "4deg" },
  { char: "さ", color: "#2e73a9", rotate: "-3deg" },
  { char: "ん", color: "#d73572", rotate: "2deg" },
];

const overviewItems = [
  {
    icon: Clock3,
    label: "開催時間",
    value: "9:30–11:30",
    note: "たっぷり2時間の体験プログラム",
    tone: "pink",
  },
  {
    icon: UsersRound,
    label: "定員",
    value: "各回 10組",
    note: "少人数だから、のびのび楽しめます",
    tone: "orange",
  },
  {
    icon: Baby,
    label: "対象",
    value: "3〜10歳",
    note: "未就学のお子さまも参加できます",
    tone: "blue",
  },
  {
    icon: Backpack,
    label: "持ち物",
    value: "色鉛筆・はさみ・飲み物",
    note: "いつもの道具で気軽に参加",
    tone: "green",
  },
];

const venues = [
  {
    area: "刈谷会場",
    name: "刈谷市産業振興センター",
    address: "刈谷市相生町1丁目1-6",
    dates: ["7/25(土)", "8/8(土)", "8/23(日)"],
    mapUrl:
      "https://www.google.com/maps?q=%E5%88%88%E8%B0%B7%E5%B8%82%E7%94%A3%E6%A5%AD%E6%8C%AF%E8%88%88%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E5%88%88%E8%B0%B7%E5%B8%82%E7%94%A3%E6%A5%AD%E6%8C%AF%E8%88%88%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC",
    accent: "#d73572",
    stamp: "KARIYA",
  },
  {
    area: "岡崎会場",
    name: "竜美丘会館",
    address: "岡崎市東明大寺町5-1",
    dates: ["8/1(土)", "8/2(日)"],
    mapUrl:
      "https://www.google.com/maps?q=%E7%AB%9C%E7%BE%8E%E4%B8%98%E4%BC%9A%E9%A4%A8&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E7%AB%9C%E7%BE%8E%E4%B8%98%E4%BC%9A%E9%A4%A8",
    accent: "#e9822c",
    stamp: "OKAZAKI 01",
  },
  {
    area: "岡崎会場",
    name: "岡崎市民会館",
    address: "岡崎市六供町出崎15-1",
    dates: ["8/30(土)"],
    mapUrl:
      "https://www.google.com/maps?q=%E5%B2%A1%E5%B4%8E%E5%B8%82%E6%B0%91%E4%BC%9A%E9%A4%A8&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B4%8E%E5%B8%82%E6%B0%91%E4%BC%9A%E9%A4%A8",
    accent: "#2e73a9",
    stamp: "OKAZAKI 02",
  },
];

function CTA({ compact = false, label = "お申込はコチラ" }) {
  return (
    <a
      className={`cta-button${compact ? " cta-button--compact" : ""}`}
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}（Googleフォームを別タブで開きます）`}
    >
      <span className="cta-button__free">参加無料</span>
      <span>{label}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-heading__eyebrow">
        <Sparkles size={18} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </div>
  );
}

function BrandWordmark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`wordmark${footer ? " wordmark--footer" : ""}`} aria-label="おみせやさんごっこ">
      <span className="wordmark__icon" aria-hidden="true">
        <span className="wordmark__awning" />
        <span className="wordmark__eyes">••</span>
        <span className="wordmark__smile" />
      </span>
      <span className="wordmark__type" aria-hidden="true">
        <span className="wordmark__shop">
          <i>お</i><i>み</i><i>せ</i><i>や</i><i>さ</i><i>ん</i>
        </span>
        <span className="wordmark__play">ごっこ</span>
      </span>
    </span>
  );
}

function DoodleField({ variant = "light" }: { variant?: "light" | "color" }) {
  return (
    <div className={`doodle-field doodle-field--${variant}`} aria-hidden="true">
      <span className="doodle doodle--star-one">★</span>
      <span className="doodle doodle--star-two">✦</span>
      <Flower2 className="doodle doodle--flower" />
      <SunMedium className="doodle doodle--sun" />
      <span className="doodle doodle--squiggle">～～</span>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        本文へ移動
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="おみせやさんごっこ トップへ">
          <BrandWordmark />
          <span>
            <small>親子で楽しむ体験型マネースクール</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="ページ内メニュー">
          <a href="#about">開催概要</a>
          <a href="#schedule">日程・会場</a>
          <a href="#learning">学べること</a>
          <a href="#teacher">講師紹介</a>
        </nav>
        <CTA compact label="申込む" />
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <DoodleField variant="color" />
          <div className="hero__paper" aria-hidden="true" />
          <div className="hero__content">
            <div className="hero__copy" data-reveal>
              <div className="hero__badges">
                <span className="free-stamp">参加<br />無料</span>
                <span className="hero__kicker">親子で楽しむ<br />体験型マネースクール</span>
              </div>
              <h1 className="hero__title" aria-label="おみせやさんごっこ">
                <span className="hero__title-main">
                  {heroTitle.map((item, index) => (
                    <span
                      key={`${item.char}-${index}`}
                      style={{ color: item.color, transform: `rotate(${item.rotate})` }}
                    >
                      {item.char}
                    </span>
                  ))}
                </span>
                <span className="hero__title-sub">ごっこ</span>
              </h1>
              <p className="hero__lead">
                おかねの価値・大切さ・ありがとうを、
                <br className="desktop-only" />
                たのしいお店体験から学ぼう。
              </p>
              <div className="hero__actions">
                <CTA />
                <a className="text-link" href="#schedule">
                  日程と会場を見る
                  <CalendarDays size={18} aria-hidden="true" />
                </a>
              </div>
              <p className="hero__note">
                <Check size={17} aria-hidden="true" />
                3歳から参加OK・各回10組
              </p>
            </div>

            <div className="hero__visual" data-reveal>
              <div className="hero__image-wrap">
                <img
                  src="/manus-storage/oyako-money-hero_a2f8b069.png"
                  alt="親子でパン屋さんごっこを楽しむ様子の手描きイラスト"
                />
                <span className="hero__visual-sticker">
                  <Store size={22} aria-hidden="true" />
                  つくって・うって・ありがとう！
                </span>
              </div>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>SCROLL</span>
            <span className="scroll-cue__line" />
          </div>
        </section>

        <section className="overview section" id="about">
          <div className="container">
            <SectionHeading
              eyebrow="まずはここをチェック"
              title="開催概要"
              copy="親子で参加しやすい、少人数の体験型プログラムです。"
            />
            <div className="overview-grid">
              {overviewItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    className={`overview-card overview-card--${item.tone}`}
                    data-reveal
                    style={{ transitionDelay: `${index * 55}ms` }}
                    key={item.label}
                  >
                    <div className="overview-card__icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <p className="overview-card__label">{item.label}</p>
                    <h3>{item.value}</h3>
                    <p>{item.note}</p>
                  </article>
                );
              })}
            </div>
            <div className="overview-ribbon" data-reveal>
              <HeartHandshake aria-hidden="true" />
              <p>
                <strong>「できた！」の笑顔を親子で。</strong>
                お子さまは体験、保護者さまは学び。それぞれの時間を楽しめます。
              </p>
            </div>
          </div>
        </section>

        <section className="schedule section" id="schedule">
          <DoodleField variant="light" />
          <div className="container">
            <SectionHeading
              eyebrow="お近くの会場を選べます"
              title="会場と日程"
              copy="各会場の地図を確認して、ご希望の日程からお申し込みください。"
            />
            <div className="venue-list">
              {venues.map((venue, index) => (
                <article
                  className="venue-card"
                  data-reveal
                  style={
                    {
                      "--venue-accent": venue.accent,
                      transitionDelay: `${index * 70}ms`,
                    } as React.CSSProperties
                  }
                  key={`${venue.name}-${venue.dates.join("-")}`}
                >
                  <div className="venue-card__info">
                    <span className="venue-card__stamp">{venue.stamp}</span>
                    <p className="venue-card__area">
                      <MapPin size={19} aria-hidden="true" />
                      {venue.area}
                    </p>
                    <h3>{venue.name}</h3>
                    <p className="venue-card__address">{venue.address}</p>
                    <div className="venue-card__dates" aria-label="開催日">
                      {venue.dates.map((date) => (
                        <span key={date}>{date}</span>
                      ))}
                    </div>
                    <a
                      className="map-link"
                      href={venue.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Googleマップで経路を見る
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </div>
                  <div className="venue-card__map">
                    <iframe
                      src={venue.mapUrl}
                      title={`${venue.name}のGoogleマップ`}
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </article>
              ))}
            </div>
            <div className="schedule-cta" data-reveal>
              <div>
                <p>各回10組の少人数開催です</p>
                <h3>気になる日程を見つけたら、早めのお申込みがおすすめです。</h3>
              </div>
              <CTA />
            </div>
          </div>
        </section>

        <section className="learning section" id="learning">
          <div className="container">
            <SectionHeading
              eyebrow="おかねを、もっと身近な学びに"
              title="なぜ今、このスクールが必要なの？"
              copy="社会の変化をきっかけに、親子でお金を話す最初の一歩をつくります。"
            />

            <div className="learning-intro" data-reveal>
              <div className="learning-intro__bubble">
                <School aria-hidden="true" />
                <p>
                  <strong>高校では金融教育が必須に。</strong>
                  金融リテラシーは、年齢を問わず暮らしに必要な知識とスキルになっています。
                </p>
              </div>
              <p className="learning-intro__question">
                でも、子どもに「お金」をどう伝えたらいいのでしょう？
              </p>
            </div>

            <div className="story-grid">
              <div className="story-image story-image--experience" data-reveal>
                <img
                  src="/manus-storage/oyako-money-experience-v2_220d3861.png"
                  alt="子どもたちがお店屋さんとお客さんになって遊ぶ手描きイラスト"
                />
                <span className="image-tape" aria-hidden="true" />
              </div>
              <div className="story-copy" data-reveal>
                <p className="story-copy__number">01</p>
                <p className="story-copy__eyebrow">遊びが学びに変わる</p>
                <h3>つくる・売る・買うを、まるごと体験</h3>
                <p>
                  「おみせやさんごっこ」の準備から接客まで、子どもたちが主役になって挑戦します。難しい言葉ではなく、手を動かして、人とやり取りするからこそ、お金の役割が自然に心へ残ります。
                </p>
                <div className="mini-benefits">
                  <span><Check size={15} />3〜4歳の未就学児も楽しめる</span>
                  <span><Check size={15} />自分で考えて行動する力を育む</span>
                </div>
              </div>
            </div>

            <div className="story-grid story-grid--reverse">
              <div className="story-image story-image--cycle" data-reveal>
                <img
                  src="/manus-storage/oyako-money-cycle-v2_5cbfe728.png"
                  alt="作る人、売る人、買う人、ありがとうのつながりを描いたイラスト"
                />
                <span className="image-tape image-tape--blue" aria-hidden="true" />
              </div>
              <div className="story-copy" data-reveal>
                <p className="story-copy__number">02</p>
                <p className="story-copy__eyebrow">お金の向こうに、人がいる</p>
                <h3>「ありがとう」がめぐる仕組みを発見</h3>
                <p>
                  お金は、ただ手元にあるものではありません。誰かが働き、商品やサービスが生まれ、「ありがとう」と一緒にお金がめぐっていく。その仕組みを知ることが、お父さん・お母さんや周りの人への感謝につながります。
                </p>
                <div className="value-chips" aria-label="育つ力">
                  <span><HandCoins size={18} />お金の価値</span>
                  <span><HeartHandshake size={18} />感謝の気持ち</span>
                  <span><Coins size={18} />使い方を考える力</span>
                </div>
              </div>
            </div>

            <div className="parent-seminar" data-reveal>
              <div className="parent-seminar__copy">
                <span className="parent-seminar__tag">保護者さまへ</span>
                <h3>お子さまの体験中は、別室でマネーセミナー</h3>
                <p>
                  子どもたちが「おみせやさん」の準備をしている間、保護者さまは別室でお金について学べます。親子それぞれの目線から学んだあと、家庭での会話へつなげていきましょう。
                </p>
                <ul>
                  <li><BookOpenCheck size={19} />家庭で始める金融教育のヒント</li>
                  <li><ShieldCheck size={19} />身近なお金をやさしく整理</li>
                  <li><UsersRound size={19} />親子で話すきっかけづくり</li>
                </ul>
              </div>
              <div className="parent-seminar__image">
                <img
                  src="/manus-storage/oyako-money-seminar-v2_e5749dba.png"
                  alt="保護者が別室でマネーセミナーを受ける様子の手描きイラスト"
                />
              </div>
            </div>

            <div className="learning-cta" data-reveal>
              <Flower2 aria-hidden="true" />
              <div>
                <p>親子でいっしょに、最初の一歩を。</p>
                <h3>楽しさから始まるお金の学びを、体験してみませんか？</h3>
              </div>
              <CTA />
            </div>
          </div>
        </section>

        <section className="teacher section" id="teacher">
          <DoodleField variant="color" />
          <div className="container">
            <SectionHeading eyebrow="子どもにも大人にも、わかりやすく" title="講師紹介" />
            <article className="teacher-card" data-reveal>
              <div className="teacher-card__portrait" aria-label="小川直輝氏のプロフィール写真">
                <span className="teacher-card__sunburst" aria-hidden="true" />
                <div className="teacher-card__portrait-inner">
                  <img
                    src="/manus-storage/ogawa-naoki_12e6565c.png"
                    alt="講師 小川直輝氏"
                  />
                </div>
                <span className="teacher-card__portrait-note">元高校教諭</span>
              </div>
              <div className="teacher-card__content">
                <p className="teacher-card__role">キッズマネースクール 清流のまち校 代表</p>
                <h3>小川 直輝 <small>氏</small></h3>
                <p className="teacher-card__company">アクサ生命保険株式会社 所属</p>
                <div className="teacher-card__bio">
                  <p>
                    元高校教諭としての経験を活かし、子どもたちにも保護者さまにも、お金の話をやさしく、身近に届けています。親子の会話が自然に生まれる、参加型の講座を大切にしています。
                  </p>
                </div>
                <div className="teacher-card__badges">
                  <span><School size={17} />元高校教諭</span>
                  <span><Store size={17} />スクール代表</span>
                  <span><Sparkles size={17} />多数の小中高で講演</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="final-cta section" aria-labelledby="final-cta-title">
          <div className="container final-cta__inner" data-reveal>
            <div className="final-cta__mark">
              <img
                src="/manus-storage/oyako-money-logo-v2_a113df99.png"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="final-cta__eyebrow">参加無料・各回10組</p>
              <h2 id="final-cta-title">親子の「ありがとう」を育てる一日に。</h2>
              <p>ご希望の会場と日程を、申込フォームからお選びください。</p>
            </div>
            <CTA />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <BrandWordmark footer />
              <div>
                <strong>親子で楽しむ体験型マネースクール</strong>
              </div>
            </div>
            <div className="footer-contact">
              <p className="footer-label"><Phone size={17} />お問い合わせ（平日 10:00〜16:00）</p>
              <p className="footer-contact__name">マネーキラキラ編集部</p>
              <p><a href="tel:0523047480"><strong>052-304-7480</strong></a>（担当：辻村）</p>
            </div>
          </div>

          <div className="footer-organizers">
            <div>
              <p className="footer-label"><Building2 size={17} />主催</p>
              <p>有限会社マネー・きらら☆編集部</p>
            </div>
            <div>
              <p className="footer-label"><Building2 size={17} />共催</p>
              <p>アクサ生命保険株式会社 名古屋FA支社</p>
              <p>愛知県名古屋市中区錦1-11-11 名古屋インターシティ9F</p>
              <p>Tel. 052-232-3402</p>
            </div>
          </div>

          <div className="footer-disclaimer">
            <p>
              ※このイベントはアクサ生命の依頼によりアド・フューチャーが集客および開催いたします。マネーセミナーはアクサ生命の依頼によりアド・フューチャーが集客し、アクサ生命が開催いたします。ただし、参加者の受付登録・参加者情報管理についてはアド・フューチャーが責任を負って行います。
            </p>
            <p>AXA-C-260622-1</p>
          </div>
          <p className="footer-copyright">© 親子で楽しむ体験型マネースクール</p>
        </div>
      </footer>

      <div className="mobile-sticky-cta">
        <CTA compact />
      </div>
    </div>
  );
}
