from typing import (Any, Container, List, Mapping, Optional)

class IpaGlyph:
    '''IPA 符号类
    # # #
    按字形索引 IPA 符号
    '''

    __instances = {}
    # 存储所有已注册的 IpaGlyph 实例
    __slots__ = ("_inv", "_mir", "_sc", "_mut")
    # inverted, mirrored, small cap, mutation

    def __new__(cls, glyph:str, *ax, **qax):
        if not isinstance(glyph, str):
            raise ValueError("IPA glyph must be a string, not {}."
                .format(type(glyph)))
        if glyph in __instances:
            return __instances[glyph]
        else:
            __instances[glyph] = _ = object.__new__(
                glyph, *ax, **qax)
            return _

    def __init__(se, glyph, inv:str=None, mir:str=None, sc:str=None,
        mut:Mapping[str, str]=None):
        se._inv = IpaGlyph.get(inv) if inv != None else None
        se._mir = IpaGlyph.get(mir) if mir != None else None
        se._sc = IpaGlyph.get(sc) if sc != None else None
        se._mut = {}

    @classmethod
    def get(cls, glyph):
        '''
        '''

    @property
    def inv(se):
        return se._inv

    @property
    def mir(se):
        return se._mir

    @property
    def sc(se):
        return se._sc