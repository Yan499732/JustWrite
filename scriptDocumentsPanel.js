function InitializationDocumentsPanel()
{
	//Режим работы с документом
	OpenRename = true;
	//Состояние панели статистики
	OpenStatisticsPanel = false;
	//ID последнего документа
	if (localStorage.getItem('DocumentID') === null) DocumentID = 0;
	else DocumentID = localStorage.getItem('DocumentID');
	//Название документа
	if (localStorage.getItem('DocumentName') === null) NameDocument = [];
	else
	{
		let NamesMas = localStorage.getItem('DocumentName');
		NameDocument = JSON.parse(NamesMas);
	}
	//Текст, хранящийся в документе
	if (localStorage.getItem('DocumentText') === null) TextinDocument = [];
	else
	{
		let TextsMas = localStorage.getItem('DocumentText');
		TextinDocument = JSON.parse(TextsMas);
	}
	//ID текущего документа
	ThisID = 0;
	//Текст из импортируемого файла
	ImportFileText = "";

	for (let i = 0, j = DocumentID, k = 1, w = 0; i <= j; i++, k++)
	{
		if (NameDocument[i] != 'Deleted')
		{
			if (NameDocument[i] == null) NameDocument[i] = "Новый документ";
			if (TextinDocument[i] == null) TextinDocument[i] = "";

			document.getElementById("Documents").insertAdjacentHTML('beforeend', '<div id="Doc-' + i + '" class="Document DivButton"><input id="' + i + '" class="DivButton" type="text" value="' + NameDocument[i] + '" onclick="OpenDocument(this)" oncontextmenu="Rename(this); return false" onkeypress="EndRename(this)" readonly><button id="' + i +'" class="Document-Delete" onclick="DeleteDocument(this)"></button></div>');
		}
	}

	DocumentID++;
}

//Добавление нового документа в панель документов
function NewDocument()
{
	document.getElementById("Documents").insertAdjacentHTML('beforeend', '<div id="Doc-' + DocumentID + '" class="Document DivButton"><input id="' + DocumentID + '" class="DivButton" type="text" value="Новый документ" onclick="OpenDocument(this)" oncontextmenu="Rename(this); return false" onkeypress="EndRename(this)" readonly><button id="' + DocumentID + '" class="Document-Delete" onclick="DeleteDocument(this)"></button></div>');

	TextinDocument[DocumentID] = "";

	DocumentID++;

	localStorage.setItem('DocumentID', DocumentID - 1);
}

//Открытие документа
function OpenDocument(Input)
{
	if (OpenRename == true)
	{
		ThisID = Input.id;
		document.getElementById("TextBlock").innerHTML = TextinDocument[ThisID];
		document.getElementById('import').style.display = 'none';
		document.getElementById('export').style.display = 'none';
		document.getElementById('files').style.display = 'block';
		document.getElementById('save').style.display = 'block';
		DocumentsPnl.style.display = 'none';

		FormattingPnl.style.display = 'block';
	}
}

//Смена названия документа при клике ПКМ по input
function Rename(Input)
{
	Input.readOnly = false;
	Input.classList.add("WriteInput");
	Input.select();
	OpenRename = false;
}

//Завершение редактирования названия документа при нажатии Enter
function EndRename(Input)
{
	if (event.keyCode == 13)
	{
		NameDocument[Input.id] = Input.value;
		Input.readOnly = true;
		Input.classList.remove("WriteInput");
		OpenRename = true;
		localStorage.setItem('DocumentName', JSON.stringify(NameDocument));
	}
}

//Сохранение документа
function SaveDocument()
{
	TextinDocument[ThisID] = document.getElementById("TextBlock").innerHTML;
	localStorage.setItem('DocumentText', JSON.stringify(TextinDocument));
	//localStorage.clear();
}

//Удаление документа
function DeleteDocument(Document)
{
	let delete_document = document.getElementById('Doc-' + Document.id);
	delete_document.remove();

	NameDocument[Document.id] = 'Deleted';
	TextinDocument[Document.id] = 'Deleted';

	localStorage.setItem('DocumentName', JSON.stringify(NameDocument));
	localStorage.setItem('DocumentText', JSON.stringify(TextinDocument));
}

//Экспортирование список документов
function ExportData()
{
	let Import = JSON.stringify(DocumentID) + "<NewExportData>";
	Import += JSON.stringify(NameDocument) + "<NewExportData>";
	Import += JSON.stringify(TextinDocument);
	//alert(Import);

	let blob = new Blob([Import], {type: "text/plain"});
	let link = document.createElement("a");
	link.setAttribute("href", URL.createObjectURL(blob));
	link.setAttribute("download", "JustWriteUserData.txt");
	link.click();
}

//Импортирование список документов
function ImportData()
{
	let download = document.createElement("input");
	download.setAttribute("id", "file");
	download.setAttribute("type", "file");
	download.style.display = "none";
	download.click();
	document.getElementById("Documents").append(download);	

	download.onchange = function()
	{
		let file = document.getElementById('file').files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function()
		{
			ImportFileText = reader.result;
			document.getElementById("file").remove();
			let text = ImportFileText.split('<NewExportData>');
			DocumentID = text[0];
			NameDocument = JSON.parse(text[1]);
			TextinDocument = JSON.parse(text[2]);

			document.getElementById("Documents").innerHTML = '';

			for (let i = 0, j = DocumentID, k = 1; i <= j; i++, k++)
			{
				if (NameDocument[i] != 'Deleted')
				{
					if (NameDocument[i] == null) NameDocument[i] = "Новый документ";
					if (TextinDocument[i] == null) TextinDocument[i] = "";

					document.getElementById("Documents").insertAdjacentHTML('beforeend', '<div id="Doc-' + i + '" class="Document DivButton"><input id="' + i + '" class="DivButton" type="text" value="' + NameDocument[i] + '" onclick="OpenDocument(this)" oncontextmenu="Rename(this); return false" onkeypress="EndRename(this)" readonly><button id="' + i +'" class="Document-Delete" onclick="DeleteDocument(this)"></button></div>');
				}
			}

			DocumentID++;

			localStorage.setItem('DocumentID', DocumentID - 1);
			localStorage.setItem('DocumentName', JSON.stringify(NameDocument));
			localStorage.setItem('DocumentText', JSON.stringify(TextinDocument));
		}
	}
}

//Сохранение файла на ПК
function saveToPC(str)
{
   let blob = new Blob([str], {type: "text/plain"});
   let link = document.createElement("a");
   link.setAttribute("href", URL.createObjectURL(blob));
   link.setAttribute("download", Date.now()+"");
   link.click();
}

//Скрыть/показать статистику документа
function ShowHideStatisticsPanel()
{
	if (OpenStatisticsPanel == false)
	{
		document.getElementById('statistics-panel').style.display = 'block';
		OpenStatisticsPanel = true;
	}
	else
	{
		document.getElementById('statistics-panel').style.display = 'none';
		OpenStatisticsPanel = false;
	}

	UpdateStatistics();
}

//Анализ текста для вывода статистики
function UpdateStatistics()
{
	TextinDocument[ThisID] = document.getElementById("TextBlock").innerHTML;
	let TextForAnalysis = TextinDocument[ThisID];
	let Words = 0;
	let CharactersWithoutSpaces = 0;
	let CharactersWithSpaces = 0;
	let Paragraphs = 0;
	let Strings = 0;

	Paragraphs = TextForAnalysis.split('<div>').length; //Абзацы

	TextForAnalysis = TextForAnalysis.replace(/<\/div>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/p>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/h1>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<b>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/b>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<i>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/i>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<u>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/u>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<strike>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/strike>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<ul><li>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/li><\/ul>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<ol><li>/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<\/li><\/ol>/g, '');


	TextForAnalysis = TextForAnalysis.replace(/<blockquote style="margin: 0 0 0 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<blockquote style="text-align: left; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<blockquote style="text-align: center; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<blockquote style="text-align: right; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<blockquote style="text-align: justify; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<h1 style="margin: 0 0 0 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: left; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: center; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: right; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: justify; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<p style="margin: 0 0 0 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: left; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: center; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: right; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: justify; margin: 0px 0px 0px 40px; border: none; padding: 0px;">/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<\/blockquote>/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<div style="text-align: left;">/g, ' ');
	TextForAnalysis = TextForAnalysis.replace(/<div style="text-align: center;">/g, ' ');
	TextForAnalysis = TextForAnalysis.replace(/<div style="text-align: right;">/g, ' ');
	TextForAnalysis = TextForAnalysis.replace(/<div style="text-align: justify;">/g, ' ');


	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: left;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: center;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: right;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<h1 style="text-align: justify;">/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: left;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: center;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: right;">/g, '');
	TextForAnalysis = TextForAnalysis.replace(/<p style="text-align: justify;">/g, '');

	TextForAnalysis = TextForAnalysis.replace(/<br>/g, '');

	CharactersWithSpaces = TextForAnalysis.replace(/<div>/g, '').length; //Знаки с пробелами

	TextForAnalysis = TextForAnalysis.replace(/<div>/g, ' ');

	Words = TextForAnalysis.split(/([\u0400-\u04FF]|\w)+(?=\s|\b|\W|$)/).length; //Слова
	Strings = parseInt(window.getComputedStyle(document.getElementById('TextBlock'), null).getPropertyValue('height')) / parseInt(window.getComputedStyle(document.getElementById('TextBlock'), null).getPropertyValue('line-height')); //Строки

	TextForAnalysis = TextForAnalysis.replace(/ /g, '');

	CharactersWithoutSpaces = TextForAnalysis.length; //Знаки без пробелов
	
	document.getElementById('words').innerHTML = (Words - 1) / 2;
	document.getElementById('characters-without-spaces').innerHTML = CharactersWithoutSpaces;
	document.getElementById('characters-with-spaces').innerHTML = CharactersWithSpaces;
	if (CharactersWithSpaces == 0) document.getElementById('paragraphs').innerHTML = Paragraphs - 1;
	else document.getElementById('paragraphs').innerHTML = Paragraphs;
	if (CharactersWithSpaces == 0) document.getElementById('strings').innerHTML = parseInt(Strings) - 1;
	else document.getElementById('strings').innerHTML = parseInt(Strings);
}