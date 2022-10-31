import re
from resources import *

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

