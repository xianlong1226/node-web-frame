async function test(){
    let pgService = require('./pg.js');
    let result1 = await pgService.exec('insert into test(a,b,c) values ($1,$2,$3)',[1,1,1])

    console.log(result1);

    let result2 = await pgService.multiExec('insert into test(a,b,c) values ($1,$2,$3)',[1,1,1],'insert into test(a,b,c) values ($1,$2,$3)',[1,1,1])

    console.log(result2);
}

test();