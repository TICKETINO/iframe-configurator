// Collapsible settings groups
$(".header").click(function () {
    $header = $(this);
    $content = $header.next();
    $content.slideToggle(500, function () {
        //
    });
});

// Read querystring parameters
function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Select iframe code on click
function selectText(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(this);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(this);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

// Knockout viewmodel
function ViewModel() {
	var self = this;

	self.baseURL				= ko.observable("https://v3.ticketino.com/v3/");
	self.embedURL				= ko.observable("/Event/Embed/");

	self.languageCode 			= ko.observable(qs('languageCode') || "de");
	self.eventId 				= ko.observable(qs('eventId') || "12345");
    self.width                  = ko.observable(qs('width') || 700);
    self.height                 = ko.observable(qs('height') || 450);

    self.additionalInformation  = ko.observable(qs('additionalInformation') || false).
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });

    self.color 					= ko.observable(qs('color') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.backgroundColor 		= ko.observable(qs('backgroundColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonBackColor 		= ko.observable(qs('buttonBackColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonForeColor 		= ko.observable(qs('buttonForeColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.promoBoxColor 			= ko.observable(qs('promoBoxColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonHoverForeColor 	= ko.observable(qs('buttonHoverForeColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonHoverBackColor 	= ko.observable(qs('buttonHoverBackColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.dropdownBackColor 		= ko.observable(qs('dropdownBackColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.dropdownForeColor 		= ko.observable(qs('dropdownForeColor') || "").
                                    extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });

    self.iframeSrc = ko.computed(function() {
    	return 	self.baseURL() +
    			self.languageCode() +
    			self.embedURL() +
    			self.eventId() +
    			"/?" +
			    "color="					    + self.color().replace("#", "") +
			    "&backgroundColor="			    + self.backgroundColor().replace("#", "") +
			    "&buttonBackColor="			    + self.buttonBackColor().replace("#", "") +
			    "&buttonForeColor="			    + self.buttonForeColor().replace("#", "") +
			    "&promoBoxColor="			    + self.promoBoxColor().replace("#", "") +
			    "&buttonHoverForeColor="	    + self.buttonHoverForeColor().replace("#", "") +
			    "&buttonHoverBackColor="	    + self.buttonHoverBackColor().replace("#", "") +
			    "&dropdownBackColor="		    + self.dropdownBackColor().replace("#", "") +
                "&dropdownForeColor="		    + self.dropdownForeColor().replace("#", "") +
                "&showAdditionalInformation="	+ self.additionalInformation();                
    });

    self.iframeCode = ko.computed(function() {
    	return	'<iframe src="' + self.iframeSrc() + '" width="' + self.width() + '" height="' + self.height() + '"></iframe>';
    });

    self.shareConfigUrl = ko.computed(function() {
        var cfgUrl = 'https://ticketino.github.io/iframe-configurator/?'
        if (self.languageCode() != '') { cfgUrl += 'languageCode=' + self.languageCode() + '&' }
        if (self.eventId() != '') { cfgUrl += 'eventId=' + self.eventId() + '&' }
        if (self.width() != '') { cfgUrl += 'width=' + self.width() + '&' }
        if (self.height() != '') { cfgUrl += 'height=' + self.height() + '&' }
        if (self.color() != '') { cfgUrl += 'color=' + self.color().replace("#", "") + '&' }
        if (self.backgroundColor() != '') { cfgUrl += 'backgroundColor=' + self.backgroundColor().replace("#", "") + '&' }
        if (self.buttonBackColor() != '') { cfgUrl += 'buttonBackColor=' + self.buttonBackColor().replace("#", "") + '&' }
        if (self.buttonForeColor() != '') { cfgUrl += 'buttonForeColor=' + self.buttonForeColor().replace("#", "") + '&' }
        if (self.promoBoxColor() != '') { cfgUrl += 'promoBoxColor=' + self.promoBoxColor().replace("#", "") + '&' }
        if (self.buttonHoverForeColor() != '') { cfgUrl += 'buttonHoverForeColor=' + self.buttonHoverForeColor().replace("#", "") + '&' }
        if (self.buttonHoverBackColor() != '') { cfgUrl += 'buttonHoverBackColor=' + self.buttonHoverBackColor().replace("#", "") + '&' }
        if (self.dropdownBackColor() != '') { cfgUrl += 'dropdownBackColor=' + self.dropdownBackColor().replace("#", "") + '&' }
        if (self.dropdownForeColor() != '') { cfgUrl += 'dropdownForeColor=' + self.dropdownForeColor().replace("#", "") + '&' }
        if (String(self.additionalInformation()) != 'false') { cfgUrl += 'showAdditionalInformation=' + String(self.additionalInformation()).replace("#", "") + '&' }        

        if (cfgUrl.slice(-1) === '&') { cfgUrl = cfgUrl.slice(0, -1); }

        return cfgUrl;
    });
}

var vm = new ViewModel();
ko.applyBindings(vm);

// Initialize colorpickers & resizing
$(document).ready(function() {
    var opts = {
        format: "hex"
    };

    $('#color').colorpicker(opts);
    $('#backgroundColor').colorpicker(opts);
    $('#buttonBackColor').colorpicker(opts);
    $('#buttonForeColor').colorpicker(opts);
    $('#promoBoxColor').colorpicker(opts);
    $('#buttonHoverForeColor').colorpicker(opts);
    $('#buttonHoverBackColor').colorpicker(opts);
    $('#dropdownBackColor').colorpicker(opts);
    $('#dropdownForeColor').colorpicker(opts);

    $('.output').click(selectText);
});