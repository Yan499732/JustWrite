function InitializationTextBlock()
{
	//Отслеживание фокуса на "шапке"
	Focus = false;
}

//Табуляция
$('body').on('keydown', '.TextBlock', function(e){
	if (e.keyCode === 9) {
		e.preventDefault();
		var editor = this;
		var doc = editor.ownerDocument.defaultView;
		var sel = doc.getSelection();
		var range = sel.getRangeAt(0);
		var tabNode = document.createTextNode("\t");
		range.insertNode(tabNode);
		range.setStartAfter(tabNode);
		range.setEndAfter(tabNode);
		sel.removeAllRanges();
		sel.addRange(range);
	}		
});

//Удаление стилей при вставке
function escape_text(text) { 
	var map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
	return text.replace(/[&<>"']/g, function(m) {
		return map[m];
	});
}
$('body').on('paste', '.TextBlock', function(e){
	e.preventDefault();
	var text = (e.originalEvent || e).clipboardData.getData('text/plain');
	document.execCommand('insertHtml', false, escape_text(text));
});

//Скрыть элемент при фокусе на текстовом блоке
function HideFormatingPanel()
{
	if (Focus == false)
	{
		document.getElementById("Header").style.opacity = 0;
		document.getElementById("DocumentsPanel").style.opacity = 0;
		document.getElementById('statistics').style.opacity = 0;
		document.getElementById('statistics-panel').style.opacity = 0;
		document.getElementById('statistics-panel').style.display = 'none';
		OpenStatisticsPanel = false;
	}
}

//Показать элемент при отключении фокуса на текстовом блоке
function ShowFormatingPanel()
{
	document.getElementById("Header").style.opacity = 1;
	document.getElementById("DocumentsPanel").style.opacity = 1;
	document.getElementById('statistics').style.opacity = 1;
	document.getElementById('statistics-panel').style.opacity = 1;
}

//Фокус на "шапке"
function HeaderFocus()
{
	Focus = true;
	document.getElementById("Header").style.opacity = 1;
	document.getElementById("DocumentsPanel").style.opacity = 1;
	document.getElementById('statistics').style.opacity = 1;
	document.getElementById('statistics-panel').style.opacity = 1;
}

//Выход из "шапки"
function HeaderBlur()
{
	Focus = false;
}

//Скрыть панель документов при клике
function HideDocumentsPanel()
{
	document.getElementById('TextBlock').classList.remove('TextBlockAtActiveDocumentsPanel');
	document.getElementById('import').style.display = 'none';
	document.getElementById('export').style.display = 'none';
	DocumentsPnl.style.display = 'none';
	ShowHideDocPnl = false;
}