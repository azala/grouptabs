dependencies = {
	prefixes: [
		[ "dijit", "../dijit" ],
		[ "gka", "../gka" ]
	],
	layers: [
		{
			name: "dojo.js",
			dependencies: [
				"dojo.selector.acme",
				"gka.viewController",
				"gka.MainView",
				"gka.NewEntryView",
				"gka.SummaryView",
				"gka.ListView"
			]
		}
	]
}
