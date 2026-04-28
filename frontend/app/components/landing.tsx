import { usePersonnel, useGroups } from "~/services/apiService";

export function Landing() {
    const { data } = usePersonnel();
    const { options } = useGroups();


    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Velkommen til din Personaleoversigt</h1>

            <p className="mb-10">
                Her kan du oprette dit personale og skabe et nemt overblik.
            </p>

            <h2 className="text-2xl font-bold">
                Hold styr på dit personale
            </h2>

            <div className="my-4">

                <p>Du har {data.filter(staff => staff.status === "active").length} aktive personalemedlemmer.</p>
                <p>Du har {options.length} personalegrupper.</p>
            
            </div>

            <p>Ønsker du at tilføje eller slette personalegrupper, kan du trykke på Personalegrupper knappen til venstre. </p>

            <p>Ønsker du at tilføje eller deaktivere personale, kan du trykke på Personale knappen til venstre.</p>


        </div>
        
    );
}