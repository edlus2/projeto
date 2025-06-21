const mtlLoader = new THREE.MTLLoader();
mtlLoader.load('path/to/your-model.mtl', (materials) => {
    materials.preload();
    loader.setMaterials(materials);
    loader.load('path/to/your-model.obj', (obj) => {
        model = obj;
        scene.add(model);
        animate();
    });
});
