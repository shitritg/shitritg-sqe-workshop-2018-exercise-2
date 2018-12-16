import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
//import {describe} from 'nyc';
import {initAll} from '../src/js/code-analyzer';
import {returnifs} from '../src/js/code-analyzer';
import {retuenLinesToShow} from '../src/js/code-analyzer';
import {returnStay} from '../src/js/code-analyzer';
import {getPrevMap} from '../src/js/code-analyzer';


describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(returnifs(),undefined);
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(retuenLinesToShow().length,0);
    });
});

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(returnStay(),undefined);
    });
});
describe('The javascript parser', () => {
    it('is parsing a return statment', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch() { return -1; }',1)),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"-1"},{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""}]'
        );
    });
});

// describe('The javascript parser', () => {
//     it('is parsing a function declaration', () => {
//         assert.equal(
//             JSON.stringify(parseCode('function binarySearch(X, V, n){}',1)),
//             '[{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""}]'
//         );
//     });
// });

// describe('The javascript parser', () => {
//     it('is parsing a simple variable declaration correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('let x;',1)),
//             '[{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":null}]'
//         );
//     });
// });
//
//
// describe('The javascript parser', () => {
//     it('is parsing a simple assignment expression correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('let a = 1;',1)),
//             '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":1}]'
//         );
//     });
// });
//
// describe('The javascript parser', () => {
//     it('is parsing a complex assignment expression correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('mid = (low + high)/2;',1)),
//             '[{"Line":1,"Type":"assignment expression","Name":"mid","Condition":"","Value":"((low+high)/2)"}]'
//         );
//     });
// });
// describe('The javascript parser', () => {
//     it('is parsing a member assignment expression correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('V[i] = 1',1)),
//             '[{"Line":1,"Type":"assignment expression","Name":"V[i]","Condition":"","Value":1}]'
//         );
//     });
// });
//
// describe('The javascript parser', () => {
//     it('is parsing a member in the prop assignment expression correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('V[i+1] = 2',1)),
//             '[{"Line":1,"Type":"assignment expression","Name":"V[(i+1)]","Condition":"","Value":2}]'
//         );
//     });
// });
// describe('The javascript parser', () => {
//     it('is parsing a while statment', () => {
//         assert.equal(
//             JSON.stringify(parseCode(' while (low <= high) {}',1)),
//             '[{"Line":1,"Type":"while statement","Name":"","Condition":"(low<=high)","Value":""}]'
//         );
//     });
// });
// describe('The javascript parser', () => {
//     it('is parsing a if statment', () => {
//         assert.equal(
//             JSON.stringify(parseCode(' if (X < V[mid]) {}',1)),
//             '[{"Line":1,"Type":"if statement","Name":"","Condition":"(X<V[mid])","Value":""}]'
//         );
//     });
// });
//
// // describe('The javascript parser', () => {
// //     it('is parsing a for statment', () => {
// //         assert.equal(
// //             JSON.stringify(parseCode('for (let i =0; i<10; i++) {}',1)),
// //             '[{"Line":1,"Type":"variable declaration","Name":"i","Condition":"","Value":0},{"Line":1,"Type":"Update Expression","Name":"i++","Condition":"","Value":""},{"Line":1,"Type":"for statement","Name":"","Condition":"i<10","Value":""}]'
// //         );
// //     });
// // });
//
describe('The javascript parser', () => {
    it('is parsing a return statment', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch() { return -1; }',1)),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"-1"},{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""}]'
        );
    });
});
// describe('The javascript parser', () => {
//     it('is parsing a member return statment', () => {
//         assert.equal(
//             JSON.stringify(parseCode('function binarySearch(X) { return X[0]; }',1)),
//             '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"X[0]"},{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""}]'
//         );
//     });
// });
// describe('The javascript parser', () => {
//     it('is parsing a binary exp return statment', () => {
//         assert.equal(
//             JSON.stringify(parseCode('function foo(x, y){let z=x+y;return x+ y+ z;}',1)),
//             '[{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":"(x+y)"},{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"((x+y)+z)"},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""}]'
//         );
//     });
// });
describe('The javascript parser', () => {
    it('is parsing a update statment', () => {
        assert.equal(
            JSON.stringify(parseCode('++x',1)),
            '[{"Line":1,"Type":"Update Expression","Name":"++x","Condition":"","Value":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a update statment', () => {
        assert.equal(
            JSON.stringify(parseCode('x++',1)),
            '[{"Line":1,"Type":"Update Expression","Name":"x++","Condition":"","Value":""}]'
        );
    });
});
// describe('The javascript parser', () => {
//     it('is parsing a logical statment', () => {
//         assert.equal(
//             JSON.stringify(parseCode('if( x==2&& x==3) {}',1)),
//             '[{"Line":1,"Type":"if statement","Name":"","Condition":"((x==2)&&(x==3))","Value":""}]'
//         );
//     });
// });
describe('The javascript parser', () => {
    it('is parsing a while true', () => {
        assert.equal(
            JSON.stringify(parseCode('while (true) {}')),
            '[{"Line":1,"Type":"while statement","Name":"","Condition":true,"Value":""}]'
        );
    });
});

// describe('The javascript parser', () => {
//     it('is parsing a while true', () => {
//         assert.equal(
//             JSON.stringify(parseCode('while (true) {}')),
//             '[{"Line":1,"Type":"while statement","Name":"","Condition":true,"Value":""}]'
//         );
//     });
// });
//
describe('The javascript parser', () => {
    it('is parsing a array phaze2', () => {
        assert.equal(
            JSON.stringify(initAll('function foo(x,z){\n' +
                '    let a = x[2] + 1 +z;\n' +
                '    \n' +
                '    if (a ==4 && !x[0]) {\n' +
                '        return a;\n' +
                '    } else if (x[1] == \'hellow\') {\n' +
                '        a = a + a;\n' +
                '        return a;\n' +
                '    } else {\n' +
                '        return a;\n' +
                '    }\n' +
                '}','[false,\'hellow\',3],1')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"((3+1)+1)"},{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+1)"},{"Line":7,"Type":"assignment expression","Name":"a","Condition":"","Value":"(((3+1)+1)+((3+1)+1))"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((3+1)+1)+((3+1)+1))"},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+1)"},{"Line":9,"Type":"else","Name":"","Condition":"","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(\'hellow\'==\'hellow\')","Value":""},{"Line":4,"Type":"if statement","Name":"","Condition":"((((3+1)+1)==4)&&!false)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(getPrevMap(1),1);
    });
});

describe('The javascript parser', () => {
    it('is parsing  phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = z + 1;\n' +
            '    let b = a + z;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return  z + c;\n' +
            '    } else if (!x && y==\'hellow\') {\n' +
            '        c = c + x + 5;\n' +
            '        return  z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return  c;\n' +
            '    }\n' +
            '}','false,\'hellow\',3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(3+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((3+1)+3)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(3+(0+5))"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+false)+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(3+((0+false)+5))"},{"Line":13,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"((0+3)+5)"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"(!false&&(\'hellow\'==\'hellow\'))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((3+1)+3)<3)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});

// describe('The javascript parser', () => {
//     it('is parsing a array phaze2', () => {
//         assert.equal(JSON.stringify(initAll('function foo(y,x,z){\n' +
//             '    let a = x[2] + 1 +y;\n' +
//             '\n' +
//             '             if (a ==4 && !x[0]) {\n' +
//             '                   return a;\n' +
//             '            } else if (x[1] == \'hellow\' && z==\'hellow\') {\n' +
//             '                    a = a + a;\n' +
//             '                    return a;\n' +
//             '                } else {\n' +
//             '                    return a;\n' +
//             '                }\n' +
//             '}','1,[false,\'hellow\',3],\'hellow\'\n')),
//         '[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"((3+1)+1)"},{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+1)"},{"Line":7,"Type":"assignment expression","Name":"a","Condition":"","Value":"(((3+1)+1)+((3+1)+1))"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((3+1)+1)+((3+1)+1))"},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+1)"},{"Line":9,"Type":"else","Name":"","Condition":"","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"((\'hellow\'==\'hellow\')&&(\'hellow\'\\n==\'hellow\'))","Value":""},{"Line":4,"Type":"if statement","Name":"","Condition":"((((3+1)+1)==4)&&!false)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
//     });
// });



describe('The javascript parser', () => {
    it('is parsing a array2 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x){\n' +
            '    let a = x[2] + 1;\n' +
            '    \n' +
            '    if (a ==4 && x[0]) {\n' +
            '        return a;\n' +
            '    } else if (x[1] == \'hellow\') {\n' +
            '        a = a + a;\n' +
            '        return a;\n' +
            '    } else {\n' +
            '        return a;\n' +
            '    }\n' +
            '}','[false,\'hellow\',3]')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(3+1)"},{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":"(3+1)"},{"Line":7,"Type":"assignment expression","Name":"a","Condition":"","Value":"((3+1)+(3+1))"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+(3+1))"},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"(3+1)"},{"Line":9,"Type":"else","Name":"","Condition":"","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(\'hellow\'==\'hellow\')","Value":""},{"Line":4,"Type":"if statement","Name":"","Condition":"(((3+1)==4)&&false)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '   if(z==12)\n' +
            '{ \n' +
            '    return z;\n' +
            '}\n' +
            '}\n' +
            '}','1,2,3')),
        '[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"((1+1)+((1+1)+2))"},{"Line":8,"Type":"assignment expression","Name":"z","Condition":"","Value":"(((1+1)+((1+1)+2))*2)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(c*2)"},{"Line":9,"Type":"if statement","Name":"","Condition":"((((1+1)+((1+1)+2))*2)==12)","Value":""},{"Line":6,"Type":"while statement","Name":"","Condition":"((1+1)<3)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a array3 phaze2', () => {
        assert.equal(JSON.stringify(initAll('let b =5;\n' +
            'let c2=1;\n' +
            'let ac=3;\n' +
            'function foo(x){\n' +
            '    let a = x[c+2] + 1;\n' +
            '    \n' +
            '    if (a ==4 && x[c]) {\n' +
            '        return a;\n' +
            '    } else if (x[1] == \'hellow\' && x[c+2] ==3) {\n' +
            '        a = a + a;\n' +
            '        return a;\n' +
            '    } else {\n' +
            '        return a;\n' +
            '    }\n' +
            '}\n' +
            'let c=0;','[false,\'hellow\',3]')),'[{"Line":1,"Type":"variable declaration","Name":"b","Condition":"","Value":5},{"Line":2,"Type":"variable declaration","Name":"c2","Condition":"","Value":1},{"Line":3,"Type":"variable declaration","Name":"ac","Condition":"","Value":3},{"Line":5,"Type":"variable declaration","Name":"a","Condition":"","Value":"(3+1)"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(3+1)"},{"Line":10,"Type":"assignment expression","Name":"a","Condition":"","Value":"((3+1)+(3+1))"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"((3+1)+(3+1))"},{"Line":13,"Type":"return statement","Name":"","Condition":"","Value":"(3+1)"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"((\'hellow\'==\'hellow\')&&(3==3))","Value":""},{"Line":7,"Type":"if statement","Name":"","Condition":"(((3+1)==4)&&false)","Value":""},{"Line":4,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":4,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":16,"Type":"variable declaration","Name":"c","Condition":"","Value":0}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a 5 phaze2', () => {
        assert.equal(JSON.stringify(initAll('let g=50;\n' +
            'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    while (true) {\n' +
            '    }\n' +
            '    \n' +
            '    return g+a+b;\n' +
            '}\n','1,2,3')),'[{"Line":1,"Type":"variable declaration","Name":"g","Condition":"","Value":50},{"Line":3,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":4,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":5,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"while statement","Name":"","Condition":true,"Value":""},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"((50+(1+1))+((1+1)+2))"},{"Line":2,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});
//
// describe('The javascript parser', () => {
//     it('is parsing a rav1 phaze2', () => {
//         assert.equal(JSON.stringify(initAll('let g=50;\\n\' +\n' +
//             '            \'function foo(x, y, z){\\n\' +\n' +
//             '            \'    let a = x + 1;\\n\' +\n' +
//             '            \'    let b = a + y;\\n\' +\n' +
//             '            \'    let c = 0;\\n\' +\n' +
//             '            \'    \\n\' +\n' +
//             '            \'    while (true) {\\n\' +\n' +
//             '            \'    }\\n\' +\n' +
//             '            \'    \\n\' +\n' +
//             '            \'    return g+a+b;\\n\' +\n' +
//             '            \'}\\n\',\'1,2,3\')),\'[{"Line":1,"Type":"variable declaration","Name":"g","Condition":"","Value":50},{"Line":3,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":4,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":5,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"while statement","Name":"","Condition":true,"Value":""},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"((50+(1+1))+((1+1)+2))"},{"Line":2,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]\');\n' +
//             '    });\n' +
//             '});','1,2,[1,\'dddd\']')),'[{"Line":1,"Type":"variable declaration","Name":"w","Condition":"","Value":1},{"Line":4,"Type":"variable declaration","Name":"gz","Condition":"","Value":"\'king\'"},{"Line":5,"Type":"variable declaration","Name":"gz2","Condition":"","Value":true},{"Line":7,"Type":"return statement","Name":"","Condition":"","Value":"(2+(1*2))"},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"(1+1)"},{"Line":12,"Type":"assignment expression","Name":"w","Condition":"","Value":2},{"Line":11,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"(true==false)","Value":""},{"Line":15,"Type":"return statement","Name":"","Condition":"","Value":true},{"Line":14,"Type":"else","Name":"","Condition":"","Value":""},{"Line":8,"Type":"if statement","Name":"","Condition":"(\'king\'==\'king\')","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(\'king\'==\'dddd\')","Value":""},{"Line":3,"Type":"while statement","Name":"","Condition":"(1<2)","Value":""},{"Line":18,"Type":"assignment expression","Name":"y","Condition":"","Value":"(2+1)"},{"Line":19,"Type":"variable declaration","Name":"a","Condition":"","Value":"(2+1)"},{"Line":2,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
//     });
// });
//
//
//
describe('The javascript parser', () => {
    it('is parsing a 4 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            'c=c;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            'c=5;\n' +
            'return c;\n' + '}','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":8,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":9,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+(0+5))"},{"Line":11,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+1)+5)"},{"Line":12,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+1)+5))"},{"Line":14,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":15,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+3)+5))"},{"Line":13,"Type":"else","Name":"","Condition":"","Value":""},{"Line":10,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<(3*2))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":17,"Type":"assignment expression","Name":"c","Condition":"","Value":5},{"Line":18,"Type":"return statement","Name":"","Condition":"","Value":5},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');});});

describe('The javascript parser', () => {
    it('is parsing a 3 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '}\n' +
            '}','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});
describe('The javascript parser', () => {
    it('is parsing a 2 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":null},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":5},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+5)"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"((c+1)+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((c+1)+5))"},{"Line":13,"Type":"assignment expression","Name":"c","Condition":"","Value":"((c+3)+5)"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((c+3)+5))"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<(3*2))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});
describe('The javascript parser', () => {
    it('is parsing a 1 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            'c=c+5;\n' +
            '}','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+(0+5))"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+1)+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+1)+5))"},{"Line":13,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+3)+5))"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<(3*2))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":16,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });});

describe('The javascript parser', () => {it('is parsing a 0 phaze2', () => {assert.equal(JSON.stringify(initAll('let a1 =2;\n' +
            'let ba =3\n' +
            'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            'a=a1;\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            'a =ba;\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n','1,2,3')),'[{"Line":1,"Type":"variable declaration","Name":"a1","Condition":"","Value":2},{"Line":2,"Type":"variable declaration","Name":"ba","Condition":"","Value":3},{"Line":4,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":5,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":6,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":9,"Type":"assignment expression","Name":"a","Condition":"","Value":"a1"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+(0+5))"},{"Line":13,"Type":"assignment expression","Name":"a","Condition":"","Value":"ba"},{"Line":14,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+1)+5)"},{"Line":15,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+1)+5))"},{"Line":17,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":18,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+3)+5))"},{"Line":16,"Type":"else","Name":"","Condition":"","Value":""},{"Line":12,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<(3*2))","Value":""},{"Line":8,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":3,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":3,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":3,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":3,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');});});

describe('The javascript parser', () => {
    it('is parsing a 2 phaze2', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            'return c;\n' +
            '}\n','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+(0+5))"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+1)+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+1)+5))"},{"Line":13,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+3)+5))"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<(3*2))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":16,"Type":"return statement","Name":"","Condition":"","Value":0},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a green map', () => {
        assert.equal(JSON.stringify(initAll('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b*z < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            'return c;\n' +
            '}\n','1,2,3')),'[{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"(1+1)"},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"((1+1)+2)"},{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":0},{"Line":7,"Type":"assignment expression","Name":"c","Condition":"","Value":"(0+5)"},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+(0+5))"},{"Line":10,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+1)+5)"},{"Line":11,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+1)+5))"},{"Line":13,"Type":"assignment expression","Name":"c","Condition":"","Value":"((0+3)+5)"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"(((1+2)+3)+((0+3)+5))"},{"Line":12,"Type":"else","Name":"","Condition":"","Value":""},{"Line":9,"Type":"if statement","Name":"","Condition":"((((1+1)+2)*3)<(3*2))","Value":""},{"Line":6,"Type":"if statement","Name":"","Condition":"(((1+1)+2)<3)","Value":""},{"Line":16,"Type":"return statement","Name":"","Condition":"","Value":0},{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"y","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"z","Condition":"","Value":""}]');
    });
});