// // datainsert.js
// const mongoose = require('mongoose');
// const Route = require('./RouteModel'); // adjust path if needed

// // MongoDB Atlas URI
// const MONGO_URI = 'mongodb+srv://justcode790_db_user:0QvXPneke8ZC7COd@cluster0.i3iiy4v.mongodb.net/WhereisMybus?retryWrites=true&w=majority&appName=Cluster0';

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes data
// const routes = [
//   {
//     routeName: "Guntur - Tenali",
//     agencyId: new mongoose.Types.ObjectId("68d376212b5ed6463979a215"),
//     numberOfStops: 3,
//     distanceKm: 32,
//     stops: [
//       { stopName: "Guntur Bus Stand", latitude: 16.3067, longitude: 80.4365, stopOrder: 1 },
//       { stopName: "Amaravathi", latitude: 16.3087, longitude: 80.5514, stopOrder: 2 },
//       { stopName: "Tenali Bus Stand", latitude: 16.2396, longitude: 80.6401, stopOrder: 3 }
//     ]
//   },
//   {
//     routeName: "Guntur - Vijayawada",
//     agencyId: new mongoose.Types.ObjectId("68d376212b5ed6463979a215"),
//     numberOfStops: 3,
//     distanceKm: 35,
//     stops: [
//       { stopName: "Guntur Bus Stand", latitude: 16.3067, longitude: 80.4365, stopOrder: 1 },
//       { stopName: "Mangalagiri", latitude: 16.3963, longitude: 80.5510, stopOrder: 2 },
//       { stopName: "Vijayawada Bus Stand", latitude: 16.5062, longitude: 80.6480, stopOrder: 3 }
//     ]
//   },
//   {
//     routeName: "Tenali - Vijayawada",
//     agencyId: new mongoose.Types.ObjectId("68d376212b5ed6463979a215"),
//     numberOfStops: 2,
//     distanceKm: 25,
//     stops: [
//       { stopName: "Tenali Bus Stand", latitude: 16.2396, longitude: 80.6401, stopOrder: 1 },
//       { stopName: "Vijayawada Bus Stand", latitude: 16.5062, longitude: 80.6480, stopOrder: 2 }
//     ]
//   },
//   {
//     routeName: "Guntur - Ponnur",
//     agencyId: new mongoose.Types.ObjectId("68d376212b5ed6463979a215"),
//     numberOfStops: 3,
//     distanceKm: 40,
//     stops: [
//       { stopName: "Guntur Bus Stand", latitude: 16.3067, longitude: 80.4365, stopOrder: 1 },
//       { stopName: "Ponnur Cross", latitude: 16.2000, longitude: 80.5660, stopOrder: 2 },
//       { stopName: "Ponnur Bus Stand", latitude: 16.1875, longitude: 80.5692, stopOrder: 3 }
//     ]
//   }
// ];

// // Insert multiple routes
// async function insertRoutes() {
//   try {
//     const result = await Route.insertMany(routes);
//     console.log('Routes inserted:', result);
//   } catch (err) {
//     console.error('Error inserting routes:', err);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// // Run the insert function
// insertRoutes();


const mongoose = require('mongoose');
const Bus = require('./BusModel'); 
const Route = require('./RouteModel'); 

// MongoDB Atlas URI
const MONGO_URI = 'mongodb+srv://justcode790_db_user:0QvXPneke8ZC7COd@cluster0.i3iiy4v.mongodb.net/WhereisMybus?retryWrites=true&w=majority&appName=Cluster0';

// Your Agency ID
const AGENCY_ID = new mongoose.Types.ObjectId("68d376212b5ed6463979a215");

// Specific Route ID
const ROUTE_ID = new mongoose.Types.ObjectId("68d37c2a3da446b59a7ff886");

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

async function insertBuses() {
  try {
    const route = await Route.findById(ROUTE_ID);
    if (!route) {
      console.log('Route not found!');
      return;
    }

    const buses = [
      {
        shortId: route.routeName.slice(0,2).toUpperCase() + '01',
        registration: route.routeName.slice(0,2).toUpperCase() + '-01',
        busNumber: '01',
        agencyId: AGENCY_ID,
        routeId: route._id,
        routeName: route.routeName
      },
      {
        shortId: route.routeName.slice(0,2).toUpperCase() + '02',
        registration: route.routeName.slice(0,2).toUpperCase() + '-02',
        busNumber: '02',
        agencyId: AGENCY_ID,
        routeId: route._id,
        routeName: route.routeName
      }
    ];

    const result = await Bus.insertMany(buses);
    console.log('Buses inserted:', result);
  } catch (err) {
    console.error('Error inserting buses:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
insertBuses();
