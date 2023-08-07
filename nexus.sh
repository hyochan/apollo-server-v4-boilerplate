#!/usr/bin/env bash

FILE='src/generated/nexus.ts'
CONTEXT=".\/..\/context"
CONTEXT_REPLACEMENT="..\/context.js"
FIELD_AUTHORIZE="nexus\/dist\/plugins\/fieldAuthorizePlugin"
FIELD_AUTHORIZE_REPLACEMENT="nexus\/dist\/plugins\/fieldAuthorizePlugin.js"

sed -i "" "s/$CONTEXT/$CONTEXT_REPLACEMENT/" $FILE
sed -i "" "s/$FIELD_AUTHORIZE/$FIELD_AUTHORIZE_REPLACEMENT/" $FILE
