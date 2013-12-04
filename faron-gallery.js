
function galleryLoader(div, str){

 var loaderHtml  = '<div style="float:left;margin-top:25px;" class="bump-right dialog">'+str;
     loaderHtml += '</div>';
     $("#"+div).html(loaderHtml);
     loaderHtml += '<img style="float:left;" class="bump-right bump-down" src="http://ardclan.com/assets/img/loaders/loader.gif" />';

 var loader = new Image();
     loader.src = 'http://ardclan.com/assets/img/loaders/loader.gif';
	 loader.onload = function(){ $("#"+div).html(loaderHtml); };
}

var bar = "loading images";
var loadedImg = 0;
var imgArray = new Array();
var captions = new Array();
var portfolioData = 's';
var cache = new Array();
var ratio = .2;
var swellRatio = .035;
var expandedRatio = .75;
var fullPath;
var parentDiv = 'gallery-test';
var shown = 0;
var swell = 1;
var lastImg = 0;
var lArrow = 0;
var rArrow = 0;

//$(document).keydown(function(e){ if (e.keyCode == 37) { leftThumbs(lArrow); } if (e.keyCode == 39) { rightThumbs(rArrow); }

function loadPreview(div, img, url){

 var newImg = new Image();
     newImg.src = img;
	 newImg.onload = function(){
 
      var h = newImg.height;
      var w = newImg.width;
	  
	      r = $('#'+div).width() / w;
		  w = Math.floor(w * r);
		  h = Math.floor(h * r);
 
      var str  = '<a href="link_src">'; 
          str += '<img src="img_src" class="all-border" width="img_w" height="img_h" />';
	      str += '</a>';
	 
          str  = str.replace("link_src", url);
          str  = str.replace("img_src", img);
          str  = str.replace("img_w", w);
          str  = str.replace("img_h", h);
	 
          $('#'+div).html(str);
     };
}

function loadImg(url){
	 
 var img        = new Image();
     img.src    = url;
	 img.onload = function(){
	 
	  if(++loadedImg == imgArray['count']){
	   
	   var redArrowL = new Image();
	   var redArrowR = new Image();
	   var bluArrowL = new Image();
	   var bluArrowR = new Image();
	   
	       redArrowL.src = 'http://ardclan.com/assets/img/arrows/red-arrow-l.png';
	       redArrowR.src = 'http://ardclan.com/assets/img/arrows/red-arrow-r.png';
		   bluArrowL.src = 'http://ardclan.com/assets/img/arrows/blue-arrow-l.png';
		   bluArrowR.src = 'http://ardclan.com/assets/img/arrows/blue-arrow-r.png';
		   
		   redArrowL.onload = function(){};
		   redArrowR.onload = function(){};
		   bluArrowL.onload = function(){};
		   bluArrowR.onload = function(){};
	   
	   $('#'+parentDiv).html('');
	   
	   buildThumbs(0);
	   buildPrimary(0);
	   
	  }
	 };
}

function setSwell(multi){ swell = multi; }

function buildPrimary(img, multi){
 
 setCaption(imgArray[img]['uni']);
 
 $('#highlight-'+lastImg).html('');
 $('#highlight-'+img).html('<div class="onehundred onehundred-p-high bg-blue"></div>');
 
 $('#main-image').fadeIn(0, function(){});
 
 var w = Math.floor(imgArray[img]['width'] * (expandedRatio * swell));
 var h = Math.floor(imgArray[img]['height'] * (expandedRatio * swell));
 
 $('#main-image').animate({ height: h+"px" }, 500, function(){});
 
 var b = Math.floor(($("#size").width() - w) / 2);
 
 var str  = '<div style="float:left;width:div_wpx;height:div_hpx;"></div>';
     str += '<a href="img_link" onClick="img_action"><img src="img_src" class="img_class" width="img_w" height="img_h" border="0" /></a>';
     str += '<div style="float:left;width:div_wpx;height:div_hpx;"></div>';
	 
     str  = str.replace("img_src", imgArray[img]['url']);
     str  = str.replace("img_class", "all-border");
     str  = str.replace("img_w", w);
     str  = str.replace("img_h", h);
     str  = str.replace("div_w", b);
     str  = str.replace("div_h", h);
     str  = str.replace("img_link", "JavaScript:void(0);");
     if(swell == 1) str  = str.replace("img_action", "setSwell(1.5);buildPrimary("+img+");");
     if(swell == 1.5) str  = str.replace("img_action", "setSwell(1);buildPrimary("+img+");");
	 
 $('#main-image').html(str);
 lastImg = img;
}

function buildThumbs(start){

 start = parseInt(start);

 var parentWidth  = $("#size").width();
     shown = Math.floor(parentWidth / (imgArray[0]['width'] * ratio));
 var rem = parentWidth;
 
 var html  = '<div id="thumbs" style="display:none;">';
     html += '<div id="bumper" style="float:left;width:bumper_wpx;height:bumper_hpx"></div>';
	 
 var grow = 0;
 var w = 0;
 var h = 0;
 
 for(var idx = parseInt(start); idx < (shown + (start - 1)); idx++){
 
  idx = parseInt(idx);
  
  if(idx < imgArray['count']){
 
   w = Math.floor(imgArray[idx]['width'] * ratio);
   h = Math.floor(imgArray[idx]['height'] * ratio);
  
   var bump = 10;
  
       rem  = (rem - (w + bump));
 
   var str  = '<div id="div_id" style="float:left;">';
       str += '<a id="link_id" href="link_src" onClick="link_action">';
       str += '<div id="par_id" class="" style="float:left;margin-right:img_bpx;width:div_wpx;">';
       str += '<img src="img_src" class="img_class" width="img_w" height="img_h" border="0" onmouseover="mouse_over" onmouseout="mouse_out" />';
       str += '<div id="highlight_id" class="onehundred ten-high"></div>';
       str += '</div>';
       str += '</a>';
       str += '</div>';
	
       str  = str.replace("img_src", imgArray[idx]['url']);
       str  = str.replace("img_class", "all-border");
       str  = str.replace("img_w", w);
       str  = str.replace("div_w", w);
       str  = str.replace("highlight_id", "highlight-"+idx);
       str  = str.replace("div_id", "element-"+idx);
       str  = str.replace("par_id", "parent-"+idx);
       str  = str.replace("img_caption", "caption-"+idx);
       str  = str.replace("img_h", h);
       str  = str.replace("img_b", bump);
       str  = str.replace("file_name", "");
       str  = str.replace("link_id", "link-"+idx);
       str  = str.replace("link_action", "buildPrimary("+idx+")");
       str  = str.replace("link_src", "JavaScript:void(0);");
       str  = str.replace("mouse_over", "");
       str  = str.replace("mouse_out", "");
 
   html += str;
   grow = idx;
  }
 }

 var arr  = '<div class="forty" style="min-height:10px;">';
  
 if(start != 0) arr += '<a href="link_src_l" id="left-arrow" onClick="l_click" class="right arrow-l fifty-wide fifty-high"></a>';
 
     arr += '</div>';
	 
	 arr += '<a href="detail_link" class="twenty text-center bump-down"><span class="link-dialog"><div id="center-title">center_title</div></span></a>';
	 
	 arr += '<div class="forty" style="min-height:10px;">';
	 
 if(grow < imgArray['count'] - 1) arr += '<a href="link_src_r" id="right-arrow" onClick="r_click" class="left arrow-r fifty-wide fifty-high"></a>';
	 
	 arr += '</div>';
 
 rem   = Math.floor((rem / 2) * .9);
 
 html  = html.replace("bumper_h", h);
 html  = html.replace("bumper_w", rem);
 html += '</div>';
 
 $('#'+parentDiv).html('better');
 $('#thumbs').fadeIn(100, function(){});
 
 cache['bumper_width'] = rem;
 
 rArrow = start;
 lArrow = grow;
 
 arr = arr.replace("r_click", "rightThumbs("+start+")");
 arr = arr.replace("l_click", "leftThumbs("+grow+")");
 arr = arr.replace("center_title", gallery[3]);
 arr = arr.replace("detail_link", gallery[4]);
 arr = arr.replace("link_src_l", "JavaScript:void(0);");
 arr = arr.replace("link_src_r", "JavaScript:void(0);");
 
 $('#arrows').html(arr);
 
 $('#'+parentDiv).html('');
 $('#'+parentDiv).html(html);
 $('#thumbs').fadeIn(100, function(){});
}

function rightThumbs(collapse){
 
 $('#element-'+collapse).animate({ width: '0px' }, 100, function(){ buildThumbs(collapse +1); });
 
}

function leftThumbs(collapse){
 
 $('#element-'+collapse).animate({ width: '0px' }, 100, function(){ buildThumbs(collapse - shown + 1); });
 
}

function setImgDivs(id, data){
 portfolioData = data;
 $('#img-caption').html('loading caption...');
 var url  = "img-list.php?id="+id;

 $.ajax({
 
  type: "GET",
  url: url,
  async: true,
  cache: false,
  success: function(data){
  
   imgArray = eval('('+data+')');
   
   galleryLoader(parentDiv, bar);
   
   $('#main-image').css('height', Math.floor(imgArray[0]['height'] * expandedRatio)+'px');
   $('#'+parentDiv).css('height', Math.floor(imgArray[0]['height'] * (ratio * 1.5))+'px');
   
   for(var i = parseInt(0); i < imgArray['count']; i++){ loadImg(imgArray[i]['url']); }
   
  },
  error: function(msg){ }
 });
}

function setCaption(uni){

 $("#can-edit-caption").html('');
 $('#img-caption').html('loading caption...');
 
 var url  = "http://ardclan.com/assets/src/img-caption.php?mode=data";
 
  $.ajax({
 
  type: "GET",
  url: url,
  async: true,
  cache: false,
  success: function(data){
  
   json = eval('('+data+')');
   
   if(json['data'] == portfolioData){
    
    var link  = '<a href="JavaScript:void(0);" onClick="editCaption(';
	    link += "'"+uni+"',";
	    link += "'"+portfolioData+"'";
	    link += ');"><span class="dialog-blue-link">[edit caption]</span></a>';
    $("#can-edit-caption").html(link);
   }

   var newUrl  = "http://ardclan.com/assets/src/img-caption.php?uni="+uni;
       newUrl += "&mode=get";
	   newUrl += "&data="+portfolioData;

   $.ajax({
 
    type: "GET",
    url: newUrl,
    async: true,
    cache: false,
    success: function(data){
  
     json = eval('('+data+')');
	 
	 $('#img-caption').html('');
   
     if(json['error']['count'] == 0){
      if(json['caption'] != "empty" && json['caption'] != "0"){ $('#img-caption').html(json['caption']); } else {  }
	  captions[uni] = json['caption'];
     }
   
    },
    error: function(msg){ }
   });
   
  },
  error: function(msg){ }
 });
}

function saveCaption(id){
 
 //$('#img-caption').html('saving...');

 var element = document.getElementById('caption-editor-'+id);
 var message = element.value;

 var url  = "http://ardclan.com/assets/src/img-caption.php?uni="+id;
     url += "&data="+portfolioData;
	 url += "&message="+message;
	 url += "&mode=set"
 
  $.ajax({
 
  type: "GET",
  url: url,
  async: true,
  cache: false,
  success: function(data){
  
   json = eval('('+data+')');
   
   if(json['error']['count'] == 0){ setCaption(id); } else { $('#img-caption').html('error saving!');  }
   
  },
  error: function(msg){  }
 });
}

function editCaption(id, data){

 var edit  = '';
     edit += '<textarea name="caption-editor-'+id+'" id="caption-editor-'+id+'" rows="6" cols="35">'+captions[id]+'</textarea>';
     edit += '<input type="button" value="Save" onClick="saveCaption(';
	 edit += "'"+id+"'"
	 edit += ');" />';
 
 $("#img-caption").html(edit);
}