"""Extract reviewed prose blocks from the supplied 13-page PDF, excluding figure labels.

Requires PyMuPDF only for re-extraction; the website has no Python dependency.
Block coordinates/indices are tied to the supplied September 18 PDF revision.
"""
from pathlib import Path
import hashlib
import json
import re
import fitz

root = Path(__file__).resolve().parents[1]
source = root / 'dist/report.pdf'
doc = fitz.open(source)
assert len(doc) == 13

def block(page, index):
    return doc[page-1].get_text('blocks')[index][4]

def clean(text):
    # Preserve meaningful compound hyphens; repair only PDF line-break splits.
    text = re.sub(r'(function|main|auto|simu|compart)-\n', r'\1', text)
    text = re.sub(r'-\n', '-', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace('𝛼', 'α').replace('𝜋0.5', 'π₀.₅').replace('𝜋0', 'π₀')
    text = re.sub(r'α(?=[a-zA-Z])', 'α ', text)
    text = re.sub(r'\s*\[\?\s*\]', '', text)
    return text.replace('overeview', 'overview').replace('FastWAM', 'Fast-WAM')

def para(*refs):
    return clean(''.join(block(*ref) for ref in refs))

def strip_heading(text, heading):
    assert text.startswith(heading), (heading, text[:80])
    return text[len(heading):].strip()

copy = {
    'introduction': [para((1, i)) for i in [9, 10, 11]],
    'benchmark': [para((2, i)) for i in [2, 3, 4, 5]],
    'integration': [para((2, 7), (3, 0)), para((3, 1)), para((3, 2)), para((3, 3))],
    'settings': [para((3, 5), (4, 6))],
    'analysis': [para((4, 8))],
    'overall': [para((4, 10)), para((4, 11)), para((5, 0))],
    'mobile': [strip_heading(para((5, 2)), 'Mobile manipulation demonstrates a clear relative strength.'), para((5, 3))],
    'clutter': [strip_heading(para((5, 4)), 'Target identification remains robust amid visual clutter.')],
    'perturbations': [strip_heading(para((5, 5)), 'Benchmark perturbations provide a broader test.'), para((5, 6))],
    'precision': [para((6, i)) for i in [12, 13, 14]],
    'horizon': [para((6, 16)), para((7, 6)), para((7, 7))],
    'behaviorIntroduction': [para((7, 9))],
    'coffee': [strip_heading(para((7, 10)), 'Contact-height correction does not guarantee completion.'), para((8, 28))],
    'utensils': [strip_heading(para((8, 29)), 'Following a demonstration requires resolving its intended goal.'), para((8, 33))],
    'fruit': [para((8, 34)), para((9, 16))],
    'behaviorClosing': [para((9, 17))],
    'iclIntroduction': [para((9, 20))],
    'iclFrame': [para((9, 21))],
    'iclGear': [para((10, 56))],
    'iclSummary': [para((10, 57))],
    'comparisonIntroduction': [para((10, 59))],
    'recovery': [strip_heading(para((10, 60), (11, 0)), 'Affordance-directed grasping and task-state recovery.')],
    'fine': [strip_heading(para((11, 1)), 'Poorly precise manipulation of articulated objects.')],
    'comparisonSummary': [para((11, 2))],
    'acknowledgments': [para((11, 5))],
}
# Split paragraphs that the PDF extractor merges into one block.
text = copy['integration'][1]
before, after = text.split('Apart from the task instruction,', 1)
copy['integration'][1:2] = [before.strip(), 'Apart from the task instruction,' + after]
text = copy['settings'][0]
before, after = text.split('In the unseen-composition setting,', 1)
copy['settings'] = [before.strip(), 'In the unseen-composition setting,' + after]

out = {
    'source': 'report.pdf',
    'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'provenance': 'Descriptive prose from the supplied PDF. Paragraph order and substantive wording preserved; PDF line breaks, glyphs and unresolved citation markers normalized.',
    'pages': {'introduction':[1], 'benchmark':[2], 'integration':[2,3], 'settings':[3,4], 'analysis':[4], 'overall':[4,5], 'mobile':[5], 'clutter':[5], 'perturbations':[5], 'precision':[6], 'horizon':[6,7], 'behaviorIntroduction':[7], 'coffee':[7,8], 'utensils':[8], 'fruit':[8,9], 'behaviorClosing':[9], 'iclIntroduction':[9], 'iclFrame':[9], 'iclGear':[10], 'iclSummary':[10], 'comparisonIntroduction':[10], 'recovery':[10,11], 'fine':[11], 'comparisonSummary':[11], 'acknowledgments':[11]},
    'paragraphs': copy,
}
(root/'dist/data/report-copy.json').write_text(json.dumps(out, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'Extracted {sum(map(len, copy.values()))} paragraphs; {sum(len(p.split()) for ps in copy.values() for p in ps)} words, with source-page mapping.')
