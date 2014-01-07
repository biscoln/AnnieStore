// -------------------------------------------------------------------
// This code is a modified version of Option Transfer script
// The original code is here: http://www.mattkruse.com/javascript/optiontransfer/ 
// -------------------------------------------------------------------

// -------------------------------------------------------------------
// selectUnselectMatchingOptions(select_object,regex,select/unselect,true/false)
//  This is a general function used by the select functions below, to
//  avoid code duplication
// -------------------------------------------------------------------

function fetchlist(fn,listname,currentmode) {
	if ( currentmode == "" ) 
		currentmmode = "local";
	if ( listname.value == currentmode ) {
		return;
	} else {

		fn.trigger.value == "";
		fn.submit();
	}
}

function array_push(array_name,element) {
	var array_len = array_name.length;
	array_name[array_len] = element;
	return array_name;
}

function removeItem(fn) {

	fn.action="/cma/article/removeandreturn.php";
	fn.submit();
}

function selectUnselectMatchingOptions(obj,regex,which,only) {
	if (window.RegExp) {
		if (which == "select") {
			var selected1=true;
			var selected2=false;
			}
		else if (which == "unselect") {
			var selected1=false;
			var selected2=true;
			}
		else {
			return;
			}
		var re = new RegExp(regex);
		for (var i=0; i<obj.options.length; i++) {
			if (re.test(obj.options[i].text)) {
				obj.options[i].selected = selected1;
				}
			else {
				if (only == true) {
					obj.options[i].selected = selected2;
					}
				}
			}
		}
	}
		
// -------------------------------------------------------------------
// selectMatchingOptions(select_object,regex)
//  This function selects all options that match the regular expression
//  passed in. Currently-selected options will not be changed.
// -------------------------------------------------------------------
function selectMatchingOptions(obj,regex) {
	selectUnselectMatchingOptions(obj,regex,"select",false);
	}
// -------------------------------------------------------------------
// selectOnlyMatchingOptions(select_object,regex)
//  This function selects all options that match the regular expression
//  passed in. Selected options that don't match will be un-selected.
// -------------------------------------------------------------------
function selectOnlyMatchingOptions(obj,regex) {
	selectUnselectMatchingOptions(obj,regex,"select",true);
	}
// -------------------------------------------------------------------
// unSelectMatchingOptions(select_object,regex)
//  This function Unselects all options that match the regular expression
//  passed in. 
// -------------------------------------------------------------------
function unSelectMatchingOptions(obj,regex) {
	selectUnselectMatchingOptions(obj,regex,"unselect",false);
	}
	
// -------------------------------------------------------------------
// sortSelect(select_object)
//   Pass this function a SELECT object and the options will be sorted
//   by their text (display) values
// -------------------------------------------------------------------
function sortSelect(obj) {
	var o = new Array();
	if (obj.options==null) { return; }
	for (var i=0; i<obj.options.length; i++) {
		o[o.length] = new Option( obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
		}
	if (o.length==0) { return; }
	o = o.sort( 
		function(a,b) { 
			if ((a.text+"") < (b.text+"")) { return -1; }
			if ((a.text+"") > (b.text+"")) { return 1; }
			return 0;
			} 
		);

	for (var i=0; i<o.length; i++) {
		obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
		}
	}

// -------------------------------------------------------------------
// selectAllOptions(select_object)
//  This function takes a select box and selects all options (in a 
//  multiple select object). This is used when passing values between
//  two select boxes. Select all options in the right box before 
//  submitting the form so the values will be sent to the server.
// -------------------------------------------------------------------
function selectAllOptions(obj) {
	var selectedlist = new Array();
	for (var i=0; i<obj.options.length; i++) {
		obj.options[i].selected = true;
		selectedlist = array_push(selectedlist,obj.options[i].value);
	}
	document.forms[1].selectedlist.value = selectedlist.join(",");
}
	

function addNewOptions(value,to) {
        to.options[to.options.length] = new Option( value, value, false, false);
        to.selectedIndex = -1;
        }

function addNewOptionsToTop(value,to) {
	for (var i=to.options.length-1; i>=0; i--) {
		var after = i+1;
		to.options[after] = new Option( to.options[i].text, to.options[i].value, false, false);
		
	}
        to.options[0] = new Option( value, value, false, false);
        to.selectedIndex = -1;
        }

// -------------------------------------------------------------------
// moveSelectedOptions(select_object,select_object[,autosort(true/false)[,regex]])
//  This function moves options between select boxes. Works best with
//  multi-select boxes to create the common Windows control effect.
//  Passes all selected values from the first object to the second
//  object and re-sorts each box.
//  If a third argument of 'false' is passed, then the lists are not
//  sorted after the move.
//  If a fourth string argument is passed, this will function as a
//  Regular Expression to match against the TEXT or the options. If 
//  the text of an option matches the pattern, it will NOT be moved.
//  It will be treated as an unmoveable option.
//  You can also put this into the <SELECT> object as follows:
//    onDblClick="moveSelectedOptions(this,this.form.target)
//  This way, when the user double-clicks on a value in one box, it
//  will be transferred to the other (in browsers that support the 
//  onDblClick() event handler).
// -------------------------------------------------------------------
function moveSelectedOptions(from,to) {
	// Unselect matching options, if required
	if (arguments.length>3) {
		var regex = arguments[3];
		if (regex != "") {
			unSelectMatchingOptions(from,regex);
			}
		}
	// Move them over
	for (var i=0; i<from.options.length; i++) {
		var o = from.options[i];
		if (o.selected) {
			to.options[to.options.length] = new Option( o.text, o.value, false, false);
			}
		}
	// Delete them from original
	for (var i=(from.options.length-1); i>=0; i--) {
		var o = from.options[i];
		if (o.selected) {
			from.options[i] = null;
			}
		}
	if ((arguments.length<3) || (arguments[2]==true)) {
		sortSelect(from);
		sortSelect(to);
		}
	from.selectedIndex = -1;
	to.selectedIndex = -1;
}

function moveSelectedOptionsToTop(from,to) {
	// Unselect matching options, if required
	if (arguments.length>3) {
		var regex = arguments[3];
		if (regex != "") {
			unSelectMatchingOptions(from,regex);
			}
		}
	// Move them over
	for (var i=from.options.length-1; i>=0; i--) {
		var o = from.options[i];
		if (o.selected) {
			//to.options[to.options.length] = new Option( o.text, o.value, false, false);
			for (var t=to.options.length-1; t>=0; t--) {
				var after = t+1;
				to.options[after] = new Option( to.options[t].text, to.options[t].value, false, false);
			}
			to.options[0] = new Option( o.text, o.value, false, false);
		}
	}

	// Delete them from original
	for (var i=(from.options.length-1); i>=0; i--) {
		var o = from.options[i];
		if (o.selected) {
			from.options[i] = null;
			}
		}
	if ((arguments.length<3) || (arguments[2]==true)) {
		sortSelect(from);
		sortSelect(to);
		}
	from.selectedIndex = -1;
	to.selectedIndex = -1;
}

// -------------------------------------------------------------------
// copySelectedOptions(select_object,select_object[,autosort(true/false)])
//  This function copies options between select boxes instead of 
//  moving items. Duplicates in the target list are not allowed.
// -------------------------------------------------------------------
function copySelectedOptions(from,to) {
	var options = new Object();
	for (var i=0; i<to.options.length; i++) {
		options[to.options[i].text] = true;
		}
	for (var i=0; i<from.options.length; i++) {
		var o = from.options[i];
		if (o.selected) {
			if (options[o.text] == null || options[o.text] == "undefined") {
				to.options[to.options.length] = new Option( o.text, o.value, false, false);
				}
			}
		}
	if ((arguments.length<3) || (arguments[2]==true)) {
		sortSelect(to);
		}
	from.selectedIndex = -1;
	to.selectedIndex = -1;
	}

// -------------------------------------------------------------------
// moveAllOptions(select_object,select_object[,autosort(true/false)[,regex]])
//  Move all options from one select box to another.
// -------------------------------------------------------------------
function moveAllOptions(from,to) {
	selectAllOptions(from);
	if (arguments.length==2) {
		moveSelectedOptions(from,to);
		}
	else if (arguments.length==3) {
		moveSelectedOptions(from,to,arguments[2]);
		}
	else if (arguments.length==4) {
		moveSelectedOptions(from,to,arguments[2],arguments[3]);
		}
	}

// -------------------------------------------------------------------
// copyAllOptions(select_object,select_object[,autosort(true/false)])
//  Copy all options from one select box to another, instead of
//  removing items. Duplicates in the target list are not allowed.
// -------------------------------------------------------------------
function copyAllOptions(from,to) {
	selectAllOptions(from);
	if (arguments.length==2) {
		copySelectedOptions(from,to);
		}
	else if (arguments.length==3) {
		copySelectedOptions(from,to,arguments[2]);
		}
	}

// -------------------------------------------------------------------
// swapOptions(select_object,option1,option2)
//  Swap positions of two options in a select list
// -------------------------------------------------------------------
function swapOptions(obj,i,j) {
	var o = obj.options;
	var i_selected = o[i].selected;
	var j_selected = o[j].selected;
	var temp = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
	var temp2= new Option(o[j].text, o[j].value, o[j].defaultSelected, o[j].selected);
	o[i] = temp2;
	o[j] = temp;
	o[i].selected = j_selected;
	o[j].selected = i_selected;
	}
	
// -------------------------------------------------------------------
// moveOptionUp(select_object)
//  Move selected option in a select list up one
// -------------------------------------------------------------------
function moveOptionUp(obj) {
	// If > 1 option selected, do nothing
	var selectedCount=0;
	for (i=0; i<obj.options.length; i++) {
		if (obj.options[i].selected) {
			selectedCount++;
			}
		}
	if (selectedCount!=1) {
		return;
		}
	// If this is the first item in the list, do nothing
	var i = obj.selectedIndex;
	if (i == 0) {
		return;
		}
	swapOptions(obj,i,i-1);
	obj.options[i-1].selected = true;
	}

// -------------------------------------------------------------------
// moveOptionDown(select_object)
//  Move selected option in a select list down one
// -------------------------------------------------------------------
function moveOptionDown(obj) {
	// If > 1 option selected, do nothing
	var selectedCount=0;
	for (i=0; i<obj.options.length; i++) {
		if (obj.options[i].selected) {
			selectedCount++;
			}
		}
	if (selectedCount != 1) {
		return;
		}
	// If this is the last item in the list, do nothing
	var i = obj.selectedIndex;
	if (i == (obj.options.length-1)) {
		return;
		}
	swapOptions(obj,i,i+1);
	obj.options[i+1].selected = true;
	}

// -------------------------------------------------------------------
// removeSelectedOptions(select_object)
//  Remove all selected options from a list
//  (Thanks to Gene Ninestein)
// -------------------------------------------------------------------
function removeSelectedOptions(from) { 
	for (var i=(from.options.length-1); i>=0; i--) { 
		var o=from.options[i]; 
		if (o.selected) { 
			from.options[i] = null; 
			} 
		} 
	from.selectedIndex = -1; 
	} 

function selectAllRight(formname){
alert("hello");
	var itemArray=new Array(); 
	for ( var i=0;i < formname.selecteditem.options.length; i++ ) {
		pos = i+1;
		itemArray.push(formname.selecteditem.options[i].value + "_" + pos);
	}
	formname.selectedlist.value = itemArray.join(",");
	alert(formname.selectedlist.value);
	//return 1;
}
function OT_transferUp() { moveOptionUp(this.right); this.update(); }
function OT_transferDown() { moveOptionDown(this.right); this.update(); }
function OT_transferLeft() { moveSelectedOptions(this.right,this.left,this.autoSort); this.update(); }
function OT_transferRight() {
	if(document.forms[1].newitem.value>0){
		addNewOptionsToTop(document.forms[1].newitem.value,this.right); 
		document.forms[1].newitem.value = "";
		this.update(); 
	}else{
		moveSelectedOptionsToTop(this.left,this.right,this.autoSort); this.update(); 
	}
}
function OT_transferAllLeft() { moveAllOptions(this.right,this.left,this.autoSort); this.update(); }
function OT_transferAllRight() { moveAllOptions(this.left,this.right,this.autoSort); this.update(); }
function OT_saveRemovedLeftOptions(f) { this.removedLeftField = f; }
function OT_saveRemovedRightOptions(f) { this.removedRightField = f; }
function OT_saveAddedLeftOptions(f) { this.addedLeftField = f; }
function OT_saveAddedRightOptions(f) { this.addedRightField = f; }
function OT_saveNewLeftOptions(f) { this.newLeftField = f; }
function OT_saveNewRightOptions(f) { this.newRightField = f; }
function OT_update() {
	var removedLeft = new Object();
	var removedRight = new Object();
	var addedLeft = new Object();
	var addedRight = new Object();
	var newLeft = new Object();
	var newRight = new Object();
	for (var i=0;i<this.left.options.length;i++) {
		var o=this.left.options[i];
		newLeft[o.value]=1;
		if (typeof(this.originalLeftValues[o.value])=="undefined") {
			addedLeft[o.value]=1;
			removedRight[o.value]=1;
		}
	}
	for (var i=0;i<this.right.options.length;i++) {
		var o=this.right.options[i];
		newRight[o.value]=1;
		if (typeof(this.originalRightValues[o.value])=="undefined") {
			addedRight[o.value]=1;
			removedLeft[o.value]=1;
		}
	}
	if (this.removedLeftField!=null) { this.removedLeftField.value = OT_join(removedLeft,this.delimiter); }
	if (this.removedRightField!=null) { this.removedRightField.value = OT_join(removedRight,this.delimiter); }
	if (this.addedLeftField!=null) { this.addedLeftField.value = OT_join(addedLeft,this.delimiter); }
	if (this.addedRightField!=null) { this.addedRightField.value = OT_join(addedRight,this.delimiter); }
	if (this.newLeftField!=null) { this.newLeftField.value = OT_join(newLeft,this.delimiter); }
	if (this.newRightField!=null) { this.newRightField.value = OT_join(newRight,this.delimiter); }
	}
function OT_join(o,delimiter) {
	var val; var str="";
	for(val in o){
		if (str.length>0) { str=str+delimiter; }
		str=str+val;
		}
	return str;
	}
function OT_setDelimiter(val) { this.delimiter=val; }
function OT_setAutoSort(val) { this.autoSort=val; }
function OT_init(theform) {
	this.form = theform;
	if(!theform[this.left]){alert("OptionTransfer init(): Left select list does not exist in form!");return false;}
	if(!theform[this.right]){alert("OptionTransfer init(): Right select list does not exist in form!");return false;}
	this.left=theform[this.left];
	this.right=theform[this.right];
	for(var i=0;i<this.left.options.length;i++) {
		this.originalLeftValues[this.left.options[i].value]=1;
		}
	for(var i=0;i<this.right.options.length;i++) {
		this.originalRightValues[this.right.options[i].value]=1;
		}
	if(this.removedLeftField!=null) { this.removedLeftField=theform[this.removedLeftField]; }
	if(this.removedRightField!=null) { this.removedRightField=theform[this.removedRightField]; }
	if(this.addedLeftField!=null) { this.addedLeftField=theform[this.addedLeftField]; }
	if(this.addedRightField!=null) { this.addedRightField=theform[this.addedRightField]; }
	if(this.newLeftField!=null) { this.newLeftField=theform[this.newLeftField]; }
	if(this.newRightField!=null) { this.newRightField=theform[this.newRightField]; }
	this.update();
	}
// -------------------------------------------------------------------
// OptionTransfer()
//  This is the object interface.
// -------------------------------------------------------------------
function OptionTransfer(l,r,a) {
	this.form = null;
	this.left=l;
	this.right=r;
	this.newitem=a;
	this.autoSort=true;
	this.delimiter=",";
	this.originalLeftValues = new Object();
	this.originalRightValues = new Object();
	this.removedLeftField = null;
	this.removedRightField = null;
	this.addedLeftField = null;
	this.addedRightField = null;
	this.newLeftField = null;
	this.newRightField = null;
	this.transferUp=OT_transferUp;
	this.transferDown=OT_transferDown;
	this.transferLeft=OT_transferLeft;
	this.transferRight=OT_transferRight;
	this.transferAllLeft=OT_transferAllLeft;
	this.transferAllRight=OT_transferAllRight;
	this.saveRemovedLeftOptions=OT_saveRemovedLeftOptions;
	this.saveRemovedRightOptions=OT_saveRemovedRightOptions;
	this.saveAddedLeftOptions=OT_saveAddedLeftOptions;
	this.saveAddedRightOptions=OT_saveAddedRightOptions;
	this.saveNewLeftOptions=OT_saveNewLeftOptions;
	this.saveNewRightOptions=OT_saveNewRightOptions;
	this.setDelimiter=OT_setDelimiter;
	this.setAutoSort=OT_setAutoSort;
	this.init=OT_init;
	this.update=OT_update;
	}



var opt = new OptionTransfer("allitem","selecteditem", "newitem");
opt.setAutoSort(false);
opt.setDelimiter("|");
opt.saveRemovedLeftOptions("removedLeft");
opt.saveRemovedRightOptions("removedRight");
opt.saveAddedLeftOptions("addedLeft");
opt.saveAddedRightOptions("addedRight");
opt.saveNewLeftOptions("newLeft");
opt.saveNewRightOptions("newRight");
