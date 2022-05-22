function InitializationFormattingPanel()
{
	//Панель элементов форматирования
	FormattingPnl = document.getElementById('FormattingPanel');
	//Панель документов
	DocumentsPnl = document.getElementById('DocumentsPanel');
	//Цвет текста
	BlackWhiteTheme = false;
	//Заголовок
	TitleText = false;
}
//Показать панель документов
function ShowDocumentsPanel()
{
	document.getElementById('import').style.display = 'block';
	document.getElementById('export').style.display = 'block';
	document.getElementById('files').style.display = 'none';
	document.getElementById('save').style.display = 'none';

	DocumentsPnl.style.display = 'block';
	FormattingPnl.style.display = 'none';
}
//Заголовок
function Title()
{
	if (TitleText == true)
	{
		document.execCommand('formatBlock', false, 'p');
		TitleText = false;
	}

	else
	{
		document.execCommand('formatBlock', false, 'h1');
		TitleText = true;
	}
}

//Жирный текст
function Bold()
{
	document.execCommand('bold', false, null);
}

//Курсивный текст
function Italic()
{
	document.execCommand('italic', false, null);
}

//Подчёркнутый текст
function Underline()
{
	document.execCommand('underline', false, null);
}

//Перечёркнутый текст
function Strikethrough()
{
	document.execCommand('strikethrough', false, null);
}

//Нижний индекс
function Sub()
{
	document.execCommand('subscript', false, null);
}

//Верхний индекс
function Sup()
{
	document.execCommand('superscript', false, null);
}

//Выравнивание по левому краю
function Align_Left()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('justifyLeft', false, null);
}

//Выравнивание по центру
function Align_Center()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('justifyCenter', false, null);
}

//Выравнивание по правому краю
function Align_Right()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('justifyRight', false, null);
}

//Выравнивание по ширине
function Align_Justify()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('justifyFull', false, null);
}

//Маркированный список
function Ul_List()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('insertUnorderedList', false, null);
}

//Нумерованный список
function Ol_List()
{
	document.getElementById('TextBlock').focus();
	document.execCommand('insertOrderedList', false, null);
}

//Увеличить отступ
function Indent_Left()
{
	document.execCommand("outdent");
}

//Уменьшить отступ
function Indent_Right()
{
	document.execCommand("indent");
}

//Изменение цветовой темы
function TextColor()
{
	if (BlackWhiteTheme == false)
	{
		
		$('link[rel=stylesheet]').remove();
		addCssToDom('style-dark.css')
    	BlackWhiteTheme = true;
	}

	else {
		
		$('link[rel=stylesheet]').remove();
		addCssToDom('style-light.css')
		BlackWhiteTheme = false;
	}
}

//Добавить css-файл в <head>
function addCssToDom(url) {
    style = document.createElement('link');
    style.rel   = 'stylesheet';
    style.type  = 'text/css';
    style.href  = url;
    document.head.appendChild(style);
}