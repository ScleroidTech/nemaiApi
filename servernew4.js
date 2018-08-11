var express = require("express");
app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
//var session = require('express-session');
//var flash = require('express-flash-notification');
//const MSG91 = require("./MSG91");
var connection = mysql.createConnection({
	//connectionLimit : 25,
	host: 'nemainew.cyelmj7smxyj.us-east-1.rds.amazonaws.com',
	user: 'nemai1234',
	password: 'nemai1234',
	database: 'nemai1234',
	port: '3306',
	debug: false,
	multipleStatements: true
});
connection.connect(function (err) {
	if (err) throw err;

	console.log('You are now connected with mysql database...')
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // Body parser use JSON data
// default route
app.get('/', function (req, res) {
	return res.send({
		error: true,
		message: 'Something\'s cooking here Check back soon'
	})
});


app.post('/search', function (req, response) {
	var pincode = req.body.pincode;
	connection.query('SELECT pincode,location,state,area from state where pincode = ?', [pincode], function (err, rows, fields) {
		if (err) {
			response.status(500).send("SOmething went wrong" + err);
			throw err;
		}

		var data = [];

		for (i = 0; i < rows.length; i++) {
			data.push(rows[i].pincode + ',' + rows[i].location + ',' + rows[i].state + ',' + rows[i].area);
		}
		response.status(200).send(JSON.stringify(data));
		//console.log(JSON.stringify(data));
		//console.log(JSON.stringify(data));
		//console.log(req.query.key);
		//console.log(JSON.stringify(data));
	});
});

var distance = require('google-distance-matrix');

app.post('/check', function (req, res) {
	var data1, data2, data3, data4, data5, data6;
	var data = {
		"error": 1,
		"rates": "",
		"metro": "",
		"deliverytime": "",
		"ServiceType": "",
		"store1": ""
	};

	var dob = req.body.dob;

	//console.log("package");
	var parcel = req.body.parcel;
	var weight = req.body.weight;
	var package = req.body.package;
	var length = req.body.length;
	var width = req.body.width;
	var height = req.body.height;
	//console.log(dob);
	var user_gms1 = (length * width * height) / 4750;
	//console.log(user_gms1);

	var org = [req.body.demo];
//console.log(org);
//console.log("log1");	
	var dest = [req.body.dest];
	var dist;
	//console.log(dest);
	//console.log("log2");//AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE//AlzaSyBQVmATq4mGUO3FKDaxNQb8bDQhqtEpASU
	distance.key('AIzaSyCgbkUKubYAtJTWwSEdSh39yLsOAM_POHw');
	distance.units('metric');

	distance.matrix(org, dest, function (err, distances) {
		if (distances.status == 'OK') {
			for (var i = 0; i < org.length; i++) {
				for (var j = 0; j < dest.length; j++) {
					var origin = distances.origin_addresses[i];
					var destination = distances.destination_addresses[j];
					if (distances.rows[0].elements[j].status == 'OK') {
						dist = distances.rows[i].elements[j].distance.text;
						console.log(dist);
						console.log('Distance from ' + org + ' to ' + dest + ' is ' + dist);
						var orginal_amount = 500;
						var total_amount,
							total_amount1;
						var weightGroup;
						var your_column_name;
						if ((user_gms1 > 0 && user_gms1 <= 50) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((user_gms1 > 0 && user_gms1 <= 50) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((user_gms1 > 0 && user_gms1 <= 50) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((user_gms1 > 0 && user_gms1 <= 50) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((user_gms1 > 0 && user_gms1 <= 50) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((user_gms1 >= 51 && user_gms1 <= 200) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((user_gms1 >= 51 && user_gms1 <= 200) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((user_gms1 >= 51 && user_gms1 <= 200) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((user_gms1 >= 51 && user_gms1 <= 200) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((user_gms1 >= 51 && user_gms1 <= 200) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((user_gms1 >= 201 && user_gms1 <= 500) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((user_gms1 >= 201 && user_gms1 <= 500) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((user_gms1 >= 201 && user_gms1 <= 500) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((user_gms1 >= 201 && user_gms1 <= 500) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((user_gms1 >= 201 && user_gms1 <= 500) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((user_gms1 > 500) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((user_gms1 > 500) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((user_gms1 > 500) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((user_gms1 > 500) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = 'add 500 gms';

						} else if ((user_gms1 > 500) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = 'add 500 gms';
						} else if ((weight > 0 && weight <= 50) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((weight > 0 && weight <= 50) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((weight > 0 && weight <= 50) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((weight > 0 && weight <= 50) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((weight > 0 && weight <= 50) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '1 - 50 gms';
							console.log("success");

						} else if ((weight >= 51 && weight <= 200) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((weight >= 51 && weight <= 200) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((weight >= 51 && weight <= 200) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((weight >= 51 && weight <= 200) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((weight >= 51 && weight <= 200) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '51 - 200 gms';
							console.log("success");

						} else if ((weight >= 201 && weight <= 500) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((weight >= 201 && weight <= 500) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((weight >= 201 && weight <= 500) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((weight >= 201 && weight <= 500) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((weight >= 201 && weight <= 500) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = '201 - 500 gms';
							console.log("success");

						} else if ((weight > 500) && (dist >= '1 km' && dist <= '100 km')) {
							your_column_name = 'kms1_100';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((weight > 500) && (dist >= '100 km' && dist <= '200 km')) {
							your_column_name = 'kms100_200';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((weight > 500) && (dist >= '201 km' && dist <= '999 km')) {
							your_column_name = 'kms200_1000';
							weightGroup = 'add 500 gms';
							console.log("success");
						} else if ((weight > 500) && (dist >= '1000 km' && dist <= '2000 km')) {
							your_column_name = 'kms1001_2000';
							weightGroup = 'add 500 gms';

						} else if ((weight > 500) && (dist >= '2000 km')) {
							your_column_name = 'above2000kms';
							weightGroup = 'add 500 gms';
						}


						connection.query("select ?? from rates where weights = ?;select ?? from metro where weights = ?;select deliverytime1 from deliverytime where deliverytime5 ='sample1';select servicetype4 from ServiceType where servicetype1 = 'PREMIUM';select servicetype1 from ServiceType where servicetype4 = 'STANDARD' ;INSERT INTO store1 SET org = ?, dest = ?, dob = ?, weight = ?, package = ?, length = ?, width = ?, height = ?;INSERT INTO store1 SET org = ?, dest = ?, dob = ?, weight = ?, package = ?, length = ?, width = ?, height = ?, user_gms1 = ?", [your_column_name, weightGroup, your_column_name, weightGroup, org, dest, dob, weight, package, length, width, height, org, dest, dob, weight, package, length, width, height, user_gms1], function (error, data) {
							console.log(JSON.stringify(data[3]));

							if ((user_gms1 > 500) && (dist >= '1 km' && dist <= '100 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((user_gms1 > 500) && (dist >= '100 km' && dist <= '200 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								//res.send({data: total_amount1,data1: total_amount2});
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((user_gms1 > 500) && (dist >= '201 km' && dist <= '999 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((user_gms1 > 500) && (dist >= '1000 km' && dist <= '2000 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((user_gms1 > 500) && (dist >= '2000 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((weight > 500) && (dist >= '1 km' && dist <= '100 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((weight > 500) && (dist >= '100 km' && dist <= '200 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((weight > 500) && (dist >= '201 km' && dist <= '999 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((weight > 500) && (dist >= '1000 km' && dist <= '2000 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								console.log(str5);
								total_amount2 = 30 + Number(str5);
								//res.send({data: total_amount1,data1: total_amount2});
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
							} else if ((weight > 500) && (dist >= '2000 km')) {
								var str = JSON.stringify(data[0]);
								var str3 = JSON.stringify(data[1]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								total_amount1 = 30 + Number(str2);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								total_amount2 = 30 + Number(str5);
								// res.send({data: total_amount1,data1: total_amount2});
								res.send({
									data: total_amount1,
									data1: total_amount2,
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4]),
									data2: JSON.stringify(data[2])
								});
								//console.log(total_amount1);
								//console.log(total_amount2);
							} else {

								var str = JSON.stringify(data[0]);
								var str1 = str.substr(17, 19);
								var str2 = str1.substr(0, 5);
								var str3 = JSON.stringify(data[1]);
								var str4 = str3.substr(17, 19);
								var str5 = str4.substr(0, 3);
								res.send({
									data: str2,
									data1: str5,
									data2: JSON.stringify(data[2]),
									data3: JSON.stringify(data[3]),
									data4: JSON.stringify(data[4])
								});
								//res.send('./', {data: str2,data1: str5});

							}
						});


					}

					else {
						console.log(dest + ' is not reachable by land from ' + org);
					}
				}
			}
		}
	});

	app.get('/customer', function (req, res) {
		var data1, data2;
		var data = {
			"error": 1,
			"deliverytime": "",
			"ServiceType": ""
		};
		connection.query("select servicetype1 from ServiceType where servicetype4 = 'STANDARD';select deliverytime1 from deliverytime where deliverytime5 = 'sample1';select deliverytime3 from deliverytime where deliverytime4 = 'sample2'", function (error, data) {
			if (error) throw error;

			var str1 = JSON.stringify(data[1]);
			var str2 = JSON.stringify(data[2]);

			res.end(JSON.stringify(data[0]) + ',' + JSON.stringify(data[1]) + ',' + JSON.stringify(data[2]));

		});
	});


});


app.get('/api/getallregister', function (req, res) {

	var data = {
		"error": 1,
		"newuser": ""
	};
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');

	//pool.getConnection(function (err, connection) {
	connection.query('SELECT * FROM registration', function (err, rows, fields) {
		if (!!err) {
			data["newuser"] = "Error Adding data";
			console.log(err);
			//log.error(err);
		} else {
			data["error"] = 0;
			data["newuser"] = rows;
			res.json(data);

			//log.info("Added: " + [name, description, price]);
		}
		res.json(data);
		// message = "Succesfully! Your account has been created.";

	});


});


app.post('/register', function (req, res) {
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var phone = req.body.phone;
	var gender = req.body.gender;
	//var city = req.body.city;
	var password = req.body.password;
	var loginMethod = req.body.login_method;
//	var dob = req.body.dob;
//	console.log(req.headers);
	var data = {

		"message": ""
	};
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
	if (!!fname && !!lname && !!email && !!phone && !!gender && !!password /* && !!dob && !!city*/) {
		//pool.getConnection(function (err, connection) {
		connection.query("INSERT INTO registration SET fname = ?, lname = ?, email = ?, phone = ?, gender = ?,  password = ?, loginMethod = ?"/*, dob = ?,city =?*/, [fname, lname, email, phone, gender, password, loginMethod/*, dob, city*/], function (err, rows, fields) {
			if (!!err) {
				if (err.errno === 1062) {
					data["message"] = "Duplicate Data Entered";
					//	console.log(err);
					res.status(406).json(data);
					console.log(err);
				}
				else {
					data["message"] = "Error Occured";
					//	console.log(err);
					res.status(412).json(data);
					console.log(err);
				}
			} else {

				data["message"] = "new user Added Successfully";

				console.log("Added: " + [fname, lname, email, phone, gender, loginMethod/*, dob, city*/]);
				res.status(201).json(data);
				//log.info("Added: " + [name, description, price]);
			}
			//	res.json(data);
			// message = "Succesfully! Your account has been created.";

		});

	} else {
		data["message"] = "Some Fields missing";
		res.status(401).json(data);
	}
});

app.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	connection.query('SELECT * FROM registration WHERE email = ?', [email], function (error, results, fields) {
		if (error) {
			// console.log("error ocurred",error);
			res.send({
				"code": 400,
				"failed": "error ocurred"
			})
		} else {
			// console.log('The solution is: ', results);
			if (results.length > 0) {
				if (results[0].password === password) {
					res.send({
						"code": 200,
						"success": "login successful"
					});
				}
				else {
					res.send({
						"code": 204,
						"success": "Email and password does not match"
					});
				}
			}
			else {
				res.send({
					"code": 204,
					"success": "Email does not exists"
				});
			}
		}
	});
});
var server = app.listen(3306, function () {
//server.address().address
	var host = 'ec2-54-164-191-128.compute-1.amazonaws.com';
	var port = server.address().port;

	console.log("dummy app listening at: " + host + ":" + port);

});

module.exports = app;
