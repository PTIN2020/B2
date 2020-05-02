
// Creacion de colecciones

db.createCollection("Administrators");
db.createCollection("Operators");
db.createCollection("Passengers");
db.createCollection("Nodes");
db.createCollection("Flights");
db.createCollection("Shops");

db.Administrators.insert({
	id: "12123",
	name: "Josep M. Roig",
	email: "jmroig@gmail.com",
	birthdate: new Date("1990-05-18T16:00:00Z"),
	phone: "+34 9856233255",
	password: "aBnsizi"
	});

db.Operators.insert({
	id: "256845",
	name: "Daniel Ortiz",
	email: "dortiz@gmail.com",
	birthdate: new Date("1985-02-10T16:00:00Z"),
	phone: "+34 923568426",
	password: "m12Asml",
	airline: "Swissport"
	});
db.Passengers.insert({
	id: "SD4564",
	name: "Antonio Delgado",
	email: "adelgado@gmail.com",
	birthdate: new Date("1993-01-26T16:00:00Z"),
	phone: "+34 9839565956",
	password: "lIMsd5NVgs",
	country: "Spain",
	City: "Barcelona",
	location: "1.2,1.2"
	});

db.Passengers.insert({
	id: "A334i499J",
	name: "Jordi Gasol",
	email: "jgasol@gmail.com",
	birthdate: new Date("1999-01-02T16:00:00Z"),
	phone: "+34 681339900",
	password: "sA3iskps",
	country: "Spain",
	City: "Barcelona",
	location: "14,55"
	});


db.Passengers.insert({
	id: "45364678J",
	name: "Joaquin Montes Salom",
	email: "jmsalom@gmail.com",
	birthdate: new Date("1989-11-12T16:00:00Z"),
	phone: "+34 678345231",
	password: "joaquin123",
	country: "Spain",
	City: "Madrid",
	location: "12,34"
	});
	
db.Passengers.insert({
	id: "A334i499J",
	name: "Pau Molla Freud",
	email: "pmfreud@gmail.com",
	birthdate: new Date("2000-12-30T16:00:00Z"),
	phone: "+34 612347834",
	password: "aW12sB234",
	country: "Spain",
	City: "El Prat de Llobreat",
	location: "124,85"
	});
	
db.Passengers.insert({
	id: "A0957832",
	name: "Earl Harrison",
	email: "eharrison@gmail.com",
	birthdate: new Date("1980-05-21T16:00:00Z"),
	phone: "+34 681223987",
	password: "aYsTsEvRsG1",
	country: "EEUU",
	City: "California",
	location: "13,87"
	});
	
db.Passengers.insert({
	id: "A334i499J",
	name: "Harald Haaland",
	email: "hhaaland@gmail.com",
	birthdate: new Date("1985-04-25T16:00:00Z"),
	phone: "+34 613457728",
	password: "opSpauHS",
	country: "Norway",
	City: "Oslo",
	location: "21,54"
	});


db.Nodes.insert({
	id: "A1",
	location: "15,16",
	state: "free",
	destination: ""
	});

db.Shops.insert({
	id: "2345",
	name: "Jack and Jones",
	product_name: "Clothes",
	location: "253,145",
	type: "store",
	promotions:[ {
			offer: "2x1 in T-Shirts"
		},
		{
			offer: "2x1 in Shirs"
		}]
	});


db.Flights.insert({
	name: "VL 203",
    From: "Vilanova",
    to: "London",
    Boarding_time: "18:30",
    departure_time: "19:10",
    arrival_time: "21:30",
    seat: "FA2",
    date:  new Date("2020-05-26T16:00:00Z"),
    gate: {
      name: "F4",
      location : "546,20"
    },
    passengers: [{
      id: "SD4564",
      name: "Antonio Delgado"
    },
    {
      id: "57686924E",
      name: "Jordi Gasol"
    },
    {
	  id: "45364678J",
	  name: "Joaquin Montes Salom"
	},
	{
	  id: "A334i499J",
	  name: "Harald Haaland"
	},
	{
	  id: "A0957832",
	  name: "Earl Harrison"
	},
	{
	  id: "A334i499J",
	  name: "Pau Molla Freud"	
	}]
	
});
