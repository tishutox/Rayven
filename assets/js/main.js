const translations = {
	de: {
		nav: {
			home: "START",
			about: "ÜBER",
			team: "TEAM",
			sponsors: "SPONSOREN"
		},
		labels: {
			language: "SPRACHE"
		},
		hero: {
			title: "ENTER THE FIGHT WITH PRECISION AND PRESENCE",
			copy: "Wettbewerbsfokus, klare Identität und eine Bühne für ein Team, das nicht laut wirken muss, um aufzufallen.",
			cta: "ZUM TEAM"
		},
		sections: {
			about: {
				label: "ÜBER",
				title: "Ein klarer Auftritt für eine moderne eSports-Marke.",
				body: "Der Header bleibt leicht, responsiv und präsent. Über dem Hero ist er transparent mit heller Typografie, nach dem Scrollen wechselt er auf eine helle Fläche mit dunklen Akzenten."
			},
			team: {
				label: "TEAM",
				title: "Navigation und Sprache bleiben auf jeder Größe direkt erreichbar.",
				body: "Auf Mobile fährt das Menü weich ein, der Sprachpfeil rotiert beim Aufklappen, und das Logo bleibt als Anker der Seite jederzeit sichtbar."
			},
			sponsors: {
				label: "SPONSOREN",
				title: "Footer und Utility-Flächen sind bewusst reduziert gehalten.",
				body: "Die Struktur orientiert sich an Team Spirit, bleibt aber auf Rayven angepasst: kein Shop-Link, dafür ein kompakter Footer mit den gewünschten Menüpunkten."
			}
		},
		footer: {
			socials: "SOZIALES",
			contact: "KONTAKT",
			imprint: "IMPRESSUM",
			legal: "RECHTLICHES"
		}
	},
	en: {
		nav: {
			home: "HOME",
			about: "ABOUT",
			team: "TEAM",
			sponsors: "SPONSORS"
		},
		labels: {
			language: "LANGUAGE"
		},
		hero: {
			title: "ENTER THE FIGHT WITH PRECISION AND PRESENCE",
			copy: "Competitive focus, a clear identity, and a stage for a team that does not need to shout to stand out.",
			cta: "MEET THE TEAM"
		},
		sections: {
			about: {
				label: "ABOUT",
				title: "A clear visual system for a modern esports brand.",
				body: "The header stays light, responsive, and present. Over the hero it is transparent with bright typography, then shifts to a light surface with dark accents after scrolling."
			},
			team: {
				label: "TEAM",
				title: "Navigation and language stay within reach at every breakpoint.",
				body: "On mobile the menu slides in softly, the language chevron rotates on open, and the logo remains the fixed visual anchor of the page."
			},
			sponsors: {
				label: "SPONSORS",
				title: "Footer and utility areas stay compact and deliberate.",
				body: "The structure follows Team Spirit's logic, but it is adapted for Rayven: no shop link, and a compact footer with the requested items instead."
			}
		},
		footer: {
			socials: "SOCIALS",
			contact: "CONTACT",
			imprint: "IMPRINT",
			legal: "LEGAL"
		}
	}
};

const body = document.body;
const header = document.querySelector("[data-header]");
const hero = document.querySelector("[data-hero]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageTrigger = document.querySelector("[data-language-trigger]");
const currentLanguage = document.querySelector("[data-current-language]");
const languageButtons = document.querySelectorAll("[data-language]");
const i18nNodes = document.querySelectorAll("[data-i18n]");

let activeLanguage = "de";

const setHeaderTheme = (isDark) => {
	header.classList.toggle("is-dark", isDark);
	header.classList.toggle("is-light", !isDark);
};

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
};

const closeLanguageMenu = () => {
	languageSwitcher.classList.remove("is-open");
	languageTrigger.setAttribute("aria-expanded", "false");
};

const toggleLanguageMenu = () => {
	const isOpen = languageSwitcher.classList.toggle("is-open");
	languageTrigger.setAttribute("aria-expanded", String(isOpen));
};

const setMenuState = (isOpen) => {
	body.classList.toggle("menu-open", isOpen);
	mobileMenu.setAttribute("aria-hidden", String(!isOpen));
	menuToggle.setAttribute("aria-expanded", String(isOpen));
};

const syncResponsiveState = () => {
	if (window.innerWidth > 1080) {
		setMenuState(false);
	}
};

menuToggle.addEventListener("click", () => {
	closeLanguageMenu();
	setMenuState(true);
});

menuClose.addEventListener("click", () => setMenuState(false));
menuOverlay.addEventListener("click", () => setMenuState(false));

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
	}
});

const heroObserver = new IntersectionObserver(
	([entry]) => {
		setHeaderTheme(!entry.isIntersecting);
	},
	{
		rootMargin: "-80px 0px 0px 0px",
		threshold: 0.18
	}
);

if (hero) {
	heroObserver.observe(hero);
}

window.addEventListener("resize", syncResponsiveState);

setMenuState(false);
applyTranslations(activeLanguage);
syncResponsiveState();

if (window.lucide) {
	window.lucide.createIcons();
}
