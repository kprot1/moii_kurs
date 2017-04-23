function createMap() {
    var sizeMapX = $('.form_table__sizeMapX').val();
    var sizeMapY = $('.form_table__sizeMapY').val();
    $('.form-table__table').html("");
    $('.form-table__table').append("<td></td>");
    for (var i = 0; i <= sizeMapX; i++) {
        $('.form-table__table').append("<td>");
        if (i != 0) $('.form-table__table').append("<div style='width: 25px; height: 25px;text-align: center; margin: 5px'>" + i + "</div>");
        $('.form-table__table').append("</td>");
    }
    for (var i = 1; i <= sizeMapY; i++) {
        $('.form-table__table').append("<tr>");
        $('.form-table__table').append("<td>");
        $('.form-table__table').append("<div style='width: 25px; height: 25px;text-align: center'>" + i + "</div>");
        $('.form-table__table').append("</td>");
        for (var j = 1; j <= sizeMapX; j++) {
            $('.form-table__table').append("<td>");
            $('.form-table__table').append("<div  id='" + i + "_" + j + "' class='form-table__circle'onclick='oneStepForPlayer(this)'></div>");
            $('.form-table__table').append("</td>");
        }
        $('.form-table__table').append("</tr>");
    }
}
function oneStepForPlayer(event) {
    if (winOrNo("rgb(255, 255, 102)")) {
        alert("Победил игрок");
        return;
    }
    var array = event.id.split("_");
    var positionX = array[0];
    var positionY = array[1];
    if ($("#" + positionX + "_" + positionY).css("background-color") == "rgb(0, 255, 255)") {
        changeColor(positionY, "rgb(255, 255, 102)");
        $('.form-table__information').append("<p>Пользователь: "+positionX+"_"+positionY+"</p>");
        if (winOrNo("rgb(255, 255, 102)")) {
            alert("Вы победили");
            $('.form-table__information').append("<span>Вы победили</span>");
            return;
        }
        setTimeout(oneStepForComputer, 400);
    }
}
function oneStepForComputer() {
    if (winOrNo("rgb(255, 0, 0)")) {
        alert("Победил компьютер");
        return;
    }
    var arrayX = [];
    var arrayY = [];
    var arrayRating = [];
    for (var i = 1; i <= $('.form_table__sizeMapX').val(); i++) {
        for (var j = $('.form_table__sizeMapY').val(); j >= 1; j--) {
            if ($('#' + j + "_" + i).css("background-color") == "rgb(0, 255, 255)") {
                arrayX.push(j);
                arrayY.push(i);
                arrayRating.push(ratingForCircle(j, i));
                break;
            }
        }
    }
    var max = Math.max.apply(Math, arrayRating);
    var k = arrayRating.lastIndexOf(max);
    $('#' + arrayX[k] + "_" + arrayY[k]).css("background-color", "rgb(255, 0, 0)");
    $('.form-table__information').append("<p>Компьютер: "+arrayX[k]+"_"+arrayY[k]+"</p><hr>");
    if (winOrNo("rgb(255, 0, 0)")) {
        alert("Победил компьютер");
        $('.form-table__information').append("<span>Победил компьютер</span>");
        return;
    }
}
function ratingForCircle(j, i) {
    var rating = 0;
    var arrayMap = createNewArray();
    var arrayX = [];
    var arrayY = [];
    var arrayRating = [];
    arrayMap[j - 1][i - 1] = "Y";
    for (var z = 0; z <= 5; z++) {
        arrayX = [];
        arrayY = [];
        delete arrayRating;
        var arrayRating = [];
        for (var i1 = 1; i1 <= $('.form_table__sizeMapX').val(); i1++) {
            for (var j1 = $('.form_table__sizeMapY').val(); j1 >= 1; j1--) {
                if ($('#' + j1 + "_" + i1).css("background-color") == "rgb(0, 255, 255)") {
                    arrayX.push(j1);
                    arrayY.push(i1);
                    break;
                }
            }
        }
        if (z % 2 == 0) {
            for (var q = 0; q < arrayX.length; q++) {
                arrayRating.push(getRatingForCircle(arrayX[q] - 1, arrayY[q] - 1, arrayMap, "Y"));
            }
            var max = Math.max.apply(Math, arrayRating);
            var k = arrayRating.lastIndexOf(max);
            rating += arrayRating[k];
            arrayMap[arrayX[k] - 1][arrayY[k] - 1] = "Y";

        } else {
            for (q = 0; q < arrayX.length; q++) {
                arrayRating.push(getRatingForCircle(arrayX[q] - 1, arrayY[q] - 1, arrayMap, "X"));
            }
            max = Math.max.apply(Math, arrayRating);
            k = arrayRating.lastIndexOf(max);
            rating -= arrayRating[k];
            arrayMap[arrayX[k] - 1][arrayY[k] - 1] = "X";
        }
    }
    return rating;
}
function getRatingForCircle(j, i, arrayMap, symbol) {
    var rating = 0;
    var i_left = i;
    var i_right = i;
    var j_top = j;
    var j_bottom = j;
    while (i_left != 0) {
        if (arrayMap[j][--i_left] == symbol) rating++;
        else break;
    }
    while (i_right != Number($('.form_table__sizeMapX').val() - 1)) {
        if (arrayMap[j][++i_right] == symbol) rating++;
        else break;
    }
    while (j_top != 0) {
        if (arrayMap[--j_top][i] == symbol) rating++;
        else break;
    }
    while (j_bottom < Number($('.form_table__sizeMapY').val() - 1)) {
        if (arrayMap[++j_bottom][i] == symbol) rating++;
        else break;
    }
    j_bottom = j;
    i_left = i;
    while (j_bottom != Number($('.form_table__sizeMapY').val() - 1) && i_left != 0) {
        if (arrayMap[++j_bottom][--i_left] == symbol) rating++;
        else break;
    }
    j_bottom = j;
    i_right = i;
    while (j_bottom != Number($('.form_table__sizeMapY').val() - 1) && i_right != Number($('.form_table__sizeMapX').val() - 1)) {
        if (arrayMap[++j_bottom][++i_right] == symbol) rating++;
        else break;
    }
    j_top = j;
    i_left = i;
    while (j_top != 0 && i_left != 0) {
        if (arrayMap[--j_top][--i_left] == symbol) rating++;
        else break;
    }
    j_top = j;
    i_right = i;
    while (j_top != 0 && i_right != Number($('.form_table__sizeMapX').val() - 1)) {
        if (arrayMap[--j_top][++i_right] == symbol) rating++;
        else break;
    }
    i_left = i;
    if (i_left > 0 && arrayMap[j][i_left - 1] != symbol && arrayMap[j][i_left - 1] != "E") {
        rating++;
        if (i_left > 1 && arrayMap[j][i_left - 2] != symbol && arrayMap[j][i_left - 2] != "E") {
            rating += 5;
            if (i_left > 2 && arrayMap[j][i_left - 3] != symbol && arrayMap[j][i_left - 3] != "E")
                rating += 15;
        }
    }

    i_right = i;
    if (i_right < Number($('.form_table__sizeMapX').val() - 1) && arrayMap[j][i_right + 1] != symbol && arrayMap[j][i_right + 1] != "E") {
        rating++;
        if (i_right < Number($('.form_table__sizeMapX').val() - 2) && arrayMap[j][i_right + 2] != symbol && arrayMap[j][i_right + 2] != "E") {
            rating += 5;
            if (i_right < Number($('.form_table__sizeMapX').val() - 3) && arrayMap[j][i_right + 3] != symbol && arrayMap[j][i_right + 3] != "E")
                rating += 15;
        }
    }

    j_top = j;
    if (j_top < Number($('.form_table__sizeMapY').val() - 1) && arrayMap[j_top + 1][i] != symbol && arrayMap[j_top + 1][i] != "E") {
        rating++;
        if (j_top < Number($('.form_table__sizeMapY').val() - 2) && arrayMap[j_top + 2][i] != symbol && arrayMap[j_top + 2][i] != "E") {
            rating += 2;
            if (j_top < Number($('.form_table__sizeMapY').val() - 3) && arrayMap[j_top + 3][i] != symbol && arrayMap[j_top + 3][i] != "E")
                rating += 15;
        }
    }
    j_bottom = j;
    if (j_bottom > 0 && arrayMap[j_bottom - 1][i] != symbol && arrayMap[j_bottom - 1][i] != "E") {
        rating++;
        if (j_bottom > 1 && arrayMap[j_bottom - 2][i] != symbol && arrayMap[j_bottom - 2][i] != "E") {
            rating += 2;
            if (j_bottom > 2 && arrayMap[j_bottom - 3][i] != symbol && arrayMap[j_bottom - 3][i] != "E")
                rating += 15;
        }
    }
    return rating;
}
function changeColor(positionY, color) {
    for (var i = $('.form_table__sizeMapY').val(); i >= 1; i--) {
        if ($('#' + i + "_" + positionY).css("background-color") == "rgb(0, 255, 255)") {
            $('#' + i + "_" + positionY).css("background-color", color);

            return true;
        }
    }
}
function createNewArray() {
    var array = new Array($('.form_table__sizeMapY').val());
    for (var i = 0; i < $('.form_table__sizeMapY').val(); i++) {
        array[i] = new Array($('.form_table__sizeMapX').val());
        for (var j = 0; j < $('.form_table__sizeMapX').val(); j++) {
            var x = i + 1;
            var y = j + 1;
            if ($('#' + x + "_" + y).css("background-color") == "rgb(255, 0, 0)") {
                array[i][j] = "Y";
            } else if ($('#' + x + "_" + y).css("background-color") == "rgb(255, 255, 102)") {
                array[i][j] = "X";
            } else {
                array[i][j] = "E";
            }
        }
    }
    return array;
}
function winOrNo(color) {
    var x = $('.form_table__sizeMapX').val();
    var y = $('.form_table__sizeMapY').val();

    for (var i = x; i >= 1; i--) {
        for (var j = y; j >= 1; j--) {
            if ($('#' + j + "_" + i).css("background-color") != "rgb(0, 255, 255)") {
                if (checkVertical(j, i, color) || checkHorizon(j, i, color) || checkDiagonal(j, i, color)) return true;
            }
        }
    }
    return false;
}
function checkHorizon(i, j, color) {
    if (i > 3) {
        for (var z = 0; z <= 3; z++) {
            var x = i - z;
            if ($('#' + x + "_" + j).css("background-color") != color) return false;
        }
        return true;
    }
    return false;
}
function checkDiagonal(i, j, color) {
    if (!checkLeftDiagonal(i, j, color) && !checkRightDiagonal(i, j, color)) return false;
    return true;
}
function checkRightDiagonal(i, j, color) {
    if (i > 3 && j > 3) {
        for (var z = 0; z <= 3; z++) {
            var x = i - z;
            var y = j - z;
            if ($('#' + x + "_" + y).css("background-color") != color) return false;
        }
        return true;
    }
    return false;
}
function checkLeftDiagonal(i, j, color) {
    if (i > 3 && j <= Number($('.form_table__sizeMapY').val()) - 3) {
        for (var z = 0; z <= 3; z++) {
            var x = i - z;
            var y = j + z;
            if ($('#' + x + "_" + y).css("background-color") != color) return false;
        }
        return true;
    }
    return false;
}
function checkVertical(i, j, color) {
    if (j > 3) {
        for (var z = 0; z <= 3; z++) {
            var y = j - z;
            if ($('#' + i + "_" + y).css("background-color") != color) return false;
        }
        return true;
    }
    return false;
}
jQuery(document).ready(function () {
    createMap();
});