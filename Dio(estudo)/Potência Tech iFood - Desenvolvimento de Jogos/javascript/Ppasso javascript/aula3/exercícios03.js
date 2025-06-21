var preco = 100;
var pagamento = 4;
var parcela = 4;

if( pagamento === 1){
    console.log('pagamento via Debito, recebe 10% de desconto.');
    console.log('Varlo pago sera de' ,preco-(preco*0.1),'$');
}else if(pagamento === 2){
    console.log('pagamento via Dinheiro ou pix, recebe 15% de desconto.');
    console.log('Varlo pago sera de' ,preco-(preco*0.15),'$');
}else if(pagamento === 3){
    console.log('pagamento em 2 vez, preco normal sem juros');
    console.log('Varlo pago sera de 2 x',preco/2,'$');
}else if(pagamento === 4){
    console.log('pagamento acima de 2 vez, juros de 10%');
    console.log('Varlo pago sera de ',(preco*0.1 + preco),'$ com parcela de',parcela,' x',(preco*0.1 + preco)/parcela,'$');
}else(
    console.log('opção invalida.')
)