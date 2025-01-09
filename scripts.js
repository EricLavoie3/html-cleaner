
$(document).ready(function () {

    $("#errors-list").hide();

    // Clean HTML
    $("#btn-clean-html-eng").click(function () {
        var language = "eng";
        cleanHTML(language);
        findIssues(language);
    });

    $("#btn-clean-html-fra").click(function () {
        var language = "fra";
        cleanHTML(language);
        findIssues(language);
    });

    $("#btn-ftn-eng").click(function () {
        var language = "eng";
        wetFootnotes(language);
    });

    $("#btn-ftn-fra").click(function () {
        var language = "fra";
        wetFootnotes(language);
    });

    $("#btn-details-summary-eng").click(function () {
        var language = "eng";
        detailsSummary(language);
    }); 

    $("#btn-details-summary-fra").click(function () {
        var language = "fra";
        detailsSummary(language);
    }); 


    function cleanHTML(language) {
        var html = $('textarea#textareaID').val()

            // Spaces //

            // Removes space before and after certain characters
            .replace(/\s+(;|!|,|\)|\]|})/g, "$1")
            .replace(/(\(|\[|\{)\s+/g, "$1")

            // Removes non breaking space before period
            .replace(/(&nbsp;)+\./g, ".")

            // Removes non breaking space before break
            .replace(/(&nbsp;)*<br>/g, "<br>")
            .replace(/(&nbsp;)*<br \/>/g, "<br />")

            // Removes space before closing h tag and after open h tag
            .replace(/(\w)\s*<\/h(\d)>/g, "$1</h$2>")
            .replace(/<h(\d)>\s*(\w)/g, "<h$1>$2")
            .replace(/\s*<\/h(\d)>/g, "</h$1>")


            // Time stamps //

            // Add non breanking space to French times
            .replace(/(\d*)\sh\s(\d*)/g, "$1&nbsp;h&nbsp;$2")


            // Italics and bold //

            // Removes double italics tags
            .replace(/<\/i>(\s*)<i>/g, "$1")
            .replace(/<\/em>(\s*)<em>/g, "$1")

            // Removes double bold tags
            .replace(/<\/b>(\s*)<b>/g, "$1")
            .replace(/<\/strong>(\s*)<strong>/g, "$1")
            
            // Removes empty bold tags
            .replace(/<b>(\s*)<\/b>/g, "$1")
            .replace(/<strong>\s*<\/strong>/g, "")
            .replace(/<b>(&nbsp;)*<\/b>/g, "&nbsp;")
            .replace(/<strong>(&nbsp;)*<\/strong>/g, "&nbsp;")

            // Moves br tag after closing bold tags
            .replace(/(<br>)*\s*<br>\s*<\/b>/g, "</b>$1<br>")
            .replace(/(<br \/>)*\s*<br \/>\s*<\/b>/g, "</b>$1<br \/>")
            .replace(/(<br>)*\s*<br>\s*<\/strong>/g, "</b>$1<br>")
            .replace(/(<br \/>)*\s*<br \/>\s*<\/strong>/g, "</b>$1<br \/>")


            // Spaces 2 //

            // Removes duplicate spaces
            .replace(/ (\s+)/g, ' ')

            // Removes space before and after br tags
            .replace(/(\s+)<br>/g, '<br>')
            .replace(/(\s+)<br \/>/g, '<br \/>')
            .replace(/<br>(\s+)/g, '<br>')
            .replace(/<br \/>(\s+)/g, '<br \/>')

            // Moves space from before closing a tag to after
            .replace(/(\s+)<\/a>/g, '</a> ')

            // Removes space between quotes and end of tag
            .replace(/"(\s+)>/g, '">')

            // Removes duplcate non-breaking spaces, but check first if it's part of comment code
            .replace(/(&nbsp;)+/g, "&nbsp;")

        //Removes &nbsp after Word comments code
        if (language == "eng") {
            html = html.replace(/(name="_msoanchor_\d+">\[[^\]]+\]<\/a>)&nbsp;/g, "$1")
        } else if (language == "fra") {
            html = html.replace(/(name="_msoanchor_\d+">\[[^\]]+\]<\/a>)&nbsp;(?![:–])/g, "$1")
        };



        
        // Removes non breaking space before closing p tag
        html = html.replace(/&nbsp;<\/p/g, "</p")


            // Links //

            // Removes empty a tags
            .replace(/<a name="([^>]*)>([^>]*)<\/a>/g, "$2")
            //.replace(/<a>([^>]*)<\/a>/g, "$1")

        
            // Colons //

            // Moves bold tag after colon
            .replace(/<\/b>&nbsp;:/g, "&nbsp;:</b>")
            .replace(/<\/b>:/g, ":</b>")
            .replace(/<\/strong>&nbsp;:/g, "&nbsp;:</strong>")
            .replace(/<\/strong>:/g, ":</strong>")


            // Spaces 3 // 

            // Moves space to before opening bold tag and after closing bold tag
            .replace(/<b>\s+/g, " <b>")
            .replace(/\s+<\/b>/g, "</b> ")
            .replace(/<strong>\s+/g, " <strong>")
            .replace(/\s+<\/strong>/g, "</strong> ")
            .replace(/<b>&nbsp;+/g, "&nbsp;<b>")
            .replace(/&nbsp;+<\/b>/g, "</b>&nbsp;")
            .replace(/<strong>&nbsp;+/g, "&nbsp;<strong>")
            .replace(/&nbsp;+<\/strong>/g, "</strong>&nbsp;")

            // Moves space to before opening italics tag and after closing italics tag
            .replace(/<em>\s+/g, " <em>")
            .replace(/\s+<\/em>/g, "</em> ")
            .replace(/<em>&nbsp;+/g, "&nbsp;<em>")
            .replace(/&nbsp;+<\/em>/g, "</em>&nbsp;")


            // Removes space before closing p tag
            .replace(/\s+<\/p/g, "</p")

            // Removes space from before closing li tags
            .replace(/&nbsp;<\/li/g, "</li")
            .replace(/\s+<\/li/g, "</li")

            // Moves space to before opening italics tags and after closing italics tags
            .replace(/\s+<\/i>/g, "</i> ")
            .replace(/<i>\s+/g, " <i>")
            .replace(/\s+<\/cite>/g, "</cite> ")
            .replace(/<cite>\s+/g, " <cite>")
            .replace(/\s+<\/em>/g, "</em> ")
            .replace(/<em>\s+/g, " <em>")

            // Removes non-breaking space before space
            .replace(/&nbsp; /g, " ")
            .replace(/ &nbsp;/g, " ")

            // Removes space before ?
            .replace(/&nbsp;\?/g, "?")
            .replace(/ \?/g, "?")
        
            // Removes space before td and th
            .replace(/\s+<\/td>/g, "</td>")
            .replace(/&nbsp;+<\/td>/g, "</td>")
            .replace(/\s+<\/th>/g, "</th>")
            .replace(/&nbsp;+<\/th>/g, "</th>")


            // Tables //

            // Removes border, cellspacing and cellpadding from table tag
            .replace(/ border="(\d+)"/g, '')
            .replace(/ cellspacing="(\d+)"/g, '')
            .replace(/ cellpadding="(\d+)"/g, '')

            // Removes table attributes
            .replace(/ width="(\d+)\%*"/g, "")
            .replace(/ valign="(\w+)"/g, "")
            .replace(/ nowrap/g, "")
            .replace(/ border="(\d+)" cellspacing="(\d+)" cellpadding="(\d+)"/g, ' class="table table-bordered"')

            // Applies class table table-bordered to all tables
            .replace(/<table>/g, '<table class="table table-bordered">')

            // Adds class active to the first tr tag in a table
            .replace(/<table((.|\n)*?)<tr>/g, "<table$1<tr class=\"active\">")

            // Removes height tag
            .replace(/ height="(\d+)"/g, "")
            .replace(/ size="(\d+)"/g, "")


            // Misc

            // Removes style attributes
            .replace(/ style="[^"]*"/g, "")

            // Remove span tags without any attributes
            .replace(/<span>([^<]*)<\/span>/g, "$1")

            // Removes align attributes
            .replace(/ align="center"/g, "")
            .replace(/ align="left"/g, "")
            .replace(/ align="right"/g, "")

            // Removes title attribute
            .replace(/ title="[^"]*"/g, "")
        
            // Removes br clear all
            .replace(/<br clear="all">\s*/gi, "")


            // Spaces 4 //

            // Removes leading and trailing spaces at end and beginning of paragraph tags
            .replace(/(\s*)<\/p>/g, "</p>")
            .replace(/<p>(\s*)/g, "<p>")

            // Removes empty space in empty TD tags
            .replace(/<td>(\s*)<\/td>/g, "<td></td>")
        
            // Removes space before period
            .replace(/(\s+)\./g, '.')


            // Bold // 

            // Removes double bold tags
            .replace(/<b>(\s*)<b>/g, "<b>$1")
            .replace(/<\/b>(\s*)<\/b>/g, "</b>$1")
            .replace(/<strong>(\s*)<strong>/g, "<strong>$1")
            .replace(/<\/strong>(\s*)<\/strong>/g, "</strong>$1")


            // Underline //

            // Removes u tag from a tag
            .replace(/<u><a(\s*\S*)>/g, "<a$1>")
            .replace(/<\/a><\/u>/g, "<\/a>")
            .replace(/<a(.*)"><u>/g, "<a$1\">")
            .replace(/<\/u><\/a>/g, "<\/a>")

            // Removes u tag from bold tags
            .replace(/<u><b>/g, "<b>")
            .replace(/<\/b><\/u>/g, "</b>")
            .replace(/<b><u>/g, "<b>")
            .replace(/<\/u>(:)?<\/b>/g, "$1</b>")
            .replace(/<u><strong>/g, "<strong>")
            .replace(/<\/strong<\/u>/g, "</strong>")
            .replace(/<strong><u>/g, "<strong>")
            .replace(/<\/u>(:)?<\/strong>/g, "$1</strong>")

            // Removes double underline
            .replace(/<\/u>(\s*)<u>/g, "$1")


            // Empty tags //

            // Removes empty italics tags
            .replace(/<i>\.<\/i>/g, ".")
            .replace(/<cite>\.<\/cite>/g, ".")
            .replace(/<cite><\/cite>/g, "")
            .replace(/<em>\.<\/em>/g, ".")
            .replace(/<em><\/em>/g, "")
            .replace(/<em>&nbsp;<\/em>/g, "&nbsp;")
            .replace(/<i>&nbsp;*<\/i>/g, " ")
            .replace(/<i><\/i>/g, "")
            .replace(/<h\d id="">&nbsp;*<\/h\d>\s*/g, '')

            // Removes empty div tags
            .replace(/<div>\s*<\/div>\s*/g, "")
            .replace(/<div>&nbsp;*<\/div>\s*/g, "")

            // Removes empty bold tags
            .replace(/<b><\/b>/g, "")

            // Removes empty li tags
            .replace(/<li><\/li>(\s+)/g, "")

            // Removes empty u tags
            .replace(/<u>(&nbsp;)*<\/u>/g, "")
            .replace(/<u>\s*<\/u>/g, "")

            // Removes empty paragraphs
            .replace(/<p>(\s*)<\/p>/g, "")
            .replace(/<p><em>&nbsp;<\/em><\/p>/g, "")
            .replace(/<p>&nbsp;+/g, "<p>")//removes empty paragraphs
            .replace(/<p>&nbsp;<\/p>/g, "")

            // Removes empty headings
            .replace(/<h\d>(&nbsp;*|\s*)<\/h\d>\s*/g, "")//empty headings
        

            // Punctuation //

            // Adds non-breaking space before colons
            .replace(/(\s+):/g, '&nbsp;:')


            // Adds non-breaking space before and after French double quotes
            .replace(/ »/g, '&nbsp;»')
            .replace(/« /g, '«&nbsp;')

            if (language == "fra") {
                html = html.replace(/(?<=\b\d{1,3}) (?=\d{3}(?:\b| ))/g, "&nbsp;")
                .replace(/(?<=\b\d{1,3}) (?=\$)/g, "&nbsp;")
            }


            // Breaks // 

            // Removes br from p tag
            html = html.replace(/<p><br>\s*/g, "<p>")
            .replace(/<p><br \/>\s*/g, "<p>")
            .replace(/<p><strong><br \/>\s*/g, "<p><strong>")
            .replace(/<p><b><br \/>\s*/g, "<p><b>")
            .replace(/<br><\/b><\/p>/g, "</b></p>")
            .replace(/<p><br>/g, "<p>")
            .replace(/<br><\/p>/g, "</p>")
            .replace(/<\/p>\s*<br>/g, "</p>")
            .replace(/<br \/><\/b><\/p>/g, "</b></p>")
            .replace(/<p><br \/>/g, "<p>")
            .replace(/<br \/><\/p>/g, "</p>")
            .replace(/<\/p>\s*<br \/>/g, "</p>")
            .replace(/<br>(\s*)<\/p>/g, "</p>")
            .replace(/<br \/>(\s*)<\/p>/g, "</p>")

            //Lists

            // Removes type attribute, updates to WET classes where possible
            .replace(/ type="a"/g, ' class="lst-lwr-alph"')
            .replace(/ type="circle"/g, "")
            .replace(/ type="disc"/g, "")
            .replace(/ type="square"/g, "")
            .replace(/ type="1"/g, "")

            // Removes double lists
            .replace(/(\s*)<ul>(\s*)<ul>/g, "<ul>")
            .replace(/(\s*)<ul>(\s*)<ul>/g, "<ul>")
            // need to run above line twice do not know why
            .replace(/(\s*)<ol>(\s*)<ol>/g, "<ol>")
            .replace(/<\/ul>(\n*)(\s*)<\/ul>/g, "</ul>")
            .replace(/<\/ol>(\n*)(\s*)<\/ol>/g, "</ol>")

            // Turns 2 lists into 1
            .replace(/(\s*)<\/ol>(\n*)(\s*)<ol>/g, "")
            .replace(/(\s*)<\/ul>(\n*)(\s*)<ul>/g, "")

            // Removes extra space after opening LI tag
            .replace(/<li>(\s+)/g, '<li>')
            .replace(/<li><a href="(.*)"> /g, "<li><a href=\"$1\">")

            // Fixes nested lists
            .replace(/(\s*)<\/li>(\n*)(\s*)<ol/g, "\n<ol")
            .replace(/(\s*)<\/li>(\n*)(\s*)<ul>/g, "\n<ul>")
            .replace(/<\/ol>(\s*)<li>/g, "\</ol>\n</li>\n<li>")
            .replace(/<\/ul>(\s*)<li>/g, "\</ul>\n</li>\n<li>")
            .replace(/<\/(\w)l>\s*<\/(\w)l>/g, "\</$1l>\n</li>\n</$2l>")

            
            // Misc 2

            // To test -> .replace(/<h(\d)><a name="(.*)"><\/a>/g, '<h$1 id="">');

            // Removes strong from headings
            .replace(/<h(\d)><strong>\s*/g, '<h$1>')
            .replace(/<h(\d)>\s*<strong>/g, '<h$1>')
            .replace(/<h(\d) id=".*"><strong>\s*/g, '<h$1>')
            .replace(/<\/strong><\/h(\d)>\s*/g, '</h$1>')
            .replace(/<\/strong>\s*<\/h(\d)>/g, '</h$1>')

            // Prepares table of contents links
            .replace(/<a href="#_Toc(\d+)">/g, '<a href="#toc">')
            .replace(/<a href="#_bookmark(\d+)">/g, '<a href="#toc">')

            // Fixed table of contents
            .replace(/\.\.\.\.\.*\s*\d+<\/a>/g, '</a>')
            .replace(/\.\.\.\.\.*\s*\d+/g, '')

            // Remove duplicate spaces (repeat from beginning)
            .replace(/ (\s+)/g, ' ')

            // Removes duplicate new lines
            .replace(/\n+/g, "\n")

            // Adds new line after P tags
            .replace(/<\/p>/g, "</p>\n")

            // Removes new line between ending P and LI tags
            .replace(/<\/p>\n<\/li>/g, "</p></li>")

            // Fixes weird space issue
            .replace(/ /g, " ")


            // Dates

            // Replace space between day and month with non-breaking space
            .replace(/(January|February|March|April|May|June|July|August|September|October|November|December) (\d+)/g, "$1&nbsp;$2")
            .replace(/(\d+) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g, "$1&nbsp;$2")
            .replace(/(1er) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g, "1er&nbsp;$2")

            // Replaces space between month and year with non-breaking space
            .replace(/(January|February|March|April|May|June|July|August|September October|November|December) 20(\d{2})/g, "$1&nbsp;20$2")
            .replace(/(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) 20(\d{2})/g, "$1 20$2")


            // Table of contents

            // Replace any tag with H2
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


            // Misc 3 (Some of these are duplicates that need to be rerun)

            // Removes duplicate new lines before closing TD tag
            .replace(/(\n)(\n)<\/td>/g, "\n</td>")

            // Removes empty P tag
            .replace(/<p><\/p>/g, "")
            .replace(/<p>&nbsp;<\/p>/g, "")

            // Removes space after opening LI tag
            .replace(/<li>(\s+)/g, '<li>')

            // Removes space before closing H tag
            .replace(/\s*<\/h(\d)>/g, "</h$1>")

            // Removes duplicate spaces
            .replace(/ (\s+)/g, ' ')
            .replace(/ ( +)/g, ' ')
            .replace(/( +) /g, ' ')

            // Removes non-breaking space before break
            .replace(/<br>(&nbsp;)*/g, "<br>")
            .replace(/<br \/>(&nbsp;)*/g, "<br />")

            //removes space before closing p tag
            .replace(/ <\/strong><\/p/g, "</strong></p")
            .replace(/&nbsp;<\/strong><\/p/g, "</strong></p")

            //Moves BR tag after strong tag
            .replace(/<br \/><\/strong>/g, "</strong><br />")
            .replace(/<br><\/strong>/g, "</strong><br>")

            // Removes trailing spaces at end of paragraph
            .replace(/(&nbsp;*)<\/p>/g, "</p>")

            // Removes trailing spaces at end of headings
            .replace(/(&nbsp;*)<\/h(\d)>/g, "</h$2>")

            // Removes leading spaces at begining of headings
            .replace(/<h(\d)>\s*(\w)/g, "<h$1>$2")

            // Removes empty P tags
            .replace(/<p><strong><\/strong><\/p>/g, "")

            // Removes space before closing TD and TH tags
            .replace(/\s+<\/td>/g, "</td>")
            .replace(/&nbsp;+<\/td>/g, "</td>")
            .replace(/\s+<\/th>/g, "</th>")
            .replace(/&nbsp;+<\/th>/g, "</th>")

            // Removes BR from after opening heading tag
            .replace(/<h(\d)>(<br \/>|\n)*/g, "<h$1>")

            // Removes space before beginning of code
            .replace(/^[\s]+/g, "")

            // Removes leading spaces at begining of headings
            .replace(/<h(\d)>\s*(\w)/g, "<h$1>$2")

            // Removes br from p tag
            .replace(/<br>(\s*)<\/p>/g, "</p>")
            .replace(/<br \/>(\s*)<\/p>/g, "</p>")


            // Updates French characters
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

            // Adds new lines between tags
            .replace(/<\/ul>(\n*)<p/g, "</ul>\n\n<p")
            .replace(/<\/p>(\n*)<p/g, "</p>\n\n<p")
            .replace(/<\/ul>(\n*)<h/g, "</ul>\n\n<h")
            .replace(/<\/ol>(\n*)<p/g, "</ol>\n\n<p")
            .replace(/<\/table>(\n*)<h/g, "</table>\n\n<h")
            .replace(/<\/table>(\n*)<p/g, "</table>\n\n<p")
            .replace(/<\/p>(\n*)<table/g, "</p>\n\n<table")
            .replace(/<\/p>(\n*)<h(\d)/g, "</p>\n\n<h$2")
            .replace(/<\/h(\d)>(\n*)<ul/g, "</h$1>\n\n<ul")
            .replace(/<\/h(\d)>(\n*)<ol/g, "</h$1>\n\n<ol")
            .replace(/<\/h(\d)>(\n*)<p/g, "</h$1>\n\n<p")
            .replace(/<\/h(\d)>(\n*)<table/g, "</h$1>\n\n<table")
            .replace(/<\/h(\d)>(\n*)<h(\d)/g, "</h$1>\n\n<h$3")
            .replace(/\n <h(\d)/g, "\n<h$1")
            .replace(/\n <div/g, "\n<div")
            .replace(/<br \/>\n*/g, "<br />")
            .replace(/<br \/>/g, "<br />\n")
            .replace(/<br>\n*/g, "<br>")
            .replace(/<br>>/g, "<br>\n")

            // Formats some of the code with tabs
            .replace(/\n<li/g, "\n\t<li")
            .replace(/\n<thead/g, "\n\t<thead")
            .replace(/\n<\/thead/g, "\n\t</thead")
            .replace(/\n<tbody/g, "\n\t<tbody")
            .replace(/\n<\/tbody/g, "\n\t</tbody")
            .replace(/\n<tr/g, "\n\t\t<tr")
            .replace(/\n<\/tr/g, "\n\t\t</tr")
            .replace(/\n<td/g, "\n\t\t\t<td")
            .replace(/\n<th/g, "\n\t\t\t<th")
            .replace(/<br><br><\/p>/g, "</p>")
            .replace(/&nbsp;<\/li>/g, "</li>")
            .replace(/(<br>)*<\/li>/g, "</li>")

       
        // Sets up Javascript Finds
        let div = $('<div></div>');
        div.html(html);

        // Removes Word comments
        div.find('a[href*="#_msocom"]').each(function () {
            $(this).remove();
        });

        div.find('div').filter(function () {
            return $(this).html().trim().startsWith('<hr>') &&
                $(this).find('div[id^="_com_"]').length > 0 &&
                $(this).find('a[href^="#_msoanchor_"]').length > 0;
        }).remove();

        // Removes <a> tags without attributes but keep the inner content (including nested tags)
        div.find('a').each(function () {
            if (this.attributes.length === 0) {
                $(this).replaceWith($(this).html());
            }
        });


        // Removes paragraph tag inside list and table elements
        let elements = div.find('li, th, td, dt, dd');
        elements.each(function () {
            let paragraphs = $(this).find('p');
            if (paragraphs.length === 1) {
                let content = paragraphs[0].innerHTML;
                $(this).html(content);
            }
        });

        
        html = div.html();

        // Final search and replaces
        html = html.replace(/&nbsp;<\/p>/g, "</p>")

        // Replaces the textarea with the update code
        $("textarea#textareaID").val(html);
        $("textarea#textareaID").scrollTop(0);
    };

    // Converts footnotes to WET footnotes
    function wetFootnotes(language) {

        var html = $('textarea#textareaID').val();
        var count = (html.match(/ftn/g) || []).length;
        
        if (count > 0) {
            
            if (language == "eng") {
                var footnote = "Footnote"
                var footnotes = "Footnotes"
                var returnRef = "Return to footnote"
                var footnoteRef = "<span class=\"wb-inv\"> referrer</span>"
            } else if (language = "fra") {
                var footnote = "Note de bas de page"
                var footnotes = "Notes de bas de page"
                var returnRef = "Retour à la référence de la note de bas de page"
                var footnoteRef = ""
            };

            // Check if the content ends with </dl></aside> (ignoring spaces)
            const trimmedHtml = html.trim();
            const closingTags = "</dl>\n</aside>";
            const regex = new RegExp(`${closingTags.replace(/</g, '<\\s*').replace(/>/g, '\\s*>')}\\s*$`, 'i');

            if (!regex.test(trimmedHtml)) {
                html = html.concat("\n</dl>\n</aside>");
            }

            html = html.replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><strong>\[\d*\]<\/strong><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">" + footnote + " </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><strong><sup>\[\d*\]<\/sup><\/strong><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">" + footnote + " </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><sup>\[\d*\]<\/sup><\/sup><\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">" + footnote + " </span>$1</a></sup>")
                .replace(/<a href="#_ftn(\d*)" name="_ftnref\d*">\[\d*\]<\/a>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">" + footnote + " </span>$1</a></sup>")
                .replace(/<sup> <a href="#_ftn(\d*)" name="_ftnref\d*"><sup>\[\d*\]<\/sup><\/a><\/sup>/g, "<sup id=\"fn$1-rf\"><a class=\"fn-lnk\" href=\"#fn$1\"><span class=\"wb-inv\">" + footnote + " </span>$1</a></sup>")
                .replace(/ <sup id="fn/g, '<sup id="fn')
                //.concat("\n</dl>\n</aside>")
                .replace(/<p>(?=<a href="#_ftnref1")/g, '<aside class="wb-fnote" role="note">\n\t<h2 id="fn">' + footnotes + '</h2>\n\t<dl><p>')
                .replace(/_ftn(\d)*">(<sup>)*(\[\d*\])(<\/sup>)*/g, '_ftn$1">$3')
                .replace(/<p><a href="#_ftnref(\d*)" name="_ftn(\d*)">\[(\d*)\]<\/a>((.|\n)*?)((?=<p><a href=)|(?=<\/dl>))/g, '\n\t\t<dt>' + footnote + ' $1</dt>\n\t\t<dd id="fn$1">\n\t\t\t<p>$4\t\t\t<p class="fn-rtn"><a href="#fn$1-rf"><span class="wb-inv">' + returnRef + ' </span>$1' + footnoteRef + '</a></p>\n\t\t</dd>')
                .replace(/<p> /g, '<p>')
                .replace(/(\n*)<\/dl>\n<\/aside>/g, "\n\t</dl>\n</aside>")
                .replace(/<div>\n(\s)*<hr>\n<div id="ftn1">/g, "")
                .replace(/<\/div>\n<div id="ftn(\d)*">/g, "")
                .replace(/<\/div>\n<\/div>\s*(?=<p class="fn-rtn">)/g, "")
                .replace(/<p>&nbsp;/g, "<p>")

            $("textarea#textareaID").val(html);
        } else {
            alert("No footnotes found.")
        }
    };

    // Converts Canada.ca links to /content/canadasite/
    $("#btn-canada-links").click(function () {
        var html = $('textarea#textareaID').val()
            .replace(/<a href="https:\/\/www.canada.ca\/en\//g, '<a href="/content/canadasite/en/')
            .replace(/<a href="https:\/\/www.canada.ca\/fr\//g, '<a href="/content/canadasite/fr/')
        $("textarea#textareaID").val(html);

    });

    // Removes UTM codes
    $("#btn-remove-utm-codes").click(function () {
        var html = $('textarea#textareaID').val()
            .replace(/\?utm[^"]*/g, '')
        $("textarea#textareaID").val(html);
    });

    // Expand/collapse
   
    function detailsSummary(language) {    
        if(language=="eng"){
            var expandAll = "Expand all"
            var collapseAll = "Collapse all"
        }else if(language=="fra"){
            var expandAll = "Afficher tout"
            var collapseAll = "Réduire tout"
        };

        // Get the HTML content from the textarea
        var html = $('textarea#textareaID').val()
            .replace(/<h2>/, '<h2 class="first-h2">')
            .replace(/<h2>(.*?)<\/h2>/gs, '</details>\n\n<details>\n<summary>\n<h2 class="h3">$1</h2>\n</summary>')
            .replace(/<h2 class="first-h2">(.*?)<\/h2>/s, '<div id="lt-tog">\n\n<div class="btn-group mrgn-tp-md mrgn-bttm-md">\n<button type="button" class="btn btn-default wb-toggle" data-toggle=\'{"selector": "details", "parent": "#lt-tog", "print": "on", "type": "on"}\'>' + expandAll + '</button>\n<button type="button" class="btn btn-default wb-toggle" data-toggle=\'{"selector": "details", "parent": "#lt-tog", "type": "off"}\'>' + collapseAll + '</button>\n</div>\n\n<details>\n<summary>\n<h2 class="h3">$1</h2>\n</summary>')
            .concat("\n</details>\n</div>")
            .replace(/<\/p>\s*<\/details>/g, "</p>\n</details>")
            .replace(/<\/ul>\s*<\/details>/g, "</ul>\n</details>")
            .replace(/<\/ol>\s*<\/details>/g, "</ol>\n</details>")
    
        // Make sure to properly encode HTML to prevent issues with the textarea
        $('textarea#textareaID').val(html);
        $('textarea#textareaID').scrollTop(0);
    };

    // Finds common coding issues
    function findIssues(language) {
        const html = $('textarea#textareaID').val();
        const errors = [];

        $("#errors-list").empty();

        if (html.indexOf("<em") >= 0) {
            errors.push("There are <code>&lt;em&gt;</code> tags in the code. If it's a policy document, act, or title of a document, use <code>&lt;cite&gt;</code>. If it's for emphasis, use <code>&lt;strong&gt;</code>.");
        }

        if (html.indexOf("<u>") >= 0) {
            errors.push("There are <code>&lt;u&gt;</code> tags in the code. If it's for emphasis, use <code>&lt;strong&gt;</code>");
        }

        if (html.indexOf("<table") >= 0 && html.indexOf("</thead>") <= 0) {
            errors.push("This code contains <code>&lt;table&gt;</code> without <code>&lt;thead&gt;</code>. The <code>&lt;thead&gt;</code> tag may be used to define the header of the HTML table.");
        }

        if (language == "eng" && (html.indexOf("/fr/") >= 0 || html.indexOf("-fra.") >= 0)) {
            errors.push("This code contains <b>French links</b>");
        }
        
        if (language == "fra" && (html.indexOf("/en/") >= 0 || html.indexOf("-eng.") >= 0)) {
            errors.push("This code contains <b>English links</b>");
        }

        if (errors.length > 0) {
            $("#errors-list").show();
            $("#errors-list").append("<p>Please review the following:</p><ul></ul>");
            $("ul", "#errors-list").append(errors.map(error => `<li>${error}</li>`).join(''));
            console.log(errors);
            console.log(errors.map(error => `<li>${error}</li>`).join(''));
        } else {
            $("#errors-list").hide();
        }
    };

    // Copies the code in the text area
    $("#btn-copy-code").click(function() {
        $("textarea#textareaID").select();
        document.execCommand('copy');
    });
});
