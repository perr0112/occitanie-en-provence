const plants = [
    {
        name: "lavande",
        title: "La lavande",
        subtitle: "la Lavande",
        description: "Nous utilisons la lavande fine particulièrement pour ses propriétés apaisantes et son parfum délicat. <b>Cet ingrédient est au cœur de notre gamme « Soin Corps »,</b> par exemple dans la composition de notre eau de Cologne et bain moussant. Faisant partie d’un complexe de différentes huiles essentielles, la lavande se trouve également dans certains de nos produits d’aromachologie."
    },
    {
        name: "alyssum-murale",
        title: "Alyssum Murale",
        subtitle: "l'Alyssum Murale",
        description: "Nous apprécions l’Alyssum Murale pour sa floraison généreuse et son parfum délicatement sucré. Cette plante, véritable trésor végétal, est <b>au cœur de notre gamme « Soin Corps »,</b> notamment dans la composition de nos eaux parfumées et de nos crèmes hydratantes. En association avec d’autres extraits botaniques, l’Alyssum Murale révèle toute sa douceur dans nos soins d’aromachologie, apportant une touche florale subtile et apaisante."
    },
    {
        name: "citron-caviar",
        title: "Citron Caviar",
        subtitle: "Citron caviar",
        description: "Nous intégrons le citron caviar pour ses propriétés revitalisantes et sa richesse en vitamine C. <b>Cet ingrédient est au cœur de notre gamme « Soin Corps »,</b> notamment dans la formulation de nos gommages et sérums éclat. En synergie avec d'autres extraits naturels, le citron caviar sublime nos produits d'aromachologie, apportant une touche tonifiante et rafraîchissante."
    },
    {
        name: "bambou-nain",
        title: "Bambou Nain",
        subtitle: "Bambou nain",
        description: "Le bambou nain, <b>reconnu pour sa teneur élevée en silice,</b> est également un composant essentiel de nos soins. Nous l'utilisons pour ses vertus reminéralisantes et fortifiantes, particulièrement bénéfiques pour la peau et les cheveux. Présent dans nos lotions et masques capillaires, le bambou nain contribue à renforcer et revitaliser, offrant une expérience de soin complète et naturelle."
    }
];

const PLANTS_LENGTH = plants.length;

const findPlant = (name) => {
    return plants.filter((p) => p.name === name)[0]
}

export {
    plants,
    PLANTS_LENGTH,
    findPlant
}