GLOBAL_RE_SETTING = r"(?m)"

shorthand_table = {
    ## TITLES
    r"^[ \t]*-[ \t]+(.+?)[ \t]+-[ \t]*$": (lambda x: "<h2>{}</h2>".format(x.group(1))),
    # <h2> === [Standalone line] - ... -
    r"^[ \t]*\|[ \t]+(.+?)[ \t]*$": (lambda x: "<h3>{}</h3>".format(x.group(1))),
    # <h3> === [Standalone line] | ...
    r"^[ \t]*-[ \t]+(.+?)[ \t]*$": (lambda x: "<h4>{}</h4>".format(x.group(1))),
    # <h4> === [Standalone line] - ...
    ## FORMATS
    r'""(.*?)""': (lambda x: "<q>{}</q>".format(x.group(1))),
    # <q> === ""...""
    r"(?<!\])\{(?![/!#:;%&\*><\.=])(.*?)\}": (lambda x: "<b>{}</b>".format(x.group(1))),
    # <b> === {...}
    r"(?<!\])\{/ *(.*?)\}": (lambda x: "<i>{}</i>".format(x.group(1))),
    # <i> === {/ ...}
    r"(?<!\])\{! *(.*?)\}": (lambda x: "<em>{}</em>".format(x.group(1))),
    # <em> === {! ...}
    r"(?<!\])\{= *(.*?)\}": (lambda x: "<code>{}</code>".format(x.group(1))),
    # <code> === {= ...}
    r"(?<!\])\{:b\.p +(.*?)\}": (lambda x: "<b class=\"plain\">{}</b>".format(x.group(1))),
    # <b class="plain"> === {:b.p ...}
    r"(?<!\])\{:([0-9a-z]+)\.([0-9a-zA-Z\-_]+) +(.*?)\}": (lambda x: "<{0} class=\"{1}\">{2}</{0}>".format(*x.groups())),
    # other elements-with-class === {:elname.clsname ...}
    ## NESTED
    r"^[ \t]*> +(.*?)$": (lambda x: "<li>{}</li>".format(x.group(1))),
    # <li> === [Standalone line] > ...
}

post_treatment_table = {
    ## NESTED
    r"((?:<li>.*</li>\s*)+)": (lambda x: "<ul class=\"articlelist\">\n{}\n</ul>\n".format(x.group(1).rstrip()))
    # add <ul> to <li> flows
}