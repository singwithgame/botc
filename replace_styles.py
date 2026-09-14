import os
import glob
import re

replacements = {
    r'\bbg-slate-950/?\d*\b': 'bg-background',
    r'\bbg-slate-900/?\d*\b': 'bg-card',
    r'\bbg-slate-800/?\d*\b': 'bg-muted',
    r'\bborder-slate-800/?\d*\b': 'border-border',
    r'\bborder-slate-700/?\d*\b': 'border-border',
    r'\btext-slate-[23]00\b': 'text-foreground',
    r'\btext-slate-[45]00\b': 'text-muted-foreground',
    r'\btext-sky-400\b': 'text-primary',
    r'\btext-sky-500\b': 'text-primary',
    r'\bbg-sky-500\b': 'bg-primary',
    r'\bbg-sky-600\b': 'bg-primary',
    r'\bborder-sky-500\b': 'border-primary',
    r'\bshadow-2xl\b': 'shadow-card',
    r'\bshadow-xl\b': 'shadow-card'
}

files = glob.glob('src/**/*.tsx', recursive=True) + ['src/index.css']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
        
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
