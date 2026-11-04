import { FileText } from "lucide-react";
import { Button } from "../components/ui/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Statute = () => {
	const { t } = useTranslation("statute");
	const statuteContent = t("STATUTE.content", { returnObjects: true }) as string[];
	const statute = statuteContent.join("\n");
	const sections = statute.split(/(?=^§ \d+\.)/m).map((text) => {
		const headingEnd = text.indexOf("\n");

		return {
			title: text.slice(0, headingEnd),
			content: text.slice(headingEnd + 1),
		};
	});

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
								<div className="space-y-3">
									{section.content.split("\n").map((paragraph, paragraphIndex) => (
										(() => {
											const numberedParagraph = paragraph.match(/^(\s*)(\d+\.\s+)(.*)$/);
											const bulletedParagraph = paragraph.match(/^\s*•\s+(.*)$/);

											if (numberedParagraph) {
												return (
													<p
														key={`${section.title}-${paragraphIndex}`}
														className="grid grid-cols-[2.5rem_minmax(0,1fr)] text-base leading-7 sm:text-lg sm:leading-8"
													>
														<span className="pr-2 text-right">{numberedParagraph[2].trim()}</span>
														<span>{numberedParagraph[3]}</span>
													</p>
												);
											}

											if (bulletedParagraph) {
												return (
													<p
														key={`${section.title}-${paragraphIndex}`}
														className="ml-8 grid grid-cols-[1rem_minmax(0,1fr)] gap-2 text-base leading-7 sm:text-lg sm:leading-8"
													>
														<span aria-hidden="true">•</span>
														<span>{bulletedParagraph[1]}</span>
													</p>
												);
											}

											return (
												<p
													key={`${section.title}-${paragraphIndex}`}
													className="whitespace-pre-wrap text-base leading-7 sm:text-lg sm:leading-8"
												>
													{paragraph}
												</p>
											);
										})()
									))}
								</div>
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