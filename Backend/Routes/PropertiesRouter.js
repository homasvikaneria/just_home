// // practice/Backend/Routes/PropertiesRouter.js
// // Routes/PropertiesRouter.js
// import express from 'express'
// import { getAllProperties, getPropertiesByCity, getPropertiesByState,getPropertiesByCategory,getPropertiesByRating, getPropertiesByLandmark,getPetFriendlyProperties,getPropertiesByBedrooms,getPropertiesByStatus,getPropertiesByPrice,addProperty } from '../Controller/PropertiesController.js'

// const PropertiesRouter = express.Router()

// PropertiesRouter.get('/', getAllProperties);
// PropertiesRouter.get('/city/:cityName', getPropertiesByCity);
// PropertiesRouter.get('/state/:stateName', getPropertiesByState);
// PropertiesRouter.get('/category/:categoryName', getPropertiesByCategory);
// PropertiesRouter.get('/rating', getPropertiesByRating);
// PropertiesRouter.get('/landmarks/:landmark', getPropertiesByLandmark);
// PropertiesRouter.get('/petFriendly/:petFriendly', getPetFriendlyProperties);
// PropertiesRouter.get('/bedrooms/:number', getPropertiesByBedrooms);
// PropertiesRouter.get('/status/:status', getPropertiesByStatus);
// PropertiesRouter.get('/price', getPropertiesByPrice);
// PropertiesRouter.post('/', addProperty);

// export default PropertiesRouter