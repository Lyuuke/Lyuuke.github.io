import re
from resources import *
from typing import (Iterable, List, Optional, Tuple)

class GehligBlock:

    __slots__ = ("name", "content", "primary", "spit")

    def __init__(se, name:str, spit:Iterable[Tuple[str]]):
        '''
        spit:       Break when a line fed matches/equals to any
                    pattern/string in the iterable
                     -  Elements should be either
                    ... (<re string>, "r") or (<full string>, "f")
        primary:    True if this block should append a string
                    directly to the flow when breaking; False
                    if it feeds the next block in the stack
        '''
        se.name = name
        se.spit = spit


class GehligMarkupProcessor:

    _valid_options = {
        "USE_TEMPLATE": "article_template",
        "ARTICLE_LANG_DEFAULT": "zh",
        "BACK_WAY": True,
        "IGNORE_ARCHIVED": False
    }

    def __init__(se, raw:str, **options):
        se.text = raw
        for o, v in _valid_options.items():
            se.__dict__[o] = options.get(o, v)

    def segment_preprocess(se):
        '''Segment processor.
        '''
        _cached = ""
        _segment_cached = ""
        lineskip_flag = False
        # whether previous line is empty
        for l in se.text.splitlines():
            if l.strip() == "":
                lineskip_flag = True

