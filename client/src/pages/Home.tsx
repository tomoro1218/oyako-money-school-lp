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
  "https://docs.google.com/forms/d/e/1FAIpQLSc005BG2ueuMSLm3ApIpcAjm7YOsUmDLcprwnMf9VL8nrcyXA/viewform?usp=dialog";

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
    value: "9:30〜12:00／13:30〜16:00",
    note: "10/10は午前、10/31は午後開催",
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
    name: "刈谷産業振興センター",
    address: "刈谷市相生町1丁目1-6",
    dates: ["10/10(土) 9:30〜12:00"],
    availability: "残席わずか",
    mapUrl:
      "https://www.google.com/maps?q=%E5%88%88%E8%B0%B7%E7%94%A3%E6%A5%AD%E6%8C%AF%E8%88%88%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC&output=embed",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.6415974246097!2d137.00868947571945!3d34.99064106760074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60049cf18c69b3c7%3A0xe84bc97a36b348d5!2z5YiI6LC35biCIOeUo-alreaMr-iIiOOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1789262144330!5m2!1sja!2sjp",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E5%88%88%E8%B0%B7%E7%94%A3%E6%A5%AD%E6%8C%AF%E8%88%88%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC",
    center: { lat: 34.9914, lng: 137.0084 },
    accent: "#e9822c",
    stamp: "KARIYA",
  },
  {
    area: "安城会場",
    name: "アンフォーレ",
    address: "安城市御幸本町504番地1",
    dates: ["10/31(土) 13:30〜16:00"],
    availability: "残席わずか",
    mapUrl:
      "https://www.google.com/maps?q=%E3%82%A2%E3%83%B3%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AC&output=embed",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.912842906398!2d137.0817342257182!3d34.95879311932105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600499a5be7f4873%3A0xa4a170428acb86f!2z44Ki44Oz44OV44Kp44O844Os!5e0!3m2!1sja!2sjp!4v1789262190949!5m2!1sja!2sjp",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E3%82%A2%E3%83%B3%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AC",
    center: { lat: 34.9585, lng: 137.0808 },
    accent: "#2e73a9",
    stamp: "ANJO",
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

function DoodleField({
  variant = "light",
  showFlower = true,
}: {
  variant?: "light" | "color";
  showFlower?: boolean;
}) {
  return (
    <div className={`doodle-field doodle-field--${variant}`} aria-hidden="true">
      <span className="doodle doodle--star-one">★</span>
      <span className="doodle doodle--star-two">✦</span>
      {showFlower && <Flower2 className="doodle doodle--flower" />}
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
          <DoodleField variant="color" showFlower={false} />
          <div className="hero__paper" aria-hidden="true" />
          <div className="hero__content">
            <div className="hero__copy" data-reveal>
              <div className="hero__badges">
                <span className="free-stamp">参加<br />無料</span>
                <span className="hero__kicker">
                  <span>親子で楽しむ<br />体験型マネースクール</span>
                </span>
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
                  src="/manus-storage/oyako-money-hero_dff3f37c.png"
                  alt="親子でパン屋さんごっこを楽しむ様子の手描きイラスト"
                />
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
                    {venue.availability && (
                      <span className="venue-card__availability">
                        {venue.availability}
                      </span>
                    )}
                  </div>
                  <div className="venue-card__map" aria-label={`${venue.name}のGoogleマップ`}>
                    <iframe
                      className="venue-card__map-iframe"
                      title={`${venue.name}のGoogleマップ`}
                      src={venue.mapEmbedUrl}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <a
                      className="venue-card__map-link"
                      href={venue.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Googleマップで経路を見る
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
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
                  src="/manus-storage/oyako-money-experience-v2_41f70c45.png"
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
                  src="/manus-storage/oyako-money-cycle-v2_afae8f65.png"
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
                  src="/manus-storage/oyako-money-seminar-v2_03ea309b.png"
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
                    src="/manus-storage/ogawa-naoki-updated_896c6984.png"
                    alt="講師 小川直輝氏"
                  />
                </div>
                <span className="teacher-card__portrait-note">元高校教諭</span>
              </div>
              <div className="teacher-card__content">
                <p className="teacher-card__role">
                  <span>キッズマネースクール</span>
                  <span>清流のまち校</span>
                </p>
                <h3>小川 直輝 <small>氏</small></h3>
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
                  src="/manus-storage/oyako-money-logo-v2_bac86f9b.png"
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
              <p><a href="tel:08036250463"><strong>080-3625-0463</strong></a></p>
            </div>
          </div>

          <div className="footer-organizers">
            <div>
              <p className="footer-label"><Building2 size={17} />主催</p>
              <p>キッズマネースクール清流のまち校</p>
            </div>
          </div>

          <p className="footer-copyright">© キッズマネースクール清流のまち校</p>
        </div>
      </footer>

      <div className="mobile-sticky-cta">
        <CTA compact />
      </div>
    </div>
  );
}
