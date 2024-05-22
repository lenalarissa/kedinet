// utils/ImageLoader.js
export const loadCatImage = (imageName) => {
    try {
        const image = require(`../assets/cat_images/${imageName}`);
        return image.default || image;
    } catch (err) {
        console.error(`Cannot find image ${imageName}`, err);
        return null;
    }
};
