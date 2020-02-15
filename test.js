var numsLable=[12,1,2,3,4,5,6,7,8,9,10,11];
function convertNumsLabelToNamesLabel(numsLabel){
    var collection = {1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'};
    var namesLabel=[]
    numsLabel.map(el=>{
        namesLabel.push(collection[el]);
    })
    return namesLabel;
}
var namesLabel = convertNumsLabelToNamesLabel(numsLable);
console.log(namesLabel);
