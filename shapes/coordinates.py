import os, sys, re

coordinates = []
rex = r'<rect x=\"([0-9\.]+)\" y=\"([0-9\.]+)\"'

with open('rock.svg') as fp:
  for line in fp:
    matches = re.findall(rex, line)

    if len(matches) is 1:
      coordinates.append(matches[0])


strings = []
for l in coordinates:
  string = '[' + l[0] + ', ' + l[1] + ']'
  strings.append(string)

print ', '.join(strings)