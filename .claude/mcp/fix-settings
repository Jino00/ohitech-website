#!/usr/bin/env python3
import re, os

path = os.path.expanduser("~/.claude/settings.json")
with open(path, "r") as f:
    content = f.read()

fixed = re.sub(r'\[([^\]]+)\]\(http://[^)]+\)', r'\1', content)

with open(path, "w") as f:
    f.write(fixed)

print("Fixed. Checking result:")
import json
with open(path) as f:
    s = json.load(f)
print(s["mcpServers"]["ai-dispatch"]["args"][3])
