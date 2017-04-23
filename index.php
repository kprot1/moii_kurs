<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.1.1.min.js"></script>
    <title>Document</title>
</head>
<body>
<div style="display: inline-block;">
    Выберите размерность поля:
    <input type="text" placeholder="вершины" class="sizeMap form_table__sizeMapX" style="width:25px" value="9"
           oninput="createMap();">
    <strong>:</strong>
    <input type="text" placeholder="вершины" class="sizeMap form_table__sizeMapY" style="width:25px" value="6"
           oninput="createMap();">
    <table class="form-table__table">
    </table>
</div>

<div style="display: inline-block; float: right;" class="form-table__information">
    Информация о игре + ходы
</div>
</body>
<script src="js/script.js"></script>
</html>