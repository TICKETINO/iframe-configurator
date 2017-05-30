// Collapsible settings groups
$(".header").click(function () {
    $header = $(this);
    $content = $header.next();
    $content.slideToggle(500, function () {
        //
    });
});

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

	self.languageCode 			= ko.observable("de");
	self.eventId 				= ko.observable("12345");
    self.color 					= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.backgroundColor 		= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonBackColor 		= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonForeColor 		= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.promoBoxColor 			= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonHoverForeColor 	= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.buttonHoverBackColor 	= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.dropdownBackColor 		= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.dropdownForeColor 		= ko.observable("").extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.width                  = ko.observable(700).extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.height                 = ko.observable(450).extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });

    self.iframeSrc = ko.computed(function() {
    	return 	self.baseURL() +
    			self.languageCode() +
    			self.embedURL() +
    			self.eventId() +
    			"/?" +
			    "color="					+ self.color() +
			    "&backgroundColor="			+ self.backgroundColor() +
			    "&buttonBackColor="			+ self.buttonBackColor() +
			    "&buttonForeColor="			+ self.buttonForeColor() +
			    "&promoBoxColor="			+ self.promoBoxColor() +
			    "&buttonHoverForeColor="	+ self.buttonHoverForeColor() +
			    "&buttonHoverBackColor="	+ self.buttonHoverBackColor() +
			    "&dropdownBackColor="		+ self.dropdownBackColor() +
			    "&dropdownForeColor="		+ self.dropdownForeColor();
    });

    self.iframeCode = ko.computed(function() {
    	return	'<iframe src="' + self.iframeSrc() + '" width="' + self.width() + '" height="' + self.height() + '"></iframe>';
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

    $('#iframe-code-output').click(selectText);
});