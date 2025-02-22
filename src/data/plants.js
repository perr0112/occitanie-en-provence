const plants = [
    {
        name: "Lavande",
        title: "La Lavande",
        description: "Nous utilisons la lavande fine particulièrement pour ses propriétés apaisantes et son parfum délicat. Cet ingrédient est au cœur de notre gamme « Soin Corps », par exemple dans la composition de notre eau de Cologne et bain moussant. Faisant partie d’un complexe de différentes huiles essentielles, la lavande se trouve également dans certains de nos produits d’aromachologie."
    },
    {
        name: "Alyssum Murale",
        title: "Alyssum Murale",
        description: "Nous apprécions l’Alyssum Murale pour sa floraison généreuse et son parfum délicatement sucré. Cette plante, véritable trésor végétal, est au cœur de notre gamme « Soin Corps », notamment dans la composition de nos eaux parfumées et de nos crèmes hydratantes. En association avec d’autres extraits botaniques, l’Alyssum Murale révèle toute sa douceur dans nos soins d’aromachologie, apportant une touche florale subtile et apaisante."
    }
];

const PLANTS_LENGTH = plants.length;

const findPlant = (name) => {
    return plants.filter((p) => p.name === name)
}

export {
    plants,
    PLANTS_LENGTH,
    findPlant
}