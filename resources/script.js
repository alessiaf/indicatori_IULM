var config, configB;
var myChartS, myChartB;
var ctx, ctxB;
var chart, chartB;
var desc_num_list = [];
var desc_den_list = [];

$(document).ready(function() {
	
	var sorgente_dati = JSON.parse(getSorgenteDati());
	popolaComboIndicatori(sorgente_dati);
	popolaComboAnni(sorgente_dati);
	aggiornaValoriSingoli(sorgente_dati);

	popolaListaDenominatore();
	popolaListaNumeratore();

	$('#desc_numeratore').text(desc_num_list[0]);
	$('#desc_denominatore').text(desc_den_list[0]);

	config = costruisciGraficoSerie(sorgente_dati);
	myChartS = document.getElementById('grafico-serie');
	ctx = myChartS.getContext('2d');
	chart = new Chart(ctx, config);
	
	chart.options.scales.yAxes[0].ticks.min = 50;
	
	configB = costruisciGraficoBar(sorgente_dati);
	myChartB = document.getElementById('grafico-bar');
	ctxB = myChartB.getContext('2d');
	chartB = new Chart(ctxB, configB);
	
	chart.canvas.parentNode.style.width = '700px';
	chart.canvas.parentNode.style.height = '400px';
	
	chartB.canvas.parentNode.style.width = '700px';
	chartB.canvas.parentNode.style.height = '400px';
	
	$( "#ind-select" ).change(function() {
		
		popolaComboAnni(sorgente_dati);	
		aggiornaValoriSingoli(sorgente_dati);
		
		var elem_sel_ind = $('#ind-select').val();

		$('#desc_numeratore').text(desc_num_list[elem_sel_ind]);
		$('#desc_denominatore').text(desc_den_list[elem_sel_ind]);
	
		var anni = [];
		var dataset = [];
		
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
		}
		
		chart.data.labels = anni;
		
		if (elem_sel_ind == 2 || elem_sel_ind == 8) {
			chart.options.scales.yAxes[0].ticks.min = 0;
			chart.options.scales.yAxes[0].ticks.max = 50;
		} else {
			chart.options.scales.yAxes[0].ticks.min = 60;
			chart.options.scales.yAxes[0].ticks.max = 100;
		}
		
		chart.data.datasets[0].data = dataset;
		chart.update();
		
		var elem_sel_anni = $('#anni-select').val();
	
		var datasetNum = [];
		var datasetDen = [];
	
		if (elem_sel_anni == "-1") {
			for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
			}
		} else {
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
		}
			
		chartB.data.labels = anni;
		chartB.data.datasets[0].data = datasetNum;
		chartB.data.datasets[1].data = datasetDen;
		chartB.update();
	});
	
	$( "#anni-select" ).change(function() {
		aggiornaValoriSingoli(sorgente_dati);
		
		var elem_sel_ind = $('#ind-select').val();
	
		var anni = [];
		var dataset = [];
		
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
		}
		
		chart.data.labels = anni;
		chart.data.datasets[0].data = dataset;
		chart.update();
		
		var elem_sel_anni = $('#anni-select').val();
	
		var datasetNum = [];
		var datasetDen = [];
		var anniB = [];
	
		if (elem_sel_anni == "-1") {
			for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anniB.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
			}
		} else {
			anniB.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['value']);
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
		}
			
		chartB.data.labels = anniB;
		chartB.data.datasets[0].data = datasetNum;
		chartB.data.datasets[1].data = datasetDen;
		chartB.update();
		
	});
	
})

function popolaListaDenominatore() {
	desc_den_list.push("CFU previsti dal CdS dell'ateneo nel primo anno dell\'anno X/X+1");
	desc_den_list.push("Immatricolati puri al CdS nel X/X+1 (informazioneic00b)");
	desc_den_list.push("CFU conseguiti dagli iscritti all'\a.a. X/X+1 nell\'a.s.X+1");
	desc_den_list.push("Totale rispondenti all'indagine");
	desc_den_list.push("Totale laureati X (informazione iC00h)");
	desc_den_list.push("Totale laureati X (informazione iC00h)");
    desc_den_list.push("Laureati X intervistati ad esclusione dei non occupati impegnati in formazione non retribuita");
    desc_den_list.push("Laureati X intervistati");
	desc_den_list.push("Totale ore di docenza");
	desc_den_list.push("Totale docenti di rif. nel CdS");

}

function popolaListaNumeratore() {
	desc_num_list.push("CFU conseguiti dagli studenti immatricolari puri al CdS a 365 dall'immatricolazione");
	desc_num_list.push("Immatricolati puri nell\'anno X/X+1 che entro l'\anno X+1 hanno acquisito almeno 2/3 di CFU");
	desc_num_list.push("CFU conseguiti all\'estero dagli iscritti all'\ a.a. X/X+1 nell\'a.s.X+1");
	desc_num_list.push("Numero soddisfatti (ALMALAUREA o indagine ateneo)");
	desc_num_list.push("Numero laureati regolari nell\'anno X informazione iC00g)");
	desc_num_list.push("Laureati entro un anno oltre la durata normale del corso X");
    desc_num_list.push("Laureati X occupati a tre anni dal titolo");
    desc_num_list.push("Laureati X occupati a un anno dal titolo");
	desc_num_list.push("Ore docenza tempo indeterminato");
	desc_num_list.push("Docenti di ruolo e di rif. nel CdS con SSD caratterizzante CdS");

}

function costruisciGraficoSerie(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	
	var anni = [];
	var dataset = [];
	
	for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
		dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
	}
	
	return {
		type : 'line',
		data : {
			labels : anni,
			datasets : [ {
				label : 'Indicatore',
				data : dataset,
				type : 'line',
				fill : false,
				backgroundColor : 'rgb(237, 125, 49)',
				borderColor : 'rgb(117, 192, 59)',
				pointBackgroundColor: 'rgb(117, 192, 59)',
				pointStyle: 'circle'
			}]
		},

		options : {
			responsive: true,
			legend: {
				display: false,
				reverse: true,
				position: 'right'
			},
			title: {
				display: true,
				fontSize: 18,
				fontColor: '#000',
				fontFamily: 'Arial', 
				position: 'top',
				text: 'Trend indicatore ANVUR'
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Anno accademico"
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Indicatore ANVUR"
					},
					ticks: {
						callback: function(value, index, values) {
							if ($('#ind-select').val() == 2) {
								return value + "\u2030";	
							} else {
								return value + "%";
							}
						}
					}
				}]
			},
			elements : {
				line : {
					tension : 0
				}
			}
		}
	}
}

function costruisciGraficoBar(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	var elem_sel_anni = $('#anni-select').val();
	
	var anni = [];
	var datasetNum = [];
	var datasetDen = [];
	
	if (elem_sel_anni == "-1") {
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
		datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
		datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
		}
	} else {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['value']);
		datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
		datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
	}
	
	
	
	return {
		type : 'bar',
		data : {
			labels : anni,
			datasets : [ {
				label : 'Numeratore',
				data : datasetNum,
				type : 'bar',
				backgroundColor : 'rgb(81, 136, 52)',
				borderColor : 'rgb(65, 65, 65)',
				pointBackgroundColor: 'rgb(237, 125, 49)'
			},
			{
				label : 'Denominatore',
				data : datasetDen,
				type : 'bar',
				backgroundColor : 'rgb(0, 131, 208)',
				borderColor : 'rgb(65, 65, 65)',
				pointBackgroundColor: 'rgb(237, 125, 49)'
			}
			]
		},

		options : {
			responsive: true,
			legend: {
				display: true,
				reverse: true,
				position: 'right'
			},
			title: {
				display: true,
				fontSize: 18,
				fontColor: '#000',
				fontFamily: 'Arial', 
				position: 'top',
				text: 'Numeratore & Denominatore'
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Anno accademico"
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Valore assoluto"
					}
				}]
			}
		}
	}
}


function popolaComboIndicatori(sorgente_dati) {
	var x = document.getElementById("ind-select");
	var option;
	
	for (var i = 0; i < sorgente_dati.length; i++) {
		option = document.createElement("option");
		option.text = sorgente_dati[i]['value'];
		option.value = sorgente_dati[i]['id'];
		x.add(option);
	}
		
}

function popolaComboAnni(sorgente_dati) {
	var elem_selected = $('#ind-select').val();
	var x = document.getElementById("anni-select");
	
	for (var k = x.options.length-1; k >= 0; k--) {
		x.remove(k);
	}
		
	var option = document.createElement("option");
	option.text = "Tutti gli anni accademici";
	option.value = "-1";
	x.add(option);
	
	for (var i = 0; i < sorgente_dati[elem_selected]['anni'].length; i++) {
		option = document.createElement("option");
		option.text = sorgente_dati[elem_selected]['anni'][i]['value'];
		option.value = sorgente_dati[elem_selected]['anni'][i]['id'];
		x.add(option);
	}
}

function aggiornaValoriSingoli(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	var elem_sel_anni = $('#anni-select').val();
	
	if (elem_sel_anni != '-1') {
		$('#container-ind').addClass('show').removeClass('hide');
		$('#container-trend').addClass('show').removeClass('hide');
		
		$('#table-custom-id').addClass('hide').removeClass('show');
		
		if (elem_sel_ind == 2) {
			$('#val-ind').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['indicatore'] + "\u2030");
		} else {
			$('#val-ind').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['indicatore'] + "%");
		}
		
		if (elem_sel_anni == 0) {
			$('#val-trend').text("-");
		} else if (elem_sel_ind == 2) {
			$('#val-trend').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] + "\u2030");
		} else {
			$('#val-trend').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] + "%");
		}
		
		if (elem_sel_anni != 0 && sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] < 0) {
			$('#freccia-rossa').addClass('show').removeClass('hide');
			$('#freccia-verde').addClass('hide').removeClass('show');
		} else if (elem_sel_anni != 0){
			$('#freccia-rossa').addClass('hide').removeClass('show');
			$('#freccia-verde').addClass('show').removeClass('hide');
		} else {
			$('#freccia-rossa').addClass('hide').removeClass('show');
			$('#freccia-verde').addClass('hide').removeClass('show');
		}
		
	} else {
		$('#container-ind').addClass('hide').removeClass('show');
		$('#container-trend').addClass('hide').removeClass('show');
		$('#table-custom-id').addClass('show').removeClass('hide');
		
		var anno, indicatore, trend;
		
		$('#content-body').empty();
		
		for (var k=0; k<sorgente_dati[elem_sel_ind]['anni'].length; k++) {
			anno = sorgente_dati[elem_sel_ind]['anni'][k]['value'];
			indicatore = sorgente_dati[elem_sel_ind]['anni'][k]['indicatore'];
			
			if (k == 0) {
				trend = '-';
			} else {
				trend = sorgente_dati[elem_sel_ind]['anni'][k]['trend'];	
			}
			
			$('#content-body').append('<tr>');
			$('#content-body').append('<td>'+anno+'</td>');
			
			if (elem_sel_ind == 2) {
				$('#content-body').append('<td>'+indicatore+'\u2030 </td>');
			} else {
				$('#content-body').append('<td>'+indicatore+'% </td>');
			}
			
			if (k == 0) {
				$('#content-body').append('<td>'+trend+'</td>');
			} else if (elem_sel_ind == 2) {
				$('#content-body').append('<td>'+trend+'\u2030</td>');	
			} else {
				$('#content-body').append('<td>'+trend+'%</td>');	
			}
			
			if (k != 0 && trend < 0) {
				$('#content-body').append('<td><img style="width:20px; height:20px;" src="resources/freccia rossa.png"></img></td>');	
			} else if (k != 0) {
				$('#content-body').append('<td><img style="width:20px; height:20px;" src="resources/freccia verde.png"></img></td>');	
			}
						
			$('#content-body').append('</tr>');
		}
		
	}
}


function getSorgenteDati() {
	return `
	[
		{
			"id" : "0",
			"value": "Percentuale dei CFU conseguiti al I anno su CFU da conseguire",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "44.05",
					"denominatore": "60",
					"indicatore": "73.42",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "44.30",
					"denominatore": "60",
					"indicatore": "73.83",
					"trend": "0.42"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "47.08",
					"denominatore": "60",
					"indicatore": "78.47",
					"trend": "4.63"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "45.42",
					"denominatore": "60",
					"indicatore": "75.70",
					"trend": "-2.77"
				},
                {
                    "id": "4",
                    "value": "2021",
                    "numeratore": "47.88",
                    "denominatore": "60",
                    "indicatore": "79.80",
                    "trend": "4.10"
                }
			]
		},
		{
			"id" : "1",
			"value": "Percentuale di studenti che proseguono al II anno nella stessa classe di laurea avendo acquisito almeno 2/3 dei CFU previsti al I anno",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "1296",
					"denominatore": "1925",
					"indicatore": "67.32",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "1442",
					"denominatore": "2117",
					"indicatore": "68.12",
					"trend": "0.79"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "1673",
					"denominatore": "2260",
					"indicatore": "74.03",
					"trend": "5.91"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "1584",
					"denominatore": "2348",
					"indicatore": "67.46",
					"trend": "-6.56"
				},
                {
                    "id": "4",
                    "value": "2021",
                    "numeratore": "1887",
                    "denominatore": "2553",
                    "indicatore": "73.91",
                    "trend": "6.45"
                }
			]
		},
		{
			"id" : "2",
			"value": "Proporzione di CFU conseguiti all'estero dagli studenti \(ivi inclusi quelli acquisiti durante periodi di 'mobilita' virtuale'\)",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "2838",
					"denominatore": "239727",
					"indicatore": "11.84",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "4758",
					"denominatore": "262653",
					"indicatore": "18.12",
					"trend": "6.28"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "5013",
					"denominatore": "300390",
					"indicatore": "16.69",
					"trend": "-1.43"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "2133",
					"denominatore": "315924",
					"indicatore": "6.75",
					"trend": "-9.94"
				},
                {
                    "id": "4",
                    "value": "2021",
                    "numeratore": "5274",
                    "denominatore": "336631",
                    "indicatore": "15.67",
                    "trend": "8.92"
                }
			]
		},
		{
			"id" : "3",
			"value": "Percentuale dei laureandi complessivamente soddisfatti del Corso di Studio",
			"anni": [
				{
					"id": "0",
					"value": "2018",
					"numeratore": "1246",
					"denominatore": "1335",
					"indicatore": "93.33",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2019",
					"numeratore": "1281",
					"denominatore": "1367",
					"indicatore": "93.71",
					"trend": "0.38"
				},
				{
					"id": "2",
					"value": "2020",
					"numeratore": "1280",
					"denominatore": "1361",
					"indicatore": "94.05",
					"trend": "0.34"
				},
                {
                    "id": "3",
                    "value": "2021",
                    "numeratore": "1705",
                    "denominatore": "1871",
                    "indicatore": "91.13",
                    "trend": "-2.92"
                },
                {
                    "id": "4",
                    "value": "2022",
                    "numeratore": "1723",
                    "denominatore": "1891",
                    "indicatore": "91.12",
                    "trend": "-0.01"
                }
			]
		},
		{
			"id" : "4",
			"value": "Percentuale di laureati (L; LM; LMCU) entro la durata normale del corso",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "1031",
					"denominatore": "1258",
					"indicatore": "81.96",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "1155",
					"denominatore": "1422",
					"indicatore": "81.22",
					"trend": "-0.73"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "1235",
					"denominatore": "1483",
					"indicatore": "83.28",
					"trend": "2.05"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "1461",
					"denominatore": "1743",
					"indicatore": "83.82",
					"trend": "0.54"
				},
                {
                    "id": "4",
                    "value": "2021",
                    "numeratore": "1670",
                    "denominatore": "1932",
                    "indicatore": "86.44",
                    "trend": "2.62"
                },
                {
                    "id": "5",
                    "value": "2022",
                    "numeratore": "1760",
                    "denominatore": "2010",
                    "indicatore": "87.56",
                    "trend": "1.12"
                }
			]
		},
		
        {
            "id" : "5",
            "value": "Percentuale di laureati (L; LM; LMCU) entro un anno oltre la durata normale del corso",
            "anni": [
                {
                    "id": "0",
                    "value": "2017",
                    "numeratore": "1174",
                    "denominatore": "1258",
                    "indicatore": "93.32",
                    "trend": ""
                },
                {
                    "id": "1",
                    "value": "2018",
                    "numeratore": "1328",
                    "denominatore": "1422",
                    "indicatore": "93.39",
                    "trend": "0.07"
                },
                {
                    "id": "2",
                    "value": "2019",
                    "numeratore": "1403",
                    "denominatore": "1483",
                    "indicatore": "94.61",
                    "trend": "1.22"
                },
                {
                    "id": "3",
                    "value": "2020",
                    "numeratore": "1669",
                    "denominatore": "1743",
                    "indicatore": "95.75",
                    "trend": "1.15"
                },
                {
                    "id": "4",
                    "value": "2021",
                    "numeratore": "1841",
                    "denominatore": "1932",
                    "indicatore": "95.29",
                    "trend": "-0.46"
                },
                {
                    "id": "5",
                    "value": "2022",
                    "numeratore": "1935",
                    "denominatore": "2010",
                    "indicatore": "96.27",
                    "trend": "-0.98"
                }
            ]
        },
{                     "id" : "6",
             "value": "Percentuale di laureati occupati a tre anni dal Titolo (LM; LMCU) \(distinti per area medico-sanitaria, area scientifico-tecnologica e area umanistico-sociale\)",
             "anni": [
                 {
                     "id": "0",
                     "value": "2018",
                     "numeratore": "176",
                     "denominatore": "197",
                     "indicatore": "89.34",
                     "trend": ""
                 },
                 {
                     "id": "1",
                     "value": "2019",
                     "numeratore": "181",
                     "denominatore": "199",
                     "indicatore": "90.95",
                     "trend": "1.61"
                 },
                 {
                     "id": "2",
                     "value": "2020",
                     "numeratore": "177",
                     "denominatore": "201",
                     "indicatore": "88.06",
                     "trend": "-2.9"
                 },
                 {
                     "id": "3",
                     "value": "2021",
                     "numeratore": "149",
                     "denominatore": "176",
                     "indicatore": "84.66",
                     "trend": "-3.4"
                 },
                 {
                     "id": "4",
                     "value": "2022",
                     "numeratore": "194",
                     "denominatore": "213",
                     "indicatore": "91.08",
                     "trend": "6.42"
                 }
             ]
         },

{                     "id" : "7",
             "value": "Percentuale di laureati occupati ad un anno dal Titolo (LM; LMCU) \(distinti per area medico-sanitaria, area scientifico-tecnologica e area umanistico-sociale\)",
             "anni": [
                 {
                     "id": "0",
                     "value": "2018",
                     "numeratore": "181",
                     "denominatore": "256",
                     "indicatore": "70.70",
                     "trend": ""
                 },
                 {
                     "id": "1",
                     "value": "2019",
                     "numeratore": "143",
                     "denominatore": "204",
                     "indicatore": "70.10",
                     "trend": "-0.61"
                 },
                 {
                     "id": "2",
                     "value": "2020",
                     "numeratore": "129",
                     "denominatore": "214",
                     "indicatore": "60.28",
                     "trend": "-9.82"
                 },
                 {
                     "id": "3",
                     "value": "2021",
                     "numeratore": "208",
                     "denominatore": "323",
                     "indicatore": "64.40",
                     "trend": "4.12"
                 },
                 {
                     "id": "4",
                     "value": "2022",
                     "numeratore": "226",
                     "denominatore": "327",
                     "indicatore": "69.11",
                     "trend": "4.72"
                 }
             ]
         },
{
			"id" : "8",
			"value": "Percentuale di ore di docenza erogata da docenti a tempo indeterminato sul totale delle ore di docenza erogata",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "9166",
					"denominatore": "26468",
					"indicatore": "34.63",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "10006",
					"denominatore": "28890",
					"indicatore": "34.63",
					"trend": "0"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "9782",
					"denominatore": "31010",
					"indicatore": "31.54",
					"trend": "-3.09"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "10194",
					"denominatore": "46849",
					"indicatore": "21.76",
					"trend": "-9.79"
				},
				{
					"id": "4",
					"value": "2021",
					"numeratore": "9942",
					"denominatore": "36492",
					"indicatore": "27.24",
					"trend": "5.49"
				},
                {
                    "id": "5",
                    "value": "2022",
                    "numeratore": "10046",
                    "denominatore": "39416",
                    "indicatore": "25.49",
                    "trend": "-1.76"
                }
			]
		},
{
			"id" : "9",
			"value": "Percentuale dei docenti di ruolo indicati come docenti di riferimento che appartengono a settori scientifico-disciplinari (SSD) di base e caratterizzanti nei Corsi di Studio (L, LMCU, LM) attivati",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "69",
					"denominatore": "77",
					"indicatore": "89.61",
					"trend": ""
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "72",
					"denominatore": "86",
					"indicatore": "83.72",
					"trend": "-5.89"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "66",
					"denominatore": "81",
					"indicatore": "81.48",
					"trend": "-2.24"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "61",
					"denominatore": "71",
					"indicatore": "85.92",
					"trend": "4.43"
				},
				{
					"id": "4",
					"value": "2021",
					"numeratore": "71",
					"denominatore": "84",
					"indicatore": "84.52",
					"trend": "-1.39"
				},
{
                    "id": "5",
                    "value": "2021",
                    "numeratore": "80",
                    "denominatore": "94",
                    "indicatore": "85.10",
                    "trend": "0.58"
                }
			]
		}
	]
`;
}
