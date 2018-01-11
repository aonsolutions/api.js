const http = require('http');
var querystring = require('querystring');
var config = require("./configuration");

var hostname = config.hostname;
var port = config.port;
var options = config.post_options;

var agreement = createBasicAgreement();
var postData = JSON.stringify(agreement);

var req = http.request(options, function (res) {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('BODY:', chunk);
    });

    res.on('end', function () {
        console.log('No more data in response.');
    });
});

req.on('error', function (e) {
    console.log('Problem with request:', e.message);
});

req.write(postData, "utf8");
req.end();

function createBasicAgreement(){
	var newAgreement =
	{
	  //id:null,
	  domain : 8776,
	  description: 'CONVENIO DE SERGIO VALDEPEÑAS DEL POZO',
	  payments: [
	    {
	      id : null,
	      code : "PREAVISO",
	      expression : null,
	      description : "DIAS PREAVISO",
	      type : 0,
	      startDate : new Date(0),
	      descriptionDecorable : 0,
	      irpfExpression : "__P",
	      quoteExpression : "__P",
				__payConcept : {
					id : 6274,
					domain : 0,
					code : 'PREAVISO',
					description : 'DIAS PREAVISO',
					type : 1,
					descriptionDecorable : 0,
					expression : null,
					irpfExpression : "_P",
					quoteExpression : "_P"
				}
	    },
	    {
	      id : null,
	      code : "SALARIO_BASE_SERGIO",
	      expression : "/*user*/SALARIO_ANUAL/**/ / PAGAS * DIAS_TRABAJADOS / DIAS_MES ",
	      description : "[1]SALARIO BASE SERGIO",
	      type : 1,
	      startDate : new Date(0),
	      descriptionDecorable : 0,
	      irpfExpression : "__S",
	      quoteExpression : "__S",
				__payConcept : {
					// id : null,
					domain : 8776,
					code : 'SALARIO_BASE_SERGIO',
					description : '[1]SALARIO BASE SERGIO',
					type : 1,
					descriptionDecorable : 0,
					expression : "/*user*/SALARIO_ANUAL/**/ / PAGAS * DIAS_TRABAJADOS / DIAS_MES ",
					irpfExpression : "_S",
					quoteExpression : "_S"
				}
	    }
	  ],
	  extras: [{
	    startDate : "1/1",
	    endDate : "12/12",
	    issueDate : "27/6",
	    agreePayment : {
	      id : null,
	      code : "SALARIO_BASE_SERGIO",
	      expression : "/*user*/(SALARIO_BASE + ANTIGUEDAD) *  ( 1 + MAX(0,DIAS(INICIO_CONTRATO,INICIO_NOMINA))  / DIAS_TRABAJADOS) /6/**/",
	      description : "[1]EXTRA SERGIO",
	      type : 1,
	      startDate : new Date(0),
	      descriptionDecorable : 0,
	      irpfExpression : "__W",
	      quoteExpression : "__W",
				__payConcept : {
					id : null,
					domain : 8776,
					code : 'SALARIO_BASE_SERGIO',
					description : '[1]EXTRA SERGIO',
					type : 1,
					descriptionDecorable : 0,
					expression : "/*user*/(SALARIO_BASE + ANTIGUEDAD) *  ( 1 + MAX(0,DIAS(INICIO_CONTRATO,INICIO_NOMINA))  / DIAS_TRABAJADOS) /6/**/",
					irpfExpression : "_W",
					quoteExpression : "_W"
				}
	    }
	  }],
	  levels: [
	    {
	      description: 'I',
				categories: ['Category I.a', 'Category I.b', 'Category I.c', 'Category I.d', 'Category I.e' ]
	    },
			{
	      description: 'II',
				categories: ['PEON AJEDREZ', 'NERD']
	    },
	    {
	      description: 'III',
				categories: ['PERSONAL TITULADO DE GRADO SUPERIOR']
	    }
	  ],
	  periods : [
	    {
	      startDate : new Date(2017,06,27),
	      endDate : null,
	      levels : [
					{
						description : 'II',
	          datas : {"SALARIO_ANUAL" : "25000.99", "JORNADA_LABORAL" : "1777"}
	        },
	        {
						description : 'III',
	          datas : {"SALARIO_ANUAL" : "25000.99", "JORNADA_LABORAL" : "1777"}
	        },
	        {
						description : 'I',
	          datas : {"SALARIO_ANUAL" : "35000.99", "JORNADA_LABORAL" : "1888"}
	        },
					{
						id : 0,
						description : '0',
	          datas : {"SALARIO_ANUAL_NVL_0" : "30000.99", "JORNADA_LABORAL_NVL_0" : "1000"}
	        }
	      ]
	    }
	  ]
	}
	return newAgreement;
}
