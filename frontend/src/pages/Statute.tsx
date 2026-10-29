import { FileText } from "lucide-react";
import { Button } from "../components/ui/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface StatuteItem {
	term?: string;
	text: string;
}

interface StatuteSection {
	title: string;
	items: StatuteItem[];
}

const sections: StatuteSection[] = [
	{
		title: "§ 1. Postanowienia ogólne",
		items: [
			{ text: "Niniejszy regulamin określa zasady korzystania z platformy internetowej AlphaPM." },
			{ text: "Właścicielem i operatorem AlphaPM jest [?]." },
			{ text: "AlphaPM służy do zarządzania projektami, organizowania zadań, planowania pracy oraz współpracy pomiędzy użytkownikami i zespołami." },
			{ text: "AlphaPM jest przeznaczona w szczególności dla przedsiębiorców, firm i zespołów pracowniczych." },
			{ text: "Korzystanie z AlphaPM może być bezpłatne lub odpłatne, zależnie od wybranego planu." },
			{ text: "Regulamin określa zasady korzystania z AlphaPM oraz prawa i obowiązki Operatora i użytkowników." },
		],
	},
	{
		title: "§ 2. Definicje",
		items: [
			{ term: "AlphaPM", text: "serwis internetowy umożliwiający zarządzanie projektami i zadaniami." },
			{ term: "Operator", text: "podmiot prowadzący AlphaPM." },
			{ term: "Użytkownik", text: "osoba fizyczna korzystająca z Platformy." },
			{ term: "Konto", text: "indywidualny profil Użytkownika umożliwiający korzystanie z funkcji AlphaPM." },
			{ term: "Organizacja", text: "firma, przedsiębiorstwo lub zespół korzystający z AlphaPM." },
			{ term: "Administrator organizacji", text: "Użytkownik uprawniony do zarządzania ustawieniami organizacji i dostępem jej członków." },
			{ term: "Projekt", text: "zbiór zadań, plików, komentarzy i innych informacji związanych z określonym przedsięwzięciem." },
			{ term: "Plan", text: "zakres funkcji dostępnych w ramach bezpłatnego lub płatnego wariantu AlphaPM." },
		],
	},
	{
		title: "§ 3. Rejestracja i konto",
		items: [
			{ text: "Korzystanie z funkcji wymagających konta wymaga rejestracji." },
			{ text: "Podczas rejestracji Użytkownik zobowiązuje się podać wymagane, prawdziwe informacje." },
			{ text: "Użytkownik odpowiada za ochronę danych logowania do swojego Konta." },
			{ text: "Konto nie może być wykorzystywane do działań niezgodnych z prawem." },
			{ text: "Użytkownik powinien niezwłocznie zgłosić podejrzenie nieuprawnionego dostępu do Konta." },
			{ text: "Operator może stosować procedury weryfikacji kont w zakresie uzasadnionym bezpieczeństwem AlphaPM i obowiązującymi przepisami." },
		],
	},
	{
		title: "§ 4. Organizacje i współpraca zespołowa",
		items: [
			{ text: "Użytkownicy mogą tworzyć Organizacje lub dołączać do Organizacji utworzonych przez innych Użytkowników." },
			{ text: "Administrator organizacji może zapraszać członków, przydzielać role i zarządzać uprawnieniami w zakresie funkcji udostępnionych przez AlphaPM." },
			{ text: "Administrator organizacji powinien przyznawać dostęp do projektów i danych wyłącznie osobom uprawnionym." },
			{ text: "Użytkownicy są zobowiązani przestrzegać zasad bezpieczeństwa i poufności obowiązujących w ich organizacji." },
			{ text: "Administrator organizacji powinien poinformować członków zespołu o zasadach korzystania z AlphaPM obowiązujących w organizacji." },
		],
	},
	{
		title: "§ 5. Zarządzanie projektami i zadaniami",
		items: [
			{ text: "AlphaPM umożliwia tworzenie projektów, zarządzanie zadaniami, dodawanie komentarzy oraz współpracę zespołową." },
			{ text: "W zależności od dostępnych funkcji Użytkownicy mogą przypisywać zadania innym osobom, ustalać priorytety i monitorować postępy prac." },
			{ text: "Użytkownik zobowiązuje się korzystać z tych funkcji zgodnie z prawem." },
			{ text: "Użytkownik nie może wykorzystywać AlphaPM do przechowywania lub rozpowszechniania treści bezprawnych." },
			{ text: "Użytkownik powinien posiadać odpowiednie prawa lub upoważnienia do materiałów, które umieszcza w projektach." },
			{ text: "Operator nie staje się właścicielem treści projektowych wyłącznie dlatego, że są one przechowywane na AlphaPM." },
		],
	},
	{
		title: "§ 6. Komentarze",
		items: [
			{ text: "Użytkownicy mogą dodawać komentarze." },
			{ text: "Użytkownik odpowiada za legalność udostępnianych treści w zakresie wynikającym z obowiązujących przepisów." },
			{ text: "Zabronione jest publikowanie treści naruszających prawa autorskie, prawa innych osób lub obowiązujące przepisy." },
			{ text: "Operator może stosować środki bezpieczeństwa i reagować na zgłoszenia dotyczące bezprawnych treści zgodnie z obowiązującymi przepisami." },
		],
	},
	{
		title: "§ 7. Plany bezpłatne i płatne",
		items: [
			{ text: "Operator może oferować różne Plany dostępu do AlphaPM." },
			{ text: "Plan bezpłatny udostępnia funkcje określone w opisie tego Planu." },
			{ text: "Plany płatne mogą zapewniać dodatkowe funkcje, większe limity, rozszerzone możliwości współpracy." },
			{ text: "Aktualne ceny, zakres funkcji i ograniczenia poszczególnych Planów są przedstawiane przed dokonaniem zakupu." },
			{ text: "Użytkownik przed zakupem Planu płatnego powinien zapoznać się z jego warunkami." },
			{ text: "Operator informuje o istotnych zmianach dotyczących cen i zakresu usług zgodnie z obowiązującymi przepisami oraz warunkami umowy." },
			{ text: "Zasady rozliczeń, odnawiania subskrypcji, rezygnacji i zwrotów powinny zostać przedstawione Użytkownikowi przed zawarciem umowy." },
		],
	},
	{
		title: "§ 8. Prawa i obowiązki Operatora",
		items: [
			{ text: "Operator zapewnia dostęp do funkcji AlphaPM w zakresie określonym dla danego Planu." },
			{ text: "Operator podejmuje odpowiednie działania w celu zapewnienia bezpieczeństwa i prawidłowego działania AlphaPM." },
			{ text: "Operator może przeprowadzać prace techniczne, aktualizacje i konserwację." },
			{ text: "Operator może wprowadzać zmiany w funkcjach AlphaPM, z uwzględnieniem zawartych umów i obowiązujących przepisów." },
			{ text: "Operator nie wykorzystuje danych projektowych w sposób sprzeczny z obowiązującymi przepisami, umową i informacjami przekazanymi Użytkownikom." },
			{ text: "Operator nie gwarantuje nieprzerwanej dostępności AlphaPM, chyba że odrębna umowa stanowi inaczej." },
			{ text: "Postanowienia regulaminu nie wyłączają odpowiedzialności Operatora w zakresie, w którym wyłączenie byłoby prawnie niedopuszczalne." },
		],
	},
	{
		title: "§ 9. Bezpieczeństwo i poufność danych",
		items: [
			{ text: "Operator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony informacji przechowywanych na AlphaPM." },
			{ text: "Użytkownicy powinni chronić dane logowania i odpowiednio zarządzać dostępem do swoich projektów." },
			{ text: "Użytkownik nie może uzyskiwać dostępu do projektów, kont ani informacji, do których nie jest uprawniony." },
			{ text: "Informacje poufne należące do Organizacji powinny być udostępniane wyłącznie osobom uprawnionym." },
			{ text: "Użytkownicy powinni unikać umieszczania w AlphaPM danych, których nie są uprawnieni przetwarzać." },
			{ text: "Szczegółowe zasady przetwarzania danych osobowych określają odpowiednie informacje o prywatności oraz, jeżeli jest to wymagane, odrębne umowy dotyczące przetwarzania danych." },
		],
	},
	{
		title: "§ 10. Prawa autorskie",
		items: [
			{ text: "Elementy AlphaPM, w tym kod źródłowy, projekt graficzny, nazwa i logo, mogą podlegać ochronie prawnej." },
			{ text: "Użytkownik zachowuje przysługujące mu prawa do treści umieszczanych na AlphaPM." },
			{ text: "Użytkownik upoważnia Operatora do korzystania z tych treści w zakresie niezbędnym do świadczenia usług, zgodnie z umową i obowiązującymi przepisami." },
			{ text: "Użytkownik nie może kopiować ani rozpowszechniać chronionych elementów AlphaPM bez odpowiedniej podstawy prawnej." },
		],
	},
	{
		title: "§ 11. Usunięcie konta i danych",
		items: [
			{ text: "Użytkownik może zażądać usunięcia Konta zgodnie z procedurą udostępnioną na AlphaPM." },
			{ text: "Operator informuje o zasadach usuwania danych, okresach ich przechowywania oraz ewentualnych wyjątkach w odpowiednich dokumentach." },
			{ text: "Przed usunięciem Konta Użytkownik powinien sprawdzić, czy chce zachować kopie swoich projektów." },
			{ text: "Zasady dotyczące danych i projektów po odejściu członka zespołu powinny uwzględniać uprawnienia Organizacji, prawa Użytkownika oraz przepisy dotyczące ochrony danych." },
		],
	},
	{
		title: "§ 12. Reklamacje",
		items: [
			{ text: "Użytkownik może zgłaszać reklamacje dotyczące działania AlphaPM na adres: [e-mail]." },
			{ text: "Reklamacja powinna zawierać opis problemu oraz dane niezbędne do jej rozpatrzenia." },
			{ text: "Operator rozpatruje reklamacje w terminie i na zasadach wynikających z obowiązujących przepisów oraz właściwych warunków świadczenia usług." },
			{ text: "W razie potrzeby Operator może poprosić o dodatkowe informacje niezbędne do rozpatrzenia zgłoszenia." },
		],
	},
	{
		title: "§ 13. Zmiany regulaminu",
		items: [
			{ text: "Operator może zmienić regulamin z uzasadnionych przyczyn, w szczególności w przypadku zmian funkcjonalności AlphaPM, przepisów prawa lub sposobu świadczenia usług." },
			{ text: "Użytkownicy są informowani o istotnych zmianach w odpowiedni sposób." },
			{ text: "Zmiany dotyczące umów zawartych na czas określony lub subskrypcji są wprowadzane zgodnie z właściwymi przepisami i warunkami umowy." },
		],
	},
	{
		title: "§ 14. Postanowienia końcowe",
		items: [
			{ text: "Regulamin obowiązuje od dnia wskazanego na początku dokumentu." },
			{ text: "W sprawach nieuregulowanych regulaminem zastosowanie mają właściwe przepisy prawa." },
			{ text: "Kontakt z Operatorem jest możliwy pod adresem: [e-mail]." },
			{ text: "Jeżeli którekolwiek postanowienie regulaminu okaże się nieważne, nie wpływa to automatycznie na ważność pozostałych postanowień." },
		],
	},
];

export const Statute = () => {
	const { t } = useTranslation("statute");

    return (
	<main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10 text-[var(--color-text)]">
		<section>
			<header className="mb-8 border-b border-[var(--color-border)] pb-6 sm:mb-10 sm:pb-8">
				<p className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]">
					<FileText size={17} aria-hidden="true" />
					{t("ldocument")}
				</p>
				<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					{t("statute")}
				</h2>
				<p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
					{t("stitle")}
				</p>
			</header>

			<div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
				<nav
					aria-label="Spis treści regulaminu"
					className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:sticky lg:top-6"
				>
					<h3 className="mb-3 text-sm font-semibold">{t("contents")}</h3>
					<ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
						{sections.map((section, index) => (
							<li key={section.title}>
								<a
									href={`#section-${index + 1}`}
									onClick={(event) => {
										if (
											event.button !== 0 ||
											event.metaKey ||
											event.ctrlKey ||
											event.shiftKey ||
											event.altKey
										) {
											return;
										}

										const target = document.getElementById(`section-${index + 1}`);
										if (!target) return;

										event.preventDefault();
										window.history.pushState(null, "", `#section-${index + 1}`);
										target.scrollIntoView({
											behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
												? "auto"
												: "smooth",
											block: "start",
										});
									}}
									className="block rounded px-2 py-1.5 text-xs leading-5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
								>
									{section.title}
								</a>
							</li>
						))}
					</ol>
				</nav>

				<article className="min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-7 shadow-[var(--shadow-sm)] sm:px-8 sm:py-9">
					<h1 className="mb-8 text-center text-xl font-bold tracking-[0.14em] sm:text-2xl">
						{t("statuteup")}
					</h1>
					<div className="space-y-9 sm:space-y-11">
						{sections.map((section, index) => (
							<section
								key={section.title}
								id={`section-${index + 1}`}
								className="scroll-mt-8"
								aria-labelledby={`section-heading-${index + 1}`}
							>
								<h2
									id={`section-heading-${index + 1}`}
									className="mb-4 border-b border-[var(--color-border)] pb-2 text-center text-lg font-semibold sm:text-xl"
								>
									{section.title}
								</h2>
								{index === 1 && (
									<p className="mb-4 text-sm leading-7 text-[var(--color-text-muted)]">
										Na potrzeby niniejszego regulaminu przyjmuje się następujące definicje:
									</p>
								)}
								<ol className="list-decimal space-y-3 pl-5 text-sm leading-7 marker:font-medium marker:text-[var(--color-primary)] sm:text-[15px]">
									{section.items.map((item, itemIndex) => (
										<li key={`${section.title}-${itemIndex}`} className="pl-1">
											{item.term ? (
												<>
													<strong className="font-semibold">{item.term}</strong>
													{" – "}
													{item.text}
												</>
											) : (
												item.text
											)}
										</li>
									))}
								</ol>
							</section>
						))}
					</div>
					<div className="mt-8 flex justify-center">
						<Link to="/login" className="mt-8 block text-center">
							<Button variant="primary" type="button" className="px-20 py-5 text-xl">
								{t("backToLogin")}
							</Button>
						</Link>
					</div>
				</article>
			</div>
		</section>
	</main>
    );
};