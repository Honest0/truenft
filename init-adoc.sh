#!/bin/bash
echo -e "Converting MARKDOWN into ASCIIDOC format..."

FILES=*.md
for f in $FILES
do
filename="${f%.*}"
pandoc --atx-headers \
    --normalize \
    --verbose \
    --wrap=none \
    --toc \
    --reference-links \
    -smart -o -t asciidoc $PWD/$filename.adoc \
    $PWD/$f
done
