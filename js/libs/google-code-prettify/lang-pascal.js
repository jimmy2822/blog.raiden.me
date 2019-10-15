PR.registerLangHandler(PR.createSimpleLexer([["str",/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$))/,null,"'"],["pln",/^\s+/,null," \r\n\t "]],[["com",/^\(\*[\s\S]*?(?:\*\)|$)|^\{[\s\S]*?(?:\}|$)/,null],["kwd",/^(?:ABSOLUTE|AND|ARRAY|ASM|ASSEMBLER|BEGIN|CASE|CONST|CONSTRUCTOR|DESTRUCTOR|DIV|DO|DOWNTO|ELSE|END|EXTERNAL|FOR|FORWARD|FUNCTION|GOTO|IF|IMPLEMENTATION|IN|INLINE|INTERFACE|INTERRUPT|LABEL|MOD|NOT|OBJECT|OF|OR|PACKED|PROCEDURE|PROGRAM|RECORD|REPEAT|SET|SHL|SHR|THEN|TO|TYPE|UNIT|UNTIL|USES|VAR|VIRTUAL|WHILE|WITH|XOR)\b/i,null],["lit",/^(?:true|false|self|nil)/i,null],["pln",/^[a-z][a-z0-9]*/i,null],["lit",/^(?:\$[a-f0-9]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?)/i,null,"0123456789"],["pun",/^.[^\s\w\.$@\'\/]*/,null]]),["pascal"]);