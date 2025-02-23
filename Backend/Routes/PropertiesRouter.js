// just_home/Backend/Routes/PropertiesRouter.js
import express from 'express';
import {
    getAllProperties,
    getPropertyById,    
    getPropertiesByCity,
    getPropertiesByState,
    getPropertiesByCategory,
    getPropertiesByRating,
    getPropertiesByLandmark,
    getPetFriendlyProperties,
    getPropertiesByBedrooms,
    getPropertiesByStatus,
    getPropertiesByPrice,
    addProperty
} from '../Controller/PropertiesController.js';

const router = express.Router();

router.get('/', getAllProperties);

router.get('/city/:cityName', getPropertiesByCity);
router.get('/state/:stateName', getPropertiesByState);
router.get('/category/:categoryName', getPropertiesByCategory);
router.get('/rating', getPropertiesByRating);
router.get('/landmark/:landmark', getPropertiesByLandmark);
router.get('/pet-friendly/:petFriendly', getPetFriendlyProperties);
router.get('/bedrooms/:number', getPropertiesByBedrooms);
router.get('/status/:status', getPropertiesByStatus);
router.get('/price', getPropertiesByPrice);
router.post('/', addProperty);
router.get('/:id', getPropertyById);

export default router;
