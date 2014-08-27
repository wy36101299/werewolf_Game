// Fisher-Yates Shuffle
function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
// 預設人數 預言家,女巫,守衛,丘比特 8~11 兩個狼人 12~17 三個狼人 18 四個狼人 其餘村民
// 預言家:0 女巫:1 守衛:2 丘比特:3 狼人:4 村民:5
function creatarray(num) {
	ary = [];
	// 預言家:0 女巫:1 守衛:2 丘比特:3
	for (var i = 0; i < 4; i++) {
		ary.push(i);
	};
	// 8~11 兩個狼人
	if(8 <= num <= 11){
		for (var i = 0; i < 2; i++) {
			ary.push(4);
		};
		for (var i = 0; i < num-4-2; i++) {
			ary.push(5);
		};
	// 12~17 三個狼人
	}else if(12 <= num <= 17){
		for (var i = 0; i < 3; i++) {
			ary.push(4);
		};
		for (var i = 0; i < num-4-3; i++) {
			ary.push(5);
		};
	// 18 四個狼人
	}else{
		for (var i = 0; i < 4; i++) {
			ary.push(4);
		};
		for (var i = 0; i < num-4-4; i++) {
			ary.push(5);
		};
	}
	return map(shuffle(ary));
}
function map(array){
	var map = ['預言家','女巫','守衛','丘比特','狼人','村民'];
	for (var i = 0; i < array.length; i++) {
		array[i] = map[array[i]];
	};
	return array;
}
function number(people){
	num_ary = [];
	for (var i = 2; i < people+1; i++) {
		num_ary.push(i);
	};
	return  num_ary;
}
$(document).on('click','#btn',function(){
	people = parseInt($(this).siblings().val().trim()) || null;
	console.log(people)
	console.log(typeof(people))
	if( 8 <= people && people <= 18 ){
		$(this).parent().parent().siblings('.flip').removeClass('hidden');
		console.log('111')
		$(this).parent().parent().addClass('hidden');
		card = 	creatarray(people);
		num_ary = number(people);
		console.log(num_ary)
		console.log('遊戲人數->'+people+' '+'角色順序->'+card);
		$(document).on('click','.flip > .card',function(){
			if(card == ''){
				$(this).parent().addClass('hidden');
				$(this).parent().siblings('.game').removeClass('hidden');
			}
			if( $(this).hasClass('flipped') ){
				$(this).removeClass('flipped');
				$(this).children('.front').children().text(num_ary.shift());
			}
			else{
				$(this).addClass('flipped');
				$(this).children('.back').text(card.shift());
			}
		});  			
	}else{
		$(this).siblings().val('');
		alert('請輸入8到18之遊戲人數');
	}
});
$(document).on('click','#restart',function(){
	window.location.reload();
});