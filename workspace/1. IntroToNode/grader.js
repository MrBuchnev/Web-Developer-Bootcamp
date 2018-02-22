function average (arr) {
    var len = arr.length;
    for (var i = 0, sum = 0; i < len; i++){
        sum += arr[i];
    }
    var avg = Math.round(sum / len);
    return avg;
}

console.log("First average score");
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

console.log("Second average score");
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));