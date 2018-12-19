import * as esprima from 'esprima';
//import * as parent from 'estree-parent';
let lines = new Map();
let linesOrg = new Map();
let parsedarr = [];
let vars = new Map();
let globals = new Map();
let paramIndexes = new Map();
let ifLines = new Map();
let functionStartLine = -1;
let functionEndLine = -1;
//let finalLines = [];
//let paededLevelOne = [];
//let globalParams = [];
let linesToShow = [];
let stay;
let ifs;


const parseCode = (codeToParse,level) => {
    let parsedCode =esprima.parseScript(codeToParse,{loc: true}, function(node,metadata){
        if(level ==2 && parsedarr==undefined)
            parsedarr =[];
        if (node.type == 'FunctionDeclaration')
            FunctionDeclarationParse(node, metadata);
        else if (node.type == 'VariableDeclarator')
            VariableDeclaratorParse(node,metadata,level);
        else
            ParserCont(node,metadata,level);
    });   // console.log(parsedarr);
    //  if(level ==1)
    parsedCode = parsedarr;
    //paededLevelOne = parsedarr;
    // insertGlobals(parsedarr);
    parsedarr = [];
    return parsedCode;};
// else
// {finalLines = parsedarr;
//     return finalLines;}};


// function IsGlobal(node, name) {
//     let isGlobal = true;
//     let par = parent(node);
//     while ( par != null)
//     {
//         if(node.Type == 'FunctionDeclaration')
//         {
//             isGlobal = false;
//             break;
//         }
//         par = parent(node);
//     }
//     if(isGlobal)
//         globals.set(name,'');
//
// }
function ParserCont(node,metadata,level) {
    if(node.type == 'ReturnStatement')
    {
        let val = TypeOf(node.argument,metadata.start.line, level,'no');
        let valToShow = TypeOf(node.argument,metadata.start.line, level,'yes');
        if (val == 'empty')
        {
            val = Recursive(node.argument,metadata.start.line, level,'no');
            valToShow = Recursive(node.argument,metadata.start.line, level,'yes');
        }

        parsedarr.push({ Line: metadata.start.line, Type: 'return statement', Name: '' ,Condition:'', Value:val });
        insertToLinesToShow( metadata.start.line,'return statement','','',valToShow,level);
    }
    else
        ParseNextCont(node, metadata,level);
}


function ParseNextCont(node, metadata,level) {
    if(node.type == 'UpdateExpression')
    {
        let arg = TypeOf(node.argument,metadata.start.line,level,'no');
        let argToShow = TypeOf(node.argument,metadata.start.line,level,'yes');
        if(!node.prefix)
        {
            arg += node.operator;
            argToShow += node.operator;
        }
        else
        {
            arg = node.operator + arg;
            argToShow = node.operator + argToShow;
        }
        parsedarr.push({ Line: metadata.start.line, Type: 'Update Expression', Name: arg ,Condition:'', Value:'' });
        insertToLinesToShow(metadata.start.line,'Update Expression',argToShow,'','',level);
    }
    else
        ParseFinal(node, metadata,level);}

function ParseFinal(node, metadata,level) {
    if(node.type == 'WhileStatement' || node.type == 'IfStatement' || node.type=='ForStatement')
        WhileIfStatementParse(node, metadata,level);
    else  if(node.type == 'AssignmentExpression')
        AssignmentExpressionParse(node, metadata,level);
}
// function BinaryExp(node)
// {
//     let right = '';
//     while (node.type == 'BinaryExpression')
//     {
//         // if(node.right.type == 'Identifier')
//         right= TypeOf(node.right) + right;
//         // else
//         //    right = node.right.value + right
//         right = node.operator + right;
//         // if(node.left == null)
//         //     break;
//         node = node.left;
//     }
//     //  if (node.type == 'Identifier')
//     right = TypeOf(node) + right;
//     //  else
//     //    right = node.value + right;
//     return right;
// }

function Recursive(node,line,level,toShow)
{
    if(node.left==null && node.right==null)
    {
        return TypeOf(node,line,level,toShow);
    }
    else// if (node.left!= null && node.right!=null)
    {
        return '(' + Recursive(node.left,line,level,toShow)+ node.operator + Recursive(node.right,line,level,toShow) + ')';
    }
}

// function LogicalExp(node)
// {
//     let right = '';
//     let total = '';
//     while (node.type == 'LogicalExpression')
//     {
//         // if(node.right.type == 'Identifier')
//         let check = TypeOf(node.right);
//         if (check== 'empty')
//         {
//             let curr = node;
//             // node = node.right;
//             right = BinaryExp(node.right);
//             node = curr;
//         }
//         // else
//         //    right = node.right.value + right
//         total =   node.operator + right + total;
//         // if(node.left == null)
//         //     break;
//         node = node.left;
//     }
//     //  if (node.type == 'Identifier')
//     let temp = BinaryExp(node);
//     if (temp== 'empty')
//     {
//         let curr = node;
//         node = node.right;
//         temp = BinaryExp(node);
//         node = curr;
//     }
//     total =  temp + total;
//     //  else
//     //    right = node.value + right;
//     return total;
// }
function TypeOf(node,line, level,toShow) {
    if(level ==1)
    {
        if (node.type == 'MemberExpression')
        {
            let prop = '';
            if (node.property.type == 'Identifier')
                prop = node.property.name;
            else if (node.property.type == 'Literal')
                prop = node.property.value;
            else //if (node.property.type == 'BinaryExpression')
                prop = Recursive(node.property,line,level);
            let res = node.object.name;
            return res  + '[' + prop + ']';
        }
        else
            return TypeOfNotMemberExpression(node,toShow);
    }
    else
        return TypeOfLevelTwo(node,line,toShow);}


function TypeOfLevelTwo(node,line,toShow)
{
    if (node.type == 'MemberExpression')
    {let prop = '';
        if (node.property.type == 'Identifier')
        {prop = checkIfInLines(line,node.property.name,toShow);
            prop = temp(prop,toShow);}
        else if (node.property.type == 'Literal')
        {prop = node.property.value;}
        else //if (node.property.type == 'BinaryExpression')
        {
            if(toShow=='no')
                prop = eval(Recursive(node.property,line,2,toShow));
            else
                prop = Recursive(node.property,line,2,toShow);
        }
        let res = node.object.name;
        return checkIfInLines(line,res  + '[' + prop + ']',toShow);}
    else
        return TypeOfNotMemberExpressionLevelTwo(node,line,toShow);}

function TypeOfNotMemberExpressionLevelTwo(node,line,toShow) {
    if (node.type == 'Literal')
    {
        if(typeof node.value == 'string')
            return node.raw;
        return node.value;
    }
    else if (node.type == 'Identifier')
        return checkIfInLines(line,node.name,toShow);
    else if (node.type == 'UnaryExpression')
        return node.operator + checkIfInLines(line,TypeOf(node.argument,line,2,toShow),toShow);
    // else if(node.type=='LogicalExpression')
    //     return 'log';
    return 'empty';
}

function temp(prop,toShow) {
    if(toShow=='no')
        prop = eval(prop);
    return prop;
}

function checkIfInLines(line,name,toShow) {/////////frontal
    let ans = (lines.get(line)).get(name);
    if(toShow == 'no')
    {
        if(ans == undefined)
            return name;
        else
            return ans;}
    else
    {
        if(isParam(name))
            return name;
        else
        {
            let ans2 = (linesOrg.get(line)).get(name);
            // if(ans2==undefined)
            //    return ans;
            return ans2;}
    }}


function isParam(name) {
    for (let i of globals.keys())
    {
        if(i==name || name.includes(i+'['))
            return true;
    }
    return false;
}

function IfLineChanged(line, name, val,map) {
    if(betweenIf(line))
    {
        let iters = linesUntillEndOfIf(line);
        changeScope(iters,line,name,val,map);
    }
    else
        changeAll(line, name, val,map);

}

function  changeScope(iters,line,name,val,map){//////////frontal
    let oldVal = (map.get(line)).get(name);
    if(oldVal != val) {
        for (let i = line; i <= iters; i++) {
            // if (oldVal == (map.get(i)).get(name)) {
            let arr = map.get(i);
            if(arr != undefined)
            {
                arr = arr.set(name, val);
                map.set(i, arr);
            }
            //  }
        }
    }
}

function  changeAll(line, name, val,map) {/////////////////////////////frontal
    let oldVal = (map.get(line)).get(name);
    if(oldVal != val) {
        while (line < maxKey()) {
            if (oldVal == (map.get(line)).get(name)) {
                let arr = map.get(line);
                arr = arr.set(name, val);
                map.set(line, arr);
            }
            line = getNextMap(line);
        }
        // if (oldVal == (map.get(line)).get(name)) {//assigment at the last line can delete
        let arr = map.get(line);
        arr = arr.set(name, val);
        map.set(line, arr);
    }
    // }
}



function TypeOfNotMemberExpression(node,toShow) {
    if (node.type == 'Literal')
        return node.value;
    else if (node.type == 'Identifier')
        return node.name;
    else if (node.type == 'UnaryExpression')
    {
        return node.operator + TypeOf(node.argument,node.loc.start.line,1,toShow);
    }
    // else if(node.type=='LogicalExpression')
    //     return 'log';
    return 'empty';
}


function FunctionDeclarationParse(node, metadata) {
    parsedarr.push({ Line: metadata.start.line, Type: node.type, Name: node.id.name ,Condition:'', Value: ''});
    functionStartLine = metadata.start.line;
    functionEndLine = metadata.end.line;
    for(let i=0; i<node.params.length; i++)
    {
        parsedarr.push({ Line: metadata.start.line, Type: 'variable declaration', Name: node.params[i].name ,Condition:'', Value: ''});
        paramIndexes.set(node.params[i].name,i);/////guy
    }
}

function VariableDeclaratorParse(node,metadata,level) {
    let initVal=null;
    let initValToShow=null;
    if(node.init!=null)///////delete
    {
        initVal=TypeOf(node.init,metadata.start.line,level,'no');
        initValToShow=TypeOf(node.init,metadata.start.line,level,'yes');
    }
    if(initVal == 'empty')
    {
        initVal = Recursive(node.init,metadata.start.line,level,'no');
        initValToShow = Recursive(node.init,metadata.start.line,level,'yes');
    }
    parsedarr.push({ Line: metadata.start.line, Type: 'variable declaration', Name: node.id.name ,Condition:'', Value:initVal });
    insertToLinesToShow(metadata.start.line, 'variable declaration', node.id.name, '', initValToShow, level);
    if(level ==2) {
        (linesOrg.get(metadata.start.line)).set(node.id.name,initValToShow);
        IfLineChanged(metadata.start.line, node.id.name, initVal,lines);
        IfLineChangedToShow(metadata.start.line, node.id.name, initValToShow,linesOrg);
    }}

function IfLineChangedToShow(line, name, val,map)
{
    if(betweenIf(line))
    {
        let iters = linesUntillEndOfIf(line);
        changeScopeToShow(iters,line,name,val,map);
    }
    else
        changeAllToShow(line, name, val,map);

}

function  changeAllToShow(line, name, val,map) {/////////////////////////////frontal
    let oldVal = (map.get(getNextMap(line))).get(name);
    val = returnVal(val);
    if(oldVal != val) {
        while (line < maxKey()) {
            if (oldVal == (map.get(line)).get(name)) {
                let arr = map.get(line);
                arr = arr.set(name, val);
                map.set(line, arr);
            }
            line = getNextMap(line);
        }
        //if (oldVal == (map.get(line)).get(name)) {
        let arr = map.get(line);
        arr = arr.set(name, val);
        map.set(line, arr);
    }
    //}
}
function returnVal(val) {
    if(typeof val != 'string')
        val+='';
    return val;
}


function  changeScopeToShow(iters,line,name,val,map){///////////////////////////////////
    let oldVal = (map.get(getNextMap(line))).get(name);
    //let olsArr = oldVal.split(/(+\-*/])/);
    if(oldVal != val) {
        for (let i = line; i <= iters; i++) {
            let arr = map.get(i);
            if(arr != undefined)
            {
                if (oldVal == (map.get(i)).get(name)) {
                    arr = arr.set(name, val);
                    map.set(i, arr);
                }
            }
        }
    }
}
function AssignmentExpressionParse(node, metadata,level)
{
    let rightToshow =TypeOf(node.right, metadata.start.line, level,'yes');
    let right =TypeOf(node.right, metadata.start.line, level,'no');
    let left = TypeOf(node.left, metadata.start.line, 1);
    if (right== 'empty')
    {
        right = Recursive(node.right, metadata.start.line, level,'no');
        rightToshow = Recursive(node.right, metadata.start.line, level,'yes');
    }
    parsedarr.push({ Line: metadata.start.line, Type: 'assignment expression', Name: left ,Condition:'', Value:right });
    insertToLinesToShow(metadata.start.line, 'assignment expression', left, '', rightToshow, level);
    if(level ==2)
    {

        (linesOrg.get(metadata.start.line)).set(left,rightToshow);
        IfLineChanged(metadata.start.line,left,right,lines);
        IfLineChangedToShow(metadata.start.line,left,rightToshow,linesOrg);
    }
}

function WhileIfStatementParse(node, metadata,level) {
    let cond = ''; let condToShow = '';
    let type = 'while statement';
    if (node.type == 'IfStatement')
    {type = 'if statement';
        elseStatement(node.alternate,level,metadata.start.line);
        insertIfTodic(node,metadata,level);}
    // else if(node.type == 'ForStatement')
    //     type = 'for statement';
    else
    {   insertWhileTodic(node,metadata,level);}
    if(node.test.type== 'BinaryExpression' || node.test.type== 'LogicalExpression')
    {cond = Recursive(node.test,metadata.start.line,level,'no');
        condToShow = Recursive(node.test,metadata.start.line,level,'yes');}
    else
    {cond = TypeOf(node.test,metadata.start.line,level,'no');
        condToShow = TypeOf(node.test,metadata.start.line,level,'yes');}
    parsedarr.push({ Line: metadata.start.line, Type: type, Name: '' ,Condition:cond, Value:'' });
    insertToLinesToShow(metadata.start.line,type,'',condToShow,'',level);
    insertTestToIf(cond, metadata.start.line);}


function insertToLinesToShow(line,type,name,cond,val,level) {
    if (level ==2)
        linesToShow.push({ Line: line, Type: type, Name: name ,Condition:cond, Value:val });
}

function insertTestToIf(cond, line)
{
    // if(ifLines.get(line) != undefined && ifLines.get(line).Type == 'if' || ifLines.get(line).Type == 'while')
    //{
    let ifLine =  ifLines.get(line);
    ifLine.Test = cond;
    ifLines.set(line,ifLine);
    //}
}

function insertWhileTodic(node,metadata,level)///////////////fronal
{
    //if(checkInIfWhile(node.body.body))
    if(level==1)
        ifLines.set(metadata.start.line, {End:metadata.end.line,Type:'while',Test:''});
    //else//End:metadata.start.line+node.body.body.length
    //  ifLines.set(metadata.start.line,{End:metadata.start.line+1,Type:'while',Test:''});
}

function  insertIfTodic(node,metadata,level) {
    // if(checkInIfWhile(node.consequent.body))
    if(level==1)
        ifLines.set(metadata.start.line,{End:node.consequent.loc.end.line,Type:'if', Test:''});
    // else
    //     ifLines.set(metadata.start.line,{End:metadata.start.line+ node.consequent.body.length,Type:'if', Test:''});
}

// function findLength(node,metadata) {
//     if(node.type == 'WhileStatement')
//     {
//         if(!checkInIfWhile(node.body.body))
//             return node.body.body.length;
//     }
//     else if(node.type == 'IfStatement')
//     {
//         if(!checkInIfWhile(node.body.body))
//             return node.body.body.length;
//     }
//
// }
//
// function checkInIfWhile(node) {
//     for (let i = 0; i < node.length; i++) {
//         if(node[i].type == 'WhileStatement' || node[i].type == '"IfStatement"')
//             return true;
//     }
//     return false;
// }


function SortParsed(parsedarrNew) {
    parsedarrNew.sort(function(a, b){return a.Line - b.Line;});
    return parsedarrNew;
}

// function SortIfLines() {
//     linesToShow.sort(function(a, b){return a - b;});
//     return linesToShow;
// }
function elseStatement(node,level,ifLine) {
    if (node!= null)
    {
        if (node.type!='IfStatement')
        {
            if(level==1)
                ifLines.set(node.loc.start.line,{End:node.loc.end.line,Type:'else',Test:'',Ifline:ifLine});
            parsedarr.push({Line:node.loc.start.line, Type: 'else', Name: '' ,Condition:'', Value:'' });
            insertToLinesToShow(node.loc.start.line,'else','','','',level);
        }
    }
}
// function  insertElseTodic(node,metadata) {
//     if(checkInIfWhile(node))
//         ifLines.set(metadata.start.line,{End:node.consequent.end.line,Type:'if', Test:''});
//     else
//         ifLines.set(node.loc.start.line,{End:node.loc.end.line+ node.body.length,Type:'else',Test:''});
// }

function insertGlobals(parsed)
{
    for(let line of parsed)
    {
        if (line.Type == 'variable declaration')
        {
            checkIfGlobal(line);
        }
    }

}

function checkIfGlobal(line)
{
    if((line.Line <= functionStartLine || line.Line > functionEndLine) && !globals.has(line.Name))//guy
        globals.set(line.Name,line.Value);
}

function linesToMap(parsedarrNew,params) {
    parsedarrNew = SortParsed(parsedarrNew);
    chengeiflines(parsedarrNew);
    insertGlobals(parsedarrNew);
    //linesToShow = SortLinesToShow();
    initVars(parsedarrNew);
    initLines(parsedarrNew);
    initParams(params);
    for(let line of lines.keys()) {
        if(line != functionStartLine)
        {
            next(line,parsedarrNew);
        }
    }
    return lines;
}

function next(line,parsedarrNew) {
    changeLine(line);
    for (let i = 0; i < parsedarrNew.length; i++) {
        if (parsedarrNew[i].Type == 'variable declaration' || parsedarrNew[i].Type == 'assignment expression') {
            CheckAndInsert(parsedarrNew[i],line);
        }
    }
}

function chengeiflines(parsedarrNew) {
    for(let ifLine of ifLines.keys())
    {
        let end = ifLines.get(ifLine).End;
        let ans = existLine(end,parsedarrNew);
        if(!ans)
        {
            changeIfLines(end,parsedarrNew,ifLine);
        }

    }
}
function existLine(end,parsedarrNew) {
    for(let parsedLine of parsedarrNew)
    {
        if(parsedLine.Line == end)
            return true;
    }
    return false;
}

function changeIfLines(end,parsedarrNew,ifLine) {
    let curr = end-1;
    while (!existLine(curr,parsedarrNew))
    {
        curr--;
    }
    let ifLineTochange =  ifLines.get(ifLine);
    ifLineTochange.End = curr;
    ifLines.set(ifLine,ifLineTochange);

}

function changeLine(line) {//////////////////////////////////
    let ans;
    let min = minKey();
    if (line == min)
    {
        ans = lines.get(min);
    }
    else if(!checkLineAfterIf(line))
    {
        ans = lines.get(getPrevMap(line));
    }
    else
    {
        ans = firstLineNotIF(line);
    }
    let map = new Map(ans);
    lines.set(line, map);
}

function CheckAndInsert(line, index) {
    // if(line.Line == functionStartLine)
    //     initParams(params);
    // else
    // {
    for(let j of (lines.get(line.Line)).keys())
    {
        if(line.Line == index && j == line.Name && line.Line != functionStartLine)
        {
            insertLine(line);
        }
    }// }
}

function  insertLine(line) {//////////////////////////////////////
    let map = lines.get(line.Line);
    let value = line.Value;
    if(typeof value == 'string') {
        let c = value.indexOf(line.Name);
        if (c != -1 && checkName(line.Name, line.Value)) {
            changeLine(line.Line);
            return;
        }
    }
    map =  map.set(line.Name, value);
    lines.set(line.Line, map);
}

// function checkValue(name,value, oldVal)
// {
//     let ans = value;
//     if(typeof value == 'string')
//     {
//         if(value.includes(name))
//         {
//             if (value == name)
//                 return ans;
//             if (checkName(name, value))
//                 ans = value.replace(name, oldVal);
//         }
//     }
//     return ans;
// }

function checkName(name, value) {
    let lettersAnsNums = /^[0-9a-zA-Z]+$/;
    let letters = /^[A-Za-z]+$/;
    let c = value.indexOf(name);
    if (c >0) {
        if (value[c - 1].match(letters))
            return false;
    }
    if(c<value.length-1 && value[c+1].match(lettersAnsNums))
        return false;
    return true;

}

function getPrevMap(line) {
    let min = minKey();
    if (line == min)
        return min;
    let curr = line-1;
    while ( lines.get(curr) == undefined && curr != min)
        curr--;
    return curr;

}

function getPrevIflines(line,map) {/////////frontal
    let min = minKeyIfLines();
    //if (line == min)
    //    return min;
    let curr = line-1;
    while ( map.get(curr) == undefined && curr != min)
        curr--;
    return curr;

}

function getNextMap(line) {
    let max = maxKey();
    if (line == max)
        return max;
    let curr = line+1;
    while ( lines.get(curr) == undefined && curr != max)
        curr++;
    return curr;

}

function checkLineAfterIf(line) {////changed
    for (let i of ifLines.values())
    {
        let prev = getPrevMap(line);
        if(prev == i.End)// && i.Type == 'if')//
            return true;
    }
    return false;
}

function firstLineNotIF(line) {
    let sorted = new Map(Array.from(ifLines).sort((a, b) => {
        return a[0] - b[0];})
    );

    let start = getPrevIflines(line,sorted);
    //let last = getPrevMap(start);
    while(checkLineAfterIf(start))
    {
        start = getPrevIflines(start,sorted);
        //last = getPrevMap(start);
    }
    return lines.get(start);
    // let curr = getPrevMap(line)
    // let curr = getPrevMap(line);
    // while (betweenIf(curr))
    //     curr = getPrevMap(curr);
    // return lines.get(curr);
}

function betweenIf(line) {
    for (let i of ifLines.keys())
    {
        if(line >= i && line <= ifLines.get(i).End)// && ifLines.get(i).Type == 'if')//
            return true;
    }
    return false;
}

function linesUntillEndOfIf(line) {//////////changed
    //let ans =Number.MAX_VALUE;
    let sorted = new Map(Array.from(ifLines).sort((a, b) => {
        return a[0] - b[0];})
    );
    let start = getPrevIflines(line,sorted);
    let end = ifLines.get(start).End;
    return end;
    //let end = ifLines.get(start).End;//return end-line;// let temp=0;
    // for (let i of ifLines.values())
    // {
    //     if(i.End >= line)
    //     {
    //         temp =  i.End - line;
    //         if(temp < ans)
    //             ans =temp;
    //     }
    // }
    // return ans;
}


// function isInTheLine(arr, name)
// {
//     for (var i in arr)
//     {
//         if(i.Name == name)
//             return true;
//         else
//             return false;
//     }
// }

// Object.size = function(obj) {
//     let size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };
//
function minKey() {
    let min = Number.MAX_VALUE;
    for (let property of lines.keys()) {
        min = (min > property) ? property : min;
    }
    return min;
}

function minKeyIfLines() {//////////frontal
    let min = Number.MAX_VALUE;
    for (let property of ifLines.keys()) {
        min = property;//(min > property) ? property : min;
    }
    return min;
}

function maxKey() {
    let max;
    for (var property of lines.keys()) {
        max = property;
    }
    return max;
}


function initLines (paresed) {//////////////////////////////////
    for (let i = 0; i < paresed.length; i++) {
        if (lines.get(paresed[i].Line) == undefined) {
            let copy = new Map(vars);
            lines.set(paresed[i].Line, copy);
        }
    }
    for (let i = 0; i < paresed.length; i++) {
        if (linesOrg.get(paresed[i].Line) == undefined) {
            let copy = new Map(vars);
            linesOrg.set(paresed[i].Line, copy);
        }
    }
    return;
}

// function sortMapByValue(map) {
//     var tupleArray = [];
//     for (var key in map) tupleArray.push([key, map[key]]);
//     tupleArray.sort(function (a, b) {
//         return b[1] - a[1]
//     });
//     var sortedMap = {};
//     tupleArray.forEach(function (el) {
//         sortedMap[el[0]] = el[1]
//     });
//     return sortedMap;
// }

function initVars(parrsed) {
    for (let i = 0; i < parrsed.length; i++) {
        if (parrsed[i].Type == 'variable declaration' || parrsed[i].Type == 'assignment expression') {
            if (vars.get(parrsed[i].Name) == undefined)
            {
                vars.set(parrsed[i].Name, '');
            }

        }
    }
}

function initParams(params) {////////////////////////////////
    let paramsArr;
    //if(globalParams.length == 0)
    //{
    if(params.includes(']'))
        parsedarr = splirArr(params);
    else
    {
        paramsArr = params.split(',');
        //globalParams = paramsArr;
        for (let line of lines.keys())
        {
            for (let i = 0; i < paramsArr.length; i++) {
                let name = findKey(paramIndexes,i);//guy
                let map = lines.get(line);
                map =  map.set(name, paramsArr[i]);
                lines.set(functionStartLine, map);}
        }}
    initglobals();
}//}

function  splirArr(params) {
    let str=''; let arr = ''; let counter =0; let indexInparams=0;
    while (counter < params.length)
    {
        if(params[counter]== '[')
        {arr = '';
            counter++;
            let {counter1, arr2} = func(params,counter,arr);
            counter =counter1;
            arr = arr2;
            insertpaeamsArray(indexInparams,arr);
            counter+=2;
            indexInparams++;}
        else {str='';
            while (params[counter] != ',' && counter < params.length)
            {str = str +params[counter];
                counter++;}
            insertToparams(indexInparams,str);
            counter++;
            indexInparams++;}}}

function func(params,counter,arr) {
    while (params[counter] != ']')
    {
        arr = arr + params[counter];
        counter++;
    }
    return {counter1: counter, arr2: arr};
}

function insertpaeamsArray(indexInparams,arr) {
    let arrToinsert = '[' + arr + ']';
    let name = findKey(paramIndexes,indexInparams);//guy
    let map = lines.get(functionStartLine);
    map =  map.set(name, arrToinsert);
    lines.set(functionStartLine, map);
    arr = arr.split(',');
    for (let i = 0; i <arr.length ; i++) {
        let name = findKey(paramIndexes,indexInparams);//guy
        let nameInIndex =  name + '[' + i + ']';
        let map = lines.get(functionStartLine);
        map =  map.set(nameInIndex, arr[i]);
        lines.set(functionStartLine, map);
    }
}

function  insertToparams(indexInparams,str) {
    let name = findKey(paramIndexes,indexInparams);//guy
    let map = lines.get(functionStartLine);
    map =  map.set(name, str);
    lines.set(functionStartLine, map);
}



function initglobals() {
    for(let global of globals.keys())
    {
        if((lines.get(functionStartLine)).get(global)== '')
        {
            let map = lines.get(functionStartLine);
            map =  map.set(global, globals.get(global));
            lines.set(functionStartLine, map);
        }
    }
}

function findKey(map, value)
{
    for (let prop of map.keys())
    {
        let val = map.get(prop);
        if (val == value)
        {
            return prop;
        }
    }

}

function insertToLinesNotToStay(arr) {
    let linesNotToStay = new Set();
    for (let line of arr) {
        if (line.Type == 'variable declaration' || line.Type == 'assignment expression') {
            if (!globals.has(line.Name))
                linesNotToStay.add(line.Line);
        }
    }
    return linesNotToStay;
}

function finellize() {
    parsedarr=[];
    ifLines = new Map();
    globals = new Map();
    lines = new Map();
    linesToShow = [];
    linesOrg = new Map();
    vars = new Map();
    functionStartLine = -1;
    functionEndLine = -1;
    //globalParams = [];
}

// function returnIfLines() {
//     return ifLines;
// }
// function returnGlobals() {
//     return globals;
// }
// function returnLines() {
//     return lines;
//}
function retuenLinesToShow() {
    return linesToShow;
}

function checkIfs() {
    let answers = new Map();
    let sorted = new Map(Array.from(ifLines).sort((a, b) => {
        return a[0] - b[0];
    })
    );
    for (let ifstatment of sorted.keys()) {
        if (sorted.get(ifstatment).Type == 'if') {
            let ans = eval(sorted.get(ifstatment).Test);
            answers.set(ifstatment, ans);
            //if (ans)
            //    flag = true;
        }
        else if (sorted.get(ifstatment).Type == 'else') {
            let flag = answers.get((sorted.get(ifstatment)).Ifline);
            answers = colorElse(answers, flag, ifstatment);
        }
    }
    return answers;
}

function colorElse(answers,flag,ifstatment) {
    if(!flag)
        answers.set(ifstatment,true);
    else
        answers.set(ifstatment,false);
    return answers;
}

function initAll(codeToParse,params) {
    finellize();
    let parsedCode = parseCode(codeToParse,1);
    linesToMap(parsedCode,params);
    stay = insertToLinesNotToStay(parsedCode);
    let final = parseCode(codeToParse,2);
    //let codeToshow = retuenLinesToShow();
    ifs = checkIfs(final);
    //console.log(JSON.stringify(final));
    return final;
}
function returnStay() {
    return stay;
}
function returnifs() {
    return ifs;
}

export {returnifs};
export {returnStay};
export {initAll};
export {parseCode};
export {finellize};
export {retuenLinesToShow};
export {getPrevMap};

