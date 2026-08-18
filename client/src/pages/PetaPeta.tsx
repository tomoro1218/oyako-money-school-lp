/**
 * Design reminder: 添付チラシを唯一のグラウンドトゥルースとする
 * 「ベビーイベントのスクラップブック × やさしい編集デザイン」。
 * 淡い空色、白い雲形、コーラル、ミント、黄色い手形・足形、傾いた写真を一貫して使う。
 */
import { useEffect } from "react";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Gift,
  HeartHandshake,
  MapPin,
  Palette,
  Phone,
  PiggyBank,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import "./PetaPeta.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_q3xalQkSW7WVqvX3zJmxgGkwDiYxCu_nvHo7Fqu6C2xFyw/viewform?usp=dialog";

const MAP_QUERY = encodeURIComponent("緑区生涯学習センター");
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const IMAGE_URLS = {
  baby: "/manus-storage/baby-hero_1f9f9c59.png",
  child: "/manus-storage/child-painted-hand_a90e1d12.png",
  parentChild: "/manus-storage/parent-child-art_0a1466ce.png",
  workshop: "/manus-storage/workshop-scene_584dfd2a.png",
  planner: "/manus-storage/financial-planner_5affd5de.png",
  tote: "/manus-storage/tote-bag-art_f4532915.png",
  logo: "/manus-storage/petapeta-logo_3f26754e.png",
  butterfly: "/manus-storage/footprint-butterfly_9f45e05e.png",
  animal: "/manus-storage/footprint-animal_255509a5.png",
  crocodile: "/manus-storage/handprint-crocodile_a3590f08.png",
};

const consultationTopics = [
  "教育資金",
  "学資保険",
  "資産運用",
  "家計の見直し",
  "住宅購入",
];

const overviewItems = [
  {
    icon: Gift,
    label: "参加費",
    value: "参加無料",
    note: "お土産もあるよ！",
    tone: "coral",
  },
  {
    icon: Baby,
    label: "対象",
    value: "０歳から未就学児",
    note: "",
    tone: "mint",
  },
  {
    icon: Clock3,
    label: "時間",
    value: "10：00～16：00",
    note: "予約最終15：00",
    tone: "yellow",
  },
  {
    icon: CalendarDays,
    label: "申込締切",
    value: "10/27(月)",
    note: "応募者多数の場合は先着順。",
    tone: "sky",
  },
];

const dates = [
  {
    month: "10月",
    date: "3",
    day: "土",
    room: "第２・第３ 集会室",
  },
  {
    month: "10月",
    date: "12",
    day: "月",
    room: "視聴覚室",
  },
];

function ApplyButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`peta-cta${compact ? " peta-cta--compact" : ""}`}
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="お申し込みはこちら（Googleフォームを別タブで開きます）"
    >
      <span className="peta-cta__free">参加無料</span>
      <span>お申し込みはこちら</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="peta-section-title peta-reveal" data-peta-reveal>
      <p className="peta-section-title__eyebrow">
        <Sparkles size={18} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {intro && <p className="peta-section-title__intro">{intro}</p>}
    </div>
  );
}

function Confetti() {
  return (
    <div className="peta-confetti" aria-hidden="true">
      <span className="peta-confetti__one" />
      <span className="peta-confetti__two" />
      <span className="peta-confetti__three" />
      <span className="peta-confetti__four" />
      <span className="peta-confetti__five" />
      <span className="peta-confetti__six" />
      <span className="peta-confetti__seven" />
      <span className="peta-confetti__eight" />
    </div>
  );
}

export default function PetaPeta() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "手形 足形 ペタペタアート｜親子で楽しめる参加無料イベント";
    if (description) {
      description.content =
        "手形・足形ペタペタアートワークショップとライフプランミニセミナー。０歳から未就学児のお子様が対象の参加無料イベントです。";
    }
    document.body.classList.add("peta-body");

    const elements = document.querySelectorAll<HTMLElement>("[data-peta-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      elements.forEach((element) => observer.observe(element));
      return () => {
        observer.disconnect();
        document.title = previousTitle;
        if (description && previousDescription) description.content = previousDescription;
        document.body.classList.remove("peta-body");
      };
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      document.body.classList.remove("peta-body");
    };
  }, []);

  return (
    <div className="peta-page">
      <a className="peta-skip-link" href="#peta-main">
        本文へ移動
      </a>

      <header className="peta-header">
        <a className="peta-brand" href="#peta-top" aria-label="ペタペタアート トップへ">
          <img src={IMAGE_URLS.logo} alt="petapeta-art" />
          <span>
            <strong>手形・足形 ペタペタアート</strong>
            <small>ワークショップ</small>
          </span>
        </a>
        <nav className="peta-nav" aria-label="ページ内メニュー">
          <a href="#peta-about">イベント内容</a>
          <a href="#peta-flow">当日の流れ</a>
          <a href="#peta-schedule">開催概要</a>
        </nav>
        <ApplyButton compact />
      </header>

      <main id="peta-main">
        <section className="peta-hero" id="peta-top">
          <Confetti />
          <div className="peta-hero__cloud peta-hero__cloud--one" aria-hidden="true" />
          <div className="peta-hero__cloud peta-hero__cloud--two" aria-hidden="true" />

          <div className="peta-hero__inner">
            <div className="peta-hero__child peta-reveal" data-peta-reveal>
              <div className="peta-hero__child-frame">
                <img src={IMAGE_URLS.child} alt="手に絵の具をつけた子ども" />
              </div>
              <p>赤ちゃんの「今」を<br />かわいいアートで残そう！</p>
            </div>

            <div className="peta-hero__copy peta-reveal" data-peta-reveal>
              <div className="peta-hero__seminar-badge">
                ライフプラン
                <strong>ミニセミナー付き</strong>
              </div>
              <p className="peta-hero__title-kicker">
                <span>手形</span>
                <span className="peta-hand-mark" aria-hidden="true">✋</span>
                <span>足形</span>
                <span className="peta-foot-mark" aria-hidden="true">👣</span>
              </p>
              <h1>
                <span>ペタペタアート</span>
                <small>ワークショップ</small>
              </h1>
              <p className="peta-hero__plus">＋ ライフプランミニセミナー</p>

              <div className="peta-hero__message">
                <strong>「今」を残して、「未来」に備える。</strong>
                <span>かわいい思い出も、これからの安心も。</span>
              </div>
              <p className="peta-hero__subcopy">
                親子で楽しめる、参加無料の特別イベントへぜひお越しください！
              </p>

              <div className="peta-hero__hooks" aria-label="イベントの特徴">
                <span><Gift aria-hidden="true" />参加無料</span>
                <span><Sparkles aria-hidden="true" />お土産もあるよ！</span>
                <span><Check aria-hidden="true" />当日持ち帰りOK！</span>
              </div>

              <ApplyButton />
              <p className="peta-application-note">応募者多数の場合は先着順。</p>
            </div>

            <div className="peta-hero__baby peta-reveal" data-peta-reveal>
              <div className="peta-hero__baby-frame">
                <img src={IMAGE_URLS.baby} alt="白い服で寝転ぶ赤ちゃん" />
              </div>
              <span className="peta-hero__free-stamp">参加<br />無料</span>
            </div>
          </div>

          <div className="peta-hero__quick-info peta-reveal" data-peta-reveal>
            <div className="peta-hero__dates">
              {dates.map((item) => (
                <div className="peta-date-chip" key={`${item.date}-${item.day}`}>
                  <span>{item.month}</span>
                  <strong>{item.date}</strong>
                  <b>{item.day}</b>
                </div>
              ))}
            </div>
            <p><Clock3 aria-hidden="true" />10：00～16：00 <small>※予約最終15：00</small></p>
            <p><UsersRound aria-hidden="true" />1回60分／各回3名</p>
            <p><Baby aria-hidden="true" />０歳から未就学児のお子様</p>
          </div>
        </section>

        <section className="peta-intro peta-section">
          <div className="peta-container peta-intro__inner">
            <div className="peta-intro__photo peta-reveal" data-peta-reveal>
              <img src={IMAGE_URLS.parentChild} alt="親子で手形アート作品を楽しむ様子" />
              <span aria-hidden="true" />
            </div>
            <div className="peta-intro__copy peta-reveal" data-peta-reveal>
              <p className="peta-intro__lead">小さな手形・足形は、今だけの宝物。</p>
              <p>
                世界にひとつだけのアート作品を作りながら、お子さまの将来に役立つ教育費や家計についても学べます。
              </p>
              <div className="peta-intro__tote">
                <img src={IMAGE_URLS.tote} alt="完成した手形アートのトートバッグ" />
                <p><Gift aria-hidden="true" /><strong>お土産もあるよ！</strong><span>当日持ち帰りOK！</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="peta-about peta-section" id="peta-about">
          <Confetti />
          <div className="peta-container">
            <SectionTitle eyebrow="イベント内容" title="2つのポイント" />

            <article className="peta-point peta-point--art peta-reveal" data-peta-reveal>
              <div className="peta-point__visual">
                <div className="peta-polaroid peta-polaroid--left">
                  <img src={IMAGE_URLS.workshop} alt="親子がペタペタアートを制作する様子" />
                  <span>ワークショップ</span>
                </div>
                <img className="peta-point__motif peta-point__motif--crocodile" src={IMAGE_URLS.crocodile} alt="" aria-hidden="true" />
              </div>
              <div className="peta-point__copy">
                <span className="peta-point__number">POINT 1</span>
                <img className="peta-point__logo" src={IMAGE_URLS.logo} alt="petapeta-art" />
                <h3>ペタペタアートとは</h3>
                <p>
                  やまざきさちえ考案によるこどもの手形や足形をさまざまなモチーフに見立てた手形アート作品のことです。
                </p>
              </div>
            </article>

            <article className="peta-point peta-point--money peta-reveal" data-peta-reveal>
              <div className="peta-point__visual">
                <div className="peta-polaroid peta-polaroid--right">
                  <img src={IMAGE_URLS.planner} alt="ファイナンシャルプランナー" />
                  <span>お金のプロ</span>
                </div>
                <img className="peta-point__motif peta-point__motif--animal" src={IMAGE_URLS.animal} alt="" aria-hidden="true" />
              </div>
              <div className="peta-point__copy">
                <span className="peta-point__number">POINT 2</span>
                <h3>お金のプロに無料相談</h3>
                <p className="peta-point__lead">
                  お金のプロ ファイナンシャルプランナーに無料で相談できます！
                </p>
                <div className="peta-topic-list" aria-label="ご相談いただける内容">
                  {consultationTopics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
                <p>
                  当日はなんでもご相談できます。<br />
                  相談しにくいお金のお悩みなどこの機会にお金のプロにご相談ください！
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="peta-flow peta-section" id="peta-flow">
          <div className="peta-container">
            <SectionTitle
              eyebrow="当日の流れ・システム"
              title="1回60分／各回3名"
              intro="お客様には1時間の枠を確保していただきます（ご予約は30分ごとの枠となります）。"
            />

            <div className="peta-flow__timeline peta-reveal" data-peta-reveal>
              <article className="peta-flow-step peta-flow-step--art">
                <div className="peta-flow-step__time">
                  <span>前半</span>
                  <strong>30</strong>
                  <small>分</small>
                </div>
                <div className="peta-flow-step__icon"><Palette aria-hidden="true" /></div>
                <div>
                  <p>お子様と思い出作り</p>
                  <h3>ペタペタアートの<br />ワークショップ</h3>
                </div>
              </article>

              <div className="peta-flow__plus" aria-hidden="true">＋</div>

              <article className="peta-flow-step peta-flow-step--money">
                <div className="peta-flow-step__time">
                  <span>後半</span>
                  <strong>30</strong>
                  <small>分</small>
                </div>
                <div className="peta-flow-step__icon"><PiggyBank aria-hidden="true" /></div>
                <div>
                  <p>家計の不安などの相談</p>
                  <h3>ファイナンシャルプランナーとの<br />個人面談</h3>
                </div>
              </article>
            </div>

            <div className="peta-flow__assurance peta-reveal" data-peta-reveal>
              <ShieldCheck aria-hidden="true" />
              <p>お客様には1時間の枠を確保していただきます（ご予約は30分ごとの枠となります）。</p>
            </div>
          </div>
        </section>

        <section className="peta-schedule peta-section" id="peta-schedule">
          <Confetti />
          <div className="peta-container">
            <SectionTitle eyebrow="参加無料" title="開催概要とアクセス" />

            <div className="peta-overview-grid">
              {overviewItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    className={`peta-overview-card peta-overview-card--${item.tone} peta-reveal`}
                    data-peta-reveal
                    style={{ transitionDelay: `${index * 55}ms` }}
                    key={item.label}
                  >
                    <Icon aria-hidden="true" />
                    <p>{item.label}</p>
                    <h3>{item.value}</h3>
                    {item.note && <span>{item.note}</span>}
                  </article>
                );
              })}
            </div>

            <div className="peta-venue-layout">
              <div className="peta-venue-list">
                {dates.map((item, index) => (
                  <article className="peta-venue-card peta-reveal" data-peta-reveal key={item.date}>
                    <div className="peta-venue-card__date">
                      <span>{item.month}</span>
                      <strong>{item.date}</strong>
                      <b>{item.day}</b>
                    </div>
                    <div className="peta-venue-card__copy">
                      <p><MapPin aria-hidden="true" />場所</p>
                      <h3>緑区生涯学習センター</h3>
                      <span>{item.room}</span>
                      <small>{index === 0 ? "10：00～16：00" : "10：00～16：00"}（予約最終15：00）</small>
                    </div>
                  </article>
                ))}

                <div className="peta-venue-cta peta-reveal" data-peta-reveal>
                  <ApplyButton />
                  <p>応募者多数の場合は先着順。</p>
                </div>
              </div>

              <div className="peta-map-card peta-reveal" data-peta-reveal>
                <div className="peta-map-card__header">
                  <div>
                    <p>ACCESS</p>
                    <h3>緑区生涯学習センター</h3>
                  </div>
                  <MapPin aria-hidden="true" />
                </div>
                <iframe
                  src={MAP_EMBED_URL}
                  title="緑区生涯学習センターのGoogleマップ"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  Googleマップで経路を見る
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="peta-final peta-section">
          <Confetti />
          <img className="peta-final__butterfly" src={IMAGE_URLS.butterfly} alt="" aria-hidden="true" />
          <div className="peta-container peta-final__inner peta-reveal" data-peta-reveal>
            <div className="peta-final__icon"><HeartHandshake aria-hidden="true" /></div>
            <div className="peta-final__copy">
              <p>「今」を残して、「未来」に備える。</p>
              <h2>かわいい思い出も、<br />これからの安心も。</h2>
              <span>親子で楽しめる、参加無料の特別イベントへぜひお越しください！</span>
            </div>
            <div className="peta-final__action">
              <ApplyButton />
              <p>応募者多数の場合は先着順。</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="peta-footer">
        <div className="peta-container peta-footer__inner">
          <div className="peta-footer__brand">
            <img src={IMAGE_URLS.logo} alt="petapeta-art" />
            <p><strong>手形 足形 ペタペタアート</strong><span>ワークショップ ＋ ライフプランミニセミナー</span></p>
          </div>
          <div className="peta-footer__info">
            <p><School aria-hidden="true" /><span><small>主催</small>(有)アド・フューチャー きらきら☆編集部</span></p>
            <p><Phone aria-hidden="true" /><span><small>お問い合わせ</small><a href="tel:0523047480">052-304-7480</a>（担当：辻村／平日10：00～16：00）</span></p>
          </div>
        </div>
        <p className="peta-footer__copyright">© (有)アド・フューチャー きらきら☆編集部 All Rights Reserved.</p>
      </footer>

      <div className="peta-mobile-cta">
        <ApplyButton compact />
      </div>
    </div>
  );
}
