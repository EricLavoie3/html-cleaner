
$(document).ready(function(){

    $("#errors-list").hide();

    //Clean HTML
    $("#btn-clean-html-eng").click(function () {
        var language ="eng";
        cleanHTML();
        findIssues(language);
    });

    $("#btn-clean-html-fra").click(function () {
        var language ="fra";
        cleanHTML();
        findIssues(language);
    });


    function cleanHTML() {
        var html = $('textarea#textareaID').val()

            //Spaces
            .replace(/\s+(;|!|,|\)|\]|})/g, "$1")//removes space before certain characters
            .replace(/(\(|\[|\{)\s+/g, "$1")//removes space after certain characters
            .replace(/(&nbsp;)+\./g, ".")//removes non breaking space before period
            .replace(/(&nbsp;)*<br>/g,"<br>") //removes non breaking space before break
            .replace(/(&nbsp;)*<br \/>/g,"<br />") //removes non breaking space before break
            .replace(/(\w)\s*<\/h(\d)>/g,"$1</h$2>") // remove space before close h1
            .replace(/<h(\d)>\s*(\w)/g, "<h$1>$2") // remove space after open h1
            .replace(/\s*<\/h(\d)>/g, "</h$1>") // remove space before closing h tag

        //Time stamps
            .replace(/(\d*)\sh\s(\d*)/g, "$1&nbsp;h&nbsp;$2") //nbsp between hour h minutes

        //Italics
            //.replace(/em>/g, "cite>") //replace em with cite
            .replace(/<\/i>(\s*)<i>/g, "$1")//removes double italic

        //Bold
            .replace(/<\/b>(\s*)<b>/g, "$1")//removes double bold $1 for only put in space if there
            .replace(/<b>\s*<\/b>/g,"") // remove empty bold tag
            .replace(/<\/strong>(\s*)<strong>/g, "$1")//removes double strong $1 for only put in space if there
            .replace(/<strong>\s*<\/strong>/g,"") // remove empty strong tag
            .replace(/<strong>(&nbsp;)*<\/strong>/g,"&nbsp;") // remove empty strong tag

        //Spaces 2
            .replace(/ (\s+)/g, ' ')//more than one space
            .replace(/(<br>)*\s*<br>\s*<\/b>/g, "</b>$1<br>") // move br after </b>
            .replace(/(<br \/>)*\s*<br \/>\s*<\/b>/g, "</b>$1<br \/>") // move br after </b>
            .replace(/(\s+)<br>/g, '<br>')//removes space before br tag
            .replace(/(\s+)<br \/>/g, '<br \/>') //removes space before br tag
            .replace(/<br>(\s+)/g, '<br>') //removes space after br tag
            .replace(/<br \/>(\s+)/g, '<br \/>')//removes space after br tag
            .replace(/<a name="([^>]*)>([^>]*)<\/a>/g, "$2")
            .replace(/<a>([^>]*)<\/a>/g, "$1")
            .replace(/(\s+)<\/a>/g, '</a>')//removes space before closing a tag
            .replace(/"(\s+)>/g, '">')//removes space between quotes and end of tag
            .replace(/(&nbsp;)+/g, "&nbsp;")  //removes non breaking space before space
            .replace(/&nbsp;<\/p/g, "</p")  //removes non breaking space before closing p tag

        //Colons
            .replace(/<\/b>&nbsp;:/g, "&nbsp;:</b>") //moves colon to before close of b tag
            .replace(/<\/b>:/g, ":</b>") //moves colon to before close of b tag
            .replace(/<\/strong>&nbsp;:/g, "&nbsp;:</strong>") //moves colon to before close of b tag
            .replace(/<\/strong>:/g, ":</strong>") //moves colon to before close of strong tag

        //Spaces 3
            .replace(/\s+<\/b>/g, "</b> ") //moves space to after close of b tag
            .replace(/<b>\s+/g, " <b>") //moves space to before b tag
            .replace(/<strong>\s+/g, " <strong>") //moves space to before strong tag
            .replace(/\s+<\/b>/g, "</b> ") //moves space to after closing b tag
            .replace(/\s+<\/strong>/g, "</strong> ") //moves space to after closing b tag
            .replace(/\s+<\/p/g, "</p")  //removes space before closing p tag
            .replace(/&nbsp;+<\/strong>/g, "</strong>&nbsp;") //moves space to after closing b tag
            .replace(/&nbsp;<\/li/g, "</li")  //removes non breaking space before closing li tag
            .replace(/\s+<\/li/g, "</li")  //removes breaking space before closing li tag
            .replace(/\s+<\/i>/g, "</i> ") //moves space to after close of i tag
            .replace(/<i>\s+/g, " <i>") //moves space to before i tag
            .replace(/\s+<\/cite>/g, "</cite> ") //moves space to after close of cite tag
            .replace(/<cite>\s+/g, " <cite>") //moves space to before cite tag
            .replace(/\s+<\/em>/g, "</em> ") //moves space to after close of em tag
            .replace(/<em>\s+/g, " <em>") //moves space to before em tag
            .replace(/&nbsp; /g, " ")  //removes non breaking space before space
            .replace(/ &nbsp;/g, " ")  //removes non breaking space after space
            .replace(/&nbsp;\?/g, "?")  //removes non breaking space before ?
            .replace(/ \?/g, "?")  //removes space before ?
            .replace(/\s+<\/td>/g, "</td>")  //removes space before td
            .replace(/&nbsp;+<\/td>/g, "</td>")  //removes space before td
            .replace(/\s+<\/th>/g, "</th>")  //removes space before th
            .replace(/&nbsp;+<\/th>/g, "</th>")  //removes space before th

        //Tables
            .replace(/ border="(\d+)"/g, '') //tables
            .replace(/ cellspacing="(\d+)"/g, '') //tables
            .replace(/ cellpadding="(\d+)"/g, '') //tables
            .replace(/<table width="100%">/g, '<table class="table table-bordered">') //tables
            .replace(/<table>/g, '<table class="table table-bordered">') //tables
            .replace(/ border="(\d+)" cellspacing="(\d+)" cellpadding="(\d+)"/g, ' class="table table-bordered"') //tables
            .replace(/ width="(\d+)\%*"/g, "") //tables
            .replace(/ valign="(\w+)"/g, "") //tables
            .replace(/ nowrap/g, "") //tables
            .replace(/<table((.|\n)*?)<tr>/g, "<table$1<tr class=\"active\">") //tables


        //Remove height tag
            .replace(/ height="(\d+)"/g, "") //remove height
            .replace(/ size="(\d+)"/g, "") //remove height

        //Style
            .replace(/ style="[^"]*"/g, "") //remove all style attributes

        //Span
            .replace(/<span>([^<]*)<\/span>/g,"$1")

        //Spaces 4
            .replace(/(\s*)<\/p>/g, "</p>") //Remove trailing spaces at end and beginning of paragraph
            .replace(/<p>(\s*)/g, "<p>")//Remove trailing spaces at end and beginning of paragraph
            .replace(/(\s+)\./g, '.')  //removes space before period
            .replace(/<br>(\s*)<\/p>/g,"</p>") //remove break before p
            .replace(/<br \/>(\s*)<\/p>/g,"</p>") //remove break before p

        //Style 2
            .replace(/ align="center"/g, "")  //removes align
            .replace(/ align="left"/g, "")  //removes align
            .replace(/ align="right"/g, "")  //removes align

        //Bold
            .replace(/<b><b>/g, "<b>")//remove double bold
            .replace(/<\/b>(\s*)<\/b>/g, "</b>$1")//removes double bold
            .replace(/<strong><strong>/g, "<strong>")//remove double bold
            .replace(/<\/strong>(\s*)<\/strong>/g, "</strong>$1")//removes double bold

        //underline links
            .replace(/<u><a(\s*\S*)>/g, "<a$1>") //<u><a> start
            .replace(/<\/a><\/u>/g, "<\/a>") //<u><a> end
            .replace(/<a(.*)"><u>/g, "<a$1\">") //<a><u> start
            .replace(/<\/u><\/a>/g, "<\/a>") //<a><u> end
            .replace(/<u><b>/g, "<b>") //<u><b> start
            .replace(/<\/b><\/u>/g, "</b>") //<u><b> end
            .replace(/<b><u>/g, "<b>") //<b><u> start
            .replace(/<\/u>(:)?<\/b>/g, "$1</b>")//<b><u> end
            .replace(/<u><strong>/g, "<strong>") //<u><b> start
            .replace(/<\/strong<\/u>/g, "</strong>") //<u><b> end
            .replace(/<strong><u>/g, "<strong>") //<b><u> start
            .replace(/<\/u>(:)?<\/strong>/g, "$1</strong>")//<b><u> end
            .replace(/<\/u>(\s*)<u>/g, "$1")//removes double underline

        ////*TITLES*////
            .replace(/ title="[^"]*"/g, "")  //removes title attribute

        ////*REMOVE EMPTY TAGS*////
            .replace(/<i>\.<\/i>/g, ".")  //removes empty i
            .replace(/<cite>\.<\/cite>/g, ".")  //removes empty cite
            .replace(/<cite><\/cite>/g, "")  //removes empty cite
            .replace(/<em>\.<\/em>/g, ".")  //removes empty em
            .replace(/<em><\/em>/g, "")  //removes empty em
            .replace(/<em>&nbsp;<\/em>/g, "&nbsp;")  //removes empty em
            .replace(/<br clear="all">\s*/gi, "")  //removes br clear all
            .replace(/<p><br>\s*/g, "<p>")  //removes br
            .replace(/<p><br \/>\s*/g, "<p>")  //removes br
            .replace(/<p><strong><br \/>\s*/g, "<p><strong>")  //removes br
            .replace(/<div>\s*<\/div>\s*/g, "")  //removes empty divs
            .replace(/<b>\s*<\/b>/g, " ")//removes empty bold
            .replace(/<b>&nbsp;*<\/b>/g, " ")//removes empty bold
            .replace(/<i>&nbsp;*<\/i>/g, " ")//removes empty italic
            .replace(/<i><\/i>/g, "")//removes empty italic
            .replace(/<b><\/b>/g, "")//removes empty bold (<p><b><i>&nbsp;</i></b></p> )
            .replace(/<li><\/li>(\s+)/g, "")//removes empty li )
            .replace(/<u>(&nbsp;)*<\/u>/g, "")//removes empty underline )
            .replace(/<u>\s*<\/u>/g, "")//removes empty underline )
            .replace(/<p>(\s*)<\/p>/g, "")//removes empty paragraphs
            .replace(/<p><em>&nbsp;<\/em><\/p>/g, "")//removes empty paragraphs

            .replace(/<p>&nbsp;+/g, "<p>")//removes empty paragraphs
            .replace(/<p>&nbsp;<\/p>/g, "")
            .replace(/<h\d>(&nbsp;*|\s*)<\/h\d>\s*/g, "")//empty headings
            .replace(/<div>&nbsp;*<\/div>\s*/g, "")//empty divs

        // French colons
            .replace(/(\s+):/g, '&nbsp;:')//adds non breaking space before colon

        //Breaks
            .replace(/<br><\/b><\/p>/g, "</b></p>") //remove br before end of p tag with a bold
            .replace(/<br><\/b><\/p>/g, "</b></p>") //put br after bold tag
            .replace(/<p><br>/g,"<p>")//delete br after p
            .replace(/<br><\/p>/g, "</p>") // delete br before </p>
            .replace(/<\/p>\s*<br>/g, "</p>") // remove br after closing </p>
            .replace(/<br \/><\/b><\/p>/g, "</b></p>") //remove br before end of p tag with a bold
            .replace(/<br \/><\/b><\/p>/g, "</b></p>") //put br after bold tag
            .replace(/<p><br \/>/g,"<p>")//delete br after p
            .replace(/<br \/><\/p>/g, "</p>") // delete br before </p>
            .replace(/<\/p>\s*<br \/>/g, "</p>") // remove br after closing </p>

        //Lists
            .replace(/ type="a"/g, ' class="lst-lwr-alph"') //lists
            .replace(/ type="circle"/g, "") //lists
            .replace(/ type="disc"/g, "") //lists
            .replace(/ type="square"/g, "") //lists
            .replace(/ type="1"/g, "") //lists
        //    .replace(/ start="(\d)"/g, '') //lists
            .replace(/(\s*)<ul>(\s*)<ul>/g, "<ul>")// remove double lists
            .replace(/(\s*)<ul>(\s*)<ul>/g, "<ul>")// remove double lists
        //need to run above line twice do not know why)
            .replace(/(\s*)<ol>(\s*)<ol>/g, "<ol>")// remove double lists
            .replace(/<\/ul>(\n*)(\s*)<\/ul>/g, "</ul>")//remove double lists
            .replace(/<\/ol>(\n*)(\s*)<\/ol>/g, "</ol>")//remove double lists
            .replace(/(\s*)<\/ol>(\n*)(\s*)<ol>/g, "")//lists - two lists should be one
            .replace(/(\s*)<\/ul>(\n*)(\s*)<ul>/g, "")//lists - two lists should be one
            .replace(/<li>(\s+)/g, '<li>') //remove extra space before list
        //Fix nested lists
            .replace(/(\s*)<\/li>(\n*)(\s*)<ol/g, "\n<ol") //beginning
            .replace(/(\s*)<\/li>(\n*)(\s*)<ul>/g, "\n<ul>")//beginning
            .replace(/<\/ol>(\s*)<li>/g, "\</ol>\n</li>\n<li>")//close
            .replace(/<\/ul>(\s*)<li>/g, "\</ul>\n</li>\n<li>")//close
            .replace(/<\/(\w)l>\s*<\/(\w)l>/g, "\</$1l>\n</li>\n</$2l>")//close
            .replace(/<li><a href="(.*)"> /g, "<li><a href=\"$1\">") //remove space from beginning
        //    .replace(/\n<li>/g, "\n\t<li>") //add tabs

        //Remove P from TD, TH and LI
            //.replace(/<td>(\s*)<p>(.*)<\/p>(\s*)<\/td>/g, "<td>$2</td>")
            //.replace(/<th>(\s*)<p>(.*)<\/p>(\s*)<\/th>/g, "<th>$2</th>")
           // .replace(/<li>(\s*)<p>(.*)<\/p>(\s*)<\/li>/g, "<li>$2</li>")
           //.replace(/(<(li|dt|dd|th|td)\b[^>]*>)\s*<p>(.*)<\/p>\s*(<\/\2>)/g, '$1$3$4')
           .replace(/<td>(\s*)<\/td>/g, "<td></td>")

        //Quotes
            .replace(/ »/g, '&nbsp;»')
            .replace(/« /g, '«&nbsp;')

        //Misc
        //    .replace(/<h(\d)><a name="(.*)"><\/a>/g, '<h$1 id="">');

            .replace(/<h\d id="">&nbsp;*<\/h\d>\s*/g, '')
            .replace(/<h(\d)><strong>\s*/g, '<h$1>')
            .replace(/<h(\d)>\s*<strong>/g, '<h$1>')
            .replace(/<h(\d) id=".*"><strong>\s*/g, '<h$1>')
            .replace(/<\/strong><\/h(\d)>\s*/g, '</h$1>')
            .replace(/<a href="#_Toc(\d+)">/g, '<a href="#toc">')
            .replace(/<a href="#_bookmark(\d+)">/g, '<a href="#toc">')
            .replace(/\.\.\.\.\.*\s*\d+<\/a>/g, '</a>') //fixes table of contents
            .replace(/\.\.\.\.\.*\s*\d+/g, '') //fixes table of contents
            .replace(/ (\s+)/g, ' ')//more than one space (repeat from beginning)
            .replace(" align=\"right\"", "")
            .replace(/\n+/g,"\n")
            .replace(/<\/p>/g,"</p>\n")
            .replace(/<\/p>\n<\/li>/g,"</p></li>")
            .replace(/<\/p>\n<\/div>/g,"</p></div>")
            .replace(/ /g," ")

        //Dates
        //replace space between day and month with nonbreaking space
            .replace(/(January|February|March|April|May|June|July|August|September|October|November|December) (\d+)/g,"$1&nbsp;$2") //EN
            .replace(/(\d+) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g,"$1&nbsp;$2") //FR
            .replace(/(1er) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g, "1er&nbsp;$2") //first of month

        //replace space between month and year with nonbreakingspace
            .replace(/(January|February|March|April|May|June|July|August|September October|November|December) 20(\d{2})/g,"$1&nbsp;20$2") //EN
            .replace(/(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) 20(\d{2})/g,"$1 20$2") //FR

        //Table of contents
            .replace(/<p><strong>Table of contents<\/strong><\/p>/gi, "<h2>Table of contents</h2>")//
            .replace(/<p><strong>Table des matières<\/strong><\/p>/gi, "<h2>Table des matières</h2>")//
            .replace(/<h3>Table of contents<\/h3>/gi, "<h2>Table of contents</h2>")//
            .replace(/<h3>Table des matières<\/h3>/gi, "<h2>Table des matières</h2>")//
            .replace(/<p>Table of contents<\/p>/gi, "<h2>Table of contents</h2>")//
            .replace(/<p>Table des matières<\/p>/gi, "<h2>Table des matières</h2>")//
            .replace(/<p><strong>On this page<\/strong><\/p>/gi, "<h2>On this page</h2>")//
            .replace(/<p><strong>Sur cette page<\/strong><\/p>/gi, "<h2>Sur cette page</h2>")//
            .replace(/<h3>On this page<\/h3>/gi, "<h2>On this page</h2>")//
            .replace(/<h3>Sur cette page<\/h3>/gi, "<h2>Sur cette page</h2>")//

            //Misc
            .replace(/(\n)(\n)<\/td>/g, "\n</td>")//
            .replace(/<p><\/p>/g, "")
            .replace(/<p>&nbsp;<\/p>/g, "")
            .replace(/<li>(\s+)/g, '<li>') //remove extra space before list
            .replace(/\s*<\/h(\d)>/g, "</h$1>") // remove space before closing h tag
            .replace(/ (\s+)/g, ' ')//more than one space
            .replace(/ ( +)/g, ' ')//more than one space
            .replace(/( +) /g, ' ')//more than one space
            .replace(/<br>(&nbsp;)*/g,"<br>") //removes non breaking space before break
            .replace(/<br \/>(&nbsp;)*/g,"<br />") //removes non breaking space before break
            .replace(/ <\/strong><\/p/g, "</strong></p")  //removes non breaking space before closing p tag
            .replace(/&nbsp;<\/strong><\/p/g, "</strong></p")  //removes non breaking space before closing p tag
            .replace(/<br \/><\/strong>/g, "</strong><br />")  //Moves <br /> tag after strong
            .replace(/<br><\/strong>/g, "</strong><br>")  //Moves <br /> tag after strong
            .replace(/(&nbsp;*)<\/p>/g, "</p>") //Remove trailing spaces at end and beginning of paragraph
            .replace(/(&nbsp;*)<\/h(\d)>/g, "</h$2>") //Remove trailing spaces at end and beginning of paragraph
            .replace(/<p><strong><\/strong><\/p>/g, "")  //removes non breaking space before closing p tag
            .replace(/\s+<\/td>/g, "</td>")  //removes space before td
            .replace(/&nbsp;+<\/td>/g, "</td>")  //removes space before td
            .replace(/\s+<\/th>/g, "</th>")  //removes space before th
            .replace(/&nbsp;+<\/th>/g, "</th>")  //removes space before th
            .replace(/<h(\d)>(<br \/>|\n)*/g, "<h$1>")  //removes space before th
            .replace(/^[\s]+/g, "")  //removes space before beginning of code

            //French characters
            .replace(/&Agrave;/g, "À")
            .replace(/&agrave;/g, "à")
            .replace(/&Ccedil;/g, "Ç")
            .replace(/&ccedil;/g, "ç")
            .replace(/&Egrave;/g, "È")
            .replace(/&egrave;/g, "è")
            .replace(/&Eacute;/g, "É")
            .replace(/&eacute;/g, "é")
            .replace(/&Ecirc;/g, "Ê")
            .replace(/&ecirc;/g, "ê")
            .replace(/&Icirc;/g, "Î")
            .replace(/&icirc;/g, "î")
            .replace(/&Iuml;/g, "Ï")
            .replace(/&iuml;/g, "ï")
            .replace(/&Ocirc;/g, "Ô")
            .replace(/&ocirc;/g, "ô")
            .replace(/&oelig;/g, "œ")
            .replace(/&OElig;/g, "Œ")
            .replace(/&Ugrave;/g, "Ù")
            .replace(/&ugrave;/g, "ù")
            .replace(/&Ucirc;/g, "Û")
            .replace(/&ucirc;/g, "û")
            .replace(/&laquo;/g, "«")
            .replace(/&raquo;/g, "»")
            .replace(/&rsquo;/g, "’")
            .replace(/&ldquo;/g, "“")
            .replace(/&rdquo;/g, "”")

            //Add lines between tags
            .replace(/<\/ul>(\n*)<p/g, "</ul>\n\n<p")//
            .replace(/<\/p>(\n*)<p/g, "</p>\n\n<p")//
            .replace(/<\/ul>(\n*)<h/g, "</ul>\n\n<h")//
            .replace(/<\/ol>(\n*)<p/g, "</ol>\n\n<p")//
            .replace(/<\/table>(\n*)<h/g, "</table>\n\n<h")//
            .replace(/<\/table>(\n*)<p/g, "</table>\n\n<p")//
            .replace(/<\/p>(\n*)<table/g, "</p>\n\n<table")//
            .replace(/<\/p>(\n*)<h(\d)/g, "</p>\n\n<h$2")//
            .replace(/<\/h(\d)>(\n*)<ul/g, "</h$1>\n\n<ul")//
            .replace(/<\/h(\d)>(\n*)<ol/g, "</h$1>\n\n<ol")//
            .replace(/<\/h(\d)>(\n*)<p/g, "</h$1>\n\n<p")//
            .replace(/<\/h(\d)>(\n*)<table/g, "</h$1>\n\n<table")//
            .replace(/<\/h(\d)>(\n*)<h(\d)/g, "</h$1>\n\n<h$3")//
            .replace(/\n <h(\d)/g, "\n<h$1")//
            .replace(/\n <div/g, "\n<div")//
            .replace(/<br \/>\n*/g, "<br />")//
            .replace(/<br \/>/g, "<br />\n")//
            .replace(/<br>\n*/g, "<br>")//
            .replace(/<br>>/g, "<br>\n")//
            .replace(/<br>>/g, "<br>\n")//

            //Tabs
            .replace(/\n<li/g, "\n\t<li")//
            .replace(/\n<thead/g, "\n\t<thead")//
            .replace(/\n<\/thead/g, "\n\t</thead")//
            .replace(/\n<tbody/g, "\n\t<tbody")//
            .replace(/\n<\/tbody/g, "\n\t</tbody")//
            .replace(/\n<tr/g, "\n\t\t<tr")//
            .replace(/\n<\/tr/g, "\n\t\t</tr")//
            .replace(/\n<td/g, "\n\t\t\t<td")//
            .replace(/\n<th/g, "\n\t\t\t<th")//
            .replace(/<br><br><\/p>/g, "</p>")//
            .replace(/&nbsp;<\/li>/g, "</li>")//
            .replace(/(<br>)*<\/li>/g, "</li>")//

            // removes paragraph tag inside list and table elements
            let div = $('<div></div>');
            div.html(html);

            let elements = div.find('li, th, td, dt, dd');
            elements.each(function () {
                let paragraphs = $(this).find('p');
                if (paragraphs.length === 1) {
                    let content = paragraphs[0].innerHTML;
                    $(this).html(content);
                }
            });
            html = div.html();


        $("textarea#textareaID").val(html);
        $("textarea#textareaID").scrollTop(0);
    };

    // Convert footnotes to WET footnotes - English
    $("#btn-ftn-en").click(function () {
        var html = $('textarea#textareaID').val();

        var count = (html.match(/ftn/g) || []).length;

        if (count > 0){
            html = html.replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><strong>\[\d*\]<\/strong><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Footnote </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><strong><sup>\[\d*\]<\/sup><\/strong><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Footnote </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><sup>\[\d*\]<\/sup><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Footnote </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*">\[\d*\]<\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Footnote </span>$1</a></sup>")
                .replace(/<sup> <a href="#_ftn(\d*)" name="_ftnref\d*"><sup>\[\d*\]<\/sup><\/a><\/sup>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Footnote </span>$1</a></sup>") 
                //<sup> <a href="#_ftn31" name="_ftnref31"><sup>[31]</sup></a></sup>
                .replace(/ <sup id="fn/g, '<sup id="fn')//more than one space
                .concat("\n</dl>\n</aside>")
                .replace(/<p>(?=<a href="#_ftnref1")/g, '<aside class="wb-fnote" role="note">\n\t<h2 id="fn">Footnotes</h2>\n\t<dl><p>')//more than one space
                .replace(/_ftn(\d)*">(<sup>)*(\[\d*\])(<\/sup>)*/g, '_ftn$1">$3')//Remove SUP
                .replace(/<p><a href="#_ftnref(\d*)" name="_ftn(\d*)">\[(\d*)\]<\/a>((.|\n)*?)((?=<p><a href=)|(?=<\/dl>))/g, '\n\t\t<dt>Footnote $1</dt>\n\t\t<dd id="fn$1">\n\t\t\t<p>$4\t\t\t<p class="fn-rtn"><a href="#fn$1-rf"><span class="wb-inv">Return to footnote </span>$1<span class="wb-inv"> referrer</span></a></p>\n\t\t</dd>')//more than one space
                .replace(/<p> /g, '<p>')//more than one space
                .replace(/(\n*)<\/dl>\n<\/aside>/g, "\n\t</dl>\n</aside>")
                .replace(/<div>\n(\s)*<hr>\n<div id="ftn1">/g, "")
                .replace(/<\/div>\n<div id="ftn(\d)*">/g, "")
                .replace(/<\/div>\n<\/div>\s*(?=<p class="fn-rtn">)/g, "")
                .replace(/<p>&nbsp;/g, "<p>")


            $("textarea#textareaID").val(html);
        }else{
            alert("No footnotes found.")
        }

    });

    // Convert footnotes to WET footnotes - French
    $("#btn-ftn-fr").click(function () {
        var html = $('textarea#textareaID').val();

        var count = (html.match(/ftn/g) || []).length;

        if (count > 0){
            html = html.replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><strong>\[\d*\]<\/strong><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Note de bas de page </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><strong><sup>\[\d*\]<\/sup><\/strong><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Note de bas de page </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><sup>\[\d*\]<\/sup><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Note de bas de page </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*">\[\d*\]<\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">Note de bas de page </span>$1</a></sup>")
                .replace(/ <sup id="fn/g, '<sup id="fn')//more than one space
                .concat("\n</dl>\n</aside>")
                .replace(/<p>(?=<a href="#_ftnref1")/g, '<aside class="wb-fnote" role="note">\n\t<h2 id="fn">Notes de bas de page</h2>\n\t<dl><p>')//more than one space
                .replace(/_ftn(\d)*">(<sup>)*(\[\d*\])(<\/sup>)*/g, '_ftn$1">$3')//Remove SUP
                .replace(/<p><a href="#_ftnref(\d*)" name="_ftn(\d*)">\[(\d*)\]<\/a>((.|\n)*?)((?=<p><a href=)|(?=<\/dl>))/g, '\n\t\t<dt>Note de bas de page $1</dt>\n\t\t<dd id="fn$1">\n\t\t\t<p>$4\t\t\t<p class="fn-rtn"><a href="#fn$1-rf"><span class="wb-inv">Retour à la référence de la note de bas de page </span>$1</a></p>\n\t\t</dd>')//more than one space
                .replace(/<p> /g, '<p>')//more than one space
                .replace(/(\n*)<\/dl>\n<\/aside>/g, "\n\t</dl>\n</aside>")//
                .replace(/<div>\n(\s)*<hr>\n<div id="ftn1">/g, "")
                .replace(/<\/div>\n<div id="ftn(\d)*">/g, "")
                .replace(/<\/div>\n<\/div>\s*(?=<p class="fn-rtn">)/g, "")
                .replace(/<p>&nbsp;/g, "<p>")

            $("textarea#textareaID").val(html);
        }else{
            alert("No footnotes found.")
        }

    });

      // Convert Canada.ca links
    $("#btn-canada-links").click(function () {
        var html = $('textarea#textareaID').val()
            .replace(/<a href="https:\/\/www.canada.ca\/en\//g, '<a href="/content/canadasite/en/')
            .replace(/<a href="https:\/\/www.canada.ca\/fr\//g, '<a href="/content/canadasite/fr/')
        $("textarea#textareaID").val(html);

    });

        // Remove UTM codes
    $("#btn-remove-utm-codes").click(function () {
        var html = $('textarea#textareaID').val()
            .replace(/\?utm[^"]*/g, '')
        $("textarea#textareaID").val(html);
    });

        // Convert EM to CITE
    $("#btn-em-cite").click(function () {
        var html = $('textarea#textareaID').val()
            .replace(/em>/g, 'cite>');
        $("textarea#textareaID").val(html);
    });

    function findIssues(language) {

        var html = $('textarea#textareaID').val()
        var errors = 0;
        $("#errors-list").empty();

        if (html.indexOf("<em") >= 0){
            if (errors == 0){
                $("#errors-list").show();
                $("#errors-list").append("<p>Please review the following:</p><ul>");
                $("#errors-list").append("<li>There are <b>&lt;em&gt;</b> tags in the code. If it's a policy document, act, or title of a document, use <b>&lt;cite&gt;</b>. If it's for emphasis, use <b>&lt;strong&gt;</b>.</li>");
                errors = 1
            }else{
                $("#errors-list").append("<li>There are <b>&lt;em&gt;</b> tags in the code. If it's a policy document, act, or title of a document, use <b>&lt;cite&gt;</b>. If it's for emphasis, use <b>&lt;strong&gt;</b>.</li>");
            }
        }

        if (html.indexOf("<u>") >= 0){
            if (errors == 0){
                $("#errors-list").show();
                $("#errors-list").append("<p>Please review the following:</p><ul>");
                $("#errors-list").append("<li>There are <b>&lt;u&gt;</b> tags in the code. If it's for emphasis, use <b>&lt;strong&gt;</b></li>");
                errors = 1
            }else{
                $("#errors-list").append("<li>There are <b>&lt;u&gt;</b> tags in the code. If it's for emphasis, use <b>&lt;strong&gt;</b></li>");
            }
        }

        if (html.indexOf("<table") >= 0 && html.indexOf("</thead>") <= 0){
            if (errors == 0){
                $("#errors-list").show();
                $("#errors-list").append("<p>Please review the following:</p><ul>");
                $("#errors-list").append("<li>This code contains <b>&lt;table&gt;</b> without <b>&lt;thead&gt;</b>. The <b>&lt;thead&gt;</b> tag may be used to define the header of the HTML table.</li>");
                errors = 1
            }else{
                $("#errors-list").append("<li>This code contains <b>&lt;table&gt;</b> without <b>&lt;thead&gt;</b>. The <b>&lt;thead&gt;</b> tag may be used to define the header of the HTML table.</li>");
            }
        }

        if (language == "eng"){
            if ((html.indexOf("/fr/") >= 0 || html.indexOf("-fra.") >= 0)){
                if (errors == 0){
                    $("#errors-list").show();
                    $("#errors-list").append("<p>Please review the following:</p><ul>");
                    $("#errors-list").append("<li>This code contains <b>French links</b></li>");
                    errors = 1
                }else{
                    $("#errors-list").append("<li>This code contains <b>French links</b></li>");
                }
            }
        }else if (language == "fra"){
            if ((html.indexOf("/en/") >= 0 || html.indexOf("-eng.") >= 0)){
                if (errors == 0){
                    $("#errors-list").show();
                    $("#errors-list").append("<p>Please review the following:</p><ul>");
                    $("#errors-list").append("<li>This code contains <b>English links</b></li>");
                    errors = 1
                }else{
                    $("#errors-list").append("<li>This code contains <b>English links</b></li>");
                }
            }
        }

        if(errors == 1){
            $("#errors-list").append("</ul>");
        }else{
            $("#errors-list").hide();
        }
    };

    $("#btn-copy-code").click(function(){
        $("textarea#textareaID").select();
        document.execCommand('copy');
    });

});
