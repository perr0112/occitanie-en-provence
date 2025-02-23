import gsap from "gsap";

let currentTextureIndex = 0;

const changeTexture =
    (
        materialSphere,
        texturePaths,
        textureLoader,
        removeSprites,
        updateSprites,
    ) => {
  
    const nextIndex = (currentTextureIndex + 1) % texturePaths.length;
    const newTexture = textureLoader.load(texturePaths[nextIndex]);
  
    console.log(newTexture, nextIndex);
  
    gsap.to(materialSphere, {
      opacity: 0,
      duration: 0.8,
      onStart: () => removeSprites(),
      onComplete: () => {
        materialSphere.map = newTexture;
        materialSphere.needsUpdate = true;
  
        gsap.to(materialSphere, {
          opacity: 1,
          duration: 0.8,
        });

        updateSprites(nextIndex);
      },
    });
  
    currentTextureIndex = nextIndex;
  };
  

export {
    changeTexture
}
