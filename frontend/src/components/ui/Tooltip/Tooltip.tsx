import { useId, type ReactNode } from "react";
import { CircleHelp } from "lucide-react";

interface TooltipProps {
	content: ReactNode;
	ariaLabel: string;
}

export const Tooltip = ({ content, ariaLabel }: TooltipProps) => {
	const tooltipId = useId();

	return (
		<span className="group relative inline-flex align-middle">
			<button
				type="button"
				aria-label={ariaLabel}
				aria-describedby={tooltipId}
				className="inline-flex size-6 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
			>
				<CircleHelp size={19} strokeWidth={2.5} aria-hidden="true" />
			</button>
			<span
				id={tooltipId}
				role="tooltip"
				className="invisible absolute bottom-full left-1/2 z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md border border-[var(--color-primary)] bg-[var(--color-surface)] p-3 text-left text-sm text-[var(--color-text)] opacity-0 shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary)_15%,transparent)] transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
			>
				{content}
			</span>
		</span>
	);
};
