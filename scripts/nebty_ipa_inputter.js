function refreshParsedNebty() {

	var input = document.getElementById("nebtyinput").innerText
	var outputFrame = document.getElementById("nebtyoutput")
	CUSTOM_IPA_MAP = {}
	outputFrame.innerText = nebty(input)[0]

}


function provideRandomExample() {

	const randomExamples = [
		"`普通话\n` CjAN<51> _ c^C[h]jIN<55>_t^s[h]Aw<213|21> _ k[=]YN<51>_c^C[h]jIN<55> _ t*L^s*Lu<51> _ ma{:}n<51>_su<51>",
		"`标准南不列颠英语\n` Aj__@m__@ _ 'Tawz@nd{o} _ w+ind{o}^z{o} _ Da? _ b{o}l@w{+}",
		"`古英语\n*` !wa*et _`|`_ we: _ XA:r.denA _ in _ ja*e^A:r.dAXum _ Te^o:d.kyniNgA _`|`_ Trym _ jefru:non",
		"`元年前后共同希腊语\n*` ly{4}k[h]non _ met[h]__e:me{4}ran _ ha{4}psas _ perie{`v}:i: _ le{4}Xo:n _`|`_ a[4]nt[h]ro:pon _ ze:to{^}:",
		"`早期中古日语\n*` FaRu_Ba _ akebono _`|`_ jaujau _ siRoku_naRi_juku _ jamagi_Ba _`|`_ sukosi _ akaRi _ te _`|`_ muRasaki_dati_taRu _ kumo_no _`|`_ Fosoku _ tanabiki_taRu",
		"`中古汉语\n*` ?Ij<42> _ t*L[=]jEm<42> _ p[=]ut<5> _ t^s[=]j{:}ok<5> _ sja*ek<5> _`|`_ dAn<3> _ s*LI<5> _ Nw{:}!vn<13> _ mw{:}o<21> _ Xu*-j<21>",
		"`古典拉丁语\n*` ja{~}:*. _ me{~}:s _ praj'trEp+ida{~}:s _ 'awEt _ wa'ga:ri: _`|`_ ja{~}:*. _ 'l*~ajti: _ 'stUdijo: _ 'pEde:s _ wi'ge:skUnt",
		"`龟兹语\n*` on[w]an*jn*jent^se _ se _ t[w]ere _ tikSnendr[j]et^s",
		// onwaññentse se twere tīkṣṇendryets
		"`吠陀梵语\n*` !ag[H]nimi:L!aj _ pur!awhit!a{~} _ ja!fn*j!asj!a _ d!ajV!a{~} _ r{|}tVi:j!a{~} _`|`_ h!awta:r!a{~} _ r!atn!ad[H]a:t!am!am",
		// aghnimīḷe purohitaṃ yajñasya devaṃ ṛtvījam | hotāraṃ ratnadhātamam
		'`现代日语共通语 (使用预设)\n`\\use "kyoutsuugo"\nten*j{`+}d^Jo: _ kaNe_"w"a _ ka"w"aRanedo _`|`_ e:ko_"w"a _ "u"t^s"us"R"u" _ jo_no _ s"us"Nata',
		'`普通话 (使用预设)\n`\\use "standardChinese"\nt[h]jEn"1"_Cja{:}"4" _ "j"jow"4" _ mEj"2"_jow"3b" _ ow"3b"_"r"an"2" _`|`_ na{:}"4" _ pu"4"<|35>_kwo"4" _ "sh ir 4" _ xwa{:}"4"_l@_"zh"wAN"1"_t@ _ taj"4"_l@_mjEn"4"_"j"y"4"_t@ _ pi"4"_"r"an"2"',
		'`标准南不列颠英语 (使用预设)\n`\\use "devoicedEnglish"\nno:? _ mEj__+in\'"dZ"o: _ "b"!v? _ !\'mju*-wt@\'b+il@t+ij'
	]

	var inputFrame = document.getElementById("nebtyinput")
	inputFrame.innerText = randomExamples[Math.floor(randomExamples.length * Math.random())]

}


function copyResult() {
	var outputFrame = document.getElementById("nebtyoutput")
	var copyButton = document.getElementById("copybutton")
	navigator.clipboard.writeText(outputFrame.innerText).then(
		() => {
			copyButton.style.setProperty("--button-visible", "visible")
			setTimeout(() => {
				copyButton.style.setProperty("--button-visible", "hidden")
			}, 1000)
		} 
	)
}