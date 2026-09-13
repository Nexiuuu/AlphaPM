import { CreateProjectForm } from "./CreateProjectForm";
import { CreateProjectHeader } from "./CreateProjectHeader";

export const CreateProjectPage = () => {
    return (
        <section className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
            <CreateProjectHeader />

            <CreateProjectForm />
        </section>
    );
};