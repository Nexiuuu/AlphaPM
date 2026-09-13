import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export const CreateProjectHeader = () => {
    return (
        <header 
            className="py-6"
        >
            <Link
                to="/projects"
                className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
                <ArrowLeft size={19}/> 
                Wróć do projektów
            </Link>

            <h1
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
                Utwórz nowy projekt
            </h1>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Nadaj projektowi nazwę i wybierz kolor, po którym łatwo rozpoznasz go na liście.
            </p>
        </header>
    );
};