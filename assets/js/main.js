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
			cta: "MEHR ENTDECKEN"
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
			cta: "DISCOVER MORE"
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
const pageShell = document.querySelector(".page-shell");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageTrigger = document.querySelector("[data-language-trigger]");
const currentLanguage = document.querySelector("[data-current-language]");
const languageButtons = document.querySelectorAll("[data-language]");
const i18nNodes = document.querySelectorAll("[data-i18n]");

let activeLanguage = "de";

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
	}
});

setMenuState(false);
applyTranslations(activeLanguage);

if (window.lucide) {
	window.lucide.createIcons();
}
