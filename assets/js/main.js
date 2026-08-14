const translations = {
	de: {
		nav: {
			home: "START",
			about: "ÜBER",
			team: "GAMES",
			events: "EVENTS",
			form: "FORMULAR"
		},
		labels: {
			language: "SPRACHE"
		},
		hero: {
			motto: "ERHEBE DICH",
			title: "ENTER THE FIGHT WITH PRECISION AND PRESENCE",
			copy: "Wettbewerbsfokus, klare Identität und eine Bühne für ein Team, das nicht laut wirken muss, um aufzufallen.",
			cta: "MEHR ENTDECKEN"
		},
		footer: {
			socials: "SOZIALES",
			contact: "KONTAKT",
			imprint: "IMPRESSUM",
			legal: "RECHTLICHES"
		},
		cookie: {
			title: "COOKIE-EINSTELLUNGEN",
			intro: "Hier findest du Informationen dazu, wie Rayven Cookies und ähnliche Technologien verwendet.",
			purposeTitle: "WARUM WIR COOKIES VERWENDEN",
			purpose: "Cookies und lokale Speicherungen helfen dabei, Spracheinstellungen zu speichern und die Website zuverlässig bereitzustellen. Sie ermöglichen keine personalisierte Werbung durch Rayven.",
			dataTitle: "WELCHE DATEN GESPEICHERT WERDEN",
			data: "Deine zuletzt ausgewählte Sprache wird lokal in deinem Browser gespeichert. Dadurch bleibt sie beim Aktualisieren und beim späteren Öffnen der Seite erhalten. Diese Einstellung wird nicht an Rayven übertragen.",
			controlTitle: "DEINE AUSWAHL",
			control: "Du kannst gespeicherte Website-Daten jederzeit über die Einstellungen deines Browsers löschen. Wenn du eine andere Sprache auswählst, wird die neue Auswahl automatisch übernommen.",
			close: "SCHLIESSEN"
		}
	},
	en: {
		nav: {
			home: "HOME",
			about: "ABOUT",
			team: "GAMES",
			events: "EVENTS",
			form: "FORM"
		},
		labels: {
			language: "LANGUAGE"
		},
		hero: {
			motto: "RISE",
			title: "ENTER THE FIGHT WITH PRECISION AND PRESENCE",
			copy: "Competitive focus, a clear identity, and a stage for a team that does not need to shout to stand out.",
			cta: "DISCOVER MORE"
		},
		footer: {
			socials: "SOCIALS",
			contact: "CONTACT",
			imprint: "IMPRINT",
			legal: "LEGAL"
		},
		cookie: {
			title: "COOKIE SETTINGS",
			intro: "Here you can find information about how Rayven uses cookies and similar technologies.",
			purposeTitle: "WHY WE USE COOKIES",
			purpose: "Cookies and local storage help us remember your language preference and keep the website working reliably. Rayven does not use them for personalized advertising.",
			dataTitle: "WHAT DATA IS STORED",
			data: "Your last selected language is stored locally in your browser. This keeps it selected when you refresh or return to the page later. This setting is not sent to Rayven.",
			controlTitle: "YOUR CHOICE",
			control: "You can delete stored website data at any time through your browser settings. When you choose another language, your new preference is applied automatically.",
			close: "CLOSE"
		}
	},
	jp: {
		nav: {
			home: "ホーム",
			about: "概要",
			team: "ゲーム",
			events: "イベント",
			form: "フォーム"
		},
		labels: {
			language: "言語"
		},
		hero: {
			motto: "立ち上がれ",
			title: "ENTER THE FIGHT WITH PRECISION AND PRESENCE",
			copy: "競技への集中、明確なアイデンティティ、そして声を張らずとも存在感を放つチームのための舞台。",
			cta: "詳しく見る"
		},
		footer: {
			socials: "ソーシャル",
			contact: "お問い合わせ",
			imprint: "運営情報",
			legal: "法的情報"
		},
		cookie: {
			title: "クッキー設定",
			intro: "Rayvenがクッキーや類似の技術をどのように使用しているかをご案内します。",
			purposeTitle: "クッキーを使用する目的",
			purpose: "クッキーとローカルストレージは、言語設定の保存とウェブサイトの安定した提供に使用されます。Rayvenはパーソナライズ広告には使用しません。",
			dataTitle: "保存されるデータ",
			data: "最後に選択した言語は、お使いのブラウザにローカル保存されます。ページを更新したり、後で再訪問したりしても設定が維持されます。この設定がRayvenに送信されることはありません。",
			controlTitle: "設定の管理",
			control: "保存されたウェブサイトデータは、ブラウザの設定からいつでも削除できます。別の言語を選択すると、新しい設定が自動的に適用されます。",
			close: "閉じる"
		}
	}
};

const body = document.body;
const pageShell = document.querySelector(".page-shell");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageTrigger = document.querySelector("[data-language-trigger]");
const currentLanguage = document.querySelector("[data-current-language]");
const languageButtons = document.querySelectorAll("[data-language]");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const cookieTrigger = document.querySelector("[data-cookie-trigger]");
const cookieModal = document.querySelector("[data-cookie-modal]");
const cookieClose = document.querySelector("[data-cookie-close]");

const languageStorageKey = "rayven-language";
const storedLanguage = window.localStorage.getItem(languageStorageKey);
let activeLanguage = translations[storedLanguage] ? storedLanguage : "de";

const applyTranslations = (language) => {
	const dictionary = translations[language];

	i18nNodes.forEach((node) => {
		const path = node.dataset.i18n.split(".");
		const value = path.reduce((entry, key) => entry && entry[key], dictionary);

		if (value) {
			node.textContent = value;
		}
	});

	currentLanguage.textContent = language.toUpperCase();

	languageButtons.forEach((button) => {
		button.classList.toggle("is-active", button.dataset.language === language);
	});

	document.documentElement.lang = language;
	activeLanguage = language;
	window.localStorage.setItem(languageStorageKey, language);
};

const closeLanguageMenu = () => {
	languageSwitcher.classList.remove("is-open");
	languageTrigger.setAttribute("aria-expanded", "false");
};

const toggleLanguageMenu = () => {
	const isOpen = languageSwitcher.classList.toggle("is-open");
	languageTrigger.setAttribute("aria-expanded", String(isOpen));
};

const setCookieModalState = (isOpen) => {
	cookieModal.classList.toggle("is-open", isOpen);
	cookieModal.setAttribute("aria-hidden", String(!isOpen));
	if (isOpen) {
		cookieClose.focus();
	}
};

const setMenuState = (isOpen) => {
	body.classList.toggle("menu-open", isOpen);
	pageShell.classList.toggle("menu-open", isOpen);
	mobileMenu.setAttribute("aria-hidden", String(!isOpen));
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
	if (isOpen) {
		closeLanguageMenu();
	}
};

menuToggle.addEventListener("click", () => {
	setMenuState(!body.classList.contains("menu-open"));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setMenuState(false));
});

languageTrigger.addEventListener("click", toggleLanguageMenu);

languageButtons.forEach((button) => {
	button.addEventListener("click", () => {
		applyTranslations(button.dataset.language);
		closeLanguageMenu();
	});
});

document.addEventListener("click", (event) => {
	if (!languageSwitcher.contains(event.target)) {
		closeLanguageMenu();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeLanguageMenu();
		setMenuState(false);
		setCookieModalState(false);
	}
});

cookieTrigger.addEventListener("click", () => setCookieModalState(true));
cookieClose.addEventListener("click", () => setCookieModalState(false));
cookieModal.addEventListener("click", (event) => {
	if (event.target === cookieModal) {
		setCookieModalState(false);
	}
});

setMenuState(false);
applyTranslations(activeLanguage);

if (window.lucide) {
	window.lucide.createIcons();
}
